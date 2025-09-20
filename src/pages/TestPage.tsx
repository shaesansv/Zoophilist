import React from 'react';
import { Link } from 'react-router-dom';

const TestPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Routing Test Page</h1>
      <p>If you can see this page, routing is working!</p>
      <div style={{ margin: '2rem 0' }}>
        <Link 
          to="/admin/login" 
          style={{ 
            padding: '1rem 2rem', 
            background: '#00ED64', 
            color: 'black', 
            textDecoration: 'none',
            borderRadius: '4px',
            margin: '0 1rem'
          }}
        >
          Go to Admin Login
        </Link>
        <Link 
          to="/" 
          style={{ 
            padding: '1rem 2rem', 
            background: '#001E2B', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px',
            margin: '0 1rem'
          }}
        >
          Go to Home
        </Link>
      </div>
      <div style={{ marginTop: '2rem', fontSize: '14px', color: '#666' }}>
        <p>Current URL: {window.location.href}</p>
        <p>API URL: {import.meta.env.VITE_API_URL || 'Not Set'}</p>
      </div>
    </div>
  );
};

export default TestPage;
