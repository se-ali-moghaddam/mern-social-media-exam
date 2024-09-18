import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { AiOutlineUpload } from "react-icons/ai";
import './navbar.css';
import icon from '../../assets/images/icon.jpg';

function Navbar() {
    const { userId, profilePhoto, userLogout, isAdmin } = useContext(AuthContext);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [isNavbarBurgerActive, setIsNavbarBurgerActive] = useState(false);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src={icon} alt="Logo" />
                </Link>
                {
                    userId ?
                        <div className='buttons'>
                            <Link className='button is-info is-flex is-align-items-center mt-3 ml-3' to="/submit-post">
                                <AiOutlineUpload className='mr-3' />
                                Submit Post
                            </Link>
                        </div>
                        : ''
                }

                <a role="button" className={`navbar-burger has-text-light ${isNavbarBurgerActive && 'is-active'}`} aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={() => setIsNavbarBurgerActive(!isNavbarBurgerActive)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${isNavbarBurgerActive && 'is-active'}`}>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                userId ?
                                    <>
                                        <Link className="navbar-item" to="/">
                                            Home
                                        </Link>
                                        {
                                            isAdmin ?
                                                <>
                                                    <Link className="navbar-item" to="/create-category">
                                                        Add category
                                                    </Link>
                                                    <Link className="navbar-item" to="/users">
                                                        Users
                                                    </Link>
                                                </>
                                                : ''
                                        }

                                        <div className={`dropdown ${isDropdownActive && 'is-active'}`}>
                                            {
                                                !isNavbarBurgerActive ? <>
                                                    <div className="dropdown-trigger">
                                                        <button
                                                            aria-haspopup="true"
                                                            aria-controls="dropdown-menu"
                                                            onClick={() => setIsDropdownActive(!isDropdownActive)}
                                                        >
                                                            <img
                                                                src={profilePhoto}
                                                                alt="User Profile Photo"
                                                                className="img-profile"
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                                        <div className="dropdown-content">
                                                            <Link to='/profile' className="dropdown-item"> Profile </Link>
                                                            <Link
                                                                to='/change-password'
                                                                className="dropdown-item"
                                                            > Change Password </Link>

                                                            <hr className="dropdown-divider" />
                                                            <span
                                                                to="/Logout"
                                                                className="dropdown-item button"
                                                                onClick={() => userLogout()}
                                                            >
                                                                Log out
                                                            </span>
                                                        </div>
                                                    </div>
                                                </> : <div className='dropdown-buttons'>
                                                    <Link to='/profile' className="navbar-item"> Profile </Link>
                                                    <Link
                                                        to='/change-password'
                                                        className="navbar-item"
                                                    > Change Password </Link>
                                                    <span
                                                        to="/Logout"
                                                        className="navbar-item button mt-4"
                                                        onClick={() => userLogout()}
                                                    >
                                                        Log out
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Link className="button is-primary" to="/register">
                                            Sign up
                                        </Link>
                                        <Link className="button is-light" to="/Login">
                                            Log in
                                        </Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar