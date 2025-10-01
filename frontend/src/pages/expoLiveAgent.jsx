import React, { useState, useEffect } from "react";
import feather from "feather-icons";
import "../styles/expoLiveAgent.css";

function ExpoLiveAgent() {
  // State
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Feather icon refresh
  useEffect(() => {
    feather.replace();
  }, [uploadedFiles, selectedCategories, searchTerm]);

  // Handle category toggle
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1), // KB
      type: getFileType(file.name),
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const getFileType = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (ext === "doc" || ext === "docx") return "doc";
    if (ext === "xls" || ext === "xlsx") return "xlsx";
    if (ext === "txt") return "txt";
    return "txt";
  };

  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  // Reset form
  const resetForm = () => {
    setFolderName("");
    setFolderDescription("");
    setExternalLink("");
    setSelectedCategories([]);
    setUploadedFiles([]);
    alert("Form reset!");
  };

  // Save folder
  const saveFolder = () => {
    if (!folderName) {
      alert("Folder name is required!");
      return;
    }
    alert("Folder saved successfully ✅");
    resetForm();
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🤖 Live Agent – Knowledge Sales</h1>
        <p>
          Upload and manage knowledge base folders for Sales team to be used in
          Live Agent responses.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-number">8</div>
          <div className="stat-label">Knowledge Folders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">47</div>
          <div className="stat-label">Total Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">6</div>
          <div className="stat-label">Active Folders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">92%</div>
          <div className="stat-label">Agent Accuracy</div>
        </div>
      </div>

      <div className="main-content">
        {/* Upload Section */}
        <div className="upload-section">
          <div className="section-header">
            <i data-feather="folder-plus"></i>
            <div className="section-title">Add New Knowledge Folder</div>
          </div>

          <div className="form-group">
            <label>📁 Folder Name *</label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="e.g. Sales Guidelines 2025"
            />
          </div>

          <div className="form-group">
            <label>📝 Folder Description</label>
            <textarea
              className="textarea-large"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
              placeholder="Describe the folder..."
            ></textarea>
          </div>

          {/* Categories */}
          <div className="categories-section">
            <label>🏷️ Category Tags</label>
            <div className="category-tags">
              {["Pricing", "FAQ", "Objection Handling", "Sales Pitch", "Product Info", "Sales Process"].map((cat) => (
                <div
                  key={cat}
                  className={`category-tag ${
                    selectedCategories.includes(cat.toLowerCase())
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => toggleCategory(cat.toLowerCase())}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Upload */}
          <div className="form-group">
            <label>📄 Upload Documents</label>
            <div
              className="upload-area"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div className="upload-icon">
                <i data-feather="upload-cloud"></i>
              </div>
              <div className="upload-text">
                <h3>Drop files here or click to upload</h3>
              </div>
              <input
                type="file"
                id="fileInput"
                multiple
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>

            {/* Uploaded Files */}
            <div className="uploaded-files">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="uploaded-file">
                  <div className="file-info">
                    <div className={`file-icon ${file.type}`}>
                      <i data-feather="file-text"></i>
                    </div>
                    <div className="file-details">
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{file.size} KB</div>
                    </div>
                  </div>
                  <button
                    className="remove-file"
                    onClick={() => removeFile(index)}
                  >
                    <i data-feather="x"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>🔗 External Folder Link</label>
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <button className="btn btn-secondary" onClick={resetForm}>
              <i data-feather="refresh-cw"></i> Reset
            </button>
            <button className="btn btn-primary" onClick={saveFolder}>
              <i data-feather="save"></i> Save Knowledge Folder
            </button>
          </div>
        </div>

        {/* Knowledge List (static contoh) */}
        <div className="knowledge-list">
          <div className="section-header">
            <i data-feather="database"></i>
            <div className="section-title">Knowledge Folders</div>
          </div>

          <div className="list-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i data-feather="search" className="search-icon"></i>
            </div>
          </div>

          <div className="folders-grid">
            <div className="folder-card active">
              <div className="folder-header">
                <div className="folder-info">
                  <div className="folder-name">
                    <i data-feather="folder"></i> Sales Guidelines 2025
                  </div>
                  <div className="folder-description">
                    Comprehensive sales pitch templates, pricing strategies, and
                    objection handling scripts.
                  </div>
                  <div className="folder-meta">
                    <span>
                      <i data-feather="file"></i> 15 files
                    </span>
                    <span>
                      <i data-feather="calendar"></i> Updated 2 days ago
                    </span>
                  </div>
                </div>
                <div className="folder-status status-active">
                  <i data-feather="check-circle"></i> Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="left-actions">
          <button className="btn btn-outline">
            <i data-feather="play-circle"></i> Preview in Live Agent
          </button>
          <button className="btn btn-secondary">
            <i data-feather="download"></i> Export Knowledge List
          </button>
        </div>
        <div className="right-actions">
          <button className="btn btn-outline">
            <i data-feather="refresh-cw"></i> Sync with Agent
          </button>
          <button className="btn btn-primary">
            <i data-feather="check"></i> Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpoLiveAgent;