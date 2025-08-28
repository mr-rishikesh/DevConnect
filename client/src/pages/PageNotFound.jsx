import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col py-24 md:py-32 bg-gray-50 dark:bg-secondary-900 p-6">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-6xl font-bold text-primary-600 dark:text-accent-500 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;