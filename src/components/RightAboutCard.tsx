import React from 'react';
import './AboutPanel.css';

const RightAboutCard = () => {
  const howToItems = [
    'Add Liquidity and Swap within Collections',
    'Buy and Open Lootbox',
    'Cross Collection Swaps',
    'Swap and Staking Rewards',
    'Self Repaying NFT Purchases',
    'P2P NFT Lending',
  ];

  return (
    <div className="about-card right" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Become a VIP Section */}
      <div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
        <h3>Become a VIP</h3>
        <p>
          Join our exclusive VIP program to unlock advanced features, gain rewards, and access premium DeFi tools.
        </p>
      </div>

      {/* How To Section */}
      <div style={{ flex: 2, padding: '20px', borderTop: '2px solid #6600CC', overflowY: 'auto' }}>
        <h3>How To</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {howToItems.map((item, index) => (
            <button
              key={index}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: '#1c1f26',
                color: '#fff',
                border: '2px solid #6600CC',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5200A3';
                e.currentTarget.style.borderColor = '#5200A3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1c1f26';
                e.currentTarget.style.borderColor = '#6600CC';
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

export default RightAboutCard;
