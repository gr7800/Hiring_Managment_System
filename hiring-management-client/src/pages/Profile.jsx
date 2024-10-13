import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IFrameModel from "../component/IFrameModel";
import defaultProfile from "../assets/DefaultProfile.jpg";

const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [resume, setResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const validationSchema = Yup.object({
    resume: Yup.mixed()
      .required("Resume is required")
      .test(
        "fileType",
        "Unsupported file format. Please upload a PDF.",
        (value) => value && ["application/pdf"].includes(value.type)
      ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role", values.role);
    if (resume) {
      formData.append("resume", resume);
    }

    dispatch(updateUserProfile(formData)).then(() => {
      setSubmitting(false);
      dispatch(fetchUserProfile());
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!user && loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto mt-10 p-8 shadow-lg rounded-lg max-w-2xl bg-white">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        User Profile
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-32 h-32">
          <img
            src={user?.profilePicture || defaultProfile}
            alt="Profile"
            className="w-full h-full rounded-full object-cover shadow-md border-2 border-gray-300"
          />
        </div>
        <Formik
          initialValues={{
            name: user?.name || "",
            email: user?.email || "",
            role: user?.role || "Applicant",
            resume: null,
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="w-full space-y-6">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  as="select"
                  name="role"
                  className="w-full p-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                >
                  <option value="Applicant">Applicant</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={(e) => {
                    setResume(e.target.files[0]);
                    setFieldValue("resume", e.target.files[0]);
                  }}
                  className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <p className="text-gray-500 mt-2">
                  {resume ? resume.name : "No file chosen"}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full p-4 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition duration-200"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </Form>
          )}
        </Formik>

        {user?.resumeUrl && (
          <div className="mt-6 text-center">
            <div className="flex gap-4 items-center justify-center">
              <h2 className="text-xl font-semibold">Current Resume:</h2>
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {user.resumeUrl.split("/").pop()}
              </a>
            </div>
            <button
              onClick={toggleModal}
              className="mt-4 p-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-200"
            >
              Show Resume
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <IFrameModel resumeUrl={user?.resumeUrl} toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default Profile;
