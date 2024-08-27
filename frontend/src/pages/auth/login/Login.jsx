import React, { useContext } from 'react'
import '../auth.css';
import LoginForm from '../../../components/forms/LoginForm';
import Navbar from '../../../components/navbar/Navbar';

const Login = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className="columns register-container">
        <div className="column is-three-fifth content">
          <h1>Join Us Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque magnam asperiores aspernatur error, ut ducimus magni eum fuga dolores recusandae.</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, quibusdam quos officia recusandae at nihil veritatis magni exercitationem, deleniti ea expedita possimus magnam vero nemo.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login