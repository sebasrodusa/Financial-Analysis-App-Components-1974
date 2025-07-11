import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiMail, FiPhone, FiMapPin, FiBuilding, 
  FiSave, FiX, FiUsers, FiCalendar, FiPlus 
} = FiIcons;

const ClientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    spouse: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: ''
    },
    children: [],
    company: '',
    position: '',
    industry: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    notes: ''
  });

  const [showSpouseInfo, setShowSpouseInfo] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('spouse.')) {
      const spouseField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        spouse: {
          ...prev.spouse,
          [spouseField]: value
        }
      }));
    } else {
      if (name === 'maritalStatus') {
        setShowSpouseInfo(value === 'married');
      }

      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedChildren = [...prev.children];
      updatedChildren[index] = {
        ...updatedChildren[index],
        [name]: value
      };
      return {
        ...prev,
        children: updatedChildren
      };
    });
  };

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [...prev.children, { name: '', dob: '' }]
    }));
  };

  const removeChild = (index) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const clientId = Date.now();
      const clients = JSON.parse(localStorage.getItem('financialClients') || '[]');
      const newClient = { id: clientId, ...formData };
      clients.push(newClient);
      localStorage.setItem('financialClients', JSON.stringify(clients));

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      maritalStatus: '',
      spouse: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phone: ''
      },
      children: [],
      company: '',
      position: '',
      industry: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      notes: ''
    });
    setShowSpouseInfo(false);
    setErrors({});
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-8">
          <SafeIcon icon={FiUser} className="text-2xl text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
            <p className="text-gray-600">Create a comprehensive client profile</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            {showSpouseInfo && (
              <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiUsers} />
                  <h3 className="font-semibold text-gray-900">Spouse Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="spouse.firstName"
                      value={formData.spouse.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="spouse.lastName"
                      value={formData.spouse.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="spouse.dateOfBirth"
                      value={formData.spouse.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="spouse.email"
                      value={formData.spouse.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="spouse.phone"
                      value={formData.spouse.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiUsers} />
                  <h3 className="font-semibold text-gray-900">Children</h3>
                </div>
                <button
                  type="button"
                  onClick={addChild}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <SafeIcon icon={FiPlus} />
                  <span className="ml-1">Add Child</span>
                </button>
              </div>
              {formData.children.map((child, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={child.name}
                      onChange={(e) => handleChildChange(idx, e)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={child.dob}
                      onChange={(e) => handleChildChange(idx, e)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeChild(idx)}
                    className="text-red-600 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              </div>
            </div>
          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <motion.button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiX} />
              <span>Reset</span>
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiSave} />
              <span>{isSubmitting ? 'Saving...' : 'Save Client'}</span>
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ClientForm;