import React from 'react';
import './NotFound.css';
import config from '../../config';

function NotFound() {
  return (
    <div className="notfound-wrapper">
      <h1 className="notfound-404">404</h1>
      <p className="notfound-text">Oops! Page not found</p>
      <div className="notfound-rocket">🚀</div>
    </div>
  );
}

export default NotFound;