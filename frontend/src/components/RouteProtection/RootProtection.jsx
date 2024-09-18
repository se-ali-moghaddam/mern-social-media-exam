import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const RootProtection = () => {
    const { userId } = useContext(AuthContext);
    return userId ? <Outlet /> : <Navigate to='/register' />;
}

export default RootProtection