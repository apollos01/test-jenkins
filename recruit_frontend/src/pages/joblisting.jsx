
import React, { useEffect, useState } from 'react';
import {Footer} from "../components/footer"
import { Link } from "react-router-dom" 
import { api } from "../api"
import { NavBar } from '../components/navbar';

export const JobListing = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('http://localhost:8000/get_offers/');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <NavBar />
            <main>
                <div className="slider-area ">
                    <div className="single-slider section-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>Get your job</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="job-listing-area pt-120 pb-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-9 col-md-8">
                                <section className="featured-job-area">
                                    <div className="container">
                                        {jobs.map((job) => (
                                            <div className="single-job-items mb-30" key={job.id}>
                                                <div className="job-items">
                                                    <div className="company-img">
                                                        <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                                                    </div>
                                                    <div className="job-tittle job-tittle2">
                                                        <a href="#">
                                                            <h4>{job.title}</h4>
                                                        </a>
                                                        <ul>
                                                            <li>{job.company}</li>
                                                            <li><i className="fas fa-map-marker-alt"></i>{job.location}</li>
                                                            <li>{job.salary}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="items-link items-link2 f-right">
                                                    <Link to="/">{job.type}</Link>
                                                    <span>{job.posted}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};