import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { usePostStore } from "../store/usePostStore.js";



const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.upvotes);
  const [comments, setComments] = useState(20); // static for now
  const { allUsers } = useAuthStore();
  const { likedPost, likePost } = usePostStore();

  if (!post) {
    return (<>loading...</>);
  }

  const getUserById = (id) => {
    if (!allUsers) return;
    return allUsers.find(user => user._id === id);
  }

  const formatDateSmart = (isoDate) => {
    const now = new Date();
    const date = new Date(isoDate);
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }); // e.g., "23 June 2025"
    }
  }

  const handleLike = async () => {
    if (likedPost[post._id]) return;
    likedPost[post._id] = true;
    setLikes(e => e + 1);

    const success = await likePost({ postId: post._id });








  }



  // Usage
  let poster = getUserById(post.posterId);






  return (<>

    <main className="pt-4 pb-8 lg:pt-2 lg:pb-1 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-1 lg:mb-1 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="  inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src={poster.profilePic !== "" ? poster.profilePic : "https://freesvg.org/img/abstract-user-flat-4.png"}
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {poster.fullName}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {poster.title}
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time
                      pubdate="true"
                      dateTime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {formatDateSmart(post.createdAt)}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h className="font-semibold leading-tight text-gray-900 lg:mb-6 lg:text-1xl dark:text-white">
              {post.title}
            </h>
          </header>

          <p className="lead text-gray-900  dark:text-white">
            {post.description}
          </p>
          {post.image !== "" && <figure>
            <img className="max-height: 100%; w-fit"
              src={post.image}
              alt=""
            />

          </figure>}



          {/* Like & Comment Buttons */}
          <div className="flex items-center space-x-6 mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <img className="w-6 h-6 mr-1" src="/assets/like-button-icon.webp" alt="" />
              {/* <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              > */}


              <span>{likes}</span>
            </button>


          </div>

          {/* Rest of your comment section here (you already have it below) */}
        </article>
      </div>
    </main>
  </>
  );
};

export default Post;
