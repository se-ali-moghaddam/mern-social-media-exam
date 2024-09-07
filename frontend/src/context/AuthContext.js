import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/BaseUrl";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [registerError, setRegisterError] = useState(undefined);
    const [loginError, setLoginError] = useState(undefined);
    const [accessToken, setAccessToken] = useState(undefined);
    const [userId, setUserId] = useState(undefined);
    const [tokenExpires, setTokenExpires] = useState(undefined);
    const [profilePhoto, setProfilePhoto] = useState(undefined);
    const [userData, setUserData] = useState(undefined);
    const [userEmail, setUserEmail] = useState(undefined);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/token`);
            const decodedToken = jwtDecode(response.data.accessToken);

            setAccessToken(response.data.accessToken);
            setUserId(decodedToken.userId);
            setUserEmail(decodedToken.userEmail);
            setTokenExpires(decodedToken.exp);
            setProfilePhoto(decodedToken.profilePhoto);

            // navigate('/');
        } catch (error) {
            console.log(error);
            navigate('/login', { replace: true });
        }
    }

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        if ((tokenExpires * 1000) < new Date().getTime()) {
            const response = await axios.get(`${baseUrl}/api/token`);
            const decodedToken = jwtDecode(response.data.accessToken);

            config.headers.Authorization = `Bearer ${response.data.accessToken}`;

            setAccessToken(response.data.accessToken);
            setUserId(decodedToken.userId);
            setTokenExpires(decodedToken.exp);
            setProfilePhoto(decodedToken.profilePhoto);
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    const register = async (data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/users/register`, data);

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });
        } catch (err) {
            console.log(err.response.data.message);
            setRegisterError(err.response.data.message);
        }
    }

    const login = async (data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/users/login`, data);

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });

            setUserId(res.data.userId);
            setProfilePhoto(res.data.profilePhoto);
            navigate('/');
        } catch (err) {
            console.log(err.response.data.message);
            setLoginError(err.response.data.message);
        }
    }

    const profile = async () => {
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

    const userProfile = async (id) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/users/profile/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setUserData(res.data);
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

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });

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

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });

            navigate('/profile');
        } catch (err) {
            console.log(err);
        }
    }

    const follow = async (id) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/follow/`, {followingId : id}, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });

            userProfile(id);
        } catch (error) {
            console.log(error);
        }
    }

    const unfollow = async (id) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/users/unfollow/`, {unfollowingId : id}, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });

            userProfile(id);
        } catch (error) {
            console.log(error);
        }
    }

    const sendEmail = async (data) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/users/email`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });
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

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });
        } catch (error) {
            console.log(error);
        }
    }

    const verifyAccount = async (token) => {
        try {
            const data = {
                token : token
            }
            const res = await axiosJWT.put(`${baseUrl}/api/users/verify-account`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });
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

            // console.log(res.data);
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ register, registerError, login, loginError, userId, profilePhoto, axiosJWT, accessToken, profile, userData, userEmail, userProfile, uploadProfilePhoto, updateUser, follow, unfollow, sendEmail, verifyAccount, sendVerificationEmail, getUsers, users }}>
            {children}
        </AuthContext.Provider>
    );
}