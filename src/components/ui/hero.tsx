"use client";
import React from 'react';

import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Code, 
  Search,
  Palette, 
  LineChart, 
  Server,
 
} from 'lucide-react'

import  Cat  from '@/components/card/CategoryData';



const Hero: React.FC =  () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
 
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <div className="max-w-3xl space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold font-mono animate-slide-in delay-200 text-gray-900 tracking-tight leading-tight"
            >
              Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Difference</span> in Your Community
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 font-medium leading-relaxed"
            >
              Connect with meaningful volunteer opportunities and create positive change. 
              Join thousands making an impact.
            </motion.p>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSearch} 
            className="w-full max-w-2xl"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm"
                placeholder="Search for volunteer opportunities, organizations, or causes..."
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all text-base font-semibold outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                Search
              </motion.button>
            </div>
          </motion.form>

          
        </motion.div>
      </div>
       <Cat />

   

    </div>
  );
};

export default Hero;