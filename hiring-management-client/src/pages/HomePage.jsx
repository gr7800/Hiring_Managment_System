import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="buttonbg text-white py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Welcome to the Hiring Management System
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Streamline your recruitment process and discover the best talent or
            opportunities with ease.
          </p>
          <Link
            to="/jobs"
            className="bg-white text-[#1f84b9] font-semibold py-3 px-8 rounded-lg shadow-lg shadow-[#1f84b9] shadow-[#1f84b9] hover:bg-gray-200 transition-colors duration-300"
          >
            Explore Jobs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 text-[#1f84b9]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Why Choose Our System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-lg shadow-lg shadow-[#1f84b9] hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">For Applicants</h3>
              <p className="text-gray-600">
                Browse and apply for jobs, track applications, and stay informed
                throughout the hiring process.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg shadow-[#1f84b9] hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">For HR Managers</h3>
              <p className="text-gray-600">
                Post job listings, review applications, and manage candidates
                efficiently in one place.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg shadow-[#1f84b9] hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600">
                Use detailed reports and analytics to make informed hiring
                decisions and improve recruitment processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-100 py-16 text-[#1f84b9]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Whether you're an applicant or an HR professional, our platform is
            here to help you achieve success.
          </p>
          <Link
            to="/jobs"
            className="buttonbg text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white text-[#1f84b9]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg shadow-[#1f84b9]">
              <p className="italic text-gray-600 mb-4">
                "This platform made applying for jobs so easy! I found my
                current position through it."
              </p>
              <h4 className="text-[#1f84b9] font-semibold">
                — Jane Doe, Software Developer
              </h4>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg shadow-[#1f84b9]">
              <p className="italic text-gray-600 mb-4">
                "As an HR manager, the tools here have saved me so much time in
                filtering and managing applications."
              </p>
              <h4 className="text-[#1f84b9] font-semibold">
                — John Smith, HR Manager
              </h4>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg shadow-[#1f84b9]">
              <p className="italic text-gray-600 mb-4">
                "The reports and insights really helped us understand our
                recruitment process better."
              </p>
              <h4 className="text-[#1f84b9] font-semibold">
                — Sarah Lee, Head of Recruitment
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
