"use client";
import Link from 'next/link';
import React from 'react';
import { Bell, Navigation, Settings, User } from 'lucide-react';

const Navbar = () => {
  const [activeTab, setActiveTab] = React.useState('jobs');

  const navItems = [
    { id: 'jobs', label: 'Post A Project' },
    { id: 'About ', label: 'About' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <nav className="w-full bg-gray-800 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
       
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 p-3 rounded-md flex items-center justify-center">
              <span className="text-white p-2 font-bold"><Navigation /></span>
            </div>
            <span className="text-white font-bold text-2xl font-mono">Ethelo</span>
          </div>

     
          <div className="flex items-center space-x-8 text-xl font-mono font-semi-bold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative px-2 py-4"
              >
                <span className={`text-sm ${activeTab === item.id ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors`}>
                  {item.label}
                </span>
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
              <Settings size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
              <User size={20} />
            </button> */}
            <Link href='/signup'>
              <button 
                className='text-white bg-blue-700 px-3 font-mono py-2  rounded'
                >
                  Signup
                </button>
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;