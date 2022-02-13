import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

// material components
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";

export default function Navbar({ page }) {
  return (
    <div className="navbar">
      {/* logo */}
      <Link to='/' className="logo">
        {/* <img src={Logo} alt="Central Bank of Tron" />  */}
        <span className="logoText">IMMUNX</span>
      </Link>

      {/* nav socials */}
      <div className="navSocial">
        <ul>
          <li>
            {page === "home" ? <Link to="/dashboard">
              <b>Dashboard</b>
            </Link> : <Link to="/">
                <b>Logout</b>
              </Link>}
          </li>

          <li className="navSocialIcon">
            <Link to="">
              <FacebookIcon />
            </Link>
          </li>
          <li className="navSocialIcon">
            <Link to="">
              <TelegramIcon />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
