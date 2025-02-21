import React from 'react';
import './pages.css';

function Community() {
  return (
    <div className="community page-container">
      <h1>Join Our Community</h1>
      <div className="community-content">
        <div className="community-section">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            {/* Add events here */}
          </div>
        </div>
        <div className="community-section">
          <h2>Discussion Forum</h2>
          <div className="forum-topics">
            {/* Add forum topics here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;