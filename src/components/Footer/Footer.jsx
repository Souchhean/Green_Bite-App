import React from "react";
import "./Footer.css";
import { ImGithub } from "react-icons/im";
import { SiFacebook } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { FaFigma } from "react-icons/fa6";

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="footer">
      <small> &copy; {copyrightYear} TheWalk</small>
      <div className="social-links">
        <Link to="https://twitter.com/LThomorn" target="_blank">
          <BsTwitter />
        </Link>
        <Link
          to="https://github.com/Mxrn-Cyber?tab=repositories"
          target="_blank"
        >
          <ImGithub />
        </Link>
        <Link to="https://www.facebook.com/morn.scripter/" target="_blank">
          <SiFacebook />
        </Link>
        <Link
          to="https://www.tiktok.com/@taki5038?_t=ZS-8xPsXDwyKkp&_r=1"
          target="_blank"
        >
          <FaTiktok />
        </Link>
  
       
      </div>
    </div>
  );
};