import React, { useContext, useEffect } from 'react'
import moment from 'jalali-moment';
import { PostContext } from '../../../context/PostContext';
import { AiFillDislike, AiFillLike, AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom';

const PostList = () => {
  const { posts, getPosts, likePost, dislikePost } = useContext(PostContext);
  
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='container'>
      {
        posts?.map(post => {
          return (
            <div className="box has-background-dark">
              <article className='media'>
                <div className="media-left">
                  <Link to={`/profile/${post.user._id}`} state={post.user} className="image is-64x64">
                    <img src={post.user.profilePhoto} alt="User Profile" />
                  </Link>
                </div>
                <div className="media-content">
                  <div className="content">
                    <Link to={`/details-post/${post._id}`} className='has-text-white'>
                      <strong>{post.user.firstName} {post.user.lastName}</strong> <small>{moment(post.createdAt).format('YYYY/MM/DD')}</small><br /><br />
                      {post.title}
                    </Link>
                  </div>
                </div>
                <nav class="level is-mobile is-flex is-align-items-center">
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
              </article>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostList;