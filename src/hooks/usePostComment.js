import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react"
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore(state => state.user);
  const addComment = usePostStore(state => state.addComment);

  const handlePostComment = async (postId, comment) => {
    //disable button after click
    if (isCommenting) return;
    //login gate
    if (!authUser) return showToast("Error","You must be logged in to post a comment", "error");
    setIsCommenting(true);
    
    const newComment = {
      comment: comment,
      createdBy: authUser.uid,
      postId: postId,
      createdAt: Date.now(),
    };

    try {
      await updateDoc(doc(firestore, "posts", postId), {comments: arrayUnion(newComment)});
      addComment(postId, newComment);

    } catch (error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsCommenting(false);
    }
  }

  return {isCommenting, handlePostComment};

}

export default usePostComment