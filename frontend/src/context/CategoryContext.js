import { createContext, useCallback, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/ShowToast";

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

            showToast(res.data);

            getCategories();
        } catch (error) {
            console.log(error);
        }
    }


    const getCategories = useCallback(async () => {
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
    }, [axiosJWT, accessToken]);


    const updateCategory = async (data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/categories/${data.id}`, data, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            showToast(res.data);

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

            showToast(res.data);

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