import React, { useState } from 'react';
import './AboutPanel.css';

const RightAboutCard = () => {
  const howToItems = [
    {
      title: 'Swap within Collections',
      description: [
        'Connect your wallet.',
        'Choose a collection.',
        'Choose NFT to receive.',
        'Choose NFT to give.',
        'Click "Swap" button.',
      ],
    },
    {
      title: 'Add/Remove Liquidity',
      description: [
        'Connect your wallet.',
        'Navigate to Account Balance and Liquidity Section.',
        'Select a collection from the dropdown.',
        'Provide the token IDs you would like to add or remove. Example:799, 20, 9389.',
        'Click "Add Liquidity" or "Remove Liquidity" button.',
      ],
    },
    {
      title: 'Deploy Swap Pool',
      description: [
        'Connect your wallet.',
        'Navigate to the Create Pool Section.',
        'Input the contract address of the NFT Collection.',
        'Click "Fetch Details" and Verify Name/Image',
        'Click "Create Pool".',
      ],
    },
    {
      title: 'Get a Collection Listed',
      description: ['Coming Soon.'],
    },
    {
      title: 'Cross Collection Swaps',
      description: ['Coming Soon.'],
    },
    {
      title: 'Direct Buy and Direct Sell',
      description: 'Coming Soon.',
    },
    {
      title: 'Buy and Open Lootbox',
      description: ['Coming Soon.'],
    },
    {
      title: 'Swap and Staking Rewards',
      description: ['Coming Soon.'],
    },
    {
      title: 'Advanced NFT Payoffs',
      description: ['Coming Soon.'],
    },
    {
      title: 'Top Secret',
      description: ['Coming Soon.'],
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="about-card right" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
        <h3>Become a VIP</h3>
        <p>Reserve an ISAI Agent to mine<br /> rewards and automate your Web3 Life.</p>
      </div>

      <div style={{ flex: 2, padding: '20px', borderTop: '2px solid #6600CC', overflowY: 'auto' }}>
        <h4>How To</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {howToItems.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleExpanded(index)}
              style={{
                padding: expandedIndex === index ? '20px' : '10px 20px',
                fontSize: '1rem',
                backgroundColor: index <= 2 ? '#004d00' : '#1c1f26', // Mark first three items as green
                color: index <= 2 ? '#a7ff83' : '#fff', // Light green text for first three items
                border: index <= 2 ? '2px solid #007f00' : '2px solid #6600CC', // Green border for first three items
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                height: expandedIndex === index ? 'auto' : '40px',
                overflow: 'hidden',
              }}
            >
              <span>{item.title}</span>
              {expandedIndex === index && Array.isArray(item.description) && (
                <ol
                  style={{
                    marginTop: '10px',
                    fontSize: '0.9rem',
                    color: '#d1d5db',
                    paddingLeft: '20px',
                  }}
                >
                  {item.description.map((step, stepIndex) => (
                    <li key={stepIndex} style={{ marginBottom: '5px' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              )}
              {expandedIndex === index && !Array.isArray(item.description) && (
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
