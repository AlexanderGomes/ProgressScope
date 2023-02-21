import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav__main">
      <p className="navLogo__p">
        Progress<span className="navLogo__span">Scope</span>
      </p>
      <div className="nav__links">
        <a className="nav__signUp" href="">Sign up</a>
      </div>
    </div>
  );
};

export default Navbar;
