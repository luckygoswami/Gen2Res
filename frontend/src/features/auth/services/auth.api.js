import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_FRONTEND_URL}/api/auth`,
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post('/register', {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const response = await api.get('/logout');

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMe = async () => {
  try {
    const response = await api.get('/get-me');

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
