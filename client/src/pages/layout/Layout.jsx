import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import './style.scss';

const Layout = () => {
  return (
    <main className="layout">
      <div className="navbar">
        <Navbar></Navbar>
      </div>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default Layout;
