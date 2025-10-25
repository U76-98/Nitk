// This file is: app/green-champion-dashboard/page.jsx
// This is a Server Component (NO "use client")

import React from 'react';
import Link from 'next/link'; // 1. Make sure Link is imported
import AppNavbar from '../Components/AppNavbar'; // Reusing our navbar
import { 
  FaUsers, FaHandsHelping, FaTrash, FaCalendarAlt, 
  FaCheckCircle, FaBoxOpen, FaBell, FaPlus, FaCalendarPlus, 
  FaTruck, FaClipboardList 
} from 'react-icons/fa';

// --- MOCK DATA FETCHING ---
// Simulating a backend call for all dashboard data

const getDashboardData = async () => {
  return {
    stats: {
      peopleTrained: 142,
      shgTrained: 18,
      garbageCollected: 4.7, // in tons
      eventsConducted: 21,
      reportsResolved: 94,
    },
    orders: [
      { id: 'ORD-1024', item: 'Bamboo Toothbrush Set', qty: 2, user: 'Jane Citizen' },
      { id: 'ORD-1023', item: 'Recycled Paper Notebook', qty: 1, user: 'Alex M.' },
    ],
    notifications: [
      { id: 1, text: 'New illegal dumping report in Ward 5.', time: '5m ago' },
      { id: 2, text: 'Vehicle G-14B maintenance due.', time: '2h ago' },
    ],
    schedules: [
      { id: 'V-12A', area: 'Ward 1-3', status: 'On Route' },
      { id: 'V-07C', area: 'Ward 4-6', status: 'Pending' },
    ],
    events: [
      { id: 1, name: 'Beach Cleanup @ Panambur', date: 'Nov 1st' },
      { id: 2, name: 'Composting Workshop', date: 'Nov 5th' },
    ],
    reports: [
      { id: 'R-501', location: 'Ward 5, Near Market', status: 'Pending' },
      { id: 'R-502', location: 'Ward 2, Highway side', status: 'Pending' },
    ]
  };
}
// --- END MOCK DATA ---


export default async function GreenChampionDashboard() {
  
  // Fetch all data for the dashboard
  const data = await getDashboardData();
  const { stats, orders, notifications, schedules, events, reports } = data;

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      {/* We use the AppNavbar. No ecoCoins prop is passed, so it's clean. */}
      <AppNavbar />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Green Champion Dashboard
        </h2>

        {/* --- 1. KEY STATS ROW --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {/* People Trained */}
          <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <FaUsers className="text-2xl text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">People Trained</p>
              <p className="text-2xl font-bold text-gray-800">{stats.peopleTrained}</p>
            </div>
          </div>
          {/* SHG Trained */}
          <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <FaHandsHelping className="text-2xl text-green-500" />
            <div>
              <p className="text-sm text-gray-500">SHG Trained</p>
              <p className="text-2xl font-bold text-gray-800">{stats.shgTrained}</p>
            </div>
          </div>
          {/* Garbage Collected */}
          <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <FaTrash className="text-2xl text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Garbage Collected</p>
              <p className="text-2xl font-bold text-gray-800">{stats.garbageCollected} <span className="text-lg">tons</span></p>
            </div>
          </div>
          {/* Events Conducted */}
          <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <FaCalendarAlt className="text-2xl text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Events Conducted</p>
              <p className="text-2xl font-bold text-gray-800">{stats.eventsConducted}</p>
            </div>
          </div>
          {/* Reports Resolved */}
          <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <FaCheckCircle className="text-2xl text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Reports Resolved</p>
              <p className="text-2xl font-bold text-gray-800">{stats.reportsResolved}</p>
            </div>
          </div>
        </div>

        {/* --- 2. MAIN 2-COLUMN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* --- LEFT COLUMN (Monitoring Cards) --- */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Manage/Schedules Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Collection Schedules</h3>
                <button className="flex items-center gap-2 py-2 px-4 bg-green-100 text-green-800 font-medium rounded-full hover:bg-green-200">
                  <FaCalendarPlus /> Manage Schedule
                </button>
              </div>
              <ul className="space-y-3">
                {schedules.map(s => (
                  <li key={s.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-gray-700">{s.area}</span>
                      <span className="text-sm text-gray-500 ml-2">(Vehicle: {s.id})</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">{s.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Events</h3>
                
                {/* 2. THIS IS THE LINKED BUTTON */}
                <Link href="/organize-event">
                  <button className="flex items-center gap-2 py-2 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800">
                    <FaPlus /> Organise Event
                  </button>
                </Link>

              </div>
              <ul className="space-y-3">
                {events.map(e => (
                  <li key={e.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">{e.name}</span>
                    <span className="text-sm text-gray-500">{e.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Garbage/Reports Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reports */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Reports</h3>
                <ul className="space-y-2">
                  {reports.map(r => (
                    <li key={r.id} className="text-sm text-gray-700">
                      <span className="font-semibold">{r.location}</span> - <span className="text-red-600">{r.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Garbage (Send to Plant) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Garbage Processing</h3>
                <p className="text-gray-600 mb-4">Coordinate and send collected waste to processing plants.</p>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-900">
                  <FaTruck /> Send to Processing Plant
                </button>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN (Action Feeds) --- */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* Notifications Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBell className="text-yellow-500" /> Notifications
              </h3>
              <ul className="space-y-3">
                {notifications.map(n => (
                  <li key={n.id} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Marketplace Orders Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaBoxOpen /> Marketplace Orders
                </h3>
                <button className="text-sm text-blue-600 hover:underline">View All</button>
              </div>
              <ul className="space-y-3">
                {orders.map(o => (
                  <li key={o.id} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <p className="text-sm font-semibold text-gray-700">{o.item} (x{o.qty})</p>
                    <span className="text-xs text-gray-500">For: {o.user} - ID: {o.id}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}