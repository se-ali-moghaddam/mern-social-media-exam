import React, { useContext, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import moment from 'jalali-moment';
import { AiFillDislike, AiFillLike, AiOutlineEye } from "react-icons/ai";
import { PostContext } from '../../../context/PostContext';

const UserProfile = () => {
    const { state } = useLocation();
    const { userProfile, userData, userId, follow, unfollow } = useContext(AuthContext);
    const { likePost, dislikePost } = useContext(PostContext);

    useEffect(() => {
        userProfile(state._id);
    }, []);

    console.log(state);
    return (
        <div className='container'>
            <Navbar />
            <div className="card is-fullwidth">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-64x64">
                                <img
                                    src={userData.profilePhoto}
                                    alt="User Image"
                                />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{userData.firstName} {userData.lastName}</p>
                            {
                                !userData.isAccountVerified ?
                                    <p className="subtitle is-6 has-text-danger mt-5">Account is not verified !</p>
                                    : <p className="subtitle is-6 has-text-success mt-5">Account is verified</p>
                            }
                            {
                                userId !== userData._id ? (
                                    <div className="follow-box mt-2">
                                        {
                                            !userData.isFollowing ? (
                                                <button className='button is-success mr-2' onClick={() => follow(userData._id)}>Follow</button>
                                            ) : (
                                                <button className='button is-danger' onClick={() => unfollow(userData._id)}>Unfollow</button>
                                            )
                                        }
                                    </div>
                                ) : ''
                            }
                        </div>
                        <div className="informations">
                            <span className="followers mr-3">
                                Followers : {userData.followers.length}
                            </span>
                            <span className="followings mr-3">
                                Followings : {userData.following.length}
                            </span>
                            <span className="posts mr-3">
                                Posts : {userData.posts.length}
                            </span>
                        </div>
                    </div>

                    {userData.bio && (
                        <div className="content">
                            {userData.bio}
                        </div>
                    )}
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <div className="fixed-grid has-4-cols">
                        <div className="grid">
                            {
                                userData?.posts?.map(post => {
                                    return (
                                        <div className="cell card">
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
                                                                src={userData.profilePhoto}
                                                                alt="user image"
                                                            />
                                                        </figure>
                                                    </div>
                                                    <div className="media-content">
                                                        <p className="title is-4">{userData.firstName} {userData.lastName}</p>
                                                        <p className="subtitle is-6">{moment(post.createdAt).format('YYYY/MM/DD')}</p>
                                                    </div>
                                                </div>

                                                <div className="content">
                                                    <h4>{post.title}</h4>
                                                    {post.description}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile