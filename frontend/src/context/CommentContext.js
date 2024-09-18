import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/BaseUrl";
import { showToast } from "../utils/ShowToast";
import { PostContext } from "./PostContext";

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
    const { axiosJWT, accessToken } = useContext(AuthContext);
    const { postDetails } = useContext(PostContext);

    const submitComment = async (data) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/comments/`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            postDetails(data.post);
        } catch (error) {
            console.log(error);

            showToast(error.response.data.message);
        }
    }

    const updateComment = async (data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/comments/${data.commentId}`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            postDetails(data.post);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (data) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/comments/${data._id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

            postDetails(data.post);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CommentContext.Provider value={{ submitComment, updateComment, deleteComment }}>
            {children}
        </CommentContext.Provider>
    );
}