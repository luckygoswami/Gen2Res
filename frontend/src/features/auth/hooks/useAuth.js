import { useContext, useEffect } from 'react';
import { AuthContext, login, logout, register, getMe } from '@/features/auth';

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

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

  useEffect(() => {
    const rehydrateUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    rehydrateUser();
  }, []);

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
