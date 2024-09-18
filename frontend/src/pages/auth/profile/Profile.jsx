import React, { useContext, useEffect, useRef } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import moment from 'jalali-moment';
import { AiFillDislike, AiFillLike, AiOutlineEye } from "react-icons/ai";
import { PostContext } from '../../../context/PostContext';
import { AiFillEdit } from "react-icons/ai";
import DOMPurify from 'dompurify';

const Profile = () => {
    const { profile, userData, uploadProfilePhoto, sendVerificationEmail, userId, deleteAccount } = useContext(AuthContext);
    const { likePost, dislikePost } = useContext(PostContext);

    useEffect(() => {
        profile(userId);
    }, [userId]);

    const editImageRef = useRef(null);

    const handleClick = () => {
        editImageRef?.current?.click();
    }
    const handleChange = (e) => {
        uploadProfilePhoto(e.target.files[0]);
    }

    return (
        <div className='container'>
            <Navbar />
            <div className="card is-fullwidth">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-64x64">
                                <img
                                    src={userData?.profilePhoto}
                                    alt="User Image "
                                    onClick={handleClick}
                                />
                                <AiFillEdit className='has-text-info is-link' onClick={handleClick} />
                            </figure>
                            <input type="file" hidden ref={editImageRef} onChange={handleChange} />
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{userData?.firstName} {userData?.lastName}</p>
                            <div className="action-box mt-2">
                                <Link className='button is-warning mr-3' to='/profile/edit' state={userData}>Edit Profile</Link>
                                <button className='button is-danger' onClick={() => deleteAccount(userId)}>Delete Account</button>
                            </div>
                            {
                                !userData?.isAccountVerified ?
                                    <p className="subtitle is-6 has-text-danger mt-5">Account is not verified ! "Click <Link onClick={() => sendVerificationEmail()} >Here</Link> to verification"</p>
                                    : <p className="subtitle is-6 has-text-success mt-5">Account is verified</p>
                            }
                        </div>
                        <div className="informations">
                            <Link to='/profile/followers' state={userData?.followers} className="followers mr-3 has-text-white">
                                Followers : {userData?.followers.length}
                            </Link>
                            <Link to='/profile/following' state={userData?.following} className="followings mr-3 has-text-white">
                                Followings : {userData?.following.length}
                            </Link>
                            <span className="posts mr-3 has-text-white">
                                Posts : {userData?.posts.length}
                            </span>
                        </div>
                    </div>

                    {userData?.bio && (
                        <div className="content">
                            {userData?.bio}
                        </div>
                    )}
                </div>
            </div>

            <div className="columns">
                <div className="column is-two-third">
                    <div className="fixed-grid has-3-cols">
                        <div className="grid">
                            {
                                userData?.posts?.map(post => {
                                    return (
                                        <div className="cell card" key={post._id}>
                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img
                                                        src={post.image}
                                                        alt="post image"
                                                    />
                                                </figure>
                                                <nav class="level is-mobile is-flex is-align-items-center p-3">
                                                    <div class="level-left">
                                                        <a class="level-item" aria-label="views">
                                                            <span class="icon is-small mr-1">
                                                                <AiOutlineEye />
                                                            </span>
                                                            {post.views}
                                                        </a>
                                                    </div>
                                                    <div class="level-right">
                                                        <a class="level-item has-text-success" aria-label="like">
                                                            <span class="icon is-small mr-1" onClick={() => likePost(post._id)}>
                                                                <AiFillLike />
                                                            </span>
                                                            {post.likes.length}
                                                        </a>
                                                        <a class="level-item has-text-danger" aria-label="dislike">
                                                            <span class="icon is-small mr-1" onClick={() => dislikePost(post._id)}>
                                                                <AiFillDislike />
                                                            </span>
                                                            {post.dislikes.length}
                                                        </a>
                                                    </div>
                                                </nav>
                                            </div>
                                            <div className="card-content">
                                                <div className="media">
                                                    <div className="media-left">
                                                        <figure className="image is-48x48">
                                                            <img
                                                                src={userData?.profilePhoto}
                                                                alt="user image"
                                                            />
                                                        </figure>
                                                    </div>
                                                    <div className="media-content">
                                                        <p className="title is-4">{userData?.firstName} {userData?.lastName}</p>
                                                        <p className="subtitle is-6">{moment(post.createdAt).format('YYYY/MM/DD')}</p>
                                                    </div>
                                                </div>

                                                <div className="content">
                                                    <h4>{post.title}</h4>
                                                    <p dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(post?.description)
                                                        }}></p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="column is-one-third">
                    <p>Last viewers</p>
                    <div className="viewers-list">
                        {
                            userData?.viewdBy?.map(user => {
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
        </div>
    )
}

export default Profile