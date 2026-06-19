import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/features/auth';

export function SocialLogin() {
  const { handleSocialLogin } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    handleSocialLogin(token);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Error while logging in with Google')}
    />
  );
}
