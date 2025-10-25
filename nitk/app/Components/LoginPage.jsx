"use client";

import React, { useState } from 'react';

const ROLE_CONFIG = {
  Citizen: {
    title: 'Citizen Login',
    apiEndpoint: '/api/login/citizen',
  },
  'Green Champions': {
    title: 'Green Champion Login',
    apiEndpoint: '/api/login/champion',
  },
  'Processing Plants': {
    title: 'Processing Plant Login',
    apiEndpoint: '/api/login/plant',
  },
  default: {
    title: 'Login',
    apiEndpoint: '/api/login',
  }
};

export default function LoginPage({ role }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.default;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submitting to: ${config.apiEndpoint}`);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-96">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
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
            onChange={(e) => setPassword(e.target.value)} 
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