
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { Axios } from "axios";
export const Login = () =>{

    const navigate = useNavigate();

        const [formData, setFormData] = useState({
          usernameOrEmail: '',
          password: '',
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await Axios.post('http://localhost:8000/login/', formData);
            // Handle the response as needed, e.g., saving token, redirecting, etc.
            alert(response.data.message);
            navigate('/')
          } catch (error) {
            console.error(error);
            alert('Login failed');
          }
        };
        return (
            <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="top mb-4">
                                <span>Don't have an account? 
                                <div className="dropdown d-inline">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="registerDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: 'white', color: 'black', border: 'none', transition: 'none', '&:hover': { backgroundColor: 'white', color: 'black' } }}>
        Sign Up
    </button>
    <div className="dropdown-menu" aria-labelledby="registerDropdown" style={{ animation: 'none' }}>
        <Link className="dropdown-item text-black" to="/register">Register as Applicant</Link>
        <Link className="dropdown-item text-black" to="/registerAdmin">Register as Admin</Link>
    </div>
</div>
                                </span>
                                <h2 className="card-title mt-3">Login</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group input-box position-relative">
                                    <input type="text" className="form-control" placeholder="Username or Email" name="usernameOrEmail" value={formData.usernameOrEmail} onChange={handleChange} />
                                    <i className="bx bx-user position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                                </div>
                                <div className="form-group input-box position-relative">
                                    <input type="password" className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                                    <i className="bx bx-lock-alt position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn btn-primary btn-block" value="Sign In" />
                                </div>
                                <div className="form-group two-col d-flex justify-content-between">
                                    <div className="one">
                                        <input type="checkbox" id="login-check" />
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