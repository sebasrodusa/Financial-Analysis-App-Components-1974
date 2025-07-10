import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiFileText, FiTrendingUp, FiDollarSign } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'client',
      title: 'New client added',
      description: 'John Smith - Tech Startup',
      time: '2 hours ago',
      icon: FiUser,
      color: 'blue'
    },
    {
      id: 2,
      type: 'report',
      title: 'Financial report generated',
      description: 'Q4 2024 Analysis for ABC Corp',
      time: '4 hours ago',
      icon: FiFileText,
      color: 'green'
    },
    {
      id: 3,
      type: 'analysis',
      title: 'Risk assessment completed',
      description: 'Medium risk profile identified',
      time: '6 hours ago',
      icon: FiTrendingUp,
      color: 'orange'
    },
    {
      id: 4,
      type: 'revenue',
      title: 'Revenue milestone reached',
      description: '$2.5M monthly target achieved',
      time: '1 day ago',
      icon: FiDollarSign,
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
              <SafeIcon icon={activity.icon} className="text-lg" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;