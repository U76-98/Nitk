// This file does not need "use client"
import React from 'react';
import LoginPage from '../Components/LoginPage'; // Adjust path as needed

/**
 * This is the wrapper for your Login Page.
 * Next.js automatically passes 'searchParams' to this page component.
 * searchParams will contain all query parameters from the URL.
 */
export default function LoginPageWrapper({ searchParams }) {
  
  // Extract the 'role' from the URL (e.g., .../login?role=Citizen)
  const role = searchParams.role;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      {/* Pass the role from the URL down to your LoginPage component */}
      <LoginPage role={role} />
    </div>
  );
}