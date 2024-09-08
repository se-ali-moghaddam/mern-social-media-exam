import React, { useContext, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditComment from './EditComment';
import { CommentContext } from '../../../context/CommentContext';
import { AuthContext } from '../../../context/AuthContext';

const ShowComment = ({ comments }) => {
    const { deleteComment } = useContext(CommentContext);
    const {userId} = useContext(AuthContext);
    const [edit, setEdit] = useState({});

    const toggleEdit = (commentId) => {
        setEdit((prevEdit) => ({
            ...prevEdit,
            [commentId]: !prevEdit[commentId],
        }));
    };

    if (comments.length === 0) {
        return (
            <div className='box'>
                <div className="comment is-flex is-justify-content-space-between">
                    <div className="comment-description">There is no any commants yet !</div>
                </div>
            </div>
        )
    }

    return (
        <div className="comments-list mt-6 pb-6">
            {
                comments?.map(comment => {
                    console.log(comment);
                    return (
                        <div className='box' key={comment._id}>
                            <div className="comment is-flex is-justify-content-space-between">
                                <div className="user-info is-flex is-align-items-center">
                                    <figure className='mr-2'>
                                        <img src={comment.user.profilePhoto} alt="User profile photo" width="40" />
                                    </figure>
                                    <p>{comment.user.firstName}</p>
                                </div>
                                <div className="comment-description">{comment.description}</div>
                                {
                                    comment?.user?._id === userId ?
                                        <div>
                                            <span className='has-text-warning pr-3' onClick={() => toggleEdit(comment._id)}><AiFillEdit /></span>
                                            <span className='has-text-danger is-clickable' onClick={() => deleteComment(comment)}><AiFillDelete /></span>
                                        </div>
                                    : ''
                                }
                            </div>
                            {edit[comment._id] && (
                                <div className="edit-comment">
                                    <EditComment commentId={comment._id} toggleEdit={toggleEdit} />
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShowComment