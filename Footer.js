import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../components/assets/Styles/Footer.css'

const Footer = ({link1}) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h4>About MyCareer</h4>
          <p>
            At MyCareer, we are committed to helping you achieve your career goals with personalized practice and career resources. 
            Join us today and take the first step toward your dream job!
          </p>
        </div>
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to={link1}>Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-right">
          <h4>Follow Us</h4>
          <div className="footer-icons">
            <span>
              <a href="linkedin.com/in/rahul-ambesange" target="_blank" rel="Rahul Ambesange">
                <FaLinkedin />
              </a>
            </span>
            <span>
              <a href="https://github.com/RahulAmbesange" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            </span>
            <span>
              <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </span>
            <span>
              <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MyCareer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
