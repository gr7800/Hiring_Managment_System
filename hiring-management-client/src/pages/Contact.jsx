import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Contact = () => {
    const initialValues = {
        name: "",
        email: "",
        message: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        message: Yup.string()
            .min(10, "Message must be at least 10 characters")
            .required("Message is required"),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log("Form Data:", values);
        resetForm();
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                                Message
                            </label>
                            <Field
                                id="message"
                                name="message"
                                as="textarea"
                                rows="4"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            <ErrorMessage
                                name="message"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Contact;
