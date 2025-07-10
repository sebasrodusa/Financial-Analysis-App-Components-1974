import React from 'react';
import { UserButton, useUser } from '../../lib/mockClerk';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiBell, FiSearch } = FiIcons;

const Navbar = () => {
  const { user } = useUser();

  return (
    <motion.nav
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 fixed w-full top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiTrendingUp} className="text-2xl text-blue-600" />
            <span className="text-xl font-bold text-gray-800">FinanceFlow</span>
          </div>
          <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-4 py-2 ml-8">
            <SafeIcon icon={FiSearch} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search clients, reports..."
              className="bg-transparent outline-none text-gray-700 w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiBell} className="text-xl" />
          </motion.button>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;