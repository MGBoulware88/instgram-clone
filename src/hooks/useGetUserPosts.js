import { useEffect, useState } from "react"
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore(state => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);
      
      try {
        const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach(doc => {
          posts.push({ ...doc.data(), id: doc.id })
        });
        posts.sort((a, b) => b.createdAt - a.createdAt) //this sorts the posts by newest first
        setPosts(posts);

      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();

  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
}

export default useGetUserPosts;