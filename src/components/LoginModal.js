import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

function LoginModal({ role, onSuccess, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API}/api/auth/verify`, { password, role });
      if (res.data.success) {
        onSuccess(res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Incorrect password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-icon">
          {role === 'admin' ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          )}
        </div>
        <h3>{role === 'admin' ? 'Admin Access' : 'Sales Team Login'}</h3>
        <p className="modal-desc">
          {role === 'admin'
            ? 'Enter the admin password to manage the knowledge base'
            : 'Enter your access code to use the Branding Assistant'}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder={role === 'admin' ? 'Admin password' : 'Enter 8-digit access code'}
            autoFocus
            className={error ? 'input-error' : ''}
          />
          {error && <div className="modal-error">{error}</div>}
          <button type="submit" disabled={loading || !password.trim()}>
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
