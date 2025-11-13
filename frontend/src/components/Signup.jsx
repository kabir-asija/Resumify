import React, { useContext, useState } from "react";
import { authStyles as styles } from "../assets/dummystyle";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context/userContext";
import {validateEmail} from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Input } from "./Inputs";

const Signup = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("Full name is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email address is invalid!");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>
          Join thousands of professionals today!
        </p>
      </div>

      {/* FORM  */}
      <form className={styles.signupForm} onSubmit={handleSignup}>
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="email@example.com"
          type="email"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min. 8 characters"
          type="password"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.signupSubmit}>
          Create Account
        </button>

        {/* FOOTER  */}
        <p className={styles.switchText}>
          Already have an account?{" "}
          <button
            type="button"
            className={styles.signupSwitchButton}
            onClick={() => setCurrentPage("login")}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
