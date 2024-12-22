import React, { useState } from 'react';
import { ethers } from 'ethers';

const RightStatCard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleWrap = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed or unavailable.');
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        '0x82d22b3afFdc6b743916a10de096BF6E985fD6c7',
        [
          { name: 'deposit', type: 'function', inputs: [], outputs: [], stateMutability: 'payable' },
        ],
        signer
      );

      const tx = await contract.deposit({ value: ethers.parseEther('30') }); // Fixed cost of 30 APE
      await tx.wait();

      alert('Wrapped successfully!');
    } catch (error) {
      const err = error as Error; // Type assertion
      console.error('Error wrapping:', err);
      alert(`Failed to wrap: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyLootbox = () => {
    alert('Buy Lootbox functionality is coming soon!');
  };

  return (
    <div
      style={{
        backgroundColor: '#1c1f26',
        color: '#fff',
        border: '2px solid #6600CC',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      <h2
        style={{
          margin: '0 0 1px 0',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        Soon Buy a Lootbox
      </h2>
      {/* Lootbox Image */}
      <img
        src="/lootbox.png"
        alt="Lootbox"
        style={{
          width: '200px', // Updated to match placeholder image
          height: '210px', // Updated to match placeholder image
          objectFit: 'cover',
        }}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '-25px' }}>
        <button
          onClick={handleWrap}
          style={{
            width: '110px',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Wrapping...' : 'Wrap APE'}
        </button>
        <button
          onClick={handleBuyLootbox}
          style={{
            width: '140px',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
          disabled
        >
          Buy Lootbox
        </button>
      </div>
    </div>
  );
};

export default RightStatCard;
