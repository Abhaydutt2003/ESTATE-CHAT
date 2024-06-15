import React, { useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../../api/axios.js";
import { toast } from "react-toastify";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);

    if (!v1) {
      toast.error(
        "Username should start with a letter, be 3-23 letters, numbers, hyphens, or underscores."
      );
      setIsLoading(false);
      return;
    } else if (!v2) {
      toast.error(
        "Strong password required: 8-24 characters, mix uppercase & lowercase letters, numbers, and symbols."
      );
      setIsLoading(false);
      return;
    }
    try {
      const res = await customFetch.post("/api/auth/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      toast.success("User registered, please login !");
      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Error while registering the user");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isloading}>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
