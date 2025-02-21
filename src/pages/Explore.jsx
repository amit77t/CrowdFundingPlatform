import React from 'react';
import './pages.css';

function Explore() {
  return (
    <div className="explore page-container">
      <h1>Explore Investment Opportunities</h1>
      <div className="filters">
        <select className="filter-select">
          <option value="">Industry</option>
          <option value="tech">Technology</option>
          <option value="health">Healthcare</option>
          <option value="energy">Energy</option>
        </select>
        <select className="filter-select">
          <option value="">Investment Stage</option>
          <option value="seed">Seed</option>
          <option value="series-a">Series A</option>
          <option value="series-b">Series B</option>
        </select>
        <select className="filter-select">
          <option value="">Minimum Investment</option>
          <option value="100">$100+</option>
          <option value="500">$500+</option>
          <option value="1000">$1000+</option>
        </select>
      </div>
      <div className="campaign-grid">
        {/* Add more campaign cards here */}
      </div>
    </div>
  );
}

export default Explore;