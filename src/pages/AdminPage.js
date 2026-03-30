import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

function AdminPage({ onLogout }) {
  const [documents, setDocuments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [sources, setSources] = useState([]);
  const [srcUploading, setSrcUploading] = useState(false);
  const [srcResults, setSrcResults] = useState([]);
  const [srcFile, setSrcFile] = useState(null);
  const [srcName, setSrcName] = useState('');
  const [srcDesc, setSrcDesc] = useState('');
  const [srcSharable, setSrcSharable] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [docsRes, srcRes] = await Promise.all([
        axios.get(`${API}/api/docs`),
        axios.get(`${API}/api/sources`),
      ]);
      setDocuments(docsRes.data.documents || []);
      setNotes(docsRes.data.notes || []);
      setSources(srcRes.data.sources || []);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleUpload = async (files) => {
    if (!files.length) return;
    setUploading(true);
    setUploadResults([]);

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    try {
      const res = await axios.post(`${API}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadResults(res.data.results || []);
      loadData();
    } catch (err) {
      setUploadResults([{ filename: 'Upload', status: 'error', error: err.message }]);
    }

    setUploading(false);
  };

  const handleDelete = async (docId) => {
    if (!window.confirm('Remove this document from the knowledge base?')) return;
    try {
      await axios.delete(`${API}/api/docs/${docId}`);
      loadData();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    try {
      await axios.post(`${API}/api/docs/notes`, { title: noteTitle, content: noteContent });
      setNoteTitle('');
      setNoteContent('');
      loadData();
    } catch (err) {
      alert('Failed to add note: ' + err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await axios.delete(`${API}/api/docs/notes/${noteId}`);
      loadData();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(Array.from(e.dataTransfer.files));
  };

  const handleSourceUpload = async (e) => {
    e.preventDefault();
    if (!srcFile) return;
    setSrcUploading(true);
    setSrcResults([]);
    const formData = new FormData();
    formData.append('file', srcFile);
    formData.append('displayName', srcName.trim() || srcFile.name);
    formData.append('description', srcDesc.trim());
    formData.append('sharable', srcSharable);
    try {
      const res = await axios.post(`${API}/api/sources`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSrcResults([{ filename: res.data.source.displayName, status: 'success' }]);
      setSrcFile(null);
      setSrcName('');
      setSrcDesc('');
      setSrcSharable(true);
      loadData();
    } catch (err) {
      setSrcResults([{ filename: srcFile.name, status: 'error', error: err.message }]);
    }
    setSrcUploading(false);
  };

  const handleToggleSharable = async (srcId, currentValue) => {
    try {
      await axios.patch(`${API}/api/sources/${srcId}`, { sharable: !currentValue });
      loadData();
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const handleDeleteSource = async (srcId) => {
    if (!window.confirm('Delete this source file? Users will no longer be able to download it.')) return;
    try {
      await axios.delete(`${API}/api/sources/${srcId}`);
      loadData();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="admin-page">
      <div className="admin-header-row">
        <h1>Admin Panel &mdash; Knowledge Base Manager</h1>
        {onLogout && <button className="admin-logout" onClick={onLogout}>Lock Admin</button>}
      </div>

      <div className="admin-grid">
        {/* Upload Section */}
        <div className="admin-card">
          <h2>Upload Documents</h2>
          <div
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p>{uploading ? 'Uploading...' : 'Drag & drop files or click to browse'}</p>
            <p className="formats">PDF, Word, Excel, CSV, TXT, Images (PNG, JPG)</p>
          </div>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.xlsx,.xls,.csv,.txt,.md,.png,.jpg,.jpeg,.gif,.webp"
            style={{ display: 'none' }}
            onChange={(e) => handleUpload(Array.from(e.target.files))}
          />

          {uploadResults.length > 0 && (
            <div className="upload-progress">
              {uploadResults.map((r, i) => (
                <div key={i} className="upload-item">
                  <span>{r.filename}</span>
                  <span className={r.status === 'success' ? 'status-ok' : 'status-err'}>
                    {r.status === 'success' ? 'Processed' : r.error}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="admin-card">
          <h2>Add Notes / Custom Info</h2>
          <form className="note-form" onSubmit={handleAddNote}>
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title (e.g., 'Discount Policy', 'Special Deals')"
            />
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter additional information the AI should know about...&#10;&#10;Examples:&#10;- Special discount rules for VIP clients&#10;- Custom pricing agreements&#10;- Location-specific notes&#10;- Any context the sales team needs"
            />
            <button type="submit">Add Note</button>
          </form>

          {notes.length > 0 ? (
            notes.map(note => (
              <div key={note.id} className="note-item">
                <h4>{note.title}</h4>
                <p>{note.content}</p>
                <div className="note-footer">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No notes added yet</div>
          )}
        </div>

        {/* Source Files for Download */}
        <div className="admin-card admin-full">
          <h2>Source Files for Download (visible to sales team)</h2>
          <div className="admin-sources-row">
            <form className="source-upload-form" onSubmit={handleSourceUpload}>
              <input
                type="text"
                value={srcName}
                onChange={(e) => setSrcName(e.target.value)}
                placeholder="Display name (e.g., 'ITME 2026 Branding Schedule')"
              />
              <input
                type="text"
                value={srcDesc}
                onChange={(e) => setSrcDesc(e.target.value)}
                placeholder="Short description (e.g., 'Hall layout with branding positions')"
              />
              <div className="source-file-picker">
                <label
                  className="source-file-label"
                  onClick={() => document.getElementById('source-file-input').click()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {srcFile ? srcFile.name : 'Choose file...'}
                </label>
                <input
                  id="source-file-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) {
                      setSrcFile(f);
                      if (!srcName.trim()) setSrcName(f.name.replace(/\.[^/.]+$/, ''));
                    }
                  }}
                />
              </div>
              <div className="sharable-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={srcSharable}
                    onChange={(e) => setSrcSharable(e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className={`toggle-text ${srcSharable ? 'sharable' : 'not-sharable'}`}>
                    {srcSharable ? 'Sharable with clients' : 'Internal only — Do NOT share'}
                  </span>
                </label>
              </div>
              <button type="submit" disabled={!srcFile || srcUploading}>
                {srcUploading ? 'Uploading...' : 'Upload Source File'}
              </button>
            </form>
            <div className="admin-sources-list">
              {sources.length > 0 ? sources.map(src => (
                <div key={src.id} className="doc-item source-doc-item">
                  <div className="doc-info">
                    <span className={`doc-type ${src.type}`}>{src.type}</span>
                    <div className="source-doc-details">
                      <span className="source-doc-name">
                        {src.displayName || src.filename}
                        <span className={`share-badge ${src.sharable ? 'sharable' : 'not-sharable'}`}>
                          {src.sharable ? 'Sharable' : 'Internal Only'}
                        </span>
                      </span>
                      {src.description && <span className="source-doc-desc">{src.description}</span>}
                      <span className="source-doc-meta">
                        {src.filename} &middot; {formatSize(src.size)} &middot; {new Date(src.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="source-actions">
                    <button
                      className={`share-toggle-btn ${src.sharable ? 'is-sharable' : 'is-internal'}`}
                      onClick={() => handleToggleSharable(src.id, src.sharable)}
                      title={src.sharable ? 'Click to mark as Internal Only' : 'Click to mark as Sharable'}
                    >
                      {src.sharable ? 'Mark Internal' : 'Mark Sharable'}
                    </button>
                    <button onClick={() => handleDeleteSource(src.id)} title="Delete source file">x</button>
                  </div>
                </div>
              )) : (
                <div className="empty-state">No source files uploaded yet</div>
              )}
            </div>
          </div>
          {srcResults.length > 0 && (
            <div className="upload-progress">
              {srcResults.map((r, i) => (
                <div key={i} className="upload-item">
                  <span>{r.filename}</span>
                  <span className={r.status === 'success' ? 'status-ok' : 'status-err'}>
                    {r.status === 'success' ? 'Uploaded' : r.error}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Documents List */}
        <div className="admin-card admin-full">
          <h2>Knowledge Base ({documents.length} documents, {notes.length} notes)</h2>
          {documents.length > 0 ? (
            <div className="doc-list">
              {documents.map(doc => (
                <div key={doc.id} className="doc-item">
                  <div className="doc-info">
                    <span className={`doc-type ${doc.type}`}>{doc.type}</span>
                    <span>{doc.filename}</span>
                    <span style={{ color: '#999', fontSize: '12px' }}>
                      {formatSize(doc.size)} — {new Date(doc.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button onClick={() => handleDelete(doc.id)} title="Remove from knowledge base">
                    x
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              No documents uploaded yet. Upload PDFs, Excel files, or other documents to build the knowledge base.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
