import React from 'react';
import '../components/assets/Styles/StartPoint.css';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function StartPoint() {
  return (
    <div className="startpoint-wrapper">
      {/* Hero Section */}
      <header className="hero-wrapper">
        <NavBar
          title="MyCareer"
       
          link1="/login"
          link2="/register"
          
          linkText1="Login"
          linkText2="Register"
              titleName='/'
        />
        <div className="hero-content-wrapper">
          <h1 className="hero-heading">
            Welcome to <span className="highlight-text">MyCareer</span>
          </h1>
          <p className="hero-subheading">
            Master your skills, unlock opportunities, and reach your dream career with confidence!
          </p>
          <div className="hero-action-buttons">
            <a href="/" className="btn btn-primary">Explore</a>
            <a href="/login" className="btn btn-secondary">Login</a>
            <a href="/register" className="btn btn-highlight">Get Started</a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="https://source.unsplash.com/featured/?career,success"
            alt="Hero"
            className="hero-image"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-wrapper">
        <section className="cta-wrapper">
          <div className="cta-content">
            <h2>Ready to unlock your potential?</h2>
            <p>Start mastering your skills today with MyCareer.</p>
            <a href="/register" className="btn btn-cta">Get Started</a>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-wrapper">
          <h2 className="section-heading">Why MyCareer?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <h3>Extensive Question Bank</h3>
              <p>Access a vast library of practice questions covering various domains.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h3>Personalized Practice</h3>
              <p>Focus your efforts on specific skills with tailored sessions.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Progress Analytics</h3>
              <p>Track your growth with detailed performance reports.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Achieve Your Career Goals</h3>
              <p>Prepare effectively and reach your career aspirations.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default StartPoint;
