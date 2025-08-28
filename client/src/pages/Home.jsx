import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js"
import Post from "../components/Post.jsx";

export function Home() {
    const { getFeedPosts, feedPosts } = usePostStore();

    useEffect(() => {
        getFeedPosts();
    }, [getFeedPosts]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Feed
                </h1>
                <Link
                    to="/create-post"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Create Post
                </Link>
            </div>
            
            <div className="space-y-6">
                {feedPosts && feedPosts.length > 0 ? (
                    feedPosts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                            No posts yet. Be the first to create one!
                        </p>
                    </div>
                )}
            </div>
            
        </div>
    )
}
