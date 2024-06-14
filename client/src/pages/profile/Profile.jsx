import "./style.scss";
import React, { useContext, useEffect } from "react";
import { List, Chat } from "../../components";
import { customFetch } from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const res = await customFetch.post("/api/auth/logout");
      //console.log(res);
      toast.success("Logged out successfully");
      updateUser(null);
      navigate("/");
    } catch (error) {
      toast.error("Error while logging out, please check your connection!");
    }
  };
  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/login");
  //     toast.info("Please login.");
  //   }
  // }, [currentUser, navigate]);

  return (
    <div className="profilePage">
      <div className="details ">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.jpg"} alt=""></img>
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create new Post</button>
          </div>
          <List></List>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List></List>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
};

export default Profile;
