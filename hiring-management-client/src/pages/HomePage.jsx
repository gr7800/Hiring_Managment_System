import React from 'react';
import { Link } from "react-router-dom"; ``
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Hiring Management System</h1>
          <p className="text-lg mb-8">
            Your one-stop solution for managing job applications, streamlining recruitment processes, and finding the right candidates for your team.
          </p>
          <Link to="/jobs" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200">
            Explore Jobs
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Our System?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">For Applicants</h3>
              <p className="text-gray-600">Easily browse and apply for jobs, track your application status, and stay informed throughout the recruitment process.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">For HR Managers</h3>
              <p className="text-gray-600">Post job listings, review applications, and communicate with candidates all in one place, with powerful tracking and management tools.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Data-Driven Insights</h3>
              <p className="text-gray-600">Get detailed reports and analytics to make informed decisions, improving your recruitment efficiency and team success.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Whether you're an applicant looking for the perfect job or an HR professional searching for the ideal candidate, our system is here to help.</p>
          <Link to="/job" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">
            Apply Now
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <p className="italic text-gray-600">"This platform made applying for jobs so easy! I found my current position through it."</p>
              <h4 className="text-blue-600 font-semibold mt-4">— Jane Doe, Software Developer</h4>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <p className="italic text-gray-600">"As an HR manager, the tools here have saved me so much time in filtering and managing applications."</p>
              <h4 className="text-blue-600 font-semibold mt-4">— John Smith, HR Manager</h4>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <p className="italic text-gray-600">"The reports and insights really helped us understand our recruitment process better."</p>
              <h4 className="text-blue-600 font-semibold mt-4">— Sarah Lee, Head of Recruitment</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
