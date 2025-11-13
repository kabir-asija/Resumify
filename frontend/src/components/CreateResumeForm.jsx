import React, { useState } from "react";
import { Input } from "./Inputs";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const CreateResumeForm = ({onSuccess}) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter a resume title");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.RESUMES.CREATE, {
        title,
      });
      if (response.data?._id) {
        if (onSuccess) onSuccess(); 
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      console.log("CREATE error" ,error)
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Create New Resume
      </h3>
      <p className="text-gray-500 mb-5">
        Give your resume a title to get started. You can customize everything
        later.
      </p>
      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Resume Title"
          type="text"
          placeholder="eg: John Doe - Software Engineer"
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-rose-200 transition-all"
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
