import React, { useState } from 'react';
import './AboutPanel.css';

const LeftAboutCard = () => {
  const roadmapItems = [
    {
      title: 'Add Liquidity and Swap within Collections',
      description: 'Coming Soon.',
    },
    {
      title: 'Cross Collection Swaps',
      description: 'Coming Soon.',
    },
    {
      title: 'Randomized LootBox Sales',
      description: 'Coming Soon.',
    },
    {
      title: 'Direct Buying and Selling',
      description: 'Coming Soon.',
    },
    {
      title: 'Swap and Staking Rewards',
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
    <div className="about-card left" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Vision Section */}
      <div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
        <h3>Our Vision</h3>
        <p>
          Creating a Liquid NFT Market<br /> and Seamless Trading Experience<br /> for Users of Any Skill Level
        </p>
        <a
          href="https://myevm.org"
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
          About Us
        </a>
      </div>

      {/* Roadmap Section */}
      <div style={{ flex: 2, padding: '20px', borderTop: '2px solid #6600CC', overflowY: 'auto' }}>
        <h3>Roadmap</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {roadmapItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={() => toggleExpanded(index)}
                style={{
                  padding: expandedIndex === index ? '20px' : '10px 20px',
                  fontSize: '1rem',
                  backgroundColor: index === 0 ? '#004d00' : '#1c1f26', // Green background for the first item
                  color: index === 0 ? '#a7ff83' : '#fff', // Light green text for the first item
                  border: index === 0 ? '2px solid #007f00' : '2px solid #6600CC', // Green border for the first item
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftAboutCard;
