import React, { useState } from "react";
import {
  Mail,
  FileText,
  Briefcase,
  CheckCircle,
  XCircle,
  Eye,
  Save,
  PlusCircle,
  Plus,
  Edit3,
  Settings,
  X,
  User,
  MapPin,
} from "react-feather";

import { Building } from "lucide-react";
import "../styles/pocScreening.css";

const ScreeningSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState(["JavaScript", "React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Sample data state
  const [sampleData, setSampleData] = useState({
    candidate_name: "John Doe",
    position: "Software Engineer", 
    company_name: "Tech Company Indonesia",
    date: new Date().toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  });

  // Email templates state
  const [emailTemplates, setEmailTemplates] = useState({
    accept: {
      subject: "Selamat! Aplikasi Anda untuk {{position}} diterima",
      content: `Dear {{candidate_name}},

Selamat! Kami dengan senang hati memberitahukan bahwa CV Anda untuk posisi {{position}} di {{company_name}} telah lolos tahap screening awal.

Tim HR kami akan segera menghubungi Anda untuk tahap selanjutnya.

Terima kasih,
HR Team {{company_name}}`
    },
    decline: {
      subject: "Terima kasih atas aplikasi Anda untuk {{position}}",
      content: `Dear {{candidate_name}},

Terima kasih atas minat Anda untuk posisi {{position}} di {{company_name}}.

Setelah melakukan review terhadap CV Anda, saat ini kami memutuskan untuk melanjutkan dengan kandidat lain yang lebih sesuai dengan kriteria posisi tersebut.

Best regards,
HR Team {{company_name}}`
    }
  });

  const [jobs, setJobs] = useState([
    {
      title: "Senior Frontend Developer",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      updated: "2 days ago",
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
      updated: "1 week ago",
    },
  ]);

  // Function to replace placeholders with sample data
  const replacePlaceholders = (text) => {
    return text
      .replace(/\{\{candidate_name\}\}/g, sampleData.candidate_name)
      .replace(/\{\{position\}\}/g, sampleData.position)
      .replace(/\{\{company_name\}\}/g, sampleData.company_name)
      .replace(/\{\{date\}\}/g, sampleData.date);
  };

  // Handle sample data changes
  const handleSampleDataChange = (field, value) => {
    setSampleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle email template changes
  const handleEmailTemplateChange = (type, field, value) => {
    setEmailTemplates(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  // Preview Modal Functions
  const openPreviewModal = () => {
    setShowPreviewModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    document.body.style.overflow = 'auto';
  };

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showPreviewModal) {
        closePreviewModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showPreviewModal]);

  // Skills
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Jobs
  const handleAddJob = () => {
    const jobTitle = document.getElementById("jobTitle").value;
    const employmentType = document.getElementById("employmentType").value;
    const location = document.getElementById("location").value;

    if (!jobTitle) {
      alert("Job Title harus diisi!");
      return;
    }

    setJobs([
      ...jobs,
      {
        title: jobTitle,
        location,
        type: employmentType,
        updated: "just now",
      },
    ]);

    // clear form
    document.getElementById("jobTitle").value = "";
    document.getElementById("employmentType").value = "";
    document.getElementById("location").value = "";
    document.getElementById("jobDescription").value = "";
    document.getElementById("requirements").value = "";
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>📋 Screening CV Settings</h1>
        <p>
          Configure CV screening templates, guidelines, and job specifications
          for automated evaluation and chatbot integration.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 0 ? "active" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            <Mail size={18} /> Template Email
          </button>
          <button
            className={`tab ${activeTab === 1 ? "active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            <FileText size={18} /> Panduan Penilaian
          </button>
          <button
            className={`tab ${activeTab === 2 ? "active" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            <Briefcase size={18} /> Spesifikasi Lowongan
          </button>
        </div>

        {/* Tab Content */}
        {/* Tab 1 - Template Email */}
        {activeTab === 0 && (
          <div className="tab-content active">
            <div className="placeholder-info">
              <h4>📝 Available Placeholders</h4>
              <div className="placeholder-tags">
                <span className="placeholder-tag">{"{{candidate_name}}"}</span>
                <span className="placeholder-tag">{"{{position}}"}</span>
                <span className="placeholder-tag">{"{{company_name}}"}</span>
                <span className="placeholder-tag">{"{{date}}"}</span>
              </div>
            </div>

            <div className="email-templates-container">
              <div className="email-templates">
                <div className="template-box">
                  <h3>
                    <CheckCircle color="#28a745" />
                    Accept Email Template
                  </h3>
                  <div className="form-group">
                    <label>Subject Line</label>
                    <input 
                      type="text" 
                      value={emailTemplates.accept.subject}
                      onChange={(e) => handleEmailTemplateChange('accept', 'subject', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Content</label>
                    <textarea 
                      className="textarea-large" 
                      value={emailTemplates.accept.content}
                      onChange={(e) => handleEmailTemplateChange('accept', 'content', e.target.value)}
                      rows="8"
                    />
                  </div>
                  <button className="btn btn-outline preview-btn">
                    <Eye size={14} /> Preview
                  </button>
                </div>

                <div className="template-box">
                  <h3>
                    <XCircle color="#dc3545" />
                    Decline Email Template
                  </h3>
                  <div className="form-group">
                    <label>Subject Line</label>
                    <input 
                      type="text" 
                      value={emailTemplates.decline.subject}
                      onChange={(e) => handleEmailTemplateChange('decline', 'subject', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Content</label>
                    <textarea 
                      className="textarea-large" 
                      value={emailTemplates.decline.content}
                      onChange={(e) => handleEmailTemplateChange('decline', 'content', e.target.value)}
                      rows="8"
                    />
                  </div>
                  <button className="btn btn-outline preview-btn">
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>

              {/* Sample Data Section */}
              <div className="sample-data-section">
                <h4>📋 SAMPLE DATA</h4>
                
                <div className="sample-data-form">
                  <div className="sample-field">
                    <label>
                      <User size={16} />
                      Candidate :
                    </label>
                    <input
                      type="text"
                      value={sampleData.candidate_name}
                      onChange={(e) => handleSampleDataChange('candidate_name', e.target.value)}
                      className="sample-input"
                    />
                  </div>

                  <div className="sample-field">
                    <label>
                      <Briefcase size={16} />
                      Position :
                    </label>
                    <input
                      type="text"
                      value={sampleData.position}
                      onChange={(e) => handleSampleDataChange('position', e.target.value)}
                      className="sample-input"
                    />
                  </div>

                  <div className="sample-field">
                    <label>
                      <Building size={16} />
                      Company :
                    </label>
                    <input
                      type="text"
                      value={sampleData.company_name}
                      onChange={(e) => handleSampleDataChange('company_name', e.target.value)}
                      className="sample-input"
                    />
                  </div>
                </div>

                {/* Preview Sections */}
                <div className="email-previews">
                  <div className="preview-section accept-preview">
                    <h5>
                      <CheckCircle size={16} color="#28a745" />
                      Accept Email Template
                    </h5>
                    <div className="preview-field">
                      <label>Subject Line</label>
                      <div className="preview-content subject">
                        {replacePlaceholders(emailTemplates.accept.subject)}
                      </div>
                    </div>
                    <div className="preview-field">
                      <label>Email Content</label>
                      <div className="preview-content email-body">
                        {replacePlaceholders(emailTemplates.accept.content)}
                      </div>
                    </div>
                  </div>

                  <div className="preview-section decline-preview">
                    <h5>
                      <XCircle size={16} color="#dc3545" />
                      Decline Email Template
                    </h5>
                    <div className="preview-field">
                      <label>Subject Line</label>
                      <div className="preview-content subject">
                        {replacePlaceholders(emailTemplates.decline.subject)}
                      </div>
                    </div>
                    <div className="preview-field">
                      <label>Email Content</label>
                      <div className="preview-content email-body">
                        {replacePlaceholders(emailTemplates.decline.content)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 */}
        {activeTab === 1 && (
          <div className="tab-content active">
            <div className="form-group">
              <label>📑 Panduan Penilaian CV (Long Text)</label>
              <textarea
                className="textarea-large"
                defaultValue={`PANDUAN PENILAIAN CV

1. KRITERIA UTAMA PENILAIAN:
- Pengalaman
- Pendidikan
- Keahlian Teknis
- Soft Skills`}
              />
            </div>

            <div className="form-group">
              <label>📎 Upload File Panduan (Opsional)</label>
              <input type="file" accept=".pdf,.doc,.docx" />
              <small>Format: PDF, DOC, DOCX (Maks. 5MB)</small>
            </div>

            <button className="btn btn-outline" onClick={openPreviewModal}>
              <Eye size={16} /> Preview Panduan
            </button>
          </div>
        )}

        {/* Tab 3 */}
        {activeTab === 2 && (
          <div className="tab-content active">
            <div className="job-specs-form">
              <h3>
                <PlusCircle /> Tambah Spesifikasi Lowongan Baru
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input type="text" id="jobTitle" />
                </div>
                <div className="form-group">
                  <label>Employment Type</label>
                  <select id="employmentType">
                    <option value="">Pilih Tipe</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" id="location" />
                </div>
                <div className="form-group">
                  <label>Experience Level</label>
                  <select id="experienceLevel">
                    <option value="">Pilih Level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Job Description</label>
                <textarea id="jobDescription" />
              </div>

              <div className="form-group">
                <label>Requirements</label>
                <textarea id="requirements" />
              </div>

              <div className="form-group">
                <label>Skills Required</label>
                <div className="skills-input">
                  {skills.map((s) => (
                    <span className="skill-tag" key={s}>
                      {s} <span className="remove" onClick={() => handleRemoveSkill(s)}>×</span>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="add-skill-input"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={handleAddSkill}
                    placeholder="Add skill..."
                  />
                </div>
              </div>

              <button className="btn btn-success" onClick={handleAddJob}>
                <Plus size={16} /> Add Job Specification
              </button>
            </div>

            <div className="job-list">
              <h3>📋 Daftar Lowongan Aktif</h3>
              {jobs.map((job, idx) => (
                <div className="job-item" key={idx}>
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <p>
                      {job.location} • {job.type} • Updated {job.updated}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span className="status-badge status-active">Active</span>
                    <button className="btn" style={{ fontSize: "0.8rem" }}>
                      <Edit3 size={14} /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Integration Section */}
      <div className="integration-section">
        <h3>
          <Settings /> Integration Settings
        </h3>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" defaultChecked /> Send Email Notifications
            Automatically
          </label>
          <label className="checkbox-item">
            <input type="checkbox" defaultChecked /> Send WhatsApp Notifications
            via Chatbot
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Notify HR Team via Slack
          </label>
        </div>

        <div className="form-group" style={{ marginTop: "20px" }}>
          <label>Webhook URL (Optional)</label>
          <input type="url" placeholder="https://your-webhook-url.com/cv-screening" />
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.currentTarget.innerHTML = "✅ Settings Saved!";
            setTimeout(() => {
              e.currentTarget.innerHTML = `<svg width="16" height="16"><path /></svg> Save Settings`;
            }, 2000);
          }}
        >
          <Save /> Save Settings
        </button>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="preview-modal-overlay" onClick={closePreviewModal}>
          <div className="preview-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="preview-modal-header">
              <div className="preview-modal-header-top">
                <div className="preview-modal-title-section">
                  <div className="preview-modal-breadcrumb">Screening CV Settings / Panduan Penilaian</div>
                  <h2 className="preview-modal-title">
                    <span>📋</span>
                    <span>Panduan Penilaian CV</span>
                  </h2>
                  <p className="preview-modal-subtitle">
                    Panduan lengkap untuk mengevaluasi CV kandidat berdasarkan kriteria yang telah ditentukan
                  </p>
                </div>
                <button className="preview-close-btn" onClick={closePreviewModal}>
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="preview-modal-body">
              {/* Main Content Section */}
              <div className="preview-section">
                <h3 className="preview-section-title">Detail Panduan</h3>
                
                <div className="preview-document-preview">
                  <div className="preview-document-content">
                    {`PANDUAN PENILAIAN CV

1. KRITERIA UTAMA PENILAIAN:

- Pengalaman
  • Minimal 3-5 tahun di bidang terkait
  • Relevansi dengan posisi yang dilamar
  • Track record dan pencapaian yang terukur
  
- Pendidikan
  • Minimal S1 dari jurusan relevan
  • IPK minimal 3.0
  • Sertifikasi profesional (nilai tambah)
  
- Keahlian Teknis
  • Penguasaan teknologi sesuai job requirements
  • Level keahlian (beginner/intermediate/advanced/expert)
  • Portfolio atau project yang pernah dikerjakan
  
- Soft Skills
  • Komunikasi dan kolaborasi
  • Problem solving dan analytical thinking
  • Kepemimpinan dan adaptabilitas
  • Dibuktikan dari deskripsi pengalaman kerja`}
                  </div>

                  <div className="preview-criteria-section">
                    <div className="preview-criteria-title">📊 Sistem Penilaian</div>
                    <ul className="preview-criteria-list">
                      <li><strong>Pengalaman Kerja:</strong> 35 poin - Evaluasi relevansi dan durasi pengalaman</li>
                      <li><strong>Pendidikan:</strong> 25 poin - Tingkat pendidikan dan relevansi jurusan</li>
                      <li><strong>Keahlian Teknis:</strong> 25 poin - Penguasaan tools dan teknologi</li>
                      <li><strong>Soft Skills:</strong> 15 poin - Kemampuan interpersonal dan profesionalisme</li>
                    </ul>
                  </div>

                  <div className="preview-highlight-box">
                    <div className="preview-highlight-title">
                      <span>✅</span> Kriteria Kelulusan
                    </div>
                    <div className="preview-highlight-content">
                      <strong>Total Score: 100 poin</strong><br /><br />
                      <strong>Passing Score: ≥ 70 poin</strong><br />
                      CV dengan skor 70 ke atas akan otomatis diteruskan ke tahap wawancara.<br /><br />
                      <strong>Rejected: &lt; 70 poin</strong><br />
                      CV dengan skor di bawah 70 akan mendapat email penolakan otomatis.
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="preview-section">
                <h3 className="preview-section-title">📎 File Panduan Tambahan</h3>
                
                <div className="preview-no-file-state">
                  <div className="preview-no-file-icon">📄</div>
                  <div className="preview-no-file-text">
                    <strong>Tidak ada file yang diunggah</strong><br />
                    Anda dapat mengunggah file panduan tambahan (PDF, DOC, DOCX) untuk referensi AI yang lebih detail.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="preview-modal-footer">
              <button className="preview-footer-btn secondary" onClick={closePreviewModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreeningSettings;