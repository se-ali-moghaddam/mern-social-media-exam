import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PostContext } from '../../context/PostContext';
import Navbar from '../../components/navbar/Navbar';
import { BsChevronRight } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import moment from 'jalali-moment';
import AddComment from '../../components/posts/post-details/AddComment';
import ShowComment from '../../components/posts/post-details/ShowComment';
import { useState } from 'react';

const PostDetails = () => {
    const { postDetails, singlePost, deletePost } = useContext(PostContext);
    const [addComment, setAddComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        postDetails(id);
    }, []);

    return (
        <div className='container'>
            <Navbar />
            <div className='bread-crump mt-2 pr-6 pt-6 is-flex is-align-items-center'>
                Home <BsChevronRight className='mr-3 ml-3' /> Posts <BsChevronRight className='mr-3 ml-3' /> {singlePost.category}
            </div>

            <div className="single-post">
                <div className="is-flex is-justify-content-space-between is-align-items-center mt-6">
                    <h1 className="single-post-title is-size-2 has-text-white">{singlePost.title}</h1>
                    <strong className="has-text-white">{moment(singlePost.createdAt).format('YYYY/MM/DD')}</strong>
                </div>
            </div>

            <div className="columns mt-6">
                <div className="column is-three-fifths">
                    <div className='is-flex is-justify-content-space-between mb-6'>
                        <strong>
                            <div className="post-user-details">
                                <div className="author is-flex is-align-items-center">
                                    <figure className="image is-64x64 mr-3">
                                        <img src={singlePost?.user?.profilePhoto} alt="Author Profile" />
                                    </figure>
                                    <div>
                                        <h3 className='mb-0'>{singlePost?.user?.firstName} {singlePost?.user?.lastName}</h3>
                                    </div>
                                </div>
                            </div>
                        </strong>
                        <div className="edit-post mt-3 mb-3">
                            <Link className='is-size-3 has-text-warning pr-3' to={`/edit-post/${singlePost._id}`} state={singlePost}><AiFillEdit /></Link>
                            <span className='is-size-3 has-text-danger is-clickable' onClick={() => deletePost(singlePost._id)}><AiFillDelete /></span>
                        </div>
                    </div>
                    <div className="description">
                        <p className="is-size-5">{singlePost.description}</p>
                    </div>
                </div>
                <div className="column">
                    <img src={singlePost.image} alt="Post Image" />
                </div>
            </div>

            <div className="button-comment mb-6">
                <button className='button is-success mr-2' onClick={() => setAddComment(!addComment)}>Add Comment</button>
                <button className='button is-info' onClick={() => setShowComments(!showComments)}>Show comment</button>
            </div>

            {showComments ? <ShowComment comments={singlePost.comments} /> : ''}
            {addComment ? <AddComment /> : ''}
        </div>
    )
}

export default PostDetails