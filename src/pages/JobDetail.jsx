import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = (() => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000/admin/api';
    } else {
      return 'https://globeflight.co.ke/admin/api';
    }
  }
  return 'http://localhost:5000/admin/api'; // fallback
})();

console.log('JobDetail API_BASE:', API_BASE);

function JobDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyStatus, setApplyStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
    portfolioUrl: ""
  });

  // Track if job is closed (deadline or isClosed)
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, [slug]);

  const fetchJob = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching job from:', `${API_BASE}/jobs/public/${slug}`);
      const res = await axios.get(`${API_BASE}/jobs/public/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      console.log('Job response:', res.data);
      
      if (res.data.success && res.data.data) {
        setJob(res.data.data);
        // Check if closed by deadline or flag
        const deadline = res.data.data.applicationDeadline ? new Date(res.data.data.applicationDeadline) : null;
        const closed = res.data.data.isClosed || (deadline && deadline < new Date());
        setIsClosed(closed);
      } else {
        setError('Job not found');
        setIsClosed(true);
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      if (err.response?.status === 404) {
        setError('Job not found');
      } else {
        setError('Failed to load job details. Please try again later.');
      }
      setIsClosed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (isClosed) {
      setApplyStatus("closed");
      return;
    }
    if (!job) return;
    setApplyStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("coverLetter", form.coverLetter);
      formData.append("portfolioUrl", form.portfolioUrl);
      if (form.resume) formData.append("resume", form.resume);

      console.log('Submitting application to:', `${API_BASE}/jobs/public/${job.id}/apply`);
      
      await axios.post(
        `${API_BASE}/jobs/public/${job.id}/apply`,
        formData,
        { 
          headers: { 
            "Content-Type": "multipart/form-data" 
          } 
        }
      );
      setApplyStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
        portfolioUrl: ""
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      // Show backend error message if available
      const backendMsg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors && err.response.data.errors[0]?.msg);
      if (
        backendMsg &&
        (backendMsg.toLowerCase().includes("deadline") ||
          backendMsg.toLowerCase().includes("closed"))
      ) {
        setApplyStatus("closed");
        setIsClosed(true);
      } else if (backendMsg) {
        setApplyStatus(backendMsg);
      } else {
        setApplyStatus("error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-b-2 border-green-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }
  
  if (!job || error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">{error || 'Job not found.'}</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-500 to-blue-500"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container relative px-4 py-20 mx-auto md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                We're Hiring!
              </div>
              
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {job.department}
                </span>
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium capitalize rounded-full bg-white/20 backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.jobType?.replace("-", " ")}
                </span>
              </div>
              
              <p className="text-lg leading-relaxed text-white/90">
                {job.description?.slice(0, 150)}...
              </p>
              
              <button
                className="inline-flex items-center px-8 py-4 font-semibold text-green-700 transition-all duration-200 transform bg-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
                onClick={() => {
                  const el = document.getElementById("apply-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apply Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 mt-12ransform bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-3xl rotate-6"></div>
              <img
                src="/job2.avif"
                alt="Professional applying for job"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute max-w-xs p-6 bg-white shadow-xl -bottom-6 -left-6 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Join Our Team</p>
                    <p className="text-sm text-gray-500">Be part of something great</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C150,90 350,10 600,50 C850,90 1050,10 1300,50 C1400,70 1440,60 1440,60 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
            <path d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1300,60 C1400,80 1440,70 1440,70 L1440,100 L0,100 Z" fill="white" fillOpacity="0.2"/>
            <path d="M0,70 C150,110 350,30 600,70 C850,110 1050,30 1300,70 C1400,90 1440,80 1440,80 L1440,100 L0,100 Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Job Details */}
      <section className="container max-w-6xl px-4 py-16 mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            <div className="p-8 bg-white shadow-xl rounded-2xl md:p-10">
              <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-900">
                <span className="w-1 h-8 mr-4 bg-green-500 rounded-full"></span>
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="leading-relaxed text-gray-600 whitespace-pre-line">{job.description}</p>
              </div>
              
              {/* Qualifications */}
              {job.requirements && (
                <div className="mt-10">
                  <h3 className="flex items-center mb-4 text-2xl font-semibold text-gray-900">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Qualifications
                  </h3>
                  <div className="leading-relaxed text-gray-600 whitespace-pre-line">{job.requirements}</div>
                </div>
              )}
              
              {/* Responsibilities */}
              {job.responsibilities && (
                <div className="mt-10">
                  <h3 className="flex items-center mb-4 text-2xl font-semibold text-gray-900">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Responsibilities
                  </h3>
                  <div className="leading-relaxed text-gray-600 whitespace-pre-line">{job.responsibilities}</div>
                </div>
              )}
            </div>
            
            {/* Application Form */}
            <div id="apply-form" className="p-8 bg-white shadow-xl rounded-2xl md:p-10">
              <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-900">
                <span className="w-1 h-8 mr-4 bg-green-500 rounded-full"></span>
                Apply for this Position
              </h2>
              
              {isClosed && (
                <div className="flex items-center p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
                  <svg className="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-red-700">The application period for this job has been closed.</span>
                </div>
              )}
              
              {applyStatus === "success" ? (
                <div className="py-12 text-center">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Application Submitted!</h3>
                  <p className="text-gray-600">Please check your email for confirmation.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={form.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Portfolio URL (Optional)</label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        placeholder="https://yourportfolio.com"
                        value={form.portfolioUrl}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Resume</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Cover Letter (Optional)</label>
                    <textarea
                      name="coverLetter"
                      placeholder="Tell us why you're interested in this position..."
                      value={form.coverLetter}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 transition border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={applyStatus === "submitting" || isClosed}
                  >
                    {applyStatus === "submitting" ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : isClosed ? (
                      "Job Closed"
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  
                  {/* Error Messages */}
                  {applyStatus === "error" && (
                    <div className="p-4 mt-4 border border-red-200 rounded-lg bg-red-50">
                      <p className="text-sm text-red-600">Failed to submit. Please try again.</p>
                    </div>
                  )}
                  {applyStatus === "closed" && (
                    <div className="p-4 mt-4 border border-red-200 rounded-lg bg-red-50">
                      <p className="text-sm text-red-600">The application period has been closed.</p>
                    </div>
                  )}
                  {applyStatus &&
                    applyStatus !== "success" &&
                    applyStatus !== "submitting" &&
                    applyStatus !== "closed" &&
                    applyStatus !== "error" && (
                      <div className="p-4 mt-4 border border-red-200 rounded-lg bg-red-50">
                        <p className="text-sm text-red-600">{applyStatus}</p>
                      </div>
                    )}
                </form>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Overview */}
            <div className="sticky p-6 bg-white shadow-xl rounded-2xl top-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Job Overview</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Application Deadline</p>
                    <p className="font-medium text-gray-900">
                      {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : "Open until filled"}
                    </p>
                  </div>
                </div>
                
                {job.benefits && job.benefits.length > 0 && (
                  <div>
                    <h4 className="flex items-center mb-3 text-lg font-semibold text-gray-900">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JobDetail;