import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser({ id: decoded.id, role: decoded.role });
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token } = res.data;
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role });
  };

  const register = async (name, email, password) => {
    const res = await axios.post('/api/auth/register', { name, email, password });
    const { token } = res.data;
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
