"use client";
import React from 'react';
import {
    Heart,
    Users,
    Calendar,
    ArrowRight,
    HandHeart,
    Globe,
    Send
} from 'lucide-react';

const Jumbotron = () => {
    return (
    <div className='relative bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
            </div>
            <div className='absolute inset-0 overflow-hidden'>
                <div className='animate-float-medium absolute top-40 right-20'>
                    <Heart className='w-8 h-8 text-pink-400 opacity-30' />
                </div>
                <div className='animate-float-medium absolute top-40 right-20'>
                    <Users className='w-10 h-10 text-yellow-400 opacity-30' />    
                </div>
                <div className='animate-float-fast absolute top-40 right-20'>
                    <Calendar className='w-6 h-6 text-green-400 opacity-30' />
                </div>
            </div>
            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    <div className='space-y-8 text-center lg:text-left'>
                        <div className='space-y-4'>
                            <div className='inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-sm text-white'>
                                <HandHeart className='w-4 h-4' />
                                <span>Join our community of volunteeers</span>
                            </div>
                            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leadidng-tight animate-fade-in'>
                                Make a Difference
                                <span className='block text-blue-200'>One step at a time</span>
                            </h1>
                            <p className='text-lg text-blue-100 max-w-2xl animate-fad-in-delay'>
                                Connect with meaningful volunteer opportunities and create positive change in your community.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-sm text-blue-200">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-blue-200">Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-blue-200">Hours Given</div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="max-w-md mx-auto lg:mx-0">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-semibold rounded-lg transition-colors duration-200"
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

          {/* Right Content - Feature Cards */}
          <div className="relative grid gap-6 animate-fade-in-up">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Find Opportunities</h3>
                  <p className="text-blue-100">Browse through hundreds of volunteering opportunities</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Join Teams</h3>
                  <p className="text-blue-100">Connect with other volunteers and make friends</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Make Impact</h3>
                  <p className="text-blue-100">Track your contributions and see your impact grow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
)}

export default Jumbotron;