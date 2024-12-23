import React from 'react';
import './AboutPanel.css';

const RightAboutCard = () => {
  return (
    <div className="about-card right">
      {/* How To Section */}
      <h3>How To</h3>
      <ul className="how-to-list">
        <li>
          Swap within a Collection
          <ul className="steps-list">
            <li>Step 1: Connect your wallet.</li>
            <li>Step 2: Select the NFT you own.</li>
            <li>Step 3: Browse available floor NFTs for swapping.</li>
            <li>Step 4: Confirm the swap and complete the transaction.</li>
          </ul>
        </li>
        <li>Cross Collection Swaps</li>
        <ul className="steps-list">
            <li>Advanced: Coming Soon</li>
        </ul>
        <li>Add Liquidity to Earn Rewards</li>
        <ul className="steps-list">
            <li>Advanced: Coming Soon</li>
        </ul>
        <li>Add Liquidity on Camelot</li>
        <ul className="steps-list">
          <li>Advanced: Coming Soon</li>
        </ul>
      </ul>
    </div>
  );
};

export default RightAboutCard;

