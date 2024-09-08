import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register/Register";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/auth/login/Login";
import HomeScreen from "./pages/home/HomeScreen";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import AddPost from "./pages/post/AddPost";
import PostDetails from "./pages/post/PostDetails";
import EditPost from "./pages/post/EditPost";
import Profile from "./pages/auth/profile/Profile";
import UserProfile from "./pages/auth/profile/UserProfile";
import UpdateProfile from "./pages/auth/profile/UpdateProfile";
import Followers from "./pages/auth/profile/Followers";
import Following from "./pages/auth/profile/Following";
import SendEmail from "./pages/auth/profile/SendEmail";
import VerifyAccount from "./pages/auth/profile/VerifyAccount";
import Users from "./pages/users/Users";
import ChangePassword from "./pages/users/ChangePassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit/" element={<UpdateProfile />} />
        <Route path="/profile/followers/" element={<Followers />} />
        <Route path="/profile/following/" element={<Following />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/create-category" element={<AddCategory />} />
        <Route path="/edit-category/" element={<EditCategory />} />
        <Route path="/submit-post/" element={<AddPost />} />
        <Route path="/send-message/" element={<SendEmail />} />
        <Route path="/details-post/:id" element={<PostDetails />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/verify-account/:token" element={<VerifyAccount />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;