import React, { useContext, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const {updateUser} = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      toast.error("Please provide all the fields!");
    }

    try {
      const res = await customFetch.post("/api/auth/login", {
        username,
        password,
      });
      console.log(res);
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
      //localStorage.setItem('user',JSON.stringify(res.data.userInfo));
      updateUser(res.data.userInfo);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Error while logging in !");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="login" onSubmit={handleSubmit}>
      <div className="formContainer">
        <form>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled = {isLoading}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
