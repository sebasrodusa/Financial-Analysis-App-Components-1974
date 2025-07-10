import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiFileText, FiTrendingUp, FiDollarSign } = FiIcons;

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Clients',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'Reports Generated',
      value: '456',
      change: '+8%',
      changeType: 'positive',
      icon: FiFileText,
      color: 'green'
    },
    {
      title: 'Revenue Growth',
      value: '$2.4M',
      change: '+23%',
      changeType: 'positive',
      icon: FiTrendingUp,
      color: 'purple'
    },
    {
      title: 'Average Deal Size',
      value: '$45K',
      change: '+5%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
              <SafeIcon icon={stat.icon} className="text-xl text-white" />
            </div>
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;