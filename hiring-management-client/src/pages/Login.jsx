import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
  }, [auth]);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then((action) => {
      if (loginUser.fulfilled.match(action)) {
        navigate("/profile");
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="container mx-auto mt-10 p-6 shadow-lg rounded-lg max-w-lg bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
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

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-blue-500 hover:underline ml-1">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
