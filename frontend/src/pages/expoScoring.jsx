import React, { useState, useEffect } from "react";
import {
  FileText,
  Briefcase,
  BookOpen,
  Clock,
  Bold,
  Italic,
  Underline,
  List,
  Hash,
  UploadCloud,
  Eye,
  Maximize2,
  Plus,
  PlusCircle,
  X,
  Save,
  CheckCircle,
  Play,
  RefreshCw,
  Download,
  Search,
  File,
  Loader,
  Check,
  XCircle,
  AlertTriangle,
  Info
} from "react-feather";
import "../styles/expoScoring.css";

export default function ExpoScoring() {
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [editorContent, setEditorContent] = useState(`<h2>PANDUAN PENILAIAN CV - SISTEM SCORING AI</h2>
    
    <h3>1. KRITERIA UTAMA PENILAIAN (Bobot Scoring)</h3>
    
    <h4>A. Kesesuaian Pengalaman (40%)</h4>
    <ul>
        <li><strong>Relevansi pengalaman kerja</strong> dengan posisi yang dilamar</li>
        <li><strong>Durasi pengalaman</strong> minimal sesuai requirement</li>
        <li><strong>Progresivitas karir</strong> (kenaikan level/tanggung jawab)</li>
        <li><strong>Nama perusahaan</strong> dan reputasi industri</li>
    </ul>
    
    <h4>B. Kualifikasi Pendidikan (25%)</h4>
    <ul>
        <li><strong>Tingkat pendidikan</strong> sesuai requirement</li>
        <li><strong>Relevansi jurusan/bidang studi</strong></li>
        <li><strong>IPK minimal</strong> (jika diperlukan)</li>
        <li><strong>Universitas</strong> dan akreditasi</li>
    </ul>
    
    <h4>C. Keahlian Teknis (25%)</h4>
    <ul>
        <li><strong>Hard skills</strong> yang sesuai dengan job description</li>
        <li><strong>Sertifikasi profesional</strong> yang relevan</li>
        <li><strong>Kemampuan software/tools</strong> yang diperlukan</li>
        <li><strong>Portfolio</strong> atau project experience</li>
    </ul>
    
    <h4>D. Soft Skills & Kompetensi (10%)</h4>
    <ul>
        <li><strong>Leadership experience</strong></li>
        <li><strong>Kemampuan komunikasi</strong></li>
        <li><strong>Problem solving abilities</strong></li>
        <li><strong>Adaptabilitas</strong> dan learning agility</li>
    </ul>
    
    <h3>2. SISTEM SCORING AI</h3>
    <p><strong>Scale:</strong> 1-100 points</p>
    <ul>
        <li><strong>90-100:</strong> Excellent Match (AUTO ACCEPT)</li>
        <li><strong>75-89:</strong> Good Match (RECOMMEND)</li>
        <li><strong>60-74:</strong> Average Match (CONSIDER)</li>
        <li><strong>40-59:</strong> Below Average (REVIEW MANUAL)</li>
        <li><strong>0-39:</strong> Poor Match (AUTO DECLINE)</li>
    </ul>
    
    <h3>3. RED FLAGS (AUTO DECLINE)</h3>
    <ul>
        <li>Gap employment > 2 tahun tanpa penjelasan</li>
        <li>Frequent job hopping (< 1 tahun per job untuk 3+ jobs)</li>
        <li>Tidak memenuhi minimum requirement utama</li>
        <li>CV tidak lengkap/unprofessional</li>
        <li>Overqualified (level terlalu tinggi untuk posisi)</li>
    </ul>
    
    <h3>4. SPECIAL CONSIDERATIONS</h3>
    <ul>
        <li><strong>Fresh Graduate:</strong> Focus pada IPK, project experience, magang, organisasi</li>
        <li><strong>Senior Level:</strong> Focus pada achievement, leadership, business impact</li>
        <li><strong>Career Changer:</strong> Perhatikan transferable skills dan motivation</li>
    </ul>`);
  
  const [showJobForm, setShowJobForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [requirements, setRequirements] = useState(["Bachelor's degree in Computer Science or related field"]);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Job form states
  const [jobForm, setJobForm] = useState({
    jobTitle: "",
    employmentType: "",
    location: "",
    experienceLevel: "",
    jobDescription: "",
    salaryRange: "",
    priorityLevel: "normal"
  });

  // Effects
  useEffect(() => {
    updatePreview();
  }, [editorContent]);

  // Utility Functions
  const showNotification = (message, type = 'info') => {
    // Simple alert for now - can be enhanced with toast library
    alert(`${type.toUpperCase()}: ${message}`);
  };

  // Rich Text Editor Functions
  const formatText = (command) => {
    document.execCommand(command, false, null);
    updatePreview();
  };

  const updatePreview = () => {
    // Preview will be updated via dangerouslySetInnerHTML
  };

  const togglePreview = () => {
    setIsPreviewFullscreen(!isPreviewFullscreen);
  };

  // File Upload Functions
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        showNotification('File size exceeds 10MB limit', 'error');
        return false;
      }
      return true;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Job Management Functions
  const showJobFormHandler = () => {
    setShowJobForm(true);
    resetJobForm();
  };

  const hideJobForm = () => {
    setShowJobForm(false);
    resetJobForm();
  };

  const resetJobForm = () => {
    setJobForm({
      jobTitle: "",
      employmentType: "",
      location: "",
      experienceLevel: "",
      jobDescription: "",
      salaryRange: "",
      priorityLevel: "normal"
    });
    setCurrentSkills([]);
    setSkillInput("");
    setRequirements(["Bachelor's degree in Computer Science or related field"]);
  };

  const handleJobFormChange = (field, value) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    setRequirements(prev => [...prev, ""]);
  };

  const updateRequirement = (index, value) => {
    setRequirements(prev => {
      const newReq = [...prev];
      newReq[index] = value;
      return newReq;
    });
  };

  const removeRequirement = (index) => {
    if (requirements.length > 1) {
      setRequirements(prev => prev.filter((_, i) => i !== index));
    } else {
      showNotification('At least one requirement is needed', 'warning');
    }
  };

  const handleSkillInput = (event) => {
    if (event.key === 'Enter' && skillInput.trim()) {
      const skill = skillInput.trim();
      if (!currentSkills.includes(skill)) {
        setCurrentSkills(prev => [...prev, skill]);
        setSkillInput("");
      } else {
        showNotification('Skill already added', 'warning');
      }
    }
  };

  const removeSkill = (skill) => {
    setCurrentSkills(prev => prev.filter(s => s !== skill));
  };

  const saveJob = () => {
    if (!jobForm.jobTitle.trim() || !jobForm.jobDescription.trim()) {
      showNotification('Job Title and Description are required!', 'error');
      return;
    }

    const validRequirements = requirements.filter(req => req.trim());
    if (validRequirements.length === 0) {
      showNotification('At least one requirement is needed!', 'error');
      return;
    }

    // Simulate saving
    setTimeout(() => {
      hideJobForm();
      showNotification('Job specification saved successfully!', 'success');
    }, 1500);
  };

  // Main Action Functions
  const previewScoringFlow = () => {
    showNotification('Opening scoring flow preview...', 'info');
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings? This action cannot be undone.')) {
      showNotification('Settings reset successfully!', 'success');
    }
  };

  const saveAsDraft = () => {
    showNotification('Settings saved as draft!', 'info');
  };

  const saveSettings = () => {
    showNotification('All settings saved successfully!', 'success');
  };

  const exportJobs = () => {
    showNotification('Jobs exported successfully!', 'success');
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🎯 Scoring CV Settings</h1>
        <p>Configure scoring guidelines and job specifications to support AI-powered CV analysis.</p>
      </div>
      
      <div className="main-content">
        <div className="tabs-container">
          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 0 ? 'active' : ''}`} 
              onClick={() => setActiveTab(0)}
            >
              <FileText />
              Panduan Penilaian CV
            </button>
            <button 
              className={`tab ${activeTab === 1 ? 'active' : ''}`} 
              onClick={() => setActiveTab(1)}
            >
              <Briefcase />
              Lowongan Spesifikasi
            </button>
          </div>
          
          {/* Tab 1: Panduan Penilaian CV */}
          {activeTab === 0 && (
            <div className="tab-content active">
              <div className="section-header">
                <div className="section-title">
                  <BookOpen />
                  Panduan Penilaian CV
                </div>
                <div className="version-info">
                  <Clock />
                  Last updated by Admin on 17 Sep 2025
                </div>
              </div>
              
              <div className="form-group">
                <label>📝 Rich Text Editor - Panduan Lengkap</label>
                <div className="rich-editor">
                  <div className="editor-toolbar">
                    <button className="toolbar-btn" onClick={() => formatText('bold')}>
                      <Bold size={16} />
                      Bold
                    </button>
                    <button className="toolbar-btn" onClick={() => formatText('italic')}>
                      <Italic size={16} />
                      Italic
                    </button>
                    <button className="toolbar-btn" onClick={() => formatText('underline')}>
                      <Underline size={16} />
                      Underline
                    </button>
                    <button className="toolbar-btn" onClick={() => formatText('insertUnorderedList')}>
                      <List size={16} />
                      Bullet List
                    </button>
                    <button className="toolbar-btn" onClick={() => formatText('insertOrderedList')}>
                      <Hash size={16} />
                      Number List
                    </button>
                  </div>
                  <div
                    className="editor-content"
                    contentEditable={true}
                    onInput={(e) => setEditorContent(e.currentTarget.innerHTML)}
                    suppressContentEditableWarning={true}
                  >
                    <div dangerouslySetInnerHTML={{ __html: editorContent }} />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>📎 Upload File Panduan (Opsional)</label>
                <div 
                  className="upload-area" 
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <div className="upload-icon">
                    <UploadCloud size={48} />
                  </div>
                  <h3>Drop files here or click to upload</h3>
                  <p>Supported formats: PDF, DOC, DOCX (Max: 10MB)</p>
                  <input 
                    type="file" 
                    id="fileInput" 
                    accept=".pdf,.doc,.docx" 
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                    multiple
                  />
                </div>
                <div style={{ marginTop: '15px' }}>
                  {uploadedFiles.map((file, index) => (
                    <div 
                      key={index}
                      style={{
                        background: '#e3f2fd',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <File style={{ color: '#1976d2' }} />
                        <div>
                          <div style={{ fontWeight: '600' }}>{file.name}</div>
                          <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                            {(file.size / 1024).toFixed(1)} KB
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        style={{
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="preview-panel">
                <div className="preview-header">
                  <div className="preview-title">
                    <Eye />
                    Preview Panduan
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={togglePreview}>
                    <Maximize2 />
                    Full Screen
                  </button>
                </div>
                <div 
                  className="preview-content" 
                  style={isPreviewFullscreen ? {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100vw',
                    height: '100vh',
                    zIndex: '10000',
                    background: 'white',
                    padding: '40px',
                    overflow: 'auto'
                  } : {}}
                >
                  {editorContent ? (
                    <div dangerouslySetInnerHTML={{ __html: editorContent }} />
                  ) : (
                    <em>Preview akan muncul di sini saat Anda mengetik di editor...</em>
                  )}
                </div>
              </div>
              
              {/* Upload Section with Action Buttons */}
              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #e9ecef' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button className="btn btn-outline" onClick={previewScoringFlow}>
                    <Play size={16} />
                    Preview Scoring Flow
                  </button>
                  <button className="btn btn-secondary" onClick={resetSettings}>
                    <RefreshCw size={16} />
                    Reset Settings
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button className="btn btn-outline" onClick={saveAsDraft}>
                    <Save size={16} />
                    Save as Draft
                  </button>
                  <button className="btn btn-primary" onClick={saveSettings}>
                    <CheckCircle size={16} />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab 2: Lowongan Spesifikasi */}
          {activeTab === 1 && (
            <div className="tab-content active">
              <div className="section-header">
                <div className="section-title">
                  <Briefcase />
                  Lowongan Spesifikasi
                </div>
                <button className="btn btn-success" onClick={showJobFormHandler}>
                  <Plus />
                  Add New Job
                </button>
              </div>
              
              {/* Job Form */}
              {showJobForm && (
                <div className="job-form">
                  <div className="job-form-header">
                    <div className="job-form-title">
                      <PlusCircle />
                      Add New Job Specification
                    </div>
                    <button className="btn btn-outline" onClick={hideJobForm}>
                      <X />
                      Cancel
                    </button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Job Title *</label>
                      <input 
                        type="text" 
                        value={jobForm.jobTitle}
                        onChange={(e) => handleJobFormChange('jobTitle', e.target.value)}
                        placeholder="e.g. Senior Data Scientist" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Employment Type</label>
                      <select 
                        value={jobForm.employmentType}
                        onChange={(e) => handleJobFormChange('employmentType', e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <select 
                        value={jobForm.location}
                        onChange={(e) => handleJobFormChange('location', e.target.value)}
                      >
                        <option value="">Select Location</option>
                        <option value="jakarta">Jakarta</option>
                        <option value="bandung">Bandung</option>
                        <option value="surabaya">Surabaya</option>
                        <option value="yogyakarta">Yogyakarta</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Experience Level</label>
                      <select 
                        value={jobForm.experienceLevel}
                        onChange={(e) => handleJobFormChange('experienceLevel', e.target.value)}
                      >
                        <option value="">Select Level</option>
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (3-5 years)</option>
                        <option value="senior">Senior Level (5+ years)</option>
                        <option value="lead">Lead/Manager (7+ years)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Job Description *</label>
                    <textarea 
                      className="textarea-large" 
                      value={jobForm.jobDescription}
                      onChange={(e) => handleJobFormChange('jobDescription', e.target.value)}
                      placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Qualifications / Requirements *</label>
                    <div className="requirements-list">
                      {requirements.map((req, index) => (
                        <div key={index} className="requirement-item">
                          <input 
                            type="text" 
                            className="requirement-input" 
                            value={req}
                            onChange={(e) => updateRequirement(index, e.target.value)}
                            placeholder={index === 0 ? "e.g. Bachelor's degree in Computer Science or related field" : "Add another requirement..."}
                          />
                          <button 
                            type="button" 
                            className="remove-requirement" 
                            onClick={() => removeRequirement(index)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="add-requirement" onClick={addRequirement}>
                      <Plus size={16} />
                      Add Requirement
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <label>Skills Required</label>
                    <div className="skills-container">
                      <div className="skills-display">
                        {currentSkills.map((skill, index) => (
                          <div key={index} className="skill-chip">
                            {skill}
                            <span className="skill-remove" onClick={() => removeSkill(skill)}>×</span>
                          </div>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        className="skill-input" 
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={handleSkillInput}
                        placeholder="Type skill and press Enter..." 
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Salary Range (Optional)</label>
                      <input 
                        type="text" 
                        value={jobForm.salaryRange}
                        onChange={(e) => handleJobFormChange('salaryRange', e.target.value)}
                        placeholder="e.g. 15-20 Million IDR" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Priority Level</label>
                      <select 
                        value={jobForm.priorityLevel}
                        onChange={(e) => handleJobFormChange('priorityLevel', e.target.value)}
                      >
                        <option value="normal">Normal</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '30px' }}>
                    <button type="button" className="btn btn-secondary" onClick={hideJobForm}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={saveJob}>
                      <Save />
                      Save Job Specification
                    </button>
                  </div>
                </div>
              )}
              
              {/* Jobs List */}
              <div className="jobs-list">
                <div className="list-header">
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>📋 Current Job Specifications</h3>
                  <div className="search-bar">
                    <div className="search-input">
                      <input 
                        type="text" 
                        placeholder="Search jobs..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="search-icon" />
                    </div>
                    <button className="btn btn-outline" onClick={exportJobs}>
                      <Download />
                      Export CSV
                    </button>
                  </div>
                </div>
                
                <div className="jobs-grid">
                  {/* Job Card 1 - Complete */}
                  <div className="job-card">
                    <div className="job-header">
                      <div>
                        <div className="job-title">Senior Data Scientist</div>
                        <div className="job-meta">
                          <span>Full-time • Jakarta • Senior Level</span>
                        </div>
                      </div>
                      <div className="job-status status-complete">
                        <CheckCircle size={14} />
                        Complete
                      </div>
                    </div>
                    
                    <div className="job-skills">
                      <span className="job-skill">Python</span>
                      <span className="job-skill">Machine Learning</span>
                      <span className="job-skill">SQL</span>
                      <span className="job-skill">TensorFlow</span>
                      <span className="job-skill">Statistics</span>
                    </div>
                    
                    <div className="job-actions">
                      <button className="btn btn-outline btn-sm">
                        <Eye size={14} />
                        View
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Edit
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Duplicate
                      </button>
                    </div>
                    
                    <div className="job-footer">
                      <span>Created: 15 Sep 2025</span>
                      <span>15-25 Million IDR</span>
                    </div>
                  </div>
                  
                  {/* Job Card 2 - Incomplete */}
                  <div className="job-card incomplete">
                    <div className="job-header">
                      <div>
                        <div className="job-title">Frontend Developer</div>
                        <div className="job-meta">
                          <span>Full-time • Remote • Mid Level</span>
                        </div>
                      </div>
                      <div className="job-status status-incomplete">
                        <AlertTriangle size={14} />
                        Incomplete
                      </div>
                    </div>
                    
                    <div className="job-skills">
                      <span className="job-skill">React</span>
                      <span className="job-skill">JavaScript</span>
                      <span className="job-skill">CSS</span>
                    </div>
                    
                    <div className="job-actions">
                      <button className="btn btn-outline btn-sm">
                        <Eye size={14} />
                        View
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Edit
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Duplicate
                      </button>
                    </div>
                    
                    <div className="job-footer">
                      <span>Created: 12 Sep 2025</span>
                      <span>10-15 Million IDR</span>
                    </div>
                  </div>
                  
                  {/* Job Card 3 - Complete */}
                  <div className="job-card">
                    <div className="job-header">
                      <div>
                        <div className="job-title">DevOps Engineer</div>
                        <div className="job-meta">
                          <span>Full-time • Bandung • Senior Level</span>
                        </div>
                      </div>
                      <div className="job-status status-complete">
                        <CheckCircle size={14} />
                        Complete
                      </div>
                    </div>
                    
                    <div className="job-skills">
                      <span className="job-skill">Docker</span>
                      <span className="job-skill">Kubernetes</span>
                      <span className="job-skill">AWS</span>
                      <span className="job-skill">CI/CD</span>
                    </div>
                    
                    <div className="job-actions">
                      <button className="btn btn-outline btn-sm">
                        <Eye size={14} />
                        View
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Edit
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Duplicate
                      </button>
                    </div>
                    
                    <div className="job-footer">
                      <span>Created: 10 Sep 2025</span>
                      <span>18-28 Million IDR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
