import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { showToast } from "../utils/ShowToast";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/BaseUrl";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState([]);
    const [userId, setUserId] = useState(undefined);
    const [tokenExpires, setTokenExpires] = useState(undefined);
    const [profilePhoto, setProfilePhoto] = useState(undefined);
    const [userData, setUserData] = useState(undefined);
    const [userEmail, setUserEmail] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, [userId]);

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/token`);
            const token = response.data.accessToken;
            const decodedToken = jwtDecode(token);

            setAccessToken(token);
            setUserId(decodedToken.userId);
            setUserEmail(decodedToken.userEmail);
            setIsAdmin(decodedToken.admin);
            setTokenExpires(decodedToken.exp);
            setProfilePhoto(decodedToken.profilePhoto);

            localStorage.setItem('userId', decodedToken.userId);
        } catch (error) {
            console.log(error);
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {

            try {
                if (tokenExpires * 1000 < new Date().getTime()) {
                    const response = await axios.get(`${baseUrl}/api/token`);
                    const token = response.data.accessToken;
                    const decodedToken = jwtDecode(token);

                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${token}`,
                    };

                    setAccessToken(token);
                    setUserId(decodedToken.userId);
                    setUserEmail(decodedToken.userEmail);
                    setIsAdmin(decodedToken.admin);
                    setTokenExpires(decodedToken.exp);
                    setProfilePhoto(decodedToken.profilePhoto);

                    localStorage.setItem('userId', decodedToken.userId);
                } else if (accessToken) {
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${accessToken}`,
                    };
                }

                return config;
            } catch (err) {
                console.error('Error updating token:', err);
                return Promise.reject(err);
            }
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    const checkEmailExists = async (data) => {

        try {
            const res = await axios.get(`${baseUrl}/api/users/check-email/${data}`);


            return res;
        } catch (error) {

            console.log(error);
        }
    }

    const register = async (data) => {


        try {
            const res = await axios.post(`${baseUrl}/api/users/register`, data);

            showToast(res.data);

        } catch (err) {
            console.log(err.response.data);
            showToast(err.response.data.message);
        }
    }

    const login = async (data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/users/login`, data);

            showToast(res.data);

            setUserId(res.data.userViewModel.userId);
            setProfilePhoto(res.data.userViewModel.profilePhoto);
            setIsAdmin(res.data.userViewModel.admin);
            localStorage.setItem('userId', res.data.userViewModel.userId);

            navigate('/');
            window.location.reload();
        } catch (err) {
            console.log(err.response.data);
            showToast(err.response.data.message);
        }
    }

    const profile = async (userId) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/users/profile/${userId}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAccount = async (userId) => {


        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/users/${userId}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);


            navigate('/register');
        } catch (error) {

            console.log(error);
        }
    }

    const userProfile = async (id) => {


        try {
            const res = await axiosJWT.get(`${baseUrl}/api/users/profile/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setUserData(res.data);
            checkIsFollowed(id);

        } catch (error) {

            console.log(error);
        }
    }

    const uploadProfilePhoto = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data);

            const res = await axiosJWT.put(`${baseUrl}/api/users/upload-profile-photo`, formData, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            profile();
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (data) => {


        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);


            navigate('/profile');
        } catch (err) {

            console.log(err);
        }
    }

    const checkIsFollowed = async (id) => {


        try {
            console.log(`checkIsFollowed (front-end) : ${id}`);
            const res = await axiosJWT.get(
                `${baseUrl}/api/users/isfollowed/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }
            );

            console.log(res.data);
            setIsFollowed(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    const follow = async (id) => {


        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/follow/`, { followingId: id }, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            userProfile(id);

        } catch (error) {

            console.log(error);
        }
    }

    const unfollow = async (id) => {


        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/unfollow/`, { unfollowingId: id }, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            userProfile(id);

        } catch (error) {

            console.log(error);
        }
    }

    const sendEmail = async (data) => {
        try {
            console.log(data);
            const res = await axiosJWT.post(`${baseUrl}/api/users/email`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const sendVerificationEmail = async () => {


        try {
            const res = await axiosJWT.post(`${baseUrl}/api/users/email-verification`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

        } catch (error) {

            console.log(error);
        }
    }

    const verifyAccount = async (token) => {


        try {
            const data = {
                token: token
            }
            const res = await axiosJWT.put(`${baseUrl}/api/users/verify-account`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });
            console.log(data);

            showToast(res.data);
        } catch (error) {

            console.log(error);
        }
    }

    const getUsers = async () => {


        try {
            const res = await axiosJWT.get(`${baseUrl}/api/users`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setUsers(res.data);

        } catch (error) {

            console.log(error);
        }
    }

    const getTopUsers = async () => {


        try {
            const res = await axiosJWT.get(`${baseUrl}/api/top-users`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setTopUsers(res.data);

        } catch (error) {

            console.log(error);
        }
    }

    const blockUser = async (id) => {

        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/block/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            getUsers();

        } catch (error) {

            console.log(error);
        }
    }

    const unblockUser = async (id) => {


        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/unblock/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            getUsers();

        } catch (error) {

            console.log(error);
        }
    }

    const updatePassword = async (data) => {


        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/password`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);


            navigate('/');
        } catch (error) {

            console.log(error);
        }
    }

    const sendResetPasswordEmail = async (data) => {


        try {
            const res = await axios.put(`${baseUrl}/api/users/forget-password/`, data);


            showToast(res.data);
        } catch (error) {

            console.log(error);
        }
    }

    const resetPassword = async (data) => {
        try {
            const res = await axios.put(`${baseUrl}/api/users/reset-password/`, data);
            showToast(res.data);

            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const userLogout = async () => {
        try {
            await axios.delete(`${baseUrl}/api/users/logout`);
            setUserId('');

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ register, checkEmailExists, login, deleteAccount, userId, profilePhoto, isAdmin, axiosJWT, accessToken, profile, userData, userEmail, userProfile, uploadProfilePhoto, updateUser, follow, unfollow, sendEmail, verifyAccount, sendVerificationEmail, getUsers, users, getTopUsers, topUsers, blockUser, unblockUser, updatePassword, userLogout, checkIsFollowed, isFollowed, sendResetPasswordEmail, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}