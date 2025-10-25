"use client"; // Needs to be a client component for useState

import React, { useState } from 'react';

// A helper object to define the specific details for each role
const ROLE_CONFIG = {
  // --- 1. UPDATED ROLES ---
  Citizen: {
    title: 'Citizen Login',
    apiEndpoint: '/api/login/citizen',
  },
  'Green Champions': {
    title: 'Green Champion Login',
    apiEndpoint: '/api/login/champion', // You can change this API path
  },
  'Processing Plants': {
    title: 'Processing Plant Login',
    apiEndpoint: '/api/login/plant', // You can change this API path
  },
  // This 'default' key is still important as a fallback
  default: {
    title: 'Login',
    apiEndpoint: '/api/login',
  }
};

export default function LoginPage({ role }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // This line works perfectly to find the correct config
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.default;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submitting to: ${config.apiEndpoint}`);
    // ... your fetch logic
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-96">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
        {/* This will show the correct title, e.g., "Green Champion Login" */}
        {config.title}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // <-- 3. Fixed typo here
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}