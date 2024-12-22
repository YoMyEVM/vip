import React, { useState } from 'react';

const AccountLevel: React.FC = () => {
  const levels = ['Noob', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7'];
  const levelThresholds = [100, 500, 1000, 5000, 50000, 250000, 1000000]; // Thresholds for each level
  const [activeLevel, setActiveLevel] = useState<number>(0); // Default to Level 1 (Noob)

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
        alignItems: 'flex-start',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      {/* Level Counter */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {levels.map((level, index) => (
          <div
            key={index}
            onClick={() => setActiveLevel(index)}
            style={{
              padding: '10px 15px',
              borderRadius: '4px',
              backgroundColor: index === 0 ? '#6600CC' : activeLevel === index ? '#5200A3' : '#3a3d45',
              color: '#fff',
              fontWeight: index === 0 || activeLevel === index ? 'bold' : 'normal',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {level}
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
          gap: '20px',
        }}
      >
        {/* Image Container */}
        <div
          style={{
            width: '330px',
            height: '250px', // Slightly reduced height to bring it higher
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '4px',
            marginTop: '-20px',
            marginLeft: '10px', 
          }}
        >
          <img
            src={`/${activeLevel + 1}.png`} // Dynamically load image based on the active level
            alt={`Level ${activeLevel + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Current Level and Progress */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', // Center content including the button
          }}
        >
          <p
            style={{
              fontSize: '2.2rem',
              margin: '0 0 10px 0',
              fontWeight: 'bold',
            }}
          >
            {activeLevel === 0 ? 'Current Level' : 'Upcoming Level:'}
          </p>
          <p
            style={{
              fontSize: '3rem',
              margin: '0 0 10px 0',
              fontWeight: 'bold',
              color: '#6600CC',
            }}
          >
            {levels[activeLevel]}
          </p>
          <p
            style={{
              fontSize: '1.2rem',
              margin: '0 0 10px 0',
            }}
          >
            0/{levelThresholds[activeLevel]} APE in Swap Value
          </p>
          <div
            style={{
              textAlign: 'center', // Center the button
              marginTop: '10px', // Add spacing from the text above
            }}
          >
            <button
              style={{
                padding: '10px 20px', // Adjusted to make the button less wide
                width: '170px', // Adjusted fixed width for consistent size
                fontSize: '1rem',
                backgroundColor: '#6600CC',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5200A3')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6600CC')}
            >
              Collect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLevel;
