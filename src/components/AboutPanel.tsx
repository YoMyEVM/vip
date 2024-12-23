import React from 'react';
import './AboutPanel.css';
import LeftAboutCard from './LeftAboutCard';
import RightAboutCard from './RightAboutCard';


const AboutPanel = () => {
  return (
    <div className="about-panel">
      <div className="about-panel-content">
        <LeftAboutCard />
        <RightAboutCard />
      </div>
    </div>
  );
};

export default AboutPanel;
