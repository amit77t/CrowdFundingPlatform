import React from 'react';
import Hero from '../components/Hero/Hero';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Hero />
      <main className="main-content">
        <section className="featured-campaigns">
          <h2>Featured Campaigns</h2>
          <div className="campaign-grid">
            <div className="campaign-card">
              <img src="\src\assets\card1.png" alt="Campaign" />
              <h3>Tech Startup</h3>
              <p>Revolutionary AI Platform</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
              <p className="funding">₹750,000 raised of ₹1M goal</p>
            </div>
            <div className="campaign-card">
              <img src="\src\assets\card2.png" alt="Campaign" />
              <h3>Green Energy</h3>
              <p>Sustainable Solar Solutions</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '60%' }}></div>
              </div>
              <p className="funding">₹300,000 raised of ₹500K goal</p>
            </div>
            <div className="campaign-card">
              <img src="\src\assets\card3.png" alt="Campaign" />
              <h3>BioTech Innovation</h3>
              <p>Next-Gen Healthcare Solutions</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '85%' }}></div>
              </div>
              <p className="funding">₹850,000 raised of ₹1M goal</p>
            </div>
          </div>
        </section>

        <section className="why-invest">
          <h2>Why Invest With Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Vetted Startups</h3>
              <p>We carefully screen each startup to ensure quality investment opportunities.</p>
            </div>
            <div className="feature-card">
              <h3>Low Minimum Investment</h3>
              <p>Start investing with as little as $100 and build your portfolio.</p>
            </div>
            <div className="feature-card">
              <h3>Diverse Opportunities</h3>
              <p>Access a wide range of industries and investment opportunities.</p>
            </div>
            <div className="feature-card">
              <h3>Expert Support</h3>
              <p>Get guidance from our team of investment professionals.</p>
            </div>
          </div>
        </section>

        <section className="success-stories">
          <h2>Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <img src="\src\assets\card4.png" alt="Success Story" />
              <div className="story-content">
                <h3>TechStart Inc.</h3>
                <p>Raised ₹2M and now valued at ₹20M</p>
                <span className="return">10x Return for Early Investors</span>
              </div>
            </div>
            <div className="story-card">
              <img src="\src\assets\card5.png" alt="Success Story" />
              <div className="story-content">
                <h3>EcoSolutions</h3>
                <p>Raised ₹1.5M and expanded to 3 countries</p>
                <span className="return">8x Return for Early Investors</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;