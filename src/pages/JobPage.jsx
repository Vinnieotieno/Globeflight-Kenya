import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const API_BASE = (() => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000/api';
    } else {
      return 'https://globeflight.co.ke/api';
    }
  }
  return 'http://localhost:5000/api'; // fallback
})();

console.log('JobPage API_BASE:', API_BASE);

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching jobs from:', `${API_BASE}/jobs/public`);
      const res = await axios.get(`${API_BASE}/jobs/public`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      console.log('Jobs response:', res.data);
      
      if (res.data.success && res.data.data && res.data.data.jobs) {
        const now = new Date();
        const openJobs = res.data.data.jobs.filter(
          (job) =>
            !job.isClosed &&
            (!job.applicationDeadline || new Date(job.applicationDeadline) >= now)
        );
        setJobs(openJobs);
      } else {
        setJobs([]);
        setError('No jobs data received');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again later.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers at Globeflight Kenya | Join Our Team</title>
        <meta name="description" content="Explore exciting career opportunities at Globeflight Kenya. Join our team and grow your career in logistics and express delivery." />
        <meta property="og:title" content="Careers at Globeflight Kenya | Join Our Team" />
        <meta property="og:description" content="Explore exciting career opportunities at Globeflight Kenya. Join our team and grow your career in logistics and express delivery." />
        <link rel="canonical" href="https://globeflight.co.ke/careers" />
      </Helmet>
      <div className="min-h-screen mt-12 bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-500 to-blue-500"></div>
          <div className="absolute inset-0 bg-black opacity-10"></div>
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full rounded-full -top-1/2 -right-1/2 bg-white/5 blur-3xl animate-pulse"></div>
            <div className="absolute w-full h-full rounded-full -bottom-1/2 -left-1/2 bg-blue-400/10 blur-3xl animate-pulse animation-delay-2000"></div>
          </div>

          <div className="container relative px-4 py-20 mx-auto md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6 text-white">
                <div className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm animate-fade-in">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  We're Hiring!
                </div>
                
                <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  Join Our Team at{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                    Globeflight
                  </span>
                </h1>
                
                <p className="max-w-2xl text-xl leading-relaxed md:text-2xl text-white/90">
                  Discover exciting career opportunities and grow with a global leader
                  in logistics and express delivery.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#open-positions"
                    className="inline-flex items-center px-8 py-4 font-semibold text-green-700 transition-all duration-200 transform bg-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Open Positions
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                  <div className="flex items-center space-x-6 text-white/80">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium">{loading ? '...' : jobs.length} Open Positions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 transform bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-3xl rotate-6"></div>
                <img
                  src="/job.avif"
                  alt="Professional career opportunities"
                  className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                />
                <div className="absolute max-w-xs p-6 bg-white shadow-xl top-8 right-8 rounded-2xl animate-float">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Career Growth</p>
                      <p className="text-sm text-gray-500">Build your future with us</p>
                    </div>
                  </div>
                </div>
                <div className="absolute max-w-xs p-6 bg-white shadow-xl bottom-8 left-8 rounded-2xl animate-float animation-delay-1000">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Learn & Develop</p>
                      <p className="text-sm text-gray-500">Continuous learning culture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-24" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 C180,80 420,80 600,40 C780,0 1020,0 1200,40 C1380,80 1440,60 1440,60 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
              <path d="M0,50 C180,90 420,90 600,50 C780,10 1020,10 1200,50 C1380,90 1440,70 1440,70 L1440,100 L0,100 Z" fill="white" fillOpacity="0.2"/>
              <path d="M0,60 C180,100 420,100 600,60 C780,20 1020,20 1200,60 C1380,100 1440,80 1440,80 L1440,100 L0,100 Z" fill="#F9FAFB"/>
            </svg>
          </div>
        </section>

        {/* Job Listings */}
        <section id="open-positions" className="container px-4 py-16 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Open Positions
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Find your perfect role and start your journey with Globeflight
            </p>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-green-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-green-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="mt-6 text-lg text-gray-600">Loading opportunities...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center bg-white shadow-sm rounded-2xl">
              <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl text-gray-600">{error}</p>
              <button 
                onClick={fetchJobs}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-20 text-center bg-white shadow-sm rounded-2xl">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xl text-gray-600">No open positions at the moment.</p>
              <p className="mt-2 text-gray-500">Please check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, index) => (
                <Link
                  to={`/jobs/${job.slug}`}
                  key={job.id}
                  className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 transition-transform duration-300 transform scale-x-0 bg-gradient-to-r from-green-500 to-blue-500 group-hover:scale-x-100"></div>
                  
                  <div className="flex flex-col h-full p-8">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-green-600">
                          {job.title}
                        </h3>
                        <svg className="w-5 h-5 text-gray-400 transition-colors transform group-hover:text-green-600 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 rounded-full bg-green-50">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {job.department}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 rounded-full bg-blue-50">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 capitalize bg-gray-100 rounded-full">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.jobType?.replace("-", " ")}
                        </span>
                      </div>
                      
                      {/* Qualifications preview */}
                      {job.requirements && (
                        <div className="mb-3 text-gray-600">
                          <p className="mb-1 text-sm font-semibold text-gray-700">Key Requirements:</p>
                          <p className="text-sm leading-relaxed">
                            {job.requirements.slice(0, 80)}
                            {job.requirements.length > 80 ? "..." : ""}
                          </p>
                        </div>
                      )}
                      
                      {/* Responsibilities preview */}
                      {job.responsibilities && (
                        <div className="mb-3 text-gray-600">
                          <p className="mb-1 text-sm font-semibold text-gray-700">Main Responsibilities:</p>
                          <p className="text-sm leading-relaxed">
                            {job.responsibilities.slice(0, 80)}
                            {job.responsibilities.length > 80 ? "..." : ""}
                          </p>
                        </div>
                      )}
                      
                      <p className="leading-relaxed text-gray-600">
                        {job.description?.slice(0, 120)}
                        {job.description?.length > 120 ? "..." : ""}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {job.applicationDeadline
                            ? `Deadline: ${new Date(job.applicationDeadline).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}`
                            : "Open until filled"}
                        </span>
                      </div>
                      <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors bg-green-600 rounded-full group-hover:bg-green-700">
                        Apply Now
                        <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16 mt-16 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto text-center">
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Don't see the right position?
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-white/90">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="inline-flex items-center px-8 py-4 font-semibold text-green-700 transition-all duration-200 transform bg-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Submit Your Resume
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default JobPage;