import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { PostContext } from '../../../context/PostContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { getTopUsers, topUsers } = useContext(AuthContext);
  const { getTopPosts, topPosts } = useContext(PostContext);

  useEffect(() => {
    getTopUsers();
    getTopPosts();
  }, []);

  return (
    <aside className='menu'>
      <div className='menu-list'>
        <ul className="top-users-list p-5 has-background-dark">
          <label className='label'>Top Users</label>
          {
            topUsers?.map(user => {
              return (
                <li className='user p-2' key={user._id}>
                  <div className="is-flex is-justify-content-space-between">
                    <div className='is-flex is-align-items-center'>
                      <figure className='mr-2'>
                        <img src={user.profilePhoto} alt="user profile photo" width='50' />
                      </figure>
                      <p>{user.firstName} {user.lastName}</p>
                    </div>
                    <div>
                      <Link to={`/profile/${user._id}`} state={user} className="button">Profile</Link>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>

        <ul className="top-posts-list mt-6 p-5 has-background-dark">
          <label className='label'>Top Posts</label>
          {
            topPosts?.map(post => {
              return (
                <li className='post p-2' key={post._id}>
                  <div className="is-flex is-justify-content-space-between">
                    <div className='is-flex is-align-items-center'>
                      <figure className='mr-2'>
                        <img src={post.image} alt="post profile photo" width='50' />
                      </figure>
                      <p>{post.title}</p>
                    </div>
                    <div>
                      <Link to={`/details-post/${post._id}`} className="button">View</Link>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar