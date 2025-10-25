// This file is: app/citizen-dashboard/page.jsx
// !! THERE MUST BE NO "use client" AT THE TOP OF THIS FILE !!

import React from 'react';

// Import all components
import CitizenNavbar from '../Components/CitizenNavbar';
import ProfileCard from '../Components/ProfileCard';
import ReportDumpingCard from '../Components/ReportDumpingCard';
import MarketplaceCard from '../Components/MarketplaceCard';
import ScheduleCard from '../Components/ScheduleCard';
import TrainingCard from '../Components/TrainingCard';
import EventsCard from '../Components/EventsCard';

// --- THIS IS YOUR "DUMMY DATA" ---
// We simulate a backend fetch.
const getUserData = async () => {
  return {
    name: 'Jane Citizen',
    joinDate: 'Oct 2025',
    ecoCoins: 175,
    eventsAttended: 3,
    reportsFiled: 1,
  };
}

// (Data for other cards)
const getScheduleData = async () => { /* ... */ };
const getTrainingData = async () => { /* ... */ };
const getEventData = async () => { /* ... */ };
// --- END DUMMY DATA ---


// The 'async' keyword lets us wait for the data
export default async function CitizenHomePage() {
  
  // 1. We "fetch" the dummy data here
  const user = await getUserData();
  
  // (We can fetch the rest later, let's fix 'user' first)
  // const schedule = await getScheduleData();
  // const training = await getTrainingData();
  // const event = await getEventData();

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <CitizenNavbar />

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Left Column --- */}
          <div className="w-full lg:w-1/2">
            <ReportDumpingCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Other cards will be empty for now, that's fine */}
              <ScheduleCard schedule={{}} />
              <TrainingCard progress={{}} />
              <EventsCard event={{}} />
            </div>
          </div>

          {/* --- Right Column --- */}
          <div className="w-full lg:w-1/2">
            
            {/* 2. We pass the 'user' data into the component as a prop */}
            <ProfileCard user={user} />
            
            <MarketplaceCard />
          </div>

        </div>
      </main>
    </div>
  );
}