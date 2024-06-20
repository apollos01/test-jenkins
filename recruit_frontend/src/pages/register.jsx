
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const Register = () => {
        const [formData, setFormData] = useState({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:8000/register/', formData);
                alert(response.data.message);
            } catch (error) {
                console.error(error);
                alert('Registration failed');
            }
        };
    return(
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
                <div className="card">
                    <div className="card-body">
                        <div className="top mb-4">
                            <span>Have an account? <Link to="/login"  style={{ color: 'black' }}>Login</Link></span>
                        </div>
                        <h2 className="card-title mb-4">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6 input-box position-relative">
                                    <input type="text" className="form-control" placeholder="Firstname" value={formData.firstname} onChange={handleChange}/>
                                    <i className="bx bx-user position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                                </div>
                                <div className="form-group col-md-6 input-box position-relative">
                                    <input type="text" className="form-control" placeholder="Lastname" value={formData.lastname} onChange={handleChange}/>
                                    <i className="bx bx-user position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                                </div>
                            </div>
                            <div className="form-group input-box position-relative">
                                <input type="text" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange}/>
                                <i className="bx bx-envelope position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                            </div>
                            <div className="form-group input-box position-relative">
                                <input type="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange}/>
                                <i className="bx bx-lock-alt position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary btn-block" value="Register"/>
                            </div>
                            <div className="form-group two-col d-flex justify-content-between">
                                <div className="one">
                                    <input type="checkbox" id="register-check"/>
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
    )
}