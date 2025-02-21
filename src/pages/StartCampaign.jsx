import React from 'react';
import './pages.css';

function StartCampaign() {
  return (
    <div className="start-campaign page-container">
      <h1>Start Your Fundraising Campaign</h1>
      <div className="campaign-form">
        <form>
          <div className="form-group">
            <label htmlFor="company-name">Company Name</label>
            <input type="text" id="company-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Company Description</label>
            <textarea id="description" rows="4" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="funding-goal">Funding Goal</label>
            <input type="number" id="funding-goal" required />
          </div>
          <button type="submit" className="submit-btn">Submit Campaign</button>
        </form>
      </div>
    </div>
  );
}

export default StartCampaign;