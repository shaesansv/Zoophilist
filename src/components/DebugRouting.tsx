import React from 'react';
import { useLocation } from 'react-router-dom';

const DebugRouting: React.FC = () => {
  const location = useLocation();
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px',
      fontSize: '12px',
      zIndex: 9999 
    }}>
      <div>Current Path: {location.pathname}</div>
      <div>Search: {location.search}</div>
      <div>Hash: {location.hash}</div>
      <div>API URL: {import.meta.env.VITE_API_URL || 'Not Set'}</div>
    </div>
  );
};

export default DebugRouting;
