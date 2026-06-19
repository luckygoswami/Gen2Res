import { useContext, useEffect } from 'react';
import {
  AuthContext,
  login,
  logout,
  register,
  getMe,
  socialLogin,
} from '@/features/auth';

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  /**
   * @description hook to create new user in database
   */
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

  /**
   * @description hook to login with provided email and password
   */
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

  /**
   * @description hook to logout the current user
   */
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

  /**
   * @description hook to sign in with the selected Social account
   * @returns user data as {username, email, id}
   */
  const handleSocialLogin = async (token) => {
    setLoading(true);

    try {
      const data = await socialLogin(token);
      setUser(data.user);
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

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleSocialLogin,
  };
};
