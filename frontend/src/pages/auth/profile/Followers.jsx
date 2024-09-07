import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { Link, useLocation } from 'react-router-dom'

const Followers = () => {
    const {state} = useLocation();

    return (
        <div className='container'>
            <Navbar />
            <div className="columns">
                <div className="column">
                    {
                        state?.map(user => {
                            return (
                                <Link key={user._id} to={`/profile/${user._id}`} state={user} className="box is-flex is-align-items-center mt-5 p-3">
                                    <figure className='mr-2'>
                                        <img className='image is-64x64' src={user.profilePhoto} alt="" />
                                    </figure>
                                    <p>
                                        {user.firstName} {user.lastName}
                                    </p>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Followers