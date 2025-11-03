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
  Info,
  Edit,
  Copy,
  MapPin,
  Clock as ClockIcon,
  TrendingUp
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
  
  // Modal states
  const [showJobPreviewModal, setShowJobPreviewModal] = useState(false);
  const [selectedJobForPreview, setSelectedJobForPreview] = useState(null);
  
  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({
    jobTitle: "",
    employmentType: "",
    location: "",
    experienceLevel: "",
    jobDescription: "",
    salaryRange: "",
    priorityLevel: "normal",
    skills: [],
    requirements: [],
    responsibilities: [],
    benefits: []
  });
  const [editSkillInput, setEditSkillInput] = useState("");
  
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

  // Sample job data for previews and editing (with database state)
  const [jobDatabase, setJobDatabase] = useState({
    'senior-data-scientist': {
      id: 'senior-data-scientist',
      title: 'Senior Data Scientist',
      location: 'Jakarta',
      type: 'Full-time',
      level: 'Senior Level',
      status: 'complete',
      updated: '2 days ago by HR Team',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics', 'Deep Learning', 'Data Visualization', 'Big Data'],
      salary: '15-25 Million IDR',
      priority: 'high',
      content: {
        overview: "We are seeking an experienced Senior Data Scientist to join our growing analytics team. You will be responsible for developing advanced machine learning models and driving data-driven decision making across the organization.",
        responsibilities: [
          "Design, develop, and deploy machine learning models to solve complex business problems",
          "Analyze large datasets to extract actionable insights and patterns",
          "Collaborate with engineering teams to integrate ML models into production systems",
          "Mentor junior data scientists and provide technical guidance",
          "Present findings and recommendations to stakeholders and leadership",
          "Stay current with latest developments in data science and machine learning"
        ],
        requirements: [
          "Master's or PhD in Computer Science, Statistics, Mathematics, or related field",
          "5+ years of experience in data science or machine learning roles",
          "Strong programming skills in Python and experience with ML frameworks",
          "Expert knowledge of SQL and experience with big data technologies",
          "Proven track record of deploying ML models to production",
          "Excellent communication and presentation skills"
        ],
        benefits: [
          "Competitive salary and performance bonuses",
          "Comprehensive health insurance",
          "Flexible working hours and remote work options",
          "Professional development and training opportunities",
          "Collaborative and innovative work environment"
        ]
      }
    },
    'frontend-developer': {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid Level',
      status: 'incomplete',
      updated: '5 days ago by Tech Lead',
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Redux'],
      salary: '10-15 Million IDR',
      priority: 'normal',
      content: {
        overview: "We're looking for a talented Frontend Developer to build beautiful and intuitive user interfaces. You'll work closely with designers and backend engineers to create seamless web experiences.",
        responsibilities: [
          "Develop responsive and performant web applications using React and TypeScript",
          "Collaborate with UI/UX designers to implement pixel-perfect designs",
          "Write clean, maintainable, and well-tested code",
          "Optimize applications for maximum speed and scalability",
          "Participate in code reviews and contribute to team standards"
        ],
        requirements: [
          "3+ years of experience with React and modern JavaScript/TypeScript",
          "Strong understanding of HTML5, CSS3, and responsive design",
          "Experience with state management libraries (Redux, Context API)",
          "Familiarity with RESTful APIs and asynchronous programming",
          "Knowledge of modern build tools and version control (Git)"
        ],
        benefits: []
      }
    },
    'devops-engineer': {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      location: 'Bandung',
      type: 'Full-time',
      level: 'Senior Level',
      status: 'complete',
      updated: '1 week ago by Tech Lead',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
      salary: '18-28 Million IDR',
      priority: 'urgent',
      content: {
        overview: "Join our DevOps team to build and maintain scalable infrastructure. You'll work on automating deployments, monitoring systems, and ensuring high availability of our services.",
        responsibilities: [
          "Design and implement CI/CD pipelines",
          "Manage cloud infrastructure on AWS",
          "Monitor system performance and troubleshoot issues",
          "Automate deployment and scaling processes",
          "Collaborate with development teams on infrastructure needs"
        ],
        requirements: [
          "Bachelor's degree in Computer Science or related field",
          "5+ years of experience in DevOps or System Administration",
          "Strong experience with containerization (Docker, Kubernetes)",
          "Proficiency in cloud platforms (AWS, GCP, or Azure)",
          "Experience with Infrastructure as Code (Terraform, CloudFormation)"
        ],
        benefits: [
          "Competitive salary package",
          "Health and dental insurance",
          "Annual learning budget",
          "Flexible work arrangements"
        ]
      }
    }
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

  // Edit Modal Functions
  const openEditModal = (jobId) => {
    const job = jobDatabase[jobId];
    if (job) {
      setEditingJob(jobId);
      setEditForm({
        jobTitle: job.title,
        employmentType: job.type,
        location: job.location,
        experienceLevel: job.level,
        jobDescription: job.content.overview,
        salaryRange: job.salary,
        priorityLevel: job.priority || 'normal',
        skills: [...job.skills],
        requirements: [...job.content.requirements],
        responsibilities: [...job.content.responsibilities],
        benefits: [...job.content.benefits]
      });
      setShowEditModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingJob(null);
    setEditForm({
      jobTitle: "",
      employmentType: "",
      location: "",
      experienceLevel: "",
      jobDescription: "",
      salaryRange: "",
      priorityLevel: "normal",
      skills: [],
      requirements: [],
      responsibilities: [],
      benefits: []
    });
    setEditSkillInput("");
    document.body.style.overflow = 'auto';
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const addEditItem = (field) => {
    setEditForm(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const updateEditItem = (field, index, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeEditItem = (field, index) => {
    if (editForm[field].length > 1 || field === 'benefits' || field === 'responsibilities') {
      setEditForm(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    } else {
      showNotification('At least one item is required', 'warning');
    }
  };

  const handleEditSkillInput = (event) => {
    if (event.key === 'Enter' && editSkillInput.trim()) {
      const skill = editSkillInput.trim();
      if (!editForm.skills.includes(skill)) {
        setEditForm(prev => ({
          ...prev,
          skills: [...prev.skills, skill]
        }));
        setEditSkillInput("");
      } else {
        showNotification('Skill already added', 'warning');
      }
    }
  };

  const removeEditSkill = (skill) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const saveEditChanges = () => {
    if (!editForm.jobTitle.trim() || !editForm.jobDescription.trim()) {
      showNotification('Job Title and Description are required!', 'error');
      return;
    }

    const validRequirements = editForm.requirements.filter(req => req.trim());
    if (validRequirements.length === 0) {
      showNotification('At least one requirement is needed!', 'error');
      return;
    }

    // Update the job in database
    setJobDatabase(prev => ({
      ...prev,
      [editingJob]: {
        ...prev[editingJob],
        title: editForm.jobTitle,
        type: editForm.employmentType,
        location: editForm.location,
        level: editForm.experienceLevel,
        salary: editForm.salaryRange,
        priority: editForm.priorityLevel,
        skills: editForm.skills,
        updated: 'Just now by You',
        status: (validRequirements.length > 0 && editForm.skills.length > 0) ? 'complete' : 'incomplete',
        content: {
          overview: editForm.jobDescription,
          requirements: validRequirements,
          responsibilities: editForm.responsibilities.filter(resp => resp.trim()),
          benefits: editForm.benefits.filter(benefit => benefit.trim())
        }
      }
    }));

    closeEditModal();
    showNotification('✅ Job specification updated successfully!', 'success');
  };

  // Job Preview Modal Functions
  const openJobPreviewModal = (jobKey) => {
    setSelectedJobForPreview(jobKey);
    setShowJobPreviewModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeJobPreviewModal = () => {
    setShowJobPreviewModal(false);
    setSelectedJobForPreview(null);
    document.body.style.overflow = 'auto';
  };

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        if (showJobPreviewModal) {
          closeJobPreviewModal();
        }
        if (showEditModal) {
          closeEditModal();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showJobPreviewModal, showEditModal]);

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

  const duplicateJob = (jobId) => {
    showNotification(`Job "${jobDatabase[jobId].title}" duplicated successfully!`, 'success');
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
                  {Object.entries(jobDatabase).map(([jobId, job]) => (
                    <div key={jobId} className={`job-card ${job.status === 'incomplete' ? 'incomplete' : ''}`}>
                      <div className="job-header">
                        <div>
                          <div className="job-title">{job.title}</div>
                          <div className="job-meta">
                            <span>{job.type} • {job.location} • {job.level}</span>
                          </div>
                        </div>
                        <div className={`job-status status-${job.status}`}>
                          {job.status === 'complete' ? (
                            <>
                              <CheckCircle size={14} />
                              Complete
                            </>
                          ) : (
                            <>
                              <AlertTriangle size={14} />
                              Incomplete
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="job-skills">
                        {job.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="job-skill">{skill}</span>
                        ))}
                        {job.skills.length > 5 && (
                          <span className="job-skill-more">+{job.skills.length - 5} more</span>
                        )}
                      </div>
                      
                      <div className="job-actions">
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => openJobPreviewModal(jobId)}
                        >
                          <Eye size={14} />
                          Preview
                        </button>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => openEditModal(jobId)}
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => duplicateJob(jobId)}
                        >
                          <Copy size={14} />
                          Duplicate
                        </button>
                      </div>
                      
                      <div className="job-footer">
                        <span>Updated: {job.updated}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingJob && (
        <div className="job-edit-modal-overlay" onClick={closeEditModal}>
          <div className="job-edit-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="job-edit-modal-header">
              <div className="job-edit-modal-title-section">
                <h2 className="job-edit-modal-title">
                  <Edit size={24} />
                  Edit Job Specification
                </h2>
                <p className="job-edit-modal-subtitle">
                  Modify job details, requirements, and settings
                </p>
              </div>
              <button className="job-edit-modal-close-btn" onClick={closeEditModal}>
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="job-edit-modal-body">
              {/* Basic Info Section */}
              <div className="job-edit-section">
                <h3 className="job-edit-section-title">💼 Basic Information</h3>
                <div className="job-edit-form-row">
                  <div className="job-edit-form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      value={editForm.jobTitle}
                      onChange={(e) => handleEditFormChange('jobTitle', e.target.value)}
                      placeholder="Enter job title"
                    />
                  </div>
                  <div className="job-edit-form-group">
                    <label>Employment Type</label>
                    <select
                      value={editForm.employmentType}
                      onChange={(e) => handleEditFormChange('employmentType', e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
                <div className="job-edit-form-row">
                  <div className="job-edit-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => handleEditFormChange('location', e.target.value)}
                      placeholder="e.g. Jakarta, Remote"
                    />
                  </div>
                  <div className="job-edit-form-group">
                    <label>Experience Level</label>
                    <input
                      type="text"
                      value={editForm.experienceLevel}
                      onChange={(e) => handleEditFormChange('experienceLevel', e.target.value)}
                      placeholder="e.g. Senior Level"
                    />
                  </div>
                </div>
                <div className="job-edit-form-row">
                  <div className="job-edit-form-group">
                    <label>Salary Range</label>
                    <input
                      type="text"
                      value={editForm.salaryRange}
                      onChange={(e) => handleEditFormChange('salaryRange', e.target.value)}
                      placeholder="e.g. 15-25 Million IDR"
                    />
                  </div>
                  <div className="job-edit-form-group">
                    <label>Priority Level</label>
                    <select
                      value={editForm.priorityLevel}
                      onChange={(e) => handleEditFormChange('priorityLevel', e.target.value)}
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="job-edit-form-group">
                  <label>Job Description *</label>
                  <textarea
                    value={editForm.jobDescription}
                    onChange={(e) => handleEditFormChange('jobDescription', e.target.value)}
                    placeholder="Describe the role and responsibilities"
                    rows="4"
                  />
                </div>
              </div>

              {/* Skills Section */}
              <div className="job-edit-section">
                <h3 className="job-edit-section-title">🛠️ Skills Required</h3>
                <div className="job-edit-skills-container">
                  <div className="job-edit-skills-display">
                    {editForm.skills.map((skill, index) => (
                      <div key={index} className="job-edit-skill-chip">
                        {skill}
                        <span className="job-edit-skill-remove" onClick={() => removeEditSkill(skill)}>×</span>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="job-edit-skill-input"
                    value={editSkillInput}
                    onChange={(e) => setEditSkillInput(e.target.value)}
                    onKeyPress={handleEditSkillInput}
                    placeholder="Type skill and press Enter..."
                  />
                </div>
              </div>

              {/* Requirements Section */}
              <div className="job-edit-section">
                <h3 className="job-edit-section-title">📋 Requirements</h3>
                <div className="job-edit-list">
                  {editForm.requirements.map((req, index) => (
                    <div key={index} className="job-edit-list-item">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => updateEditItem('requirements', index, e.target.value)}
                        placeholder="Add requirement..."
                      />
                      <button
                        className="job-edit-remove-item"
                        onClick={() => removeEditItem('requirements', index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="job-edit-add-item"
                  onClick={() => addEditItem('requirements')}
                >
                  <Plus size={16} />
                  Add Requirement
                </button>
              </div>

              {/* Responsibilities Section */}
              <div className="job-edit-section">
                <h3 className="job-edit-section-title">⚡ Key Responsibilities</h3>
                <div className="job-edit-list">
                  {editForm.responsibilities.map((resp, index) => (
                    <div key={index} className="job-edit-list-item">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => updateEditItem('responsibilities', index, e.target.value)}
                        placeholder="Add responsibility..."
                      />
                      <button
                        className="job-edit-remove-item"
                        onClick={() => removeEditItem('responsibilities', index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="job-edit-add-item"
                  onClick={() => addEditItem('responsibilities')}
                >
                  <Plus size={16} />
                  Add Responsibility
                </button>
              </div>

              {/* Benefits Section */}
              <div className="job-edit-section">
                <h3 className="job-edit-section-title">🎁 Benefits & Perks</h3>
                <div className="job-edit-list">
                  {editForm.benefits.map((benefit, index) => (
                    <div key={index} className="job-edit-list-item">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => updateEditItem('benefits', index, e.target.value)}
                        placeholder="Add benefit..."
                      />
                      <button
                        className="job-edit-remove-item"
                        onClick={() => removeEditItem('benefits', index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="job-edit-add-item"
                  onClick={() => addEditItem('benefits')}
                >
                  <Plus size={16} />
                  Add Benefit
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="job-edit-modal-footer">
              <div className="job-edit-footer-info">
                <div className="job-edit-info-item">
                  <span>📋</span>
                  <span>{editForm.requirements.filter(r => r.trim()).length} requirements</span>
                </div>
                <div className="job-edit-info-item">
                  <span>🛠️</span>
                  <span>{editForm.skills.length} skills</span>
                </div>
                <div className="job-edit-info-item">
                  <span>⚡</span>
                  <span>{editForm.responsibilities.filter(r => r.trim()).length} responsibilities</span>
                </div>
              </div>
              <div className="job-edit-footer-actions">
                <button className="job-edit-footer-btn secondary" onClick={closeEditModal}>
                  Cancel
                </button>
                <button className="job-edit-footer-btn primary" onClick={saveEditChanges}>
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Preview Modal */}
      {showJobPreviewModal && selectedJobForPreview && (
        <div className="job-preview-modal-overlay" onClick={closeJobPreviewModal}>
          <div className="job-preview-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="job-preview-modal-header">
              <div className="job-preview-modal-header-top">
                <div className="job-preview-modal-title-section">
                  <div className="job-preview-modal-label">Job Specification</div>
                  <h2 className="job-preview-modal-title">{jobDatabase[selectedJobForPreview].title}</h2>
                  <span className={`job-preview-modal-status ${jobDatabase[selectedJobForPreview].status}`}>
                    {jobDatabase[selectedJobForPreview].status === 'complete' ? (
                      <>
                        <CheckCircle size={16} />
                        Complete
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={16} />
                        Incomplete
                      </>
                    )}
                  </span>
                </div>
                <button className="job-preview-close-btn" onClick={closeJobPreviewModal}>
                  <X size={24} />
                </button>
              </div>

              <div className="job-preview-modal-meta-row">
                <div className="job-preview-meta-card">
                  <div className="job-preview-meta-card-label">Location</div>
                  <div className="job-preview-meta-card-value">
                    <MapPin size={16} />
                    <span>{jobDatabase[selectedJobForPreview].location}</span>
                  </div>
                </div>
                <div className="job-preview-meta-card">
                  <div className="job-preview-meta-card-label">Employment Type</div>
                  <div className="job-preview-meta-card-value">
                    <ClockIcon size={16} />
                    <span>{jobDatabase[selectedJobForPreview].type}</span>
                  </div>
                </div>
                <div className="job-preview-meta-card">
                  <div className="job-preview-meta-card-label">Experience Level</div>
                  <div className="job-preview-meta-card-value">
                    <TrendingUp size={16} />
                    <span>{jobDatabase[selectedJobForPreview].level}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="job-preview-modal-body">
              <div className="job-preview-section">
                <h3 className="job-preview-section-title">Job Overview</h3>
                <div className="job-preview-section-content">
                  <p>{jobDatabase[selectedJobForPreview].content.overview}</p>
                </div>
              </div>

              <div className="job-preview-section">
                <h3 className="job-preview-section-title">Key Responsibilities</h3>
                <div className="job-preview-section-content">
                  <ul>
                    {jobDatabase[selectedJobForPreview].content.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="job-preview-section">
                <h3 className="job-preview-section-title">Required Skills & Qualifications</h3>
                <div className="job-preview-section-content">
                  <ul>
                    {jobDatabase[selectedJobForPreview].content.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="job-preview-section">
                <h3 className="job-preview-section-title">Technical Skills</h3>
                <div className="job-preview-skills-grid">
                  {jobDatabase[selectedJobForPreview].skills.map((skill, index) => (
                    <span key={index} className="job-preview-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              {jobDatabase[selectedJobForPreview].content.benefits.length > 0 && (
                <div className="job-preview-section">
                  <h3 className="job-preview-section-title">What We Offer</h3>
                  <div className="job-preview-section-content">
                    <ul>
                      {jobDatabase[selectedJobForPreview].content.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {jobDatabase[selectedJobForPreview].status === 'incomplete' && (
                <div className="job-preview-info-box incomplete">
                  <div className="job-preview-info-box-title">
                    <AlertTriangle size={16} />
                    Incomplete Specification
                  </div>
                  <div className="job-preview-info-box-content">
                    This job specification is incomplete. Please complete the setup by adding salary range, benefits package, and interview process details.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="job-preview-modal-footer">
              <div className="job-preview-footer-meta">
                <div style={{ fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Last Updated</div>
                <div>{jobDatabase[selectedJobForPreview].updated}</div>
              </div>
              <div className="job-preview-footer-actions">
                <button className="job-preview-footer-btn secondary" onClick={closeJobPreviewModal}>
                  Close
                </button>
                <button 
                  className="job-preview-footer-btn primary" 
                  onClick={() => {
                    closeJobPreviewModal();
                    openEditModal(selectedJobForPreview);
                  }}
                >
                  <Edit size={16} />
                  Edit Specification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}