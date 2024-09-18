import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const CheckIsLogin = () => {
    const { userId } = useContext(AuthContext);
    const localUserId = localStorage.getItem('userId');

    return userId || localUserId ? <Outlet /> : <Navigate to='/login' replace={true} />
}

export default CheckIsLogin