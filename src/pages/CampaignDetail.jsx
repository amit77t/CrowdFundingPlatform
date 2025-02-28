import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { campaignService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './pages.css';

function CampaignDetail() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [investAmount, setInvestAmount] = useState('');
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await campaignService.getCampaignById(id);
        setCampaign(data);
      } catch (err) {
        setError('Failed to load campaign details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleInvest = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please login to invest');
      return;
    }

    try {
      const amount = parseFloat(investAmount);
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid amount');
        return;
      }

      // Call the investment service
      // This would be implemented in your investmentService
      // await investmentService.createInvestment({ campaignId: id, amount });
      
      // For now, just show a success message
      alert(`Successfully invested $${amount} in ${campaign.title}`);
      setInvestAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Investment failed');
    }
  };

  if (loading) return <div className="loading">Loading campaign details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!campaign) return <div className="not-found">Campaign not found</div>;

  const progressPercentage = (campaign.amountRaised / campaign.fundingGoal) * 100;

  return (
    <div className="campaign-detail page-container">
      <div className="campaign-header">
        <h1>{campaign.title}</h1>
        <p className="campaign-industry">{campaign.industry}</p>
      </div>

      <div className="campaign-content">
        <div className="campaign-main">
          <div className="campaign-image">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" alt={campaign.title} />
          </div>

          <div className="campaign-description">
            <h2>About This Campaign</h2>
            <p>{campaign.description}</p>
          </div>

          {campaign.team && campaign.team.length > 0 && (
            <div className="campaign-team">
              <h2>Meet the Team</h2>
              <div className="team-grid">
                {campaign.team.map((member, index) => (
                  <div key={index} className="team-member">
                    <h3>{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p>{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {campaign.updates && campaign.updates.length > 0 && (
            <div className="campaign-updates">
              <h2>Campaign Updates</h2>
              {campaign.updates.map((update, index) => (
                <div key={index} className="update-card">
                  <h3>{update.title}</h3>
                  <p className="update-date">{new Date(update.date).toLocaleDateString()}</p>
                  <p>{update.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="campaign-sidebar">
          <div className="funding-status">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${Math.min(progressPercentage, 100)}%` }}></div>
            </div>
            <div className="funding-details">
              <p className="amount-raised">${campaign.amountRaised.toLocaleString()}</p>
              <p className="funding-goal">of ${campaign.fundingGoal.toLocaleString()} goal</p>
            </div>
            <p className="investors-count">120 investors</p>
            <p className="time-remaining">30 days left</p>
          </div>

          <div className="investment-form">
            <h3>Invest in {campaign.title}</h3>
            <p className="min-investment">Minimum investment: ${campaign.minimumInvestment}</p>
            
            <form onSubmit={handleInvest}>
              <div className="form-group">
                <label htmlFor="investment-amount">Investment Amount ($)</label>
                <input
                  type="number"
                  id="investment-amount"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  min={campaign.minimumInvestment}
                  placeholder={`Min $${campaign.minimumInvestment}`}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Invest Now</button>
            </form>
            
            {!user && (
              <p className="login-prompt">
                <Link to="/login">Login</Link> or <Link to="/register">Sign Up</Link> to invest
              </p>
            )}
          </div>

          <div className="campaign-details-box">
            <h3>Campaign Details</h3>
            <ul>
              <li>
                <span>Equity Offered:</span>
                <span>{campaign.equity}%</span>
              </li>
              <li>
                <span>Minimum Investment:</span>
                <span>${campaign.minimumInvestment}</span>
              </li>
              <li>
                <span>Campaign Duration:</span>
                <span>{campaign.duration} days</span>
              </li>
              <li>
                <span>Status:</span>
                <span className={`status-${campaign.status}`}>{campaign.status}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;