import React, { useState } from 'react';
import './AboutPanel.css';

const RightAboutCard = () => {
  const howToItems = [
    {
      title: 'Add Liquidity and Swap within Collections',
      description: 'Coming Soon.',
    },
    {
      title: 'Cross Collection Swaps',
      description: 'Coming Soon.',
    },
    {
      title: 'Buy and Open Lootbox',
      description: 'Coming Soon.',
    },
    {
      title: 'Direct Buy and Direct Sell',
      description: 'Coming Soon.',
    },
    {
      title: 'Swap and Staking Rewards',
      description: 'Coming Soon.',
    },
    {
      title: 'P2P NFT Lending',
      description: 'Coming Soon.',
    },
    {
      title: 'Self Repaying NFT Purchases',
      description: 'Coming Soon.',
    },
    {
      title: 'P2P NFT Lending',
      description: 'Coming Soon.',
    },
    {
      title: 'Advanced Tokenized Payoffs',
      description: 'Coming Soon.',
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="about-card right" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Become a VIP Section */}
      <div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
        <h3>Become a VIP</h3>
        <p>
          Become a VIP by reserving or <p></p>urchaing an ISAI Agent to recieve forever rewards and unmatched web3 utility.
        </p>
        <a
          href="https://myevm.network"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#6600CC',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5200A3')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6600CC')}
        >
          Visit ISAI NFT
        </a>
      </div>

      {/* How To Section */}
      <div style={{ flex: 2, padding: '20px', borderTop: '2px solid #6600CC', overflowY: 'auto' }}>
        <h3>How To</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {howToItems.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleExpanded(index)}
              style={{
                padding: expandedIndex === index ? '20px' : '10px 20px',
                fontSize: '1rem',
                backgroundColor: '#1c1f26',
                color: '#fff',
                border: '2px solid #6600CC',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                height: expandedIndex === index ? 'auto' : '40px',
                overflow: 'hidden',
              }}
            >
              <span>{item.title}</span>
              {expandedIndex === index && (
                <p
                  style={{
                    marginTop: '10px',
                    fontSize: '0.9rem',
                    color: '#d1d5db',
                  }}
                >
                  {item.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightAboutCard;
