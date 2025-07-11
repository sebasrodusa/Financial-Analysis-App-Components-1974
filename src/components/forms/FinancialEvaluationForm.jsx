import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiDollarSign, FiTrendingUp, FiSave, FiX, FiPieChart, FiUser } = FiIcons;

const FinancialEvaluationForm = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  // Load clients from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('financialClients') || '[]');
    setClients(stored);
  }, []);

  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    evaluationDate: '',
    evaluationType: '',
    revenue: '',
    expenses: '',
    assets: '',
    liabilities: '',
    cashFlow: '',
    profitMargin: '',
    debtToEquity: '',
    currentRatio: '',
    quickRatio: '',
    riskAssessment: '',
    creditScore: '',
    industryBenchmark: '',
    recommendations: '',
    nextReviewDate: ''
  });

  const [activeTab, setActiveTab] = useState('financial');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Handle client selection
  useEffect(() => {
    if (formData.clientId) {
      const client = clients.find(c => c.id === parseInt(formData.clientId));
      if (client) {
        setSelectedClient(client);
        setFormData(prev => ({
          ...prev,
          clientName: client.name,
        }));
      }
    }
  }, [formData.clientId, clients]);

  if (clients.length === 0) {
    return (
      <motion.div className="max-w-xl mx-auto py-8 text-center">
        <p className="mb-4 text-gray-600">No clients found. Please add a client first.</p>
        <button
          onClick={() => navigate('/client-form')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Client
        </button>
      </motion.div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientId) newErrors.clientId = 'Client is required';
    if (!formData.evaluationDate) newErrors.evaluationDate = 'Evaluation date is required';
    if (!formData.evaluationType) newErrors.evaluationType = 'Evaluation type is required';
    if (!formData.revenue) newErrors.revenue = 'Revenue is required';
    if (!formData.expenses) newErrors.expenses = 'Expenses are required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store the evaluation in localStorage for later use in reports
    const evaluationId = Date.now();
    const evaluations = JSON.parse(localStorage.getItem('financialEvaluations') || '[]');
    const newEvaluation = {
      id: evaluationId,
      clientId: formData.clientId,
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    evaluations.push(newEvaluation);
    localStorage.setItem('financialEvaluations', JSON.stringify(evaluations));
    
    console.log('Financial evaluation data:', newEvaluation);
    alert('Financial evaluation saved successfully!');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      clientId: '',
      clientName: '',
      evaluationDate: '',
      evaluationType: '',
      revenue: '',
      expenses: '',
      assets: '',
      liabilities: '',
      cashFlow: '',
      profitMargin: '',
      debtToEquity: '',
      currentRatio: '',
      quickRatio: '',
      riskAssessment: '',
      creditScore: '',
      industryBenchmark: '',
      recommendations: '',
      nextReviewDate: ''
    });
    setSelectedClient(null);
  };

  const tabs = [
    { id: 'financial', label: 'Financial Data', icon: FiDollarSign },
    { id: 'ratios', label: 'Financial Ratios', icon: FiPieChart },
    { id: 'analysis', label: 'Risk Analysis', icon: FiTrendingUp }
  ];

  return (
    <motion.div className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-8">
          <SafeIcon icon={FiBarChart3} className="text-2xl text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Evaluation</h1>
            <p className="text-gray-600">Comprehensive financial analysis and risk assessment</p>
          </div>
        </div>

        {/* Client Selection */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-3 mb-4">
            <SafeIcon icon={FiUser} className="text-xl text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Client Selection</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Client *
              </label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.clientId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
              {errors.clientId && (
                <p className="mt-1 text-sm text-red-600">{errors.clientId}</p>
              )}
            </div>
            
            {selectedClient && (
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="font-medium text-gray-900">{selectedClient.name}</div>
                  <div className="text-sm text-gray-600 capitalize">Industry: {selectedClient.industry}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaluation Date *
              </label>
              <input
                type="date"
                name="evaluationDate"
                value={formData.evaluationDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.evaluationDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.evaluationDate && (
                <p className="mt-1 text-sm text-red-600">{errors.evaluationDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaluation Type *
              </label>
              <select
                name="evaluationType"
                value={formData.evaluationType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.evaluationType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select type</option>
                <option value="annual">Annual Review</option>
                <option value="quarterly">Quarterly Assessment</option>
                <option value="loan">Loan Application</option>
                <option value="investment">Investment Analysis</option>
                <option value="merger">Merger & Acquisition</option>
              </select>
              {errors.evaluationType && (
                <p className="mt-1 text-sm text-red-600">{errors.evaluationType}</p>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'financial' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Financial Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Revenue *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-400">$</span>
                      <input
                        type="number"
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleChange}
                        className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.revenue ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0"
                      />
                    </div>
                    {errors.revenue && (
                      <p className="mt-1 text-sm text-red-600">{errors.revenue}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Expenses *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-400">$</span>
                      <input
                        type="number"
                        name="expenses"
                        value={formData.expenses}
                        onChange={handleChange}
                        className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.expenses ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0"
                      />
                    </div>
                    {errors.expenses && (
                      <p className="mt-1 text-sm text-red-600">{errors.expenses}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Assets
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-400">$</span>
                      <input
                        type="number"
                        name="assets"
                        value={formData.assets}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Liabilities
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-400">$</span>
                      <input
                        type="number"
                        name="liabilities"
                        value={formData.liabilities}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Cash Flow
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-400">$</span>
                      <input
                        type="number"
                        name="cashFlow"
                        value={formData.cashFlow}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit Score
                    </label>
                    <input
                      type="number"
                      name="creditScore"
                      value={formData.creditScore}
                      onChange={handleChange}
                      min="300"
                      max="850"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="300-850"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ratios' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Financial Ratios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profit Margin (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="profitMargin"
                        value={formData.profitMargin}
                        onChange={handleChange}
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-3.5 text-gray-400">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Debt-to-Equity Ratio
                    </label>
                    <input
                      type="number"
                      name="debtToEquity"
                      value={formData.debtToEquity}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Ratio
                    </label>
                    <input
                      type="number"
                      name="currentRatio"
                      value={formData.currentRatio}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quick Ratio
                    </label>
                    <input
                      type="number"
                      name="quickRatio"
                      value={formData.quickRatio}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry Benchmark
                    </label>
                    <select
                      name="industryBenchmark"
                      value={formData.industryBenchmark}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select benchmark</option>
                      <option value="above">Above Industry Average</option>
                      <option value="average">Industry Average</option>
                      <option value="below">Below Industry Average</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Risk Analysis</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Assessment
                    </label>
                    <select
                      name="riskAssessment"
                      value={formData.riskAssessment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select risk level</option>
                      <option value="low">Low Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="high">High Risk</option>
                      <option value="critical">Critical Risk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recommendations
                    </label>
                    <textarea
                      name="recommendations"
                      value={formData.recommendations}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter detailed recommendations and analysis..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Review Date
                    </label>
                    <input
                      type="date"
                      name="nextReviewDate"
                      value={formData.nextReviewDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <motion.button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiX} />
              <span>Cancel</span>
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiSave} />
              <span>{isSubmitting ? 'Saving...' : 'Save Evaluation'}</span>
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FinancialEvaluationForm;