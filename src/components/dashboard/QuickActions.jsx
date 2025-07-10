import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUserPlus, FiBarChart3, FiFileText, FiPlus } = FiIcons;

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add New Client',
      description: 'Create a new client profile',
      icon: FiUserPlus,
      color: 'blue',
      onClick: () => navigate('/client-form')
    },
    {
      title: 'Financial Analysis',
      description: 'Start a new evaluation',
      icon: FiBarChart3,
      color: 'green',
      onClick: () => navigate('/financial-evaluation')
    },
    {
      title: 'Generate Report',
      description: 'Create a new report',
      icon: FiFileText,
      color: 'purple',
      onClick: () => navigate('/reports')
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div className="space-y-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            onClick={action.onClick}
            className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`p-2 rounded-lg mr-4 ${
              action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              action.color === 'green' ? 'bg-green-100 text-green-600' :
              'bg-purple-100 text-purple-600'
            }`}>
              <SafeIcon icon={action.icon} className="text-lg" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;