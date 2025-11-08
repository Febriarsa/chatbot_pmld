import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/formCV.css';

function FormCV() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Validate and set file
  const validateAndSetFile = (file) => {
    // Validate file type
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file only.');
      return;
    }

    // Validate file size (3MB = 3 * 1024 * 1024 bytes)
    if (file.size > 3 * 1024 * 1024) {
      alert('File size must be less than 3MB.');
      return;
    }

    setSelectedFile(file);
  };

  // Remove file
  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate file upload
    if (!selectedFile) {
      alert('Please upload your CV first.');
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      // Store data in sessionStorage for results page
      sessionStorage.setItem('cvAnalysisData', JSON.stringify({
        formId: formId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        submittedAt: new Date().toISOString()
      }));

      // Navigate to results page
      navigate(`/cv-results/${formId}`);
    }, 3000);
  };

  return (
    <div className="form-cv-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">CHATBOT 2</div>
        <div className="nav-links">
          <a href="/scoring-report" className="nav-link">Home</a>
          <a href={`/form-cv/${formId}`} className="btn-score">Score my CV</a>
        </div>
      </nav>

      {/* Main Container */}
      <div className="main-container">
        <div className="form-card">
          {/* Form Header */}
          <div className="form-header">
            <h1 className="form-title">AI CV Analysis</h1>
            <p className="form-subtitle">
              Upload your CV for instant AI-powered analysis, scoring, and personalized career recommendations
            </p>
            <p className="session-info">Session ID: <code>{formId}</code></p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Section 1: Upload CV */}
            <div className="form-section">
              <div className="section-label">
                <span className="section-number">1</span>
                <span>Upload Your CV</span>
              </div>

              {!selectedFile ? (
                <div 
                  className={`upload-area ${isDragOver ? 'dragover' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="upload-icon">☁️</div>
                  <div className="upload-text">Drop your CV here or choose a file.</div>
                  <div className="upload-subtext">File format in PDF or DOCX only. Max 3MB file size.</div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="file-input" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileSelect}
                  />
                </div>
              ) : (
                <div className="file-preview active">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <div className="file-name">{selectedFile.name}</div>
                    <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                  </div>
                  <button type="button" className="file-remove" onClick={removeFile}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Section 2: Basic Information */}
            <div className="form-section">
              <div className="section-label">
                <span className="section-number">2</span>
                <span>Basic Information</span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  className="form-input" 
                  placeholder="Your answer" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-input" 
                    placeholder="Your answer" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="form-input" 
                    placeholder="Your answer" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {!isLoading ? (
              <button type="submit" className="btn-submit">
                Analyze My CV
              </button>
            ) : (
              <div className="loading active">
                <div className="spinner"></div>
                <div className="loading-text">Analyzing your CV with AI... Please wait.</div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormCV;