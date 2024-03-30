import { useEffect, useState } from "react"
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore(state => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]); // TODO: update to show unfollowed users' posts instead of nothing
        return;
      }

      try {
        const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following))
        const querySnapshot = await getDocs(q);

        const feedPosts = [];
        querySnapshot.forEach(doc => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        })
        feedPosts.sort((a, b) => b.createdAt - a.createdAt); // we want newest post first
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsLoading(false);
      }
    }

    if (authUser) getFeedPosts();
  }, [setPosts, authUser, showToast, setUserProfile]);

  return { isLoading, posts };
}

export default useGetFeedPosts