import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        companyName: '',
        companyCode: '',
        role: "applicant"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            const response = axios.post('http://127.0.0.1:8000/users', formData)
            .then(() => alert(response.data.message))
            .catch(error =>{
                console.error(error);
            } );
    
    };

    return (
        <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
            <div className="card">
                <div className="card-body">
                    <div className="top mb-4">
                        <span>Have an account? <Link to="/login" style={{ color: 'black' }}>Login</Link></span>
                    </div>
                    <h2 className="card-title mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-box position-relative">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Username" 
                                name="userName"
                                value={formData.userName} 
                                onChange={handleChange}
                            />
                            <i className="bx bx-user position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                        <div className="form-group input-box position-relative">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Email" 
                                name="email"
                                value={formData.email} 
                                onChange={handleChange}
                            />
                            <i className="bx bx-envelope position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                        <div className="form-group input-box position-relative">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password" 
                                name="password"
                                value={formData.password} 
                                onChange={handleChange}
                            />
                            <i className="bx bx-lock-alt position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary btn-block" value="Register" />
                        </div>
                        <div className="form-group two-col d-flex justify-content-between">
                            <div className="one">
                                <input type="checkbox" id="register-check" />
                                <label htmlFor="register-check" className="ml-2"> Remember Me</label>
                            </div>
                            <div className="two">
                                <label><a href="#" className="text-primary">Terms & conditions</a></label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}
