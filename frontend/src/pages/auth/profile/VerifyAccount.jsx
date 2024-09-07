import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const VerifyAccount = () => {
    const { verifyAccount } = useContext(AuthContext);
    const { token } = useParams();

    useEffect(() => {
        verifyAccount(token);
    }, []);

    return (
        <div className='pt-6 mt-6 has-text-centered'>
            <h1 className='has-text-success is-size-1 pt-6 mt-6'>Account was successfully verfied !</h1>
            <Link to='/profile' className='button is-link'>Back to profile</Link>
        </div>
    )
}

export default VerifyAccount