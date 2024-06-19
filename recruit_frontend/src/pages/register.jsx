

import Link from "react-router-dom"
export const Register = () => {
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
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6 input-box position-relative">
                                    <input type="text" className="form-control" placeholder="Firstname"/>
                                    <i className="bx bx-user position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                                </div>
                                <div className="form-group col-md-6 input-box position-relative">
                                    <input type="text" className="form-control" placeholder="Lastname"/>
                                    <i className="bx bx-user position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                                </div>
                            </div>
                            <div className="form-group input-box position-relative">
                                <input type="text" className="form-control" placeholder="Email"/>
                                <i className="bx bx-envelope position-absolute" style={{right: '10px', top: '50%', transform: 'translateY(-50%)'}}></i>
                            </div>
                            <div className="form-group input-box position-relative">
                                <input type="password" className="form-control" placeholder="Password"/>
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