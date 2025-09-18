import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../../api/axios';
import { useToast } from '../../hooks/use-toast';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      
      setAuthToken(token);
      toast({
        title: "Login Successful",
        description: "Welcome to Forest Pet Shop Admin",
      });
      
      navigate('/admin/home');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || 'Invalid credentials',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createInitialAdmin = async () => {
    try {
      const response = await api.post('/auth/create-initial-admin');
      toast({
        title: "Initial Admin Created",
        description: `Username: ${response.data.username}, Password: ${response.data.password}`,
      });
      setCredentials({
        username: response.data.username,
        password: response.data.password,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to create admin',
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="forest-card max-w-md w-full">
        {/* Demo Credentials Banner */}
        <div className="bg-forest-glow/10 border border-forest-glow/30 rounded-lg p-4 mb-6">
          <h3 className="text-forest-glow font-semibold mb-2 text-center">🌲 Demo Credentials</h3>
          <div className="text-center space-y-1">
            <div className="font-mono text-sm bg-forest-medium px-3 py-1 rounded">
              Username: <span className="text-forest-glow font-bold">admin</span>
            </div>
            <div className="font-mono text-sm bg-forest-medium px-3 py-1 rounded">
              Password: <span className="text-forest-glow font-bold">admin123</span>
            </div>
          </div>
          <p className="text-xs text-forest-text text-center mt-2">
            Click the form fields to auto-fill these credentials
          </p>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-forest-glow mb-2">🌲 Admin Login</h1>
          <p className="text-forest-text">Access Forest Pet Shop Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              onClick={() => setCredentials(prev => ({ ...prev, username: 'admin' }))}
              className="forest-input w-full"
              placeholder="Click to auto-fill: admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              onClick={() => setCredentials(prev => ({ ...prev, password: 'admin123' }))}
              className="forest-input w-full"
              placeholder="Click to auto-fill: admin123"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="forest-button w-full py-3"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-center space-y-4">
            <button
              onClick={createInitialAdmin}
              className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors"
            >
              Create Initial Admin (Demo)
            </button>
            <p className="text-xs text-forest-text">
              This creates the same demo admin credentials shown above
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-forest-text hover:text-forest-glow text-sm transition-colors">
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;