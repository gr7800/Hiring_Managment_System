import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const { loading, error, auth } = useSelector((state) => state.auth);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        role: 'Applicant',
        resume: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        role: Yup.string().required("Role is required"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("role", values.role);
        formData.append("resume", values.resume);

        dispatch(registerUser(formData)).then((response) => {
            setSubmitting(false);
            if (response.payload?.success) {
                setSuccessMessage("Registration successful! You can now log in.");
                resetForm();
            } else {
                setSuccessMessage("");
            }
        });
    };

    useEffect(() => {
        if (auth) {
            navigate("/login")
        }
    }, [auth])

    return (
        <div className="container mx-auto mt-10 p-6 shadow-lg rounded-lg max-w-lg bg-white">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <input
                                type="file"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFieldValue("resume", e.target.files[0])}
                                className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none"
                            />
                            <p className="text-gray-500 text-sm mt-1">Upload Resume (PDF, DOC, DOCX)</p>
                            <ErrorMessage name="resume" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <Field
                                as="select"
                                name="role"
                                className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="Applicant">Applicant</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="w-full p-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition duration-200"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>

                        {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    </Form>
                )}
            </Formik>
            <div className="mt-4 text-center">
                <p className="text-gray-600">
                    Allready have an account?
                    <Link to="/login" className="text-blue-500 hover:underline ml-1">
                        Sign In here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
