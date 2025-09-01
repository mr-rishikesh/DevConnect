import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { usePostStore } from "../store/usePostStore.js";
import { FiImage, FiLoader, FiX, FiAlertCircle } from "react-icons/fi";

export default function CreatePostPage() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        tags: []
    });

    const { createPost } = usePostStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image/.*')) {
            toast.error('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const showErrorToast = (message) => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black/5`}
            >
                <div className="flex-1 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 pt-0.5">
                            <FiAlertCircle className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Error
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ));
    };

    const showSuccessToast = () => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black/5`}
            >
                <div className="flex-1 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 pt-0.5">
                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Success!
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Your post has been published successfully.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ));
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            showErrorToast("Title is required");
            return false;
        }
        if (formData.title.trim().length > 200) {
            showErrorToast("Title must be less than 200 characters");
            return false;
        }
        if (!formData.description.trim()) {
            showErrorToast("Description is required");
            return false;
        }
        if (formData.description.trim().length > 500) {
            showErrorToast("Description must be less than 500 characters");
            return false;
        }
        if (!formData.content.trim()) {
            showErrorToast("Content is required");
            return false;
        }
        if (formData.content.trim().length > 50000) {
            showErrorToast("Content is too long");
            return false;
        }
        if (!image) {
            showErrorToast("Please upload a cover image");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const loadingToast = toast.loading('Publishing your post...');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title.trim());
            formDataToSend.append('description', formData.description.trim());
            formDataToSend.append('content', formData.content.trim());
            formDataToSend.append('tags', formData.tags.join(','));
            formDataToSend.append('coverImg', image);

            await createPost(formDataToSend);
            toast.dismiss(loadingToast);
            showSuccessToast();
            setTimeout(() => navigate('/home'), 1500);
        } catch (error) {
            console.error('Error creating post:', error);
            toast.dismiss(loadingToast);
            showErrorToast(error.response?.data?.message || "Failed to create post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormReset = () => {
        setFormData({
            title: "",
            description: "",
            content: "",
            tags: []
        })
        setImage(null);
        setImagePreview(null);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Create New Post
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 dark:border-secondary-700">
                    {/* Cover Image */}
                    <div className="space-y-2">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cover Image <span className="text-red-500">*</span>
                                </label>
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImage(null);
                                            setImagePreview(null);
                                        }}
                                        className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div
                                className={`border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 ${imagePreview ? 'border-transparent' : 'border-gray-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-accent-500'}`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                    required
                                />
                                {imagePreview ? (
                                    <div className="relative group">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <span className="bg-white/90 dark:bg-secondary-800/90 text-gray-800 dark:text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                Change Image
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-12 text-center cursor-pointer group">
                                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-50 dark:bg-secondary-700/50 mb-4 group-hover:bg-primary-50 dark:group-hover:bg-accent-900/20 transition-colors duration-300">
                                            <FiImage className="h-10 w-10 text-gray-400 group-hover:text-primary-500 dark:group-hover:text-accent-400 transition-colors duration-300" />
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                            <span className="font-medium text-primary-600 dark:text-accent-400 group-hover:text-primary-700 dark:group-hover:text-accent-300 transition-colors">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG, GIF (max 5MB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                maxLength={200}
                                className="w-full p-4 text-lg border-2 border-gray-200 dark:border-secondary-700 rounded-xl bg-white dark:bg-secondary-800/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-accent-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                                placeholder="New post title here..."
                                required
                            />
                            <div className="absolute -bottom-6 right-2">
                                <span className={`text-xs ${formData.title.length === 200 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {formData.title.length}/200
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            maxLength={500}
                            className="w-full p-4 border-2 border-gray-200 dark:border-secondary-700 rounded-xl bg-white dark:bg-secondary-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-300 dark:focus:ring-accent-500 focus:border-transparent resize-none placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                            placeholder="What's this post about? Provide a brief overview that will appear in the post preview..."
                            required
                        ></textarea>
                        <span className="absolute -bottom-3 right-2 text-xs text-gray-500 dark:text-gray-400">
                            {formData.description.length}/500
                        </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Content <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="relative">
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows="10"
                                maxLength={50000}
                                className="w-full p-6 border-2 border-gray-200 dark:border-secondary-700 rounded-xl bg-white dark:bg-secondary-800/50 focus:ring-2 focus:ring-primary-300 dark:focus:ring-accent-500 focus:border-transparent min-h-[300px] font-sans leading-relaxed text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                                placeholder="Write your post content here.."
                                required
                            ></textarea>
                            <span className="absolute -bottom-3 right-2 text-xs text-gray-500 dark:text-gray-400">
                                {formData.content.length.toLocaleString()}/50,000 characters
                            </span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tags {formData.tags.length > 0 && `(${formData.tags.length}/10)`}
                            </label>
                            <div className="flex items-center space-x-2">
                                {formData.tags.length > 0 && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formData.tags.length} tag{formData.tags.length !== 1 ? 's' : ''} added
                                    </span>
                                )}
                                {formData.tags.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, tags: [] }))}
                                        className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>
                        <div
                            className={`flex flex-wrap gap-2 items-center min-h-[46px] p-2 border border-gray-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 transition-colors duration-200 ${formData.tags.length === 0 ? 'py-3' : ''
                                }`}
                            onClick={() => document.querySelector('.tag-input')?.focus()}
                        >
                            {formData.tags.length === 0 && !tagInput && (
                                <span className="absolute text-sm text-gray-400 dark:text-gray-500 pointer-events-none px-1">
                                    Add tags (press Enter or comma)
                                </span>
                            )}
                            {formData.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-accent-900/30 hover:bg-primary-100 dark:hover:bg-accent-800/40 rounded-md transition-colors duration-200"
                                >
                                    <span className="text-sm font-medium text-primary-700 dark:text-accent-300">{tag}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFormData(prev => ({
                                                ...prev,
                                                tags: prev.tags.filter((_, i) => i !== index)
                                            }));
                                        }}
                                        className="text-primary-400 hover:text-primary-600 dark:text-accent-500 dark:hover:text-accent-300 ml-0.5 -mr-1 p-1 rounded-full hover:bg-primary-200/30 dark:hover:bg-accent-700/30 transition-colors duration-150"
                                        aria-label={`Remove ${tag} tag`}
                                    >
                                        <FiX className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            {formData.tags.length < 10 ? (
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        // Add tag on Enter or comma
                                        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
                                            e.preventDefault();
                                            const newTag = tagInput.trim().replace(/,+$/, '');
                                            if (newTag && !formData.tags.includes(newTag)) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    tags: [...prev.tags, newTag]
                                                }));
                                                setTagInput('');
                                            }
                                        }
                                        // Remove last tag on backspace when input is empty
                                        else if (e.key === 'Backspace' && !tagInput && formData.tags.length > 0) {
                                            e.preventDefault();
                                            setFormData(prev => ({
                                                ...prev,
                                                tags: prev.tags.slice(0, -1)
                                            }));
                                        }
                                    }}
                                    placeholder={formData.tags.length === 0 ? "" : "Add another tag..."}
                                    className="tag-input bg-transparent border-0 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 w-full px-1 py-0.5 min-w-[120px] flex-1"
                                    maxLength={30}
                                />
                            ) : (
                                <div className="text-sm text-gray-500 dark:text-gray-400 px-1 py-0.5">
                                    Maximum 10 tags reached
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 px-1">
                            {formData.tags.length === 0 ? (
                                'Add relevant tags to help others discover your post. Use keywords that describe your content.'
                            ) : formData.tags.length < 5 ? (
                                'Press Enter or comma to add a tag. You can add up to 10 tags.'
                            ) : (
                                `You've added ${formData.tags.length} out of 10 maximum tags.`
                            )}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col-reverse sm:flex-row justify-between items-end gap-2">
                            <button
                                type="button"
                                onClick={handleFormReset}
                                className="w-full sm:w-auto px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-secondary-800 border-2 border-gray-200 dark:border-secondary-700 rounded-xl hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                                disabled={isSubmitting}
                            >
                                <span>Cancel</span>
                            </button>

                            <div className="w-full sm:w-auto flex flex-col items-end">
                                <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                                    {isSubmitting ? (
                                        <div className="flex items-center text-primary-600 dark:text-accent-400">
                                            <FiLoader className="animate-spin mr-2" />
                                            Publishing your post...
                                        </div>
                                    ) : (
                                        <span>Ready to share with the community?</span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-accent-500 disabled:opacity-70 flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm hover:shadow-md"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FiLoader className="animate-spin" />
                                            <span>Publishing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span>Publish Post</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
