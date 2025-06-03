import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function JobDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
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
    try {
      const res = await axios.get(`${API_BASE}/jobs/public/${slug}`);
      setJob(res.data.data);
      // Check if closed by deadline or flag
      const deadline = res.data.data.applicationDeadline ? new Date(res.data.data.applicationDeadline) : null;
      const closed = res.data.data.isClosed || (deadline && deadline < new Date());
      setIsClosed(closed);
      setLoading(false);
    } catch {
      setLoading(false);
      setIsClosed(true);
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

      await axios.post(
        `${API_BASE}/jobs/public/${job.id}/apply`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
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
    return <div className="py-20 text-lg text-center text-gray-500">Loading job details...</div>;
  }
  if (!job) {
    return <div className="py-20 text-lg text-center text-gray-500">Job not found.</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative px-4 py-16 overflow-hidden text-white bg-gradient-to-br from-green-700 via-green-400 to-blue-400">
        <div className="container flex flex-col items-center justify-between gap-8 mx-auto md:flex-row">
          <div className="max-w-xl">
            <h1 className="mb-4 text-4xl font-extrabold md:text-5xl drop-shadow-lg">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 mb-4 text-lg">
              <span className="px-4 py-1 rounded-full bg-white/20">{job.department}</span>
              <span className="px-4 py-1 rounded-full bg-white/20">{job.location}</span>
              <span className="px-4 py-1 capitalize rounded-full bg-white/20">{job.jobType?.replace("-", " ")}</span>
            </div>
            <p className="mb-6 text-base drop-shadow">{job.description?.slice(0, 120)}...</p>
            <button
              className="inline-block px-6 py-3 font-semibold text-green-700 transition bg-white rounded-full shadow-lg hover:bg-green-100"
              onClick={() => {
                const el = document.getElementById("apply-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Apply Now
            </button>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
              alt={job.title}
              className="rounded-3xl shadow-2xl w-[400px] h-[320px] object-cover border-4 border-white"
            />
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" height="60" viewBox="0 0 1440 60" fill="none">
          <path fill="#fff" fillOpacity="1" d="M0,32L1440,60L1440,0L0,0Z"></path>
        </svg>
      </section>

      {/* Job Details */}
      <section className="container max-w-4xl px-4 py-10 mx-auto">
        <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-green-700">Job Description</h2>
          <div className="mb-4 text-gray-700 whitespace-pre-line">{job.description}</div>
          {/* Qualifications */}
          {job.requirements && (
            <>
              <h3 className="mt-6 mb-2 text-xl font-semibold text-green-700">Qualifications</h3>
              <div className="text-gray-700 whitespace-pre-line">{job.requirements}</div>
            </>
          )}
          {/* Responsibilities */}
          {job.responsibilities && (
            <>
              <h3 className="mt-6 mb-2 text-xl font-semibold text-green-700">Responsibilities</h3>
              <div className="text-gray-700 whitespace-pre-line">{job.responsibilities}</div>
            </>
          )}
          {job.benefits && job.benefits.length > 0 && (
            <>
              <h3 className="mt-6 mb-2 text-xl font-semibold text-green-700">Benefits</h3>
              <ul className="ml-6 text-gray-700 list-disc">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-6 text-sm text-gray-500">
            Application Deadline: {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : "N/A"}
          </div>
        </div>

        {/* Application Form */}
        <div id="apply-form" className="p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-green-700">Apply for this job</h2>
          {isClosed && (
            <div className="mb-4 font-semibold text-red-600">
              The application period for this job has been closed.
            </div>
          )}
          {applyStatus === "success" ? (
            <div className="mb-2 font-semibold text-green-600">
              Application submitted! Please check your email for confirmation.
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-3">
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="url"
                  name="portfolioUrl"
                  placeholder="Portfolio URL (optional)"
                  value={form.portfolioUrl}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              {/* Resume upload placed here, after personal details and before cover letter */}
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFormChange}
                className="w-full"
              />
              <textarea
                name="coverLetter"
                placeholder="Cover Letter (optional)"
                value={form.coverLetter}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded"
                rows={3}
              />
              <button
                type="submit"
                className="w-full py-2 font-semibold text-white transition bg-green-600 rounded hover:bg-green-700"
                disabled={applyStatus === "submitting" || isClosed}
              >
                {applyStatus === "submitting"
                  ? "Submitting..."
                  : isClosed
                  ? "Job Closed"
                  : "Submit Application"}
              </button>
              {/* Show backend error message */}
              {applyStatus === "error" && (
                <div className="text-sm text-red-600">Failed to submit. Please try again.</div>
              )}
              {applyStatus === "closed" && (
                <div className="text-sm text-red-600">The application period has been closed.</div>
              )}
              {/* Show any other backend error */}
              {applyStatus &&
                applyStatus !== "success" &&
                applyStatus !== "submitting" &&
                applyStatus !== "closed" &&
                applyStatus !== "error" && (
                  <div className="text-sm text-red-600">{applyStatus}</div>
                )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default JobDetail;
