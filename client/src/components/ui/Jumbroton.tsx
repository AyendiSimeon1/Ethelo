"use client";
import React from 'react';
import {
  Heart,
  Users,
  Calendar,
  HandHeart,
  Globe,
  Send
} from 'lucide-react';

const Jumbotron = () => {
  return (
    <div className='relative bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden'>
      <div className='absolute inset-0 opacity-10' />
      <div className='absolute inset-0 overflow-hidden'>
        <div className='animate-float-medium absolute top-40 right-10 lg:right-20'>
          <Heart className='w-8 h-8 text-pink-400 opacity-30' />
        </div>
        <div className='animate-float-medium absolute top-60 right-16 lg:right-32'>
          <Users className='w-10 h-10 text-yellow-400 opacity-30' />    
        </div>
        <div className='animate-float-fast absolute top-72 right-6 lg:right-16'>
          <Calendar className='w-6 h-6 text-green-400 opacity-30' />
        </div>
      </div>

      <div className='relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-24'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8 text-center lg:text-left'>
            <div className='space-y-4'>
              <div className='inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-sm text-white'>
                <HandHeart className='w-4 h-4' />
                <span>Join our community of volunteers</span>
              </div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in'>
                Make a Difference
                <span className='block text-blue-200'>One step at a time</span>
              </h1>
              <p className='text-lg text-blue-100 max-w-2xl animate-fade-in-delay'>
                Connect with meaningful volunteer opportunities and create positive change in your community.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6">
              {[
                { label: "Volunteers", value: "5K+" },
                { label: "Organizations", value: "200+" },
                { label: "Hours Given", value: "10K+" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-white">{item.value}</div>
                  <div className="text-sm text-blue-200">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="max-w-md mx-auto lg:mx-0">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-semibold rounded-lg transition-colors duration-200"
                >
                  <span className="hidden sm:inline mr-2">Subscribe</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="mt-2 text-sm text-blue-200">
                Join our newsletter for updates and opportunities
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {[
              {
                icon: <Globe className="w-6 h-6 text-white" />,
                title: "Find Opportunities",
                description: "Browse through hundreds of volunteering opportunities"
              },
              {
                icon: <Users className="w-6 h-6 text-white" />,
                title: "Join Teams",
                description: "Connect with other volunteers and make friends"
              },
              {
                icon: <Heart className="w-6 h-6 text-white" />,
                title: "Make Impact",
                description: "Track your contributions and see your impact grow"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-blue-100">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
