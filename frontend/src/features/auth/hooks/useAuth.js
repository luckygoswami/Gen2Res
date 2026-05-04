import { useContext } from 'react';
import { AuthContext } from '@/features/auth/auth.context';
import { login, logout, register } from '@/features/auth/services/auth.api';

const { user, setUser, loading, setLoading } = useContext(AuthContext);

export const useAuth = () => {
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      const data = await logout();
      setUser(null);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
