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
          
        </motion.div>
      </div>
       <CategoryCard />

   

    </div>
  );
};

export default Hero;