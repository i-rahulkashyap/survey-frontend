// filepath: /Users/temp_rk/ror/survey-project/1/client/src/components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/']; // Add routes where you want to hide the header

  return (
    <div>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;