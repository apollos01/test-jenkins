import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'

export const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        if(localStorage.getItem("token")!= undefined) {
            setUserId(jwtDecode(localStorage.getItem("token")))
        }
    },[])
    return (
        <header>
            <div className="header-area header-transparrent">
                <div className="headder-top header-sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-2">
                                <div className="logo">
                                    <Link to="/"><img src="assets/img/logo/logo.png" alt="Logo" /></Link>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <div className="menu-wrapper">
                                    <nav className="main-menu d-none d-lg-block">
                                        <ul id="navigation">
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/joblisting">Find a Job</Link></li>
                                            <li><Link to="/about">About</Link></li>
                                            {userId && userId.userName === 'admin' && (
                                                <li><Link to="/admin/create-job">Create Job</Link></li>
                                            )}
                                        </ul>
                                    </nav>
                                    <div className="header-btn d-none f-right d-lg-block">
                                        {userId ? (
                                            <div className="profile-info">
                                                <span className="user-name">Hello, {userId.sub}</span>
                                                <button onClick={logout} className="btn head-btn2">Logout</button>
                                            </div>
                                        ) : (
                                            <>
                                                <Link to="/register" className="btn head-btn1">Register</Link>
                                                <Link to="/login" className="btn head-btn2">Login</Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 d-block d-lg-none">
                                <div className="mobile_menu"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};


