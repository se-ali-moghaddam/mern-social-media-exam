import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const CheckIsAdmin = () => {
    const { isAdmin } = useContext(AuthContext);
    return isAdmin ? <Outlet /> : <Navigate to='/' replace={true} />
}

export default CheckIsAdmin