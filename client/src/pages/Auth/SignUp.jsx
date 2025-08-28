import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import TagInput from "../../components/TagInput";
function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUrl: "",
    password: "",

  });
  const { signup, navigateToOtp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.githubUrl.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");


    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    console.log("reacher bootmo");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) await signup(formData);
    console.log(navigateToOtp + "lets see ");
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an Account
              </h1>
              <div className="space-y-4 md:space-y-6">

                {/* full name */}
                <div>
                  <label
                    htmlFor="FullName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                    }}
                    name="fullName"
                    id="fullName"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-accent-500 dark:focus:border-accent-500 transition-colors duration-200"
                    placeholder="Enter Name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    name="email"
                    id="email"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-accent-500 dark:focus:border-accent-500 transition-colors duration-200"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>



                {/* <TagInput /> */}
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Github URL
                  </label>
                  <input
                    type="githubUrl"
                    onChange={(e) => {
                      setFormData({ ...formData, githubUrl: e.target.value });
                    }}
                    name="githubUrl"
                    id="githubUrl"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-accent-500 dark:focus:border-accent-500 transition-colors duration-200"
                    placeholder="Enter Github Url "
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Create Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-accent-500 dark:focus:border-accent-500 transition-colors duration-200"
                    required=""
                  />
                </div>



                <button
                  type="button"
                  disabled={isSigningUp}
                  onClick={handleSubmit}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-accent-600 dark:hover:bg-accent-700 focus:ring-2 focus:ring-primary-300 dark:focus:ring-accent-500 focus:outline-none transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:text-primary-700 dark:text-accent-500 dark:hover:text-accent-400 hover:underline transition-colors duration-200"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
