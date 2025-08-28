import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";




function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { isSigningIn, signin, isforgetPasswordPage } = useAuthStore();
    const validateForgetPassword = () => {

        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        return true;

    }

    const handleForgerPass = () => {
        const success = validateForgetPassword();

        if (success === true) {
            forgetPassowrd(formData)

        }
    }




    const validateForm = () => {

        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");

        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        console.log("reacher bootmo")

        return true;
    }

    const handleSubmit = async () => {
        const success = validateForm();

        if (success === true) {

            await signin(formData);

        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-6 sm:p-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                Sign in to continue exploring the community
                            </p>
                        </div>

                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                                    name="email"
                                    id="email"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-accent-500 dark:focus:border-accent-500 transition-colors duration-200"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-accent-500 dark:focus:border-accent-500 transition-colors duration-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5" />
                                        ) : (
                                            <FaEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-accent-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-accent-500 dark:hover:text-accent-400 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSigningIn}
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-accent-600 dark:hover:bg-accent-700 focus:ring-2 focus:ring-primary-300 dark:focus:ring-accent-500 focus:outline-none transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSigningIn ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary-600 hover:text-primary-700 dark:text-accent-500 dark:hover:text-accent-400 hover:underline transition-colors duration-200"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn