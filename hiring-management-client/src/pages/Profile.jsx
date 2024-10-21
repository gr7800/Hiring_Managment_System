import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IFrameModel from "../component/IFrameModel";
import defaultProfile from "../assets/DefaultProflePic.webp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../component/LoadingScreen";

const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [resume, setResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user])

  const validationSchema = Yup.object({
    experience: Yup.string().optional(),
    education: Yup.string().optional(),
    designation: Yup.string().optional(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role", values.role);
    formData.append("experience", values.experience);
    formData.append("education", values.education);
    formData.append("designation", values.designation);

    if (resume) {
      formData.append("resume", resume);
    }

    dispatch(updateUserProfile(formData)).then((res) => {
      setSubmitting(false);
      if (res?.payload?.message) {
        toast.success("Profile Updated Successfully!");
        dispatch(fetchUserProfile());
        navigate(-1);
      } else if (res?.payload) {
        toast.warning(res?.payload);
      }
    });
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  if (!user && loading) return <LoadingScreen />;

  return (
    <div className="w-full px-4 lg:px-10">
      <div className="container mx-auto mt-10 p-8 shadow-lg shadow-[#1f84b9] rounded-lg max-w-2xl bg-white">
        <h1 className="text-4xl font-bold text-center text-[#1f84b9] mb-8">
          Profile
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex flex-col items-center space-y-6">
          <img
            src={user?.profilePicture || defaultProfile}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-[#1f84b9] shadow-md border-[6px] border-[#1f84b9]"
          />
          <Formik
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              role: user?.role || "Applicant",
              resume: null,
              experience: user?.experience || "",
              education: user?.education || "",
              designation: user?.designation || "",
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="w-full space-y-6">
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

                <Field
                  type="text"
                  name="experience"
                  placeholder="Experience in years (e.g., 2.6)"
                  className="w-full p-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="experience"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <Field
                  type="text"
                  name="education"
                  placeholder="Highest Education (e.g., Master of Computer Application)"
                  className="w-full p-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="education"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <Field
                  type="text"
                  name="designation"
                  placeholder="Current Designation (e.g., Software Developer)"
                  className="w-full p-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-[#1f84b9]">
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
                  <p className="text-[#1f84b9] mt-2">
                    {resume ? resume.name : "No file chosen"}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full p-4 buttonbg text-white font-semibold rounded shadow hover:buttonbg transition duration-200"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </Form>
            )}
          </Formik>

          {user?.resumeUrl && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold text-[#1f84b9]">
                Current Resume:
              </h2>
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {user.resumeUrl.split("/").pop()}
              </a>
              <button
                onClick={toggleModal}
                className="mt-4 mx-5 p-2 buttonbg text-white rounded shadow  transition duration-200"
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
    </div>
  );
};

export default Profile;
