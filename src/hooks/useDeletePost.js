import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { useState } from "react";
import useAuthStore from "../store/authStore";

const useDeletePost = (post) => {
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const authUser = useAuthStore(state => state.user);

  const handleDeletePost = async () => {
    //confirmation of delete
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    //disable button while deleting state
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      //delete the post image
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      //delete the post itself
      await deleteDoc(doc(firestore, "posts", post.id));
      //remove the post id from the user's posts
      const userRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userRef, { posts: arrayRemove(post.id) });
      //remove the post from state
      deletePost(post.id)
      decrementPostsCount(post.id);

      showToast("Success", "Post deleted.", "success")

    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  }

  return { handleDeletePost, isDeleting, authUser }
}

export default useDeletePost;