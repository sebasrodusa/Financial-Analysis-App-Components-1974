import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../lib/mockClerk';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import FinancialChart from './FinancialChart';

const Dashboard = () => {
  const { user } = useUser();
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your financial analysis platform today.
        </p>
      </motion.div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FinancialChart />
        </div>
        <QuickActions />
      </div>
      
      <RecentActivity />
    </div>
  );
};

export default Dashboard;