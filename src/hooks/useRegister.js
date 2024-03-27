import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast()
  const loginUser = useAuthStore(state => state.login);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      return showToast("Error", "Please fill out all fields", "error");

    }

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return showToast("Error", "Username already exist.", "error");
    }

    createUserWithEmailAndPassword(inputs.email, inputs.password)
      .then(createdUser => {
        const userDocument = {
          uid: createdUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePic: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        }
        // if success, create user doc - above only creates auth for user
        setDoc(doc(firestore, "users", createdUser.user.uid), userDocument);
        localStorage.setItem("user-info", JSON.stringify(userDocument));
        loginUser(userDocument);
      })
      .catch(error => {
        let errorMessage;
        switch (error.code) {
          case "ERROR_EMAIL_ALREADY_IN_USE":
          case "account-exists-with-different-credential":
          case "email-already-in-use":
            errorMessage = "Email already used. Did you want to login?";
            break;
          case "ERROR_WRONG_PASSWORD":
          case "wrong-password":
            errorMessage = "Wrong email or password combination.";
            break;
          case "auth/invalid-email":
            errorMessage = "Enter a valid email address."
            break;
          default:
            errorMessage = error.message;
        }

        return showToast("Error", errorMessage, "error");
      })
  }

  return { loading, error, signup };
}

export default useSignUpWithEmailAndPassword;