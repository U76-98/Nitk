import React from 'react';
import CitizenNavbar from './Components/CitizenNavbar';
import ProfileCard from './Components/ProfileCard';
import ReportDumpingCard from './Components/ReportDumpingCard'; // 1. Import the new component

// ... (getUserData function stays the same) ...
const getUserData = async () => { 
  /* ... */ 
};

export default async function CitizenHomePage() {
  
  const user = await getUserData();

  // ... (rest of your mock data stays the same) ...
  const collectionSchedule = { /* ... */ };
  const upcomingEvent = { /* ... */ };
  const trainingProgress = { /* ... */ };

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <CitizenNavbar />

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- A. Left Column (Main Features) --- */}
          <div className="w-full lg:w-2/3">
            
            {/* 2. Replace the old JSX with the new component */}
            <ReportDumpingCard />
            
            {/* Grid for smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Feature: Waste Collection Schedule */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Collection Schedule</h2>
                <p className="text-gray-600 font-medium">{collectionSchedule.day}</p>
                <p className="text-3xl font-bold text-green-700 my-2">{collectionSchedule.time}</p>
                <p className="text-sm text-gray-500">Vehicle: {collectionSchedule.vehicle}</p>
                <a href="#" className="text-sm text-blue-600 hover:underline mt-3 block">View Full Week</a>
              </div>

              {/* Feature: Training */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Training</h2>
                <p className="text-gray-600 mb-3">Complete your compulsory courses.</p>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {trainingProgress.completed} of {trainingProgress.total} Courses Completed
                  </span>
                  <div className="w-full bg-green-100 rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${(trainingProgress.completed / trainingProgress.total) * 100}%` }}>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 px-4 bg-green-100 text-green-800 font-medium rounded-full hover:bg-green-200 transition duration-200">
                  Continue Training
                </button>
              </div>

              {/* Feature: Events (Spans 2 cols) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Upcoming Events</h2>
                <p className="text-gray-600 mb-4">Join an event, help the community, and earn Eco Coins.</p>
                <div className="border border-green-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700">{upcomingEvent.title}</h3>
                    <p className="text-gray-600">{upcomingEvent.date}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 text-left sm:text-right">
                    <span className="block text-green-700 font-medium">Earn {upcomingEvent.reward} Eco Coins</span>
                    <button className="mt-1 px-5 py-2 bg-green-700 text-white text-sm font-medium rounded-full hover:bg-green-800 transition duration-200">
                      Register
                    </button>
                  </div>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline mt-4 block">View All Events</a>
              </div>
            </div>
          </div>

          {/* --- B. Right Column (Profile & Marketplace) --- */}
          <div className="w-full lg:w-1/3">
            <ProfileCard user={user} />

            {/* Marketplace Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Marketplace</h2>
              <p className="text-gray-600 mb-4">Spend your Eco Coins on rewards and vouchers.</p>
              <button className="w-full py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200">
                Browse the Market
              </button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}