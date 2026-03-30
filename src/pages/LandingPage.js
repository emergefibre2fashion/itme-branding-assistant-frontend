import React from 'react';
// import { useNavigate } from 'react-router-dom';

function LandingPage({ onSignIn }) {
  // const navigate = useNavigate();

  const handleSignIn = () => {
    onSignIn();
    // After successful login, App.js will redirect to /chat
  };

  return (
    <div className="landing">
      <div className="landing-bg">
        <div className="landing-shape shape-1"></div>
        <div className="landing-shape shape-2"></div>
        <div className="landing-shape shape-3"></div>
      </div>

      <nav className="landing-nav">
        <div className="landing-logo">
          <img src="https://static.fibre2fashion.com/F2FLogo/F2FLogoWhite.svg" alt="Fibre2Fashion" className="f2f-logo" />
        </div>
        <div className="landing-nav-links">
          <button className="landing-btn-ghost" onClick={handleSignIn}>Sign In</button>
        </div>
      </nav>

      <div className="landing-hero">
        <div className="landing-badge">ITME INDIA 2026 &bull; 4-9 DECEMBER</div>
        <h1>
          Onsite Branding<br />
          <span className="gradient-text">Knowledge Assistant</span>
        </h1>
        <p className="landing-subtitle">
          Your AI-powered assistant for ITME India 2026 branding inventory.
          Get instant answers about availability, pricing, locations, and more.
        </p>
        <div className="landing-actions">
          <button className="landing-btn-primary" onClick={handleSignIn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Access Assistant
          </button>
          <a href="#features" className="landing-btn-outline">Learn More</a>
        </div>
      </div>

      <div className="landing-features" id="features">
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3>AI-Powered Q&A</h3>
          <p>Ask anything about inventory, pricing, or availability and get instant, accurate answers.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <h3>Live Data</h3>
          <p>Always up-to-date with the latest inventory tracker, pricing sheets, and branding documents.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3>Secure Access</h3>
          <p>Password-protected for the sales team with separate admin controls for data management.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h3>Quick FAQs</h3>
          <p>Browse frequently asked questions for instant answers without waiting.</p>
        </div>
      </div>

      <footer className="landing-footer">
        <p>Fibre2Fashion Pvt. Ltd. &mdash; Exclusive Onsite Branding Partner, ITME India 2026</p>
      </footer>
    </div>
  );
}

export default LandingPage;
