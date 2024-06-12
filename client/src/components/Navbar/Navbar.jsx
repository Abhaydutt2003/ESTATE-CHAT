import "./style.scss";

import logo from "../../../public/logo.png";
import menuIcon from "../../../public/menu.png";
import { Link } from "react-router-dom";

import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src={logo} alt=""></img>
          <span>Estate-Chat</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>

      <div className="right">
        <Link to="/">Sign In</Link>
        <Link to="/" className="register">
          Sign Up
        </Link>
        <div className=" menuIcon">
          <img
            src={menuIcon}
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
