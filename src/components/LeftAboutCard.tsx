import React from 'react';
import './AboutPanel.css';

const LeftAboutCard = () => {
  const roadmapItems = [
    'Add Liquidity and Swap within Collections',
    'Expand Liquidity globally',
    'Cross Collection Swaps',
    'Randomized LootBox Sales',
    'Swap and Staking Rewards',
    'Dirct Buying and Selling',
    'Self Repaying NFT Purchases',
    'P2P NFT Lending',
    'Advanced Tokenized Payoffs'
  ];

  return (
    <div className="about-card left" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Vision Section */}
      <div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
        <h3>Our Vision</h3>
        <p>
          Our vision is to revolutionize NFT and DeFi platforms by building
          intuitive tools and seamless experiences for all users.
        </p>
      </div>

      {/* Roadmap Section */}
      <div style={{ flex: 2, padding: '20px', borderTop: '2px solid #6600CC', overflowY: 'auto' }}>
        <h3>Roadmap</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {roadmapItems.map((item, index) => (
            <button
              key={index}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: index === 0 ? '#004d00' : '#1c1f26', // Green background for the first item
                color: index === 0 ? '#a7ff83' : '#fff', // Light green text for the first item
                border: index === 0 ? '2px solid #007f00' : '2px solid #6600CC', // Green border for the first item
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (index !== 0) {
                  e.currentTarget.style.backgroundColor = '#5200A3';
                  e.currentTarget.style.borderColor = '#5200A3';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== 0) {
                  e.currentTarget.style.backgroundColor = '#1c1f26';
                  e.currentTarget.style.borderColor = '#6600CC';
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftAboutCard;
