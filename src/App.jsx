import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayouts/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import AuthPageRegisterFirst from "./pages/AuthPage/AuthPageRegisterFirst";

function App() {
  const [authUser] = useAuthState(auth);
  console.log(`Logged in user: ${authUser?.username}`);
  return (
    <PageLayout>
      <Routes>
        <Route exact path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
        <Route exact path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
        <Route exact path='/register' element={!authUser ? <AuthPageRegisterFirst /> : <Navigate to='/' />} />
        <Route path='/:username' element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;