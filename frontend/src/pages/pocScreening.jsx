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
} from "react-feather";
import "../styles/pocScreening.css";

const ScreeningSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState(["JavaScript", "React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
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
        {/* Tab 1 */}
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

            <div className="email-templates">
              <div className="template-box">
                <h3>
                  <CheckCircle color="#28a745" />
                  Accept Email Template
                </h3>
                <div className="form-group">
                  <label>Subject Line</label>
                  <input type="text" defaultValue="Selamat! Aplikasi Anda untuk {{position}} diterima" />
                </div>
                <div className="form-group">
                  <label>Email Content</label>
                  <textarea className="textarea-large" defaultValue={`Dear {{candidate_name}},

Selamat! Kami dengan senang hati memberitahukan bahwa CV Anda untuk posisi {{position}} di {{company_name}} telah lolos tahap screening awal.

Tim HR kami akan segera menghubungi Anda untuk tahap selanjutnya.

Terima kasih,
HR Team {{company_name}}`}></textarea>
                </div>
              </div>

              <div className="template-box">
                <h3>
                  <XCircle color="#dc3545" />
                  Decline Email Template
                </h3>
                <div className="form-group">
                  <label>Subject Line</label>
                  <input type="text" defaultValue="Terima kasih atas aplikasi Anda untuk {{position}}" />
                </div>
                <div className="form-group">
                  <label>Email Content</label>
                  <textarea className="textarea-large" defaultValue={`Dear {{candidate_name}},

Terima kasih atas minat Anda untuk posisi {{position}} di {{company_name}}.

Setelah review CV Anda, kami melanjutkan dengan kandidat lain.

Best regards,
HR Team {{company_name}}`}></textarea>
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

            <button className="btn btn-outline">
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
        <button className="btn btn-secondary">
          <Eye /> Preview Workflow
        </button>
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
    </div>
  );
};

export default ScreeningSettings;
