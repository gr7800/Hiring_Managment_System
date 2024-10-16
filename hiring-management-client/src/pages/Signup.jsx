import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error, auth } = useSelector((state) => state.auth);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "Applicant",
    resume: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(50, "Name is too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["Applicant", "HR", "Manager"], "Invalid role")
      .required("Role is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role);
    formData.append("resume", values.resume);

    dispatch(registerUser(formData))
      .then((response) => {
        setSubmitting(false);
        console.log(response);
        if (response.payload?.message) {
          toast.success(response?.payload?.message);
          resetForm();
          navigate("/login");
        } else {
          toast.warning(response?.payload);
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Create Account
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFieldValue("resume", e.target.files[0])}
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-600 mt-1">
                Upload Resume (PDF, DOC, DOCX - Max: 5MB)
              </p>
              <ErrorMessage
                name="resume"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                as="select"
                name="role"
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Applicant">Applicant</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full p-4 bg-blue-500 text-white font-semibold rounded hover:buttonbg transition-colors duration-300 focus:outline-none"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>

            {successMessage && (
              <p className="text-green-600 text-sm mt-4">{successMessage}</p>
            )}
            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          </Form>
        )}
      </Formik>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?
        <Link to="/login" className="text-blue-500 hover:underline ml-1">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
