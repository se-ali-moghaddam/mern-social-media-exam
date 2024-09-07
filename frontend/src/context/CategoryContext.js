import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
    const { axiosJWT, accessToken } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const createCategory = async (data) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/categories`, data, {
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

            getCategories();
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/categories`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateCategory = async (data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/categories/${data.id}`, data, {
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

            navigate('/create-category');
        } catch (error) {
            console.log(error);
        }
    }

    const removeCategory = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/categories/${id}`, {
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

            getCategories();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CategoryContext.Provider value={{ createCategory, getCategories, categories, updateCategory, removeCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}