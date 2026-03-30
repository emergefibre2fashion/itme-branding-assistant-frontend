import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import SourcesPage from './pages/SourcesPage';
import FAQPage from './pages/FAQPage';
import HelpPage from './pages/HelpPage';
import LoginModal from './components/LoginModal';
import './App.css';

function AppContent() {
  const [chatAuth, setChatAuth] = useState(sessionStorage.getItem('chatToken'));
  const [adminAuth, setAdminAuth] = useState(sessionStorage.getItem('adminToken'));
  const [showLogin, setShowLogin] = useState(null); // null, 'chat', or 'admin'
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setChatAuth(sessionStorage.getItem('chatToken'));
    setAdminAuth(sessionStorage.getItem('adminToken'));
  }, [location]);

  const handleLogin = (role, token) => {
    if (role === 'chat') {
      sessionStorage.setItem('chatToken', token);
      setChatAuth(token);
      setShowLogin(null);
      navigate('/chat');
    } else {
      sessionStorage.setItem('adminToken', token);
      setAdminAuth(token);
      setShowLogin(null);
      navigate('/admin');
    }
  };

  const handleLogout = (role) => {
    if (role === 'chat') {
      sessionStorage.removeItem('chatToken');
      setChatAuth(null);
    } else {
      sessionStorage.removeItem('adminToken');
      setAdminAuth(null);
    }
  };

  const isInternalPage = location.pathname !== '/';

  if (!isInternalPage) {
    return (
      <>
        <LandingPage onSignIn={() => setShowLogin('chat')} />
        {showLogin && (
          <LoginModal
            role={showLogin}
            onSuccess={(token) => handleLogin(showLogin, token)}
            onClose={() => setShowLogin(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo logo-stacked">
          <img src="https://static.fibre2fashion.com/F2FLogo/F2FLogoWhite.svg" alt="Fibre2Fashion" className="f2f-logo-sidebar" />
          <div className="logo-sub-block">
            <span className="logo-sub-title">ITME India 2026</span>
            <span className="logo-sub">Exclusive Onsite Branding Partner</span>
          </div>
        </div>
        <div className="nav-links">
          <NavLink to="/chat" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Ask AI
          </NavLink>
          <NavLink to="/sources" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Sources
          </NavLink>
          <NavLink to="/faqs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            FAQs
          </NavLink>
          <NavLink to="/help" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Help
          </NavLink>
          <div className="nav-divider"></div>
          <button
            className="nav-link nav-btn"
            onClick={() => adminAuth ? null : setShowLogin('admin')}
          >
            <NavLink to={adminAuth ? "/admin" : "#"} className={({ isActive }) => isActive ? 'nav-link-inner active' : 'nav-link-inner'}
              onClick={(e) => { if (!adminAuth) { e.preventDefault(); setShowLogin('admin'); } }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Admin Panel
            </NavLink>
          </button>
        </div>
        <div className="sidebar-footer">
          <NavLink to="/" className="nav-link back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            Back to Home
          </NavLink>
          {chatAuth && (
            <button className="logout-btn" onClick={() => handleLogout('chat')}>
              Sign Out
            </button>
          )}
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/chat" element={chatAuth ? <ChatPage /> : <Navigate to="/" />} />
          <Route path="/sources" element={chatAuth ? <SourcesPage /> : <Navigate to="/" />} />
          <Route path="/admin" element={adminAuth ? <AdminPage onLogout={() => handleLogout('admin')} /> : <Navigate to="/" />} />
          <Route path="/faqs" element={chatAuth ? <FAQPage /> : <Navigate to="/" />} />
          <Route path="/help" element={chatAuth ? <HelpPage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {showLogin && (
        <LoginModal
          role={showLogin}
          onSuccess={(token) => handleLogin(showLogin, token)}
          onClose={() => setShowLogin(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
