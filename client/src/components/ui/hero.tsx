"use client";
import React from 'react';
import CategoryCard from '@/components/card/CategoryCard';

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
import Link from 'next/link';



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

          <div className="flex space-x-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg hover:from-green-700 hover:to-green-600 transition-all text-base font-semibold outline-none focus:ring-4 focus:ring-green-500/20"
      >
        <Link href="/signup">Signup</Link>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all text-base font-semibold outline-none focus:ring-4 focus:ring-blue-500/20"
      >
        <Link href="/dashboard">Dashboard</Link>
      </motion.button>
    </div>

          
        </motion.div>
      </div>
       <CategoryCard />

   

    </div>
  );
};

export default Hero;