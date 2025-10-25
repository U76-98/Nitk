import React from 'react';

import CitizenNavbar from '../Components/AppNavbar';
import ProfileCard from '../Components/ProfileCard';
import ReportDumpingCard from '../Components/ReportDumpingCard';
import MarketplaceCard from '../Components/MarketplaceCard';
import ScheduleCard from '../Components/ScheduleCard';
import TrainingCard from '../Components/TrainingCard';
import EventsCard from '../Components/EventsCard';

const getUserData = async () => {
  return {
    name: 'Jane Citizen',
    joinDate: 'Oct 2025',
    ecoCoins: 175,
    eventsAttended: 3,
    reportsFiled: 1,
  };
}

const getScheduleData = async () => {};
const getTrainingData = async () => {};
const getEventData = async () => {};


export default async function CitizenHomePage() {
  
  const user = await getUserData();
  
  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <CitizenNavbar />

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-1/2">
            <ReportDumpingCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScheduleCard schedule={{}} />
              <TrainingCard progress={{}} />
              <EventsCard event={{}} />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            
            <ProfileCard user={user} />
            
            <MarketplaceCard />
          </div>

        </div>
      </main>
    </div>
  );
}