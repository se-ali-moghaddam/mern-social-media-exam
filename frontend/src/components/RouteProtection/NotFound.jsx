import React from 'react'
import Navbar from '../navbar/Navbar'
import image from '../../assets/images/404.svg';

const NotFound = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className="columns">
        <div className="column is-flex is-justify-content-center mt-6">
          <img src={image} alt="404" width='550' />
        </div>
      </div>
    </div>
  )
}

export default NotFound