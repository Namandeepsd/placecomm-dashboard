import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const AUTH_KEY = 'placecomm_auth';
const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if auth token is valid on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem(AUTH_KEY);
        if (authData) {
          const { username, expiresAt } = JSON.parse(authData);
          const now = Date.now();

          // Check if token has expired
          if (now < expiresAt) {
            setUser({ username });
            setIsAuthenticated(true);
          } else {
            // Token expired, clear it
            localStorage.removeItem(AUTH_KEY);
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const expiresAt = Date.now() + EXPIRATION_TIME;
      const authData = JSON.stringify({ username, expiresAt });
      localStorage.setItem(AUTH_KEY, authData);
      
      setUser({ username });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
