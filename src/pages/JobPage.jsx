import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/jobs/public`);
      const now = new Date();
      const openJobs = (res.data.data.jobs || []).filter(
        (job) =>
          !job.isClosed &&
          (!job.applicationDeadline || new Date(job.applicationDeadline) >= now)
      );
      setJobs(openJobs);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-400 to-blue-400 py-16 px-4 text-white overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Join Our Team at{" "}
              <span className="text-yellow-200">Globeflight</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 font-medium drop-shadow">
              Discover exciting career opportunities and grow with a global leader
              in logistics and express delivery.
            </p>
            <Link
              to="#open-positions"
              className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-100 transition"
            >
              View Open Positions
            </Link>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1515168833906-d2a3b82b1a48?auto=format&fit=crop&w=600&q=80"
              alt="Careers at Globeflight"
              className="rounded-3xl shadow-2xl w-[400px] h-[320px] object-cover border-4 border-white"
            />
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          height="60"
          viewBox="0 0 1440 60"
          fill="none"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,32L1440,60L1440,0L0,0Z"
          ></path>
        </svg>
      </section>

      {/* Job Listings */}
      <section id="open-positions" className="container mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
          Open Positions
        </h2>
        {loading ? (
          <div className="text-center py-10 text-lg text-gray-500">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10 text-lg text-gray-500">
            No open positions at the moment.
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Link
                to={`/jobs/${job.slug}`}
                key={job.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-100 flex flex-col h-full"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-green-700 group-hover:text-green-900 transition">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87M16 3.13a4 4 0 0 1 0 7.75M8 3.13a4 4 0 0 0 0 7.75" />
                      </svg>
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.657 16.657L13.414 12.414a4 4 0 1 0-1.414 1.414l4.243 4.243a1 1 0 0 0 1.414-1.414z" />
                      </svg>
                      {job.location}
                    </span>
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    Type:{" "}
                    <span className="capitalize">
                      {job.jobType?.replace("-", " ")}
                    </span>
                  </div>
                  {/* Qualifications preview */}
                  {job.requirements && (
                    <div className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Qualifications:</span>{" "}
                      {job.requirements.slice(0, 60)}
                      {job.requirements.length > 60 ? "..." : ""}
                    </div>
                  )}
                  {/* Responsibilities preview */}
                  {job.responsibilities && (
                    <div className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Responsibilities:</span>{" "}
                      {job.responsibilities.slice(0, 60)}
                      {job.responsibilities.length > 60 ? "..." : ""}
                    </div>
                  )}
                  <div className="mb-3 text-gray-700">
                    {job.description?.slice(0, 90)}
                    {job.description?.length > 90 ? "..." : ""}
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    Deadline:{" "}
                    {job.applicationDeadline
                      ? new Date(job.applicationDeadline).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Apply Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default JobPage;
