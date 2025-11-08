import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/cvResults.css';

function CVResults() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock AI Analysis Data
  const mockAnalysisResults = {
    score: 80,
    verdict: "Good Start",
    description: "Your CV has a strong foundation with good keyword optimization. With a few improvements, you can boost your score significantly!",
    stats: {
      keywords: { found: 24, total: 30, label: "Target keywords found" },
      experience: { value: "5 Years", label: "Relevant experience" },
      skills: { count: 12, label: "Technical skills listed" },
      education: { level: "Master's", label: "Highest qualification" }
    },
    jobMatches: [
      { title: "Mobile Developer", match: "85% Match", icon: "📱" },
      { title: "Data Analyst", match: "80% Match", icon: "📊" },
      { title: "Software Engineer", match: "75% Match", icon: "💻" }
    ],
    feedback: {
      strengths: [
        "Clear and concise skills summary",
        "Relevant certifications included", 
        "Good use of action verbs",
        "Consistent formatting throughout"
      ],
      improvements: [
        "Add quantifiable achievements",
        "Include more industry keywords",
        "Expand project descriptions", 
        "Add impact metrics to work history"
      ],
      style: [
        "Improve section spacing",
        "Use consistent date formats",
        "Optimize for single page layout",
        "Add professional summary"
      ]
    }
  };

  useEffect(() => {
    // Get data from sessionStorage
    const data = sessionStorage.getItem('cvAnalysisData');
    if (data) {
      setAnalysisData(JSON.parse(data));
    }
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsLoading(false);
      animateResults();
    }, 2000);
  }, []);

  const animateResults = () => {
    // Animate score ring
    const progressRing = document.getElementById('progressRing');
    if (progressRing) {
      const circumference = 628.32;
      const score = mockAnalysisResults.score;
      const offset = circumference - (score / 100) * circumference;
      
      setTimeout(() => {
        progressRing.style.strokeDashoffset = offset;
      }, 500);
    }

    // Animate score number
    const scoreElement = document.getElementById('scoreNum');
    if (scoreElement) {
      let current = 0;
      const target = mockAnalysisResults.score;
      const interval = setInterval(() => {
        if (current >= target) {
          clearInterval(interval);
          scoreElement.textContent = target + '%';
        } else {
          current++;
          scoreElement.textContent = current + '%';
        }
      }, 20);
    }
  };

  const handleApplyRecommendations = () => {
    alert('Applying improvements...');
  };

  const handleDownloadReport = () => {
    window.print();
  };

  const handleAnalyzeAnother = () => {
    navigate('/scoring-report');
  };

  if (!analysisData) {
    return (
      <div className="cv-results-page">
        <div className="no-data">
          <h2>No analysis data found</h2>
          <p>Please submit your CV first.</p>
          <button onClick={() => navigate('/scoring-report')} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="cv-results-page">
        <div className="loading-container">
          <div className="ai-loader">
            <div className="loader-ring"></div>
            <div className="loader-text">
              <h2>AI is analyzing your CV...</h2>
              <p>Processing keywords, skills, and formatting</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-results-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">CHATBOT 2</div>
        <div className="nav-links">
          <a href="/scoring-report" className="nav-link">Home</a>
          <a href="/scoring-report" className="btn-score">Score my CV</a>
        </div>
      </nav>

      {/* Main Container */}
      <div className="main-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">✨ AI Analysis Complete</div>
          <h1 className="hero-title">Your CV Performance Report</h1>
          <p className="hero-subtitle">Powered by Advanced AI • Instant Insights • Actionable Recommendations</p>
          <p className="session-info">Session ID: <code>{formId}</code></p>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* ATS Score Card */}
          <div className="card score-card">
            <div className="score-display">
              <div className="score-ring">
                <svg width="220" height="220">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <circle className="ring-bg" cx="110" cy="110" r="100"/>
                  <circle 
                    className="ring-progress" 
                    cx="110" 
                    cy="110" 
                    r="100"
                    strokeDasharray="628.32"
                    strokeDashoffset="628.32"
                    id="progressRing"
                  />
                </svg>
                <div className="score-center">
                  <div className="score-number" id="scoreNum">0%</div>
                  <div className="score-label">ATS Score</div>
                </div>
              </div>
              <div className="score-verdict">🎯 {mockAnalysisResults.verdict}</div>
              <p className="score-description">{mockAnalysisResults.description}</p>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="card">
            <div className="stat-card">
              <div className="stat-icon keywords">🔑</div>
              <div className="stat-content">
                <div className="stat-label">Keywords</div>
                <div className="stat-value">{mockAnalysisResults.stats.keywords.found}/{mockAnalysisResults.stats.keywords.total}</div>
                <div className="stat-subtext">{mockAnalysisResults.stats.keywords.label}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="stat-card">
              <div className="stat-icon experience">💼</div>
              <div className="stat-content">
                <div className="stat-label">Experience</div>
                <div className="stat-value">{mockAnalysisResults.stats.experience.value}</div>
                <div className="stat-subtext">{mockAnalysisResults.stats.experience.label}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="stat-card">
              <div className="stat-icon skills">⚙️</div>
              <div className="stat-content">
                <div className="stat-label">Skills</div>
                <div className="stat-value">{mockAnalysisResults.stats.skills.count}</div>
                <div className="stat-subtext">{mockAnalysisResults.stats.skills.label}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="stat-card">
              <div className="stat-icon education">🎓</div>
              <div className="stat-content">
                <div className="stat-label">Education</div>
                <div className="stat-value">{mockAnalysisResults.stats.education.level}</div>
                <div className="stat-subtext">{mockAnalysisResults.stats.education.label}</div>
              </div>
            </div>
          </div>

          {/* Job Recommendations */}
          <div className="card jobs-card">
            <div className="card-header">
              <div className="card-icon">🎯</div>
              <h2 className="card-title">Top Job Matches</h2>
            </div>
            <div className="jobs-grid">
              {mockAnalysisResults.jobMatches.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-icon-lg">{job.icon}</div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-match">{job.match}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="card feedback-section">
            <div className="card-header">
              <div className="card-icon">💡</div>
              <h2 className="card-title">Personalized Feedback & Recommendations</h2>
            </div>
            <div className="feedback-grid">
              <div className="feedback-item strengths">
                <div className="feedback-header">
                  <div className="feedback-icon strengths">✓</div>
                  <div className="feedback-title">Strengths</div>
                </div>
                <div className="feedback-text">Your CV excels in these areas</div>
                <ul className="feedback-list">
                  {mockAnalysisResults.feedback.strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="feedback-item improvements">
                <div className="feedback-header">
                  <div className="feedback-icon improvements">⚠</div>
                  <div className="feedback-title">Improvements</div>
                </div>
                <div className="feedback-text">Focus on these for better results</div>
                <ul className="feedback-list">
                  {mockAnalysisResults.feedback.improvements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="feedback-item style">
                <div className="feedback-header">
                  <div className="feedback-icon style">✎</div>
                  <div className="feedback-title">Style Tips</div>
                </div>
                <div className="feedback-text">Polish your presentation</div>
                <ul className="feedback-list">
                  {mockAnalysisResults.feedback.style.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="card action-section">
            <h2 className="action-title">Ready to Take Your CV to the Next Level?</h2>
            <p className="action-subtitle">Apply our AI-powered recommendations or analyze another CV</p>
            <div className="action-buttons">
              <button className="btn-action btn-white" onClick={handleApplyRecommendations}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                Apply Recommendations
              </button>
              <button className="btn-action btn-outline" onClick={handleDownloadReport}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
                Download Report
              </button>
              <button className="btn-action btn-outline" onClick={handleAnalyzeAnother}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118-6M22 12.5a10 10 0 01-18 6"/>
                </svg>
                Analyze Another CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CVResults;