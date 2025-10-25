import React from 'react';
import { FaUser } from 'react-icons/fa';

export default function ProfileCard({ user = {} }) {

  console.log("ProfileCard Component received this data:", user);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile</h2>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
          <FaUser className="text-green-800 text-3xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-600">Your Balance</p>
        <p className="text-3xl font-bold text-green-700">{user.ecoCoins} Eco Coins</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Events Attended</span>
          <span className="font-semibold text-gray-800">{user.eventsAttended}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Reports Filed</span>
          <span className="font-semibold text-gray-800">{user.reportsFiled}</span>
        </div>
      </div>

      <button className="w-full mt-6 py-2 px-4 border border-green-700 text-green-700 font-medium rounded-full hover:bg-green-50 transition duration-200">
        View Full Profile & Settings
      </button>
    </div>
  );
}