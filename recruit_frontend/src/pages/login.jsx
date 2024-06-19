
import { Link } from "react-router-dom"
export const Login = () =>{
        return (
           
            
            
            
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="top mb-4">
                                        <span>Don't have an account? <Link to="/register" style={{ color: 'black' }}>Sign Up</Link></span>
                                        <h2 className="card-title mt-3">Login</h2>
                                    </div>
                                    <form>
                                        <div className="form-group input-box position-relative">
                                            <input type="text" className="form-control" placeholder="Username or Email"/>
                                            <i className="bx bx-user position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                                        </div>
                                        <div className="form-group input-box position-relative">
                                            <input type="password" className="form-control" placeholder="Password"/>
                                            <i className="bx bx-lock-alt position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" className="btn btn-primary btn-block" value="Sign In"/>
                                        </div>
                                        <div className="form-group two-col d-flex justify-content-between">
                                            <div className="one">
                                                <input type="checkbox" id="login-check"/>
                                                <label htmlFor="login-check" className="ml-2"> Remember Me</label>
                                            </div>
                                            <div className="two">
                                                <label><a href="#" className="text-primary">Forgot password?</a></label>
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