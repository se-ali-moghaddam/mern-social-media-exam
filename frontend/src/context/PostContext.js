import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const { userId, axiosJWT, accessToken } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState([]);
    const navigate = useNavigate();

    const CreatePost = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('image', data.image);
            formData.append('user', userId);

            const res = await axiosJWT.post(`${baseUrl}/api/posts/`, formData, {
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

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getPosts = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/posts`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setPosts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const postDetails = async (id) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/posts/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setSinglePost(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updatePost = async (data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/posts/${data.id}`, data, {
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

            navigate(`/details-post/${data.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/posts/${id}`, {
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

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const likePost = async (id) => {
        try {
            await axiosJWT.put(`${baseUrl}/api/posts/like/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            getPosts();
        } catch (error) {
            console.log(error);
        }
    }

    const dislikePost = async (id) => {
        try {
            await axiosJWT.put(`${baseUrl}/api/posts/dislike/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            getPosts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PostContext.Provider value={{ CreatePost, getPosts, posts, postDetails, singlePost, updatePost, deletePost, likePost, dislikePost }}>
            {children}
        </PostContext.Provider>
    );
}