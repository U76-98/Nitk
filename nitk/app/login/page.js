import React from 'react';
import LoginPage from '../Components/LoginPage';

export default function LoginPageWrapper({ searchParams }) {
  
  const role = searchParams.role;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      <LoginPage role={role} />
    </div>
  );
}