import "./style.scss";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import {AuthContext} from '../../context/AuthContext';

const NavBar = () => {
  const {updateUser,currentUser} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const user = currentUser;
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt=""></img>
          <span>Estate-Chat</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>

      <div className="right">
        {user ? (
          <div className="user">
            <img
              src={currentUser.avatar || '/noavatar.jpg'}
              alt=""
            ></img>
            <span>{currentUser.username}</span>
            <Link to = "/profile" className="profileButton">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className=" menuIcon">
          <img
            src='/menu.png'
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          ></img>
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/">Sign In</Link>
          <Link to="/">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
