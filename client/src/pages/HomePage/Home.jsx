import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../../store/usePostStore.js"
import Post from "../../components/Post.jsx";

export default function Home() {
    const { getFeedPosts, feedPosts } = usePostStore();

    useEffect(() => {
        getFeedPosts();
    }, [getFeedPosts]);

    return (
        <div className=" px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Your Feed
                    </h1>
                    <Link
                        to="/create-post"
                        className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Post
                    </Link>
                </div>

                <div className="space-y-6">
                    {feedPosts && feedPosts.length > 0 ? (
                        feedPosts.map((post) => (
                            <div key={post._id} className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-secondary-700 overflow-hidden">
                                <Post post={post} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-gray-100 dark:border-secondary-700">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary-50 dark:bg-accent-900/20 rounded-full text-primary-500 dark:text-accent-400 mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                                Be the first to share your thoughts, projects, or questions with the community!
                            </p>
                            <Link
                                to="/create-post"
                                className="inline-flex items-center px-6 py-2.5 bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                Create Your First Post
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
