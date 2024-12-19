import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.js';
import '../components/assets/Styles/Home.css';
import Footer from '../components/Footer.js';

function Home() {
  const navigate = useNavigate();

  // Check for authToken when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    navigate('/login', { replace: true }); // Redirect to login page
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <NavBar
        title="MyCareer"
        link2="/examquestions"
        linkText2="Core Java Practice Questions"
        onLogout={handleLogout} // Pass handleLogout to NavBar
        linkText3="Logout" // Pass Logout button text as linkText3
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MyCareer</h1>
          <p>This exam features MCQ-based questions to test your expertise in Core Java.</p>
          <a href="/examquestions" className="hero-button">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Career Guidance</h3>
            <p>Get expert advice and mentorship to guide your career path.</p>
          </div>
          <div className="feature-card">
            <h3>Exam Preparation</h3>
            <p>Access top-notch study materials tailored for success.</p>
          </div>
          <div className="feature-card">
            <h3>Job Opportunities</h3>
            <p>Explore the best job opportunities in your desired field.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"This platform helped me ace my exams and secure a great job!"</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"The career guidance here is truly life-changing. Highly recommend!"</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer link1='/home' />
    </div>
  );
}

export default Home;
