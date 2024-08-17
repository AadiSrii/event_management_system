import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJwtDecode = async () => {
      try {
        const { default: jwtDecode } = await import('jwt-decode'); // Named import
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUser({
              id: decodedToken.id,
              role: decodedToken.role
            });
          } catch (error) {
            console.error('Failed to decode token:', error);
            localStorage.removeItem('token');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to load jwt-decode:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJwtDecode();
  }, []);

  const login = async (token) => {
    try {
      const { default: jwtDecode } = await import('jwt-decode'); // Named import
      const decodedToken = jwtDecode(token);
      localStorage.setItem('token', token);
      setUser({
        id: decodedToken.id,
        role: decodedToken.role
      });
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, logout, loading };
};
