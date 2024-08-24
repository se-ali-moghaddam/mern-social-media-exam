import React from 'react';
import Navbar from '../../../components/navbar/Navbar'
import RegisterForm from '../../../components/forms/RegisterForm';

const Register = () => {
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
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register