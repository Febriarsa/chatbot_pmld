import React, { useState, useEffect } from "react";
import {
  Download,
  Plus,
  Grid,
  List,
  CheckCircle,
  PauseCircle,
  Edit3,
  Eye,
  Trash2,
  ExternalLink,
  Folder,
  FileText,
  File,
  AlertTriangle,
  Save,
  Loader,
  Info,
} from "react-feather";
import "../styles/pocKnowledge.css";

const KnowledgeManager = () => {
  const [view, setView] = useState("card"); // card or table
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleForm, setRoleForm] = useState({
    roleName: "",
    department: "",
    folderUrl: "",
    spreadsheetUrl: "",
    description: "",
    isActive: true,
  });
  const [notification, setNotification] = useState(null);

  // dummy data
  const [roles, setRoles] = useState([
    {
      id: "frontend-dev",
      name: "Senior Frontend Developer",
      department: "Engineering",
      status: "active",
      valid: true,
      updated: "2 days ago",
      by: "Admin",
      resources: [
        {
          type: "folder",
          name: "CV Templates Folder",
          url: "drive.google.com/drive/folders/1abc...",
          valid: true,
        },
        {
          type: "spreadsheet",
          name: "Screening Criteria",
          url: "sheets.google.com/spreadsheets/1def...",
          valid: true,
        },
      ],
    },
    {
      id: "product-manager",
      name: "Product Manager",
      department: "Product",
      status: "active",
      valid: false,
      updated: "1 week ago",
      by: "HR Team",
      resources: [
        {
          type: "folder",
          name: "CV Templates Folder",
          url: "",
          valid: false,
        },
        {
          type: "spreadsheet",
          name: "Screening Criteria",
          url: "sheets.google.com/spreadsheets/1ghi...",
          valid: true,
        },
      ],
    },
    {
      id: "ui-designer",
      name: "UX/UI Designer",
      department: "Design",
      status: "inactive",
      valid: true,
      updated: "3 weeks ago",
      by: "Design Lead",
      resources: [
        {
          type: "folder",
          name: "Portfolio Guidelines",
          url: "drive.google.com/drive/folders/1jkl...",
          valid: true,
        },
        {
          type: "spreadsheet",
          name: "Design Skills Matrix",
          url: "sheets.google.com/spreadsheets/1mno...",
          valid: true,
        },
      ],
    },
  ]);

  // Handle form input
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setRoleForm({
      ...roleForm,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const openModal = (role = null) => {
    setEditingRole(role ? role.id : null);
    if (role) {
      setRoleForm({
        roleName: role.name,
        department: role.department.toLowerCase(),
        folderUrl: role.resources[0]?.url || "",
        spreadsheetUrl: role.resources[1]?.url || "",
        description: role.description || "",
        isActive: role.status === "active",
      });
    } else {
      setRoleForm({
        roleName: "",
        department: "",
        folderUrl: "",
        spreadsheetUrl: "",
        description: "",
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const saveRole = () => {
    if (!roleForm.roleName) {
      showNotification("Role name is required", "error");
      return;
    }

    if (editingRole) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editingRole
            ? {
                ...r,
                name: roleForm.roleName,
                department: roleForm.department,
                status: roleForm.isActive ? "active" : "inactive",
              }
            : r
        )
      );
      showNotification("Role updated successfully!", "success");
    } else {
      setRoles((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: roleForm.roleName,
          department: roleForm.department,
          status: roleForm.isActive ? "active" : "inactive",
          valid: true,
          updated: "just now",
          by: "Admin",
          resources: [],
        },
      ]);
      showNotification("Role added successfully!", "success");
    }

    setIsModalOpen(false);
  };

  const deleteRole = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    showNotification("Role deleted!", "error");
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>🗂️ Knowledge Settings</h1>
          <p>Manage folders and spreadsheets for each role to support CV screening and AI analysis.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => showNotification("Exported!", "success")}>
            <Download size={16} /> Export Data
          </button>
          <button className="btn btn-primary" onClick={() => openModal()}>
            <Plus size={16} /> Add New Role
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-card">
          <h3>{roles.length}</h3>
          <p>Total Roles</p>
        </div>
        <div className="stat-card">
          <h3>{roles.filter((r) => r.valid).length}</h3>
          <p>Valid Resources</p>
        </div>
        <div className="stat-card">
          <h3>{roles.filter((r) => !r.valid).length}</h3>
          <p>Need Attention</p>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-bar">
        <div className="search-filter">
          <div className="search-box">
            <input type="text" placeholder="Search roles..." />
          </div>
          <select className="filter-select">
            <option value="">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="design">Design</option>
          </select>
          <select className="filter-select">
            <option value="">All Status</option>
            <option value="valid">Valid Resources</option>
            <option value="invalid">Need Attention</option>
          </select>
        </div>
        <div className="view-toggle">
          <button className={view === "card" ? "active" : ""} onClick={() => setView("card")}>
            <Grid size={16} /> Cards
          </button>
          <button className={view === "table" ? "active" : ""} onClick={() => setView("table")}>
            <List size={16} /> Table
          </button>
        </div>
      </div>

      {/* Roles View */}
      {view === "card" ? (
        <div className="roles-grid">
          {roles.map((role) => (
            <div className={`role-card ${role.valid ? "valid" : "invalid"}`} key={role.id}>
              <div className="role-header">
                <div className="role-info">
                  <h3>{role.name}</h3>
                  <div className="role-department">{role.department}</div>
                </div>
                <div className={`role-status status-${role.status}`}>
                  {role.status === "active" ? <CheckCircle size={16} /> : <PauseCircle size={16} />}
                  {role.status}
                </div>
              </div>

              <div className="role-resources">
                {role.resources.map((res, i) => (
                  <div className="resource-item" key={i}>
                    {res.type === "folder" ? <Folder /> : <File />}
                    <div className="resource-info">
                      <div className="resource-name">{res.name}</div>
                      <div className="resource-url">{res.url || "Not configured"}</div>
                    </div>
                    <div className="resource-status">
                      <div className={`status-indicator ${res.valid ? "status-valid" : "status-invalid"}`}></div>
                      {res.url ? (
                        <a href={res.url} className="btn btn-sm btn-outline">
                          <ExternalLink size={14} /> Open
                        </a>
                      ) : (
                        <button className="btn btn-sm btn-outline">
                          <Plus size={14} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="role-actions">
                <button className="btn btn-sm btn-outline" onClick={() => openModal(role)}>
                  <Edit3 size={14} /> Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteRole(role.id)}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>

              <div className="role-meta">
                <span>Last updated: {role.updated}</span>
                <span>By: {role.by}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="roles-table active">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.department}</td>
                <td>{r.status}</td>
                <td>{r.updated}</td>
                <td className="table-actions">
                  <button className="btn btn-sm btn-outline" onClick={() => openModal(r)}>
                    <Edit3 size={14} />
                  </button>
                  
                  <button className="btn btn-sm btn-danger" onClick={() => deleteRole(r.id)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingRole ? "Edit Role" : "Add New Role"}</h2>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>

            <div className="form-group">
              <label>Role Name *</label>
              <input id="roleName" value={roleForm.roleName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select id="department" value={roleForm.department} onChange={handleChange}>
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="product">Product</option>
                <option value="design">Design</option>
              </select>
            </div>
            <div className="form-group">
              <label>Folder URL</label>
              <input id="folderUrl" value={roleForm.folderUrl} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Spreadsheet URL</label>
              <input id="spreadsheetUrl" value={roleForm.spreadsheetUrl} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea id="description" value={roleForm.description} onChange={handleChange}></textarea>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isActive"
                checked={roleForm.isActive}
                onChange={handleChange}
              />
              <label htmlFor="isActive">Mark as Active</label>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveRole}>
                <Save size={16} /> Save Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === "success" ? <CheckCircle size={16} /> : notification.type === "error" ? <AlertTriangle size={16} /> : <Info size={16} />}
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default KnowledgeManager;
