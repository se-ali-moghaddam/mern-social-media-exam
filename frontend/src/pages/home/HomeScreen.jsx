import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import PostList from '../../components/home-page/postlist/PostList'
import Sidebar from '../../components/home-page/sidebar/Sidebar'

const HomeScreen = () => {
  return (
    <div className="container">
      <Navbar/>

      <div className="columns mt-5">
        <div className="column is-two-thirds">
          <PostList/>
        </div>
        <div className="column">
          <Sidebar/>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen