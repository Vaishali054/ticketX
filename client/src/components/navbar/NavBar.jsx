import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleClickServices = () => {
    const element = document.getElementById("services");
    element.scrollIntoView({ behavior: "smooth" });
  };
  const handleClickStories = () => {
    const element = document.getElementById("stories");
    element.scrollIntoView({ behavior: "smooth" });
  };
  const handleClickHome = () => {
    navigate("/");
  };
  const handleClickTicketHistory=()=>{
    navigate("/ticket-history");
  };

  return (
    <>
      <div className="Navbar">
        <div className="navigation web">
          <div>
            <div className="links web" onClick={handleClickHome}>
              Home
            </div>
            <div className="bar web"></div>
          </div>
          <div className="links web" onClick={handleClickServices}>
            Services
          </div>
          {auth ?
          <div className="links web"  onClick={handleClickTicketHistory}>Ticket History</div>
        :
          <div className="links web" onClick={handleClickStories}>
            Stories
          </div>}
        </div>
        <img className="logo " src={logo} alt="company-logo"></img>
        {auth ? (
          <>
            <div className="navigation">
              <div className="username">UserName</div>
              <div className="profile"></div>
            </div>
          </>
        ) : (
          <>
            <div className="navigation">
              <Login styleName="links" />
              <SignUp styleName="button" />
            </div>
          </>
        )}
            <div
              className="mobile-menu-icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <div className="links" onClick={handleClickHome}>
            Home
          </div>
          <div className="links" onClick={handleClickServices}>
            Services
          </div>
          {auth ?
          <div className="links "  onClick={handleClickTicketHistory}>Ticket History</div>
        :
          <div className="links" onClick={handleClickStories}>
            Stories
          <Login styleName="links" />
          <SignUp styleName="links" />
          </div>}
        </div>
      )}
    </>
  );
}

export default NavBar;
