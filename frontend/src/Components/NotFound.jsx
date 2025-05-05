import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import Logo from "../assets/ais-logo-3.png"; 

const NotFound = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Create bubbles animation
    const bubbleCount = 15;
    const newBubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        id: i,
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10
      });
    }
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="ocean-container">
      {/* Animated bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`
          }}
        />
      ))}

      <div className="ocean-content">
        {/* <img
          className="diver"
          src="https://images.unsplash.com/photo-1585059895524-72359e06133a?w=500&auto=format&fit=crop&q=60"
          alt="Scuba diver"
        /> */}
        {/* <img
          className="whale"
          src="https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?w=500&auto=format&fit=crop&q=60"
          alt="Whale"
        /> */}

        <h1 className="ocean-title">404 - Code Not Found</h1>

        <div className="ocean-message">
          <p>Looks like you've hit a snag in our codebase!</p>
          <p>The page you're looking for might be undergoing deployment or refactoring.</p>
          <p>Our team has been alerted to investigate this missing endpoint.</p>
        </div>

        <div className="ocean-facts">
          <h3>Did You Know?</h3>
          <p>Did You Know? React.js is used by over 40% of professional developers worldwide, making it the most popular frontend framework."</p>
        </div>

        <div className="ocean-actions">
          <button className="surface-btn" onClick={() => navigate('/')}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/263/263115.png"
              alt="Home icon"
              className="btn-icon"
            />
            Return Home
          </button>
          <button className="lifeline-btn" onClick={() => navigate('/contact')}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3059/3059518.png"
              alt="Support icon"
              className="btn-icon"
            />
            Contact Support
          </button>
        </div>

        <div className="depth-meter">
          <div className="meter-gauge">
            <div className="meter-fill" style={{ height: '100%' }}></div>
          </div>
          <p>Debugging Progress <span>...</span></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;