"use client";
import "./Footer.css";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../Button/Button";
import { IoMail } from "react-icons/io5";
import Copy from "../Copy/Copy";

gsap.registerPlugin(useGSAP);

const Footer = () => {
  const [torontoTime, setTorontoTime] = useState("");

  useEffect(() => {
    const updateTorontoTime = () => {
      const options = {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      const torontoTimeString = formatter.format(new Date());
      setTorontoTime(torontoTimeString);
    };

    updateTorontoTime();
    const timeInterval = setInterval(updateTorontoTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="footer-header-content">
          <div className="footer-header">
            <Copy animateOnScroll={true} delay={0.2}>
              <h1>ven! juntos conozcamos a nuestro salvador.</h1>
            </Copy>
          </div>
          <div className="footer-link">
            <Button
              animateOnScroll={true}
              delay={0.5}
              variant="light"
              icon={IoMail}
              href="/contact"
            >
              Say Hello
            </Button>
          </div>
        </div>
        <div className="footer-byline">
          <div className="footer-time">
            <p>
              Anaheim, CA <span>{torontoTime}</span>
            </p>
          </div>

          <div className="footer-author">
            <p>Developed by Neuronix</p>
          </div>

          <div className="footer-copyright">
            <p>&copy; Anaheim Spanish Seventh-day Adventist Church</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
