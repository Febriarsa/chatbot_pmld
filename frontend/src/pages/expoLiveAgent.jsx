import React, { useState, useEffect } from "react";
import { 
  FolderPlus, 
  Database, 
  RefreshCw, 
  Save, 
  PlayCircle, 
  Download, 
  Check, 
  UploadCloud, 
  FileText, 
  X, 
  Search,
  Folder,
  Calendar,
  User,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  Clock,
  File,
  MapPin
} from "react-feather";
import "../styles/expoLiveAgent.css";

function ExpoLiveAgent() {
  // State
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal states
  const [showKnowledgePreviewModal, setShowKnowledgePreviewModal] = useState(false);
  const [selectedFolderForPreview, setSelectedFolderForPreview] = useState(null);
  
  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    categories: [],
    files: [],
    externalLink: "",
    status: "active"
  });

  // Sample folder data for previews and editing
  const [folderDatabase, setFolderDatabase] = useState({
    'sales-guidelines': {
      id: 'sales-guidelines',
      title: 'Sales Guidelines 2025',
      description: 'Comprehensive sales pitch templates, pricing strategies, and objection handling scripts for Q1-Q4 2025.',
      totalDocs: 15,
      topics: 3,
      updated: '2 days ago',
      manager: 'Sales Manager',
      status: 'Active & Synced with Agent',
      accuracy: '92%',
      statusType: 'active',
      categories: ['pricing', 'sales pitch', 'objection handling'],
      externalLink: 'https://drive.google.com/sales-guidelines',
      documents: [
        {
          name: 'Q1_Pricing_Strategy_2025.pdf',
          size: '2.4 MB',
          type: 'PDF',
          preview: 'This document outlines the comprehensive pricing strategy for Q1 2025, including competitive analysis, discount structures, and volume-based pricing tiers...'
        },
        {
          name: 'Sales_Pitch_Template.docx',
          size: '1.8 MB',
          type: 'DOCX',
          preview: 'Ready-to-use sales pitch templates covering different customer personas, industry verticals, and use cases. Includes objection handling responses...'
        },
        {
          name: 'Objection_Handling_Scripts.pdf',
          size: '1.2 MB',
          type: 'PDF',
          preview: 'Comprehensive scripts for handling common sales objections including pricing concerns, competitor comparisons, and feature gaps...'
        },
        {
          name: 'Competitor_Comparison_Matrix.xlsx',
          size: '856 KB',
          type: 'XLSX',
          preview: 'Detailed comparison matrix showing our products vs competitors across key features, pricing, and value propositions...'
        },
        {
          name: 'Customer_Success_Stories.pdf',
          size: '3.1 MB',
          type: 'PDF',
          preview: 'Collection of customer success stories and case studies demonstrating real-world ROI and implementation success...'
        },
        {
          name: 'Product_Demo_Guide.docx',
          size: '2.0 MB',
          type: 'DOCX',
          preview: 'Step-by-step guide for conducting effective product demonstrations, including key features to highlight and common questions...'
        }
      ],
      topicTags: ['Pricing', 'Sales Pitch', 'Objection Handling'],
      usage: {
        icon: '🤖',
        title: 'AI Agent Usage',
        text: 'This knowledge folder is actively used by the Live Agent to answer customer questions about pricing, sales strategies, and product positioning. The agent references these documents 150+ times daily with 92% accuracy rate.'
      }
    },
    'client-onboarding': {
      id: 'client-onboarding',
      title: 'Client Onboarding Scripts',
      description: 'Step-by-step scripts for onboarding new clients and explaining our services.',
      totalDocs: 5,
      topics: 3,
      updated: '1 week ago',
      manager: 'Admin',
      status: 'Incomplete - Add more files',
      accuracy: '78%',
      statusType: 'incomplete',
      categories: ['pricing', 'sales pitch', 'objection handling'],
      externalLink: '',
      documents: [
        {
          name: 'Welcome_Email_Template.docx',
          size: '456 KB',
          type: 'DOCX',
          preview: 'Professional welcome email template for new clients including introduction to team, next steps, and resources...'
        },
        {
          name: 'Onboarding_Checklist.pdf',
          size: '892 KB',
          type: 'PDF',
          preview: 'Complete onboarding checklist covering account setup, training sessions, integration steps, and milestone reviews...'
        },
        {
          name: 'Service_Overview_Presentation.pptx',
          size: '5.2 MB',
          type: 'PPTX',
          preview: 'Visual presentation deck explaining our services, methodologies, team structure, and support channels...'
        },
        {
          name: 'FAQ_New_Clients.pdf',
          size: '1.1 MB',
          type: 'PDF',
          preview: 'Frequently asked questions from new clients covering billing, support hours, escalation procedures, and SLAs...'
        },
        {
          name: 'Training_Schedule_Template.xlsx',
          size: '234 KB',
          type: 'XLSX',
          preview: 'Customizable training schedule template with recommended session topics, durations, and learning objectives...'
        }
      ],
      topicTags: ['Pricing', 'Sales Pitch', 'Objection Handling'],
      usage: {
        icon: '⚠️',
        title: 'Limited Agent Coverage',
        text: 'This folder needs more comprehensive documentation. The AI agent currently has lower accuracy (78%) when answering onboarding questions. Consider adding more detailed scripts, FAQs, and process documentation.'
      }
    },
    'product-knowledge': {
      id: 'product-knowledge',
      title: 'Product Knowledge Base',
      description: 'Detailed product specifications, feature comparisons, and technical documentation for all products.',
      totalDocs: 23,
      topics: 3,
      updated: '3 days ago',
      manager: 'Product Team',
      status: 'Active & Synced with Agent',
      accuracy: '95%',
      statusType: 'active',
      categories: ['features', 'specifications', 'comparisons'],
      externalLink: 'https://docs.company.com/products',
      documents: [
        {
          name: 'Product_Catalog_2025.pdf',
          size: '8.4 MB',
          type: 'PDF',
          preview: 'Complete product catalog with detailed specifications, features, pricing, and use cases for all product lines...'
        },
        {
          name: 'Feature_Comparison_Chart.xlsx',
          size: '1.2 MB',
          type: 'XLSX',
          preview: 'Side-by-side comparison of features across different product tiers and packages...'
        },
        {
          name: 'Technical_Specifications.pdf',
          size: '3.6 MB',
          type: 'PDF',
          preview: 'In-depth technical documentation including system requirements, API specifications, integration guides, and architecture diagrams...'
        },
        {
          name: 'Integration_Guide.docx',
          size: '2.8 MB',
          type: 'DOCX',
          preview: 'Comprehensive integration guide with step-by-step instructions, code samples, and troubleshooting tips...'
        },
        {
          name: 'Product_Roadmap_2025.pdf',
          size: '1.9 MB',
          type: 'PDF',
          preview: 'Strategic product roadmap highlighting upcoming features, enhancements, and release timelines for 2025...'
        },
        {
          name: 'User_Manual_Complete.pdf',
          size: '12.3 MB',
          type: 'PDF',
          preview: 'Comprehensive user manual covering all features, workflows, best practices, and advanced configurations...'
        }
      ],
      topicTags: ['Features', 'Specifications', 'Comparisons'],
      usage: {
        icon: '🎯',
        title: 'High Performance Knowledge Base',
        text: 'This is one of the most frequently accessed knowledge folders. The AI agent uses these documents to answer 300+ product-related questions daily with 95% accuracy. Excellent resource coverage!'
      }
    }
  });

  // Edit Modal Functions
  const openEditModal = (folderId) => {
    const folder = folderDatabase[folderId];
    if (folder) {
      setEditingFolder(folderId);
      setEditForm({
        name: folder.title,
        description: folder.description,
        categories: folder.categories || [],
        files: folder.documents || [],
        externalLink: folder.externalLink || '',
        status: folder.statusType
      });
      setShowEditModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingFolder(null);
    setEditForm({
      name: "",
      description: "",
      categories: [],
      files: [],
      externalLink: "",
      status: "active"
    });
    document.body.style.overflow = 'auto';
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleEditCategory = (category) => {
    setEditForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const removeEditFile = (index) => {
    setEditForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleEditFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      type: getFileTypeFromName(file.name),
      preview: `New document: ${file.name.split('.')[0]}...`,
      isNew: true
    }));
    
    setEditForm(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
  };

  const getFileTypeFromName = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch(ext) {
      case 'pdf': return 'PDF';
      case 'doc':
      case 'docx': return 'DOCX';
      case 'xls':
      case 'xlsx': return 'XLSX';
      case 'ppt':
      case 'pptx': return 'PPTX';
      default: return 'DOC';
    }
  };

  const saveEditChanges = () => {
    if (!editForm.name.trim()) {
      alert('Folder name is required!');
      return;
    }

    // Update the folder in database
    setFolderDatabase(prev => ({
      ...prev,
      [editingFolder]: {
        ...prev[editingFolder],
        title: editForm.name,
        description: editForm.description,
        categories: editForm.categories,
        documents: editForm.files,
        externalLink: editForm.externalLink,
        statusType: editForm.status,
        status: editForm.status === 'active' ? 'Active & Synced with Agent' : 
               editForm.status === 'incomplete' ? 'Incomplete - Add more files' : 'Draft',
        totalDocs: editForm.files.length,
        updated: 'Just now',
        topicTags: editForm.categories.map(cat => 
          cat.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
        )
      }
    }));

    closeEditModal();
    alert('✅ Folder updated successfully!');
  };

  // Knowledge Preview Modal Functions
  const openKnowledgePreviewModal = (folderId) => {
    setSelectedFolderForPreview(folderId);
    setShowKnowledgePreviewModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeKnowledgePreviewModal = () => {
    setShowKnowledgePreviewModal(false);
    setSelectedFolderForPreview(null);
    document.body.style.overflow = 'auto';
  };

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        if (showKnowledgePreviewModal) {
          closeKnowledgePreviewModal();
        }
        if (showEditModal) {
          closeEditModal();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showKnowledgePreviewModal, showEditModal]);

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

  // Action handlers
  const previewInLiveAgent = () => {
    alert("Opening Live Agent preview...");
  };

  const exportKnowledgeList = () => {
    alert("Exporting knowledge list...");
  };

  const syncWithAgent = () => {
    alert("Syncing with agent...");
  };

  const saveAllChanges = () => {
    alert("All changes saved successfully!");
  };

  // Get file icon by type
  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return '📕';
      case 'DOCX': return '📘';
      case 'XLSX': return '📗';
      case 'PPTX': return '📙';
      default: return '📄';
    }
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
            <FolderPlus size={20} />
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
                <UploadCloud size={48} />
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
                      <FileText size={20} />
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
                    <X size={16} />
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
              <RefreshCw size={16} /> Reset
            </button>
            <button className="btn btn-primary" onClick={saveFolder}>
              <Save size={16} /> Save Knowledge Folder
            </button>
          </div>
        </div>

        {/* Knowledge List */}
        <div className="knowledge-list">
          <div className="section-header">
            <Database size={20} />
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
              <Search className="search-icon" size={16} />
            </div>
          </div>

          <div className="folders-grid">
            {Object.entries(folderDatabase).map(([folderId, folder]) => (
              <div key={folderId} className={`folder-card ${folder.statusType}`}>
                <div className="folder-header">
                  <div className="folder-title-row">
                    <span className="folder-icon">📁</span>
                    <h3 className="folder-title">{folder.title}</h3>
                  </div>
                  <span className={`status-badge ${folder.statusType}`}>
                    {folder.statusType === 'active' ? (
                      <>
                        <CheckCircle size={14} /> Active
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={14} /> Incomplete
                      </>
                    )}
                  </span>
                </div>

                <p className="folder-description">
                  {folder.description}
                </p>

                <div className="folder-meta">
                  <div className="meta-item">
                    <File size={14} /> {folder.totalDocs} files
                  </div>
                  <div className="meta-item">
                    <User size={14} /> {folder.manager}
                  </div>
                  <div className="meta-item">
                    <Clock size={14} /> {folder.updated}
                  </div>
                </div>

                <div className="folder-tags">
                  {folder.topicTags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="folder-actions">
                  <button 
                    className="folder-btn" 
                    onClick={() => openEditModal(folderId)}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button 
                    className="folder-btn preview" 
                    onClick={() => openKnowledgePreviewModal(folderId)}
                  >
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="left-actions">
          <button className="btn btn-outline" onClick={previewInLiveAgent}>
            <PlayCircle size={16} /> Preview in Live Agent
          </button>
          <button className="btn btn-secondary" onClick={exportKnowledgeList}>
            <Download size={16} /> Export Knowledge List
          </button>
        </div>
        <div className="right-actions">
          <button className="btn btn-outline" onClick={syncWithAgent}>
            <RefreshCw size={16} /> Sync with Agent
          </button>
          <button className="btn btn-primary" onClick={saveAllChanges}>
            <Check size={16} /> Save All Changes
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingFolder && (
        <div className="edit-modal-overlay" onClick={closeEditModal}>
          <div className="edit-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="edit-modal-header">
              <div className="edit-modal-title-section">
                <h2 className="edit-modal-title">
                  <Edit size={24} />
                  Edit Knowledge Folder
                </h2>
                <p className="edit-modal-subtitle">
                  Modify folder details, documents, and settings
                </p>
              </div>
              <button className="edit-modal-close-btn" onClick={closeEditModal}>
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="edit-modal-body">
              {/* Basic Info */}
              <div className="edit-section">
                <h3 className="edit-section-title">📁 Basic Information</h3>
                <div className="edit-form-group">
                  <label>Folder Name *</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleEditFormChange('name', e.target.value)}
                    placeholder="Enter folder name"
                  />
                </div>
                <div className="edit-form-group">
                  <label>Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => handleEditFormChange('description', e.target.value)}
                    placeholder="Describe the folder purpose and content"
                    rows="3"
                  />
                </div>
                <div className="edit-form-group">
                  <label>External Link</label>
                  <input
                    type="url"
                    value={editForm.externalLink}
                    onChange={(e) => handleEditFormChange('externalLink', e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                </div>
                <div className="edit-form-group">
                  <label>Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => handleEditFormChange('status', e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Categories */}
              <div className="edit-section">
                <h3 className="edit-section-title">🏷️ Categories</h3>
                <div className="edit-categories">
                  {["pricing", "faq", "objection handling", "sales pitch", "product info", "sales process", "features", "specifications", "comparisons"].map((cat) => (
                    <div
                      key={cat}
                      className={`edit-category-tag ${
                        editForm.categories.includes(cat) ? "selected" : ""
                      }`}
                      onClick={() => toggleEditCategory(cat)}
                    >
                      {cat.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="edit-section">
                <h3 className="edit-section-title">📄 Documents ({editForm.files.length})</h3>
                
                {/* Add Files */}
                <div className="edit-upload-area">
                  <input
                    type="file"
                    id="editFileInput"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleEditFileUpload}
                  />
                  <button
                    className="edit-upload-btn"
                    onClick={() => document.getElementById("editFileInput").click()}
                  >
                    <Plus size={16} />
                    Add Documents
                  </button>
                </div>

                {/* Files List */}
                <div className="edit-files-list">
                  {editForm.files.map((file, index) => (
                    <div key={index} className={`edit-file-item ${file.isNew ? 'new' : ''}`}>
                      <div className="edit-file-info">
                        <div className="edit-file-icon">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="edit-file-details">
                          <div className="edit-file-name">
                            {file.name}
                            {file.isNew && <span className="new-badge">NEW</span>}
                          </div>
                          <div className="edit-file-meta">{file.type} • {file.size}</div>
                          <div className="edit-file-preview">{file.preview}</div>
                        </div>
                      </div>
                      <button
                        className="edit-remove-file"
                        onClick={() => removeEditFile(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="edit-modal-footer">
              <div className="edit-footer-info">
                <div className="edit-info-item">
                  <File size={16} />
                  <span>{editForm.files.length} documents</span>
                </div>
                <div className="edit-info-item">
                  <span>🏷️</span>
                  <span>{editForm.categories.length} categories</span>
                </div>
              </div>
              <div className="edit-footer-actions">
                <button className="edit-footer-btn secondary" onClick={closeEditModal}>
                  Cancel
                </button>
                <button className="edit-footer-btn primary" onClick={saveEditChanges}>
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Preview Modal */}
      {showKnowledgePreviewModal && selectedFolderForPreview && (
        <div className="knowledge-preview-modal-overlay" onClick={closeKnowledgePreviewModal}>
          <div className="knowledge-preview-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="knowledge-preview-modal-header">
              <div className="knowledge-preview-modal-header-top">
                <div className="knowledge-preview-modal-title-section">
                  <div className="knowledge-preview-modal-breadcrumb">Knowledge Base / Live Agent</div>
                  <h2 className="knowledge-preview-modal-title">
                    <span>📁</span>
                    <span>{folderDatabase[selectedFolderForPreview].title}</span>
                  </h2>
                  <p className="knowledge-preview-modal-subtitle">
                    {folderDatabase[selectedFolderForPreview].description}
                  </p>
                </div>
                <button className="knowledge-preview-close-btn" onClick={closeKnowledgePreviewModal}>
                  <X size={24} />
                </button>
              </div>

              <div className="knowledge-preview-modal-stats">
                <div className="knowledge-preview-stat-card">
                  <div className="knowledge-preview-stat-label">Total Documents</div>
                  <div className="knowledge-preview-stat-value">
                    <span>📄</span>
                    <span>{folderDatabase[selectedFolderForPreview].totalDocs}</span>
                  </div>
                </div>
                <div className="knowledge-preview-stat-card">
                  <div className="knowledge-preview-stat-label">Topics Covered</div>
                  <div className="knowledge-preview-stat-value">
                    <span>🏷️</span>
                    <span>{folderDatabase[selectedFolderForPreview].topics}</span>
                  </div>
                </div>
                <div className="knowledge-preview-stat-card">
                  <div className="knowledge-preview-stat-label">Last Updated</div>
                  <div className="knowledge-preview-stat-value">
                    <span>🕐</span>
                    <span>{folderDatabase[selectedFolderForPreview].updated}</span>
                  </div>
                </div>
                <div className="knowledge-preview-stat-card">
                  <div className="knowledge-preview-stat-label">Managed By</div>
                  <div className="knowledge-preview-stat-value">
                    <span>👤</span>
                    <span>{folderDatabase[selectedFolderForPreview].manager}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="knowledge-preview-modal-body">
              {/* Documents Section */}
              <div className="knowledge-preview-section">
                <div className="knowledge-preview-section-header">
                  <h3 className="knowledge-preview-section-title">
                    📄 Documents ({folderDatabase[selectedFolderForPreview].documents.length})
                  </h3>
                  <span className="knowledge-preview-section-action" onClick={() => alert('View all documents')}>
                    View All →
                  </span>
                </div>
                <div className="knowledge-preview-documents-grid">
                  {folderDatabase[selectedFolderForPreview].documents.map((doc, index) => (
                    <div key={index} className="knowledge-preview-document-card">
                      <div className="knowledge-preview-doc-header">
                        <div className="knowledge-preview-doc-icon">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="knowledge-preview-doc-info">
                          <div className="knowledge-preview-doc-name">{doc.name}</div>
                          <div className="knowledge-preview-doc-meta">{doc.type} • {doc.size}</div>
                        </div>
                      </div>
                      <div className="knowledge-preview-doc-preview">{doc.preview}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Section */}
              <div className="knowledge-preview-section">
                <div className="knowledge-preview-section-header">
                  <h3 className="knowledge-preview-section-title">🏷️ Topics Covered</h3>
                </div>
                <div className="knowledge-preview-tags-section">
                  {folderDatabase[selectedFolderForPreview].topicTags.map((topic, index) => (
                    <span key={index} className="knowledge-preview-topic-tag">{topic}</span>
                  ))}
                </div>
              </div>

              {/* Usage Section */}
              <div className="knowledge-preview-section">
                <div className="knowledge-preview-section-header">
                  <h3 className="knowledge-preview-section-title">📊 AI Agent Performance</h3>
                </div>
                <div className="knowledge-preview-usage-info">
                  <div className="knowledge-preview-usage-icon">
                    {folderDatabase[selectedFolderForPreview].usage.icon}
                  </div>
                  <div className="knowledge-preview-usage-content">
                    <h4>{folderDatabase[selectedFolderForPreview].usage.title}</h4>
                    <p>{folderDatabase[selectedFolderForPreview].usage.text}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="knowledge-preview-modal-footer">
              <div className="knowledge-preview-footer-info">
                <div className="knowledge-preview-footer-info-item">
                  <span>✓</span>
                  <span>{folderDatabase[selectedFolderForPreview].status}</span>
                </div>
                <div className="knowledge-preview-footer-info-item">
                  <span>🤖</span>
                  <span>Agent Accuracy: <strong>{folderDatabase[selectedFolderForPreview].accuracy}</strong></span>
                </div>
              </div>
              <div className="knowledge-preview-footer-actions">
                <button className="knowledge-preview-footer-btn secondary" onClick={closeKnowledgePreviewModal}>
                  Close
                </button>
                <button 
                  className="knowledge-preview-footer-btn primary" 
                  onClick={() => {
                    closeKnowledgePreviewModal();
                    openEditModal(selectedFolderForPreview);
                  }}
                >
                  <Edit size={16} />
                  Edit Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpoLiveAgent;