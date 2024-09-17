import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const CheckNotLogin = () => {
    const { userId } = useContext(AuthContext);
    return !userId ? <Outlet /> : <Navigate to='/' replace={true} />
}

export default CheckNotLogin