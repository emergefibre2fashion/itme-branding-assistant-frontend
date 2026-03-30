import React from 'react';

function HelpPage() {
  return (
    <div className="help-page">
      <div className="help-header">
        <h1>Need Help?</h1>
        <p>Contact our team for assistance with branding queries, technical issues, or anything else.</p>
      </div>

      <div className="help-cards">
        <div className="help-card primary-contact">
          <div className="help-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h2>Sunil Patel</h2>
          <p className="help-role">Branding Operations Lead</p>
          <div className="help-details">
            <div className="help-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div>
                <label>Email</label>
                <a href="mailto:Sunil.patel@fibre2fashion.com">Sunil.patel@fibre2fashion.com</a>
              </div>
            </div>
            <div className="help-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <label>Extension</label>
                <span>656</span>
              </div>
            </div>
            <div className="help-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              <div>
                <label>Mobile</label>
                <a href="tel:+917574845628">+91 7574845628</a>
              </div>
            </div>
          </div>
        </div>

        <div className="help-card">
          <div className="help-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h2>Quick Tips</h2>
          <ul className="help-tips">
            <li>Use the <strong>AI Assistant</strong> for instant answers about inventory and pricing</li>
            <li>Check <strong>FAQs</strong> for common questions before reaching out</li>
            <li>For urgent booking queries, call directly on the mobile number</li>
            <li>For creative approvals and document uploads, contact the admin team</li>
            <li>Always confirm exhibitor/non-exhibitor status before quoting prices</li>
          </ul>
        </div>

        <div className="help-card">
          <div className="help-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h2>Using the AI Assistant</h2>
          <ul className="help-tips">
            <li>Ask specific questions like <em>"What pole branding units are available?"</em></li>
            <li>Ask for comparisons: <em>"Compare atrium vs pole branding pricing"</em></li>
            <li>Ask about clients: <em>"Which units are reserved for Menzel Engineering?"</em></li>
            <li>Get summaries: <em>"Give me a revenue summary"</em></li>
            <li>The AI reads from all uploaded documents &mdash; the more data uploaded, the better</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
