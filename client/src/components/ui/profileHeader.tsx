"use client";
import Link from 'next/link';
import React from 'react';
import { Bell, Navigation, Settings, User } from 'lucide-react';
import { useAppSelector } from '@/redux/store';
import { logout } from '@/redux/authReducer';

const Navbar = () => {
  const [activeTab, setActiveTab] = React.useState('jobs');
  const { user, isLoading, isAuthenticated, error } = useAppSelector((state) => state.auth);

  const navItems = [
    { id: 'jobs', label: 'Post A Project' },
    { id: 'About ', label: 'About' },
    { id: 'faq', label: 'FAQ' },
  ];
  const handleLogout = async () => {
    console.log('the stuff is dispatching');

    await dispatch(logout());

    };

  return (
    <nav className="w-full bg-gray-800 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
       
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 p-3 rounded-md flex items-center justify-center">
              <span className="text-white p-2 font-bold"><Navigation /></span>
            </div>
            <span className="text-white font-bold text-2xl ">Ethelo</span>
          </div>

     
          

          <div className=" lg:flex items-center space-x-4">
            { isAuthenticated ? (
                <Link href='/profile'>
                <button 
                  className='text-white bg-blue-700 px-3 font-mono py-2  rounded'
                  >
                    Logout
                  </button>
                </Link>
            ) :
            (
              
              <button onClick={handleLogout}
                className='text-white bg-blue-700 px-3 font-mono py-2  rounded'
                >
                  Signup
                </button>
           
            )
          }
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
