import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Register from "./pages/auth/register/Register";
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
import ForgetPasswrod from "./pages/auth/profile/ForgetPasswrod";
import ResetPassword from "./pages/auth/profile/ResetPassword";
import CheckIsAdmin from "./components/RouteProtection/CheckIsAdmin";
import CheckNotLogin from "./components/RouteProtection/CheckNotLogin";
import CheckIsLogin from "./components/RouteProtection/CheckIsLogin";
import NotFound from "./components/RouteProtection/NotFound";
import RootProtection from "./components/RouteProtection/RootProtection";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootProtection />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>
        
        <Route element={<CheckNotLogin />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPasswrod />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        </Route>

        <Route element={<CheckIsAdmin />}>
          <Route path="/users" element={<Users />} />
          <Route path="/create-category" element={<AddCategory />} />
          <Route path="/edit-category" element={<EditCategory />} />
          <Route path="/send-message/" element={<SendEmail />} />
        </Route>

        <Route element={<CheckIsLogin />}>
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit/" element={<UpdateProfile />} />
          <Route path="/profile/followers/" element={<Followers />} />
          <Route path="/profile/following/" element={<Following />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/submit-post/" element={<AddPost />} />
          <Route path="/details-post/:id" element={<PostDetails />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/verify-account/:token" element={<VerifyAccount />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;