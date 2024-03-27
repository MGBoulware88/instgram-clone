import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
      const docRef = doc(firestore, "users", userCred.user.uid);
      const docSnapshot = await getDoc(docRef);
      localStorage.setItem("user-info", JSON.stringify(docSnapshot.data()));
      loginUser(docSnapshot.data());
    } catch(error) {
      const errorCode = error.code || null;
      let errorMessage;
      switch (errorCode) {
        case "auth/invalid-email":
          errorMessage = "Invalid Email Address.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Wrong Email/Password combination.";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong Email/Password combination.";
          break;
        default:
          errorMessage = error.message;
      }
      showToast("Login Failed", errorMessage, "error");
    }
  }
  return { loading, error, login };
};

export default useLogin;