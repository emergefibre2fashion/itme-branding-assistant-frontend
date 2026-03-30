import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

const TYPE_ICONS = {
  pdf: { color: '#e94560', label: 'PDF' },
  xlsx: { color: '#22c55e', label: 'XLSX' },
  xls: { color: '#22c55e', label: 'XLS' },
  csv: { color: '#22c55e', label: 'CSV' },
  png: { color: '#3b82f6', label: 'PNG' },
  jpg: { color: '#3b82f6', label: 'JPG' },
  jpeg: { color: '#3b82f6', label: 'JPEG' },
  docx: { color: '#2563eb', label: 'DOCX' },
  doc: { color: '#2563eb', label: 'DOC' },
  txt: { color: '#64748b', label: 'TXT' },
  md: { color: '#64748b', label: 'MD' },
};

function SourcesPage() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSources = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/sources`);
      setSources(res.data.sources || []);
    } catch (err) {
      console.error('Failed to load sources:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadSources(); }, [loadSources]);

  const handleDownload = (source) => {
    window.open(`${API}/api/sources/download/${source.id}`, '_blank');
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getTypeInfo = (type) => TYPE_ICONS[type] || { color: '#94a3b8', label: type.toUpperCase() };

  return (
    <div className="sources-page">
      <div className="sources-header">
        <div>
          <h1>Source Documents</h1>
          <p>Download reference files, price lists, branding layouts, and other resources.</p>
        </div>
        <div className="sources-count">{sources.length} file{sources.length !== 1 ? 's' : ''}</div>
      </div>

      {loading ? (
        <div className="empty-state">Loading...</div>
      ) : sources.length === 0 ? (
        <div className="sources-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <h3>No source files yet</h3>
          <p>The admin team hasn't uploaded any downloadable files yet. Check back later.</p>
        </div>
      ) : (
        <div className="sources-grid">
          {sources.map(source => {
            const info = getTypeInfo(source.type);
            return (
              <div key={source.id} className={`source-card ${source.sharable === false ? 'not-sharable-card' : ''}`} onClick={() => handleDownload(source)}>
                <div className="source-card-top">
                  <div className="source-type-badge" style={{ background: info.color }}>
                    {info.label}
                  </div>
                  <span className={`source-share-flag ${source.sharable === false ? 'flag-no' : 'flag-yes'}`}>
                    {source.sharable === false ? 'DO NOT SHARE' : 'SHARABLE'}
                  </span>
                </div>
                <div className="source-card-body">
                  <div className="source-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={info.color} strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <h3 className="source-name">{source.displayName || source.filename}</h3>
                  {source.description && <p className="source-desc">{source.description}</p>}
                  <p className="source-date">
                    {formatSize(source.size)} &middot; Uploaded {new Date(source.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="source-card-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SourcesPage;
