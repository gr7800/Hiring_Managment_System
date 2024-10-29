import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const service_id = import.meta.env.VITE_SERVICE_ID;
const template_id = import.meta.env.VITE_TEMPLATE_ID;
const Baspublic_id = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const { user } = useSelector((state) => state.auth);
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
      .min(2, "Name is too short")
      .max(50, "Name is too long")
      .required("Name is required"),
    email: Yup.string()
      .matches(/^[a-z0-9.]+@[a-z]+\.[a-z]{2,}$/, "Invalid email format")
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
    };

    emailjs
      .send(
        "service_2kj43cp",
        "template_btbca8k",
        templateParams,
        "TqmpDK0EsikZ2ct1H"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        resetForm();
        toast.success("Message sent successfully!");
      })
      .catch((err) => {
        console.log("Failed to send email:", err);
        toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl mt-12 shadow-[#1f84b9]">
      <h2 className="text-3xl font-bold text-[#1f84b9] mb-8 text-center">
        Get in Touch
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="relative">
              <label
                className="block text-sm font-semibold text-[#1f84b9]"
                htmlFor="name"
              >
                Full Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="mt-2 block w-full p-3 shadow-[#1f84b9] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="absolute text-red-500 text-sm mt-1"
              />
            </div>

            <div className="relative">
              <label
                className="block text-sm font-semibold text-[#1f84b9]"
                htmlFor="email"
              >
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="mt-2 block w-full p-3 border shadow-[#1f84b9] border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="absolute text-red-500 text-sm mt-1"
              />
            </div>

            <div className="relative">
              <label
                className="block text-sm font-semibold text-[#1f84b9]"
                htmlFor="message"
              >
                Your Message
              </label>
              <Field
                id="message"
                name="message"
                as="textarea"
                rows="4"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm shadow-[#1f84b9] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="absolute text-red-500 text-sm mt-1"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md shadow-[#1f84b9] bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ${
                  isSubmitting ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
