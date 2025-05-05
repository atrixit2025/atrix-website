import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          className="not-found-image"
          src="https://img.freepik.com/premium-vector/404-error-page-found-concept-illustration_108061-170.jpg?w=740"
          alt="Cute Robot"
        />
        <h1 className="not-found-title">Oops! 404</h1>
        <p className="not-found-text">Looks like this page is lost in space!</p>
        <button className="home-btn " onClick={() => navigate('/')}>
          🏠 Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
