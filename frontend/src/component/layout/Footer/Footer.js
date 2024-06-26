import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>
      <div className="midFooter">
        <h1>E-Commerece</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; sangram_4213</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/sangram_4213/">Instagram</a>
        <a href="https://www.linkedin.com/in/sangram-wable-986705220/">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
