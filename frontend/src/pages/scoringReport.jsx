import React, { useState } from 'react';
// Ganti import QRCode
import { QRCodeSVG } from 'qrcode.react';
import '../styles/scoringReport.css';

function ScoringReport() {
  const [formId, setFormId] = useState(generateRandomId());

  function generateRandomId() {
    return Math.random().toString(36).substring(2, 10);
  }

  function regenerateQR() {
    setFormId(generateRandomId());
    // Optional: Show feedback to user
    alert('QR Code has been regenerated!');
  }

  // Generate dynamic URL - you can change this to your actual domain
  const formUrl = `${window.location.origin}/form-cv/${formId}`;

  return (
    <div className="scoring-report-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">CHATBOT 2</div>
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href={`/form-cv/${formId}`} className="btn-score">Score my CV</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-subtitle">Get Your CV Scored by AI, Instantly</div>
          <h1 className="hero-title">
            Scan. Fill. Get Scored.<br />
            Let AI analyze your CV and unlock your career opportunities.
          </h1>
          <p className="hero-description">
            Scan the QR Code to fill out your CV form. Our AI will analyze your CV and generate a detailed report including ATS score, job recommendations, and personalized feedback.
          </p>

          {/* Features */}
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">Instant Analysis</div>
              <div className="feature-text">Get your CV scored in seconds with AI-powered analysis</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <div className="feature-title">ATS Optimized</div>
              <div className="feature-text">See how your CV performs against ATS systems</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <div className="feature-title">Job Matches</div>
              <div className="feature-text">Receive personalized job recommendations</div>
            </div>
          </div>
        </div>

        {/* Right QR Section */}
        <div className="qr-section">
          <div className="qr-header">
            <h2 className="qr-title">Scan the QR Code below to start</h2>
            <p className="qr-subtitle">building and scoring your CV</p>
          </div>

          <div className="qr-code-container">
            <div className="qr-code">
              {/* Dynamic QR Code using QRCodeSVG */}
              <QRCodeSVG
                value={formUrl}
                size={240}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Display the URL for reference */}
          <div className="qr-url-display">
            <p className="qr-url-label">Form URL:</p>
            <code className="qr-url-text">{formUrl}</code>
            <p className="qr-session-id">Session ID: <strong>{formId}</strong></p>
          </div>

          <div className="qr-actions">
            <button className="btn-regenerate" onClick={regenerateQR}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118-6M22 12.5a10 10 0 01-18 6"/>
              </svg>
              Regenerate this QR Code
            </button>

            <div className="desktop-link">
              <p className="desktop-link-text">Using a desktop? Click below</p>
              <a href={`/form-cv/${formId}`} className="btn-desktop">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
                Open CV Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScoringReport;