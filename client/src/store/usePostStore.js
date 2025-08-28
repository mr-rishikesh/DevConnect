
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { create } from "zustand"
import { useAuthStore } from "./useAuthStore";

export const usePostStore = create((set, get) => ({
    feedPosts: null,
    likedPost: [],

    myPosts: null,

    handleFollow: async (followeeId) => {
        try {
            const authUser = useAuthStore.getState().authUser;
            const res = await axiosInstance.post(`/users/follow/${authUser._id}/${followeeId}`);
            toast.success("Followed")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    },

    likePost: async (data) => {
        //           const { postId } = data;

        //   // Prevent double-like
        //   const alreadyLiked = get().likedPosts?.[postId];
        //   if (alreadyLiked) return false;
        try {
            set(state => ({
                likedPosts: {
                    ...state.likedPosts,
                    [data.postId]: true,
                },
            }));


            const res = await axiosInstance.post("/post/like-post", data)


        } catch (error) {
            console.log("error in likepost ")
            console.log(error)

        }

    },


    createPost: async (data) => {
        try {
            console.log(data.tags);

            const res = await axiosInstance.post("/post/create-post", data);
            toast.success("Sucessfully Posted");

        } catch (error) {
            toast.error("Something Wrong")
            console.log(error)
        }
    },
    getFeedPosts: async () => {
        try {

            const res = await axiosInstance.get("/post/");
            //  toast.success("Feed data fetched")
            //  console.log("Res of messages")
            console.log(res)
            set({ feedPosts: res.data.posts })

        } catch (error) {
            console.log(error);
            toast.error("Something wrong in post")

        }

    }
}

))