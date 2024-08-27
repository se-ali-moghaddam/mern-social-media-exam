import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [registerError, setRegisterError] = useState([]);
    const [loginError, setLoginError] = useState([]);
    const [accessToken, setAccessToken] = useState([]);
    const [userId, setUserId] = useState([]);
    const [tokenExpires, setTokenExpires] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/token');
            const decodedToken = jwtDecode(response.data.accessToken);

            setAccessToken(response.data.accessToken);
            setUserId(decodedToken.userId);
            setTokenExpires(decodedToken.exp);

            navigate('/');
        } catch (error) {
            console.log(error);
            navigate('/login', {replace: true});
        }
    }

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        if ((tokenExpires * 1000) < new Date().getTime()) {
            const response = await axios.get('http://localhost:5000/api/token');
            const decodedToken = jwtDecode(response.data.accessToken);

            config.headers.Authorization = `Bearer ${response.data.accessToken}`;

            setAccessToken(response.data.accessToken);
            setUserId(decodedToken.userId);
            setTokenExpires(decodedToken.exp);
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    const register = (data) => {
        const res = axios.post('http://localhost:5000/api/users/register', data);
        res.then(resout => {
            toast(resout.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark"
            });
        }).catch(err => {
            console.log(err.response.data.message);
            setRegisterError(err.response.data.message);
        });
    }

    const login = (data) => {
        const res = axios.post('http://localhost:5000/api/users/login', data);
        res.then(resout => {
            if (resout.status === 200) {
                toast('You loged in successfully :)', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "dark"
                });
            }
        }).catch(err => {
            console.log(err.response.data.message);
            setLoginError(err.response.data.message)
        });
    }

    return (
        <AuthContext.Provider value={{ register, registerError, login, loginError }}>
            {children}
        </AuthContext.Provider>
    );
}