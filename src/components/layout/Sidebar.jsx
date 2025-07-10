import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiUsers, FiFileText, FiBarChart3, FiSettings } = FiIcons;

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Client Form', href: '/client-form', icon: FiUsers },
    { name: 'Financial Evaluation', href: '/financial-evaluation', icon: FiBarChart3 },
    { name: 'Reports', href: '/reports', icon: FiFileText },
    { name: 'Settings', href: '/settings', icon: FiSettings }
  ];

  return (
    <motion.div 
      className="w-64 bg-white shadow-lg fixed left-0 top-16 h-full border-r border-gray-200"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                <SafeIcon icon={item.icon} className="mr-3 text-lg" />
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;