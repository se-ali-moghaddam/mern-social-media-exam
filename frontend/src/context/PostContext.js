import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/BaseUrl";
import { showToast } from "../utils/ShowToast";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const { userId, axiosJWT, accessToken } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState([]);
    const [topPosts, setTopPosts] = useState([])
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

            showToast(res.data);

            navigate('/');
        } catch (error) {
            console.log(error);

            showToast(error.response.data.message);
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

    const getTopPosts = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/top-posts`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setTopPosts(res.data);
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

            showToast(res.data);

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

            showToast(res.data);

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
        <PostContext.Provider value={{ CreatePost, getPosts, posts, getTopPosts, topPosts, postDetails, singlePost, updatePost, deletePost, likePost, dislikePost }}>
            {children}
        </PostContext.Provider>
    );
}