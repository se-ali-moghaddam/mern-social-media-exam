import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { AuthContext } from '../../context/AuthContext'

const Users = () => {
    const { getUsers, users, blockUser, unblockUser } = useContext(AuthContext);

    useEffect(() => {
        getUsers();
    });

    return (
        <div className='container'>
            <Navbar />
            <div className="columns mt-6 pt-6">
                <div className="column">
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Followers</th>
                                <th>Contact</th>
                                <th>Review</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{++index}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user?.followers?.length}</td>
                                            <td>
                                                <Link to='/send-message' className="button is-link" state={user.email}>Send Message</Link>
                                            </td>
                                            <td>
                                                <Link to={`/profile/${user._id}`} className="button is-info" state={user}>Profile</Link>
                                            </td>
                                            <td>
                                                {
                                                    user.isBlocked ? 
                                                    <Link className="button is-success" onClick={() => unblockUser(user._id)}>Unblock</Link>
                                                    :
                                                    <Link className="button is-danger" onClick={() => blockUser(user._id)}>Block</Link>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users