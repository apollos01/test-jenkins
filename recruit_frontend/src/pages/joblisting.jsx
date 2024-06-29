
import React, { useEffect, useState } from 'react';
import {Footer} from "../components/footer"
import { Link } from "react-router-dom" 
import axios from 'axios';
import { NavBar } from '../components/navbar';
import { jwtDecode } from 'jwt-decode'

export const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [userId, setUserId] = useState(null);
    const [responseApplyOffer, setresponseApplyOffer] = useState({})

    useEffect(() => {
        const fetchJobs =  () => {
            console.log("userid")
            if(localStorage.getItem("token")!= undefined) {
                console.log("userid",userId)
                setUserId(jwtDecode(localStorage.getItem("token"))?.userId)
                axios.get('http://127.0.0.1:8000/get_offers', { params: { applicant: userId} })
                .then(response => setJobs(response.data))
                .catch((e) =>console.error('Error fetching offers:', e) );
            }   
        }

        fetchJobs();
    }, [userId,responseApplyOffer]);

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
                                        
                                        {userId ? <h2>Get your job</h2> : <h2>you have to login to access this information</h2>}
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
                                                            <h4>{job.offreName}</h4>
                                                        </a>
                                                        <ul>
                                                            <li>{job?.company}</li>
                                                            <li><i className="fa fa-info-circle"></i>{job.Description}</li>
                                                        
                                                        </ul>
                                                    </div>
                                                </div>
                                                { job.applicantStatus ? 
                                                    <div >
                                                    <span className="badge badge-primary">{job.applicantStatus}</span>
                                                    <span>{job?.posted}</span>
                                                </div> :
                                                <div className="items-link items-link2 f-right">
                                                <Link onClick={() => {
                                                     const body = {
                                                        idApplicant: userId,
                                                        idOffre: job.id,
                                                        status: ""
                                                     }
                                                     axios.post('http://127.0.0.1:8000/applicantHelp',body )
                                                     .then(response => setresponseApplyOffer(response.data));
                                                }}>apply Offer</Link>
                                                <span>{job?.posted}</span>
                                            </div>
                                                }
                                                
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