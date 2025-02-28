import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { campaignService } from '../services/api';
import './pages.css';

function Explore() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [industry, setIndustry] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await campaignService.getAllCampaigns(page, industry);
        setCampaigns(data.campaigns);
        setTotalPages(data.pages);
      } catch (err) {
        setError('Failed to load campaigns');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [page, industry]);

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="explore page-container">
      <h1>Explore Investment Opportunities</h1>
      <div className="filters">
        <select 
          className="filter-select" 
          value={industry} 
          onChange={handleIndustryChange}
        >
          <option value="">All Industries</option>
          <option value="tech">Technology</option>
          <option value="health">Healthcare</option>
          <option value="energy">Energy</option>
          <option value="finance">Finance</option>
          <option value="education">Education</option>
          <option value="food">Food & Beverage</option>
          <option value="retail">Retail</option>
        </select>
        <select className="filter-select">
          <option value="">Investment Stage</option>
          <option value="seed">Seed</option>
          <option value="series-a">Series A</option>
          <option value="series-b">Series B</option>
        </select>
        <select className="filter-select">
          <option value="">Minimum Investment</option>
          <option value="100">₹100+</option>
          <option value="500">₹500+</option>
          <option value="1000">₹1000+</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading campaigns...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : campaigns.length === 0 ? (
        <div className="no-results">No campaigns found matching your criteria</div>
      ) : (
        <div className="campaign-grid">
          {campaigns.map((campaign) => {
            const progressPercentage = (campaign.amountRaised / campaign.fundingGoal) * 100;
            
            return (
              <Link to={`/campaigns/${campaign._id}`} key={campaign._id} className="campaign-card">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt={campaign.title} 
                />
                <div className="campaign-content">
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description.substring(0, 100)}...</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <p className="funding">
                    ${campaign.amountRaised.toLocaleString()} raised of ${campaign.fundingGoal.toLocaleString()} goal
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button 
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Explore;