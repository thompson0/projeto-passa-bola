'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { WaveSeparator } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

const Layout = ({ children }) => {
  const { role } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container max-w-[1280px] mx-auto px-6 py-8">
          {children}
        </div>
      </main>
      <WaveSeparator />
      <Footer />
    </div>
  );
};

export default Layout;