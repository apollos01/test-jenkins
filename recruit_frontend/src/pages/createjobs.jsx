
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Ensure the path is correct
import { useHistory } from 'react-router-dom';

const AdminCreateJob = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: ''
    });

    if (user.role !== 'admin') {
        history.push('/');
        return null;
    }

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
            const response = await axios.post('http://localhost:8000/jobs/', formData, {
                headers: {
                    'Authorization': `Bearer ${user.token}` // Assuming you're using token-based auth
                }
            });
            alert(response.data.message);
            setFormData({
                title: '',
                description: '',
                location: '',
                salary: ''
            });
        } catch (error) {
            console.error(error);
            alert('Failed to create job');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input
                        type="number"
                        className="form-control"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Job</button>
            </form>
        </div>
    );
};

export default AdminCreateJob;
