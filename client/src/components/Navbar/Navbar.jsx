import "./style.scss";

import logo from "../../../public/logo.png";
import menuIcon from '../../../public/menu.png';

const NavBar = () => {
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src={logo} alt=""></img>
          <span>Estate-Chat</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        <a href="/">Sign In</a>
        <a href="/" className="register">Sign Up</a>
        <div className=" menuIcon">
            <img src = {menuIcon} alt = ""></img>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
