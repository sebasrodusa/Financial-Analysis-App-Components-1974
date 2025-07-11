import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiBarChart3,
  FiDollarSign,
  FiTrendingUp,
  FiSave,
  FiX,
  FiPieChart,
  FiUser,
  FiCreditCard,
  FiFileText,
  FiShield,
  FiEdit,
  FiLayers,
  FiFlag,
} = FiIcons;

const FinancialEvaluationForm = () => {
  // Mock client data - in a real app this would come from an API or database
  const [clients, setClients] = useState([
    { id: 1, name: 'ABC Corp', industry: 'technology' },
    { id: 2, name: 'Tech Innovations Inc', industry: 'technology' },
    { id: 3, name: 'StartupXYZ', industry: 'technology' },
    { id: 4, name: 'GreenTech Solutions', industry: 'manufacturing' },
    { id: 5, name: 'Manufacturing Co', industry: 'manufacturing' },
    { id: 6, name: 'Healthcare Systems Ltd', industry: 'healthcare' },
    { id: 7, name: 'Finance Partners', industry: 'finance' }
  ]);

  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    evaluationDate: '',
    evaluationType: '',
codex/update-financialevaluationform-with-income-and-expenses
    revenue: '',
    expenses: '',
    assets: '',
    liabilities: '',
    cashFlow: '',
    personalIncome: '',
    spouseIncome: '',
    realEstateIncome: '',
    businessIncome: '',
    otherIncome: '',
    rentMortgage: '',
    groceries: '',
    transportation: '',
    utilities: '',
    insurance: '',
    entertainment: '',
    otherExpenses: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    netIncome: '',
    bsAssets: '',
    bsLiabilities: '',
    netWorth: '',
    lifePolicyInfo: '',
    coverageIncome: '',
    coverageYears: '',
    coverageNeeded: '',
    debtList: '',
    debtStrategy: '',
    goals: ''
  });

  const [activeTab, setActiveTab] = useState('cashflow');
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

  // Compute derived values
  useEffect(() => {
    const totalIncome =
      (parseFloat(formData.personalIncome) || 0) +
      (parseFloat(formData.spouseIncome) || 0) +
      (parseFloat(formData.realEstateIncome) || 0) +
      (parseFloat(formData.businessIncome) || 0) +
      (parseFloat(formData.otherIncome) || 0);

    setFormData(prev => ({
      ...prev,
      monthlyIncome: totalIncome.toString(),
    }));
  }, [
    formData.personalIncome,
    formData.spouseIncome,
    formData.realEstateIncome,
    formData.businessIncome,
    formData.otherIncome,
  ]);

  useEffect(() => {
    const totalExpenses =
      (parseFloat(formData.rentMortgage) || 0) +
      (parseFloat(formData.groceries) || 0) +
      (parseFloat(formData.transportation) || 0) +
      (parseFloat(formData.utilities) || 0) +
      (parseFloat(formData.insurance) || 0) +
      (parseFloat(formData.entertainment) || 0) +
      (parseFloat(formData.otherExpenses) || 0);

    setFormData(prev => ({
      ...prev,
      monthlyExpenses: totalExpenses.toString(),
    }));
  }, [
    formData.rentMortgage,
    formData.groceries,
    formData.transportation,
    formData.utilities,
    formData.insurance,
    formData.entertainment,
    formData.otherExpenses,
  ]);

  // Compute derived values
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      netIncome:
        (parseFloat(prev.monthlyIncome) || 0) -
        (parseFloat(prev.monthlyExpenses) || 0),
    }));
  }, [formData.monthlyIncome, formData.monthlyExpenses]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      netWorth:
        (parseFloat(prev.bsAssets) || 0) -
        (parseFloat(prev.bsLiabilities) || 0),
    }));
  }, [formData.bsAssets, formData.bsLiabilities]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      coverageNeeded:
        (parseFloat(prev.coverageIncome) || 0) *
        (parseFloat(prev.coverageYears) || 0),
    }));
  }, [formData.coverageIncome, formData.coverageYears]);

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
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    evaluations.push(newEvaluation);
    localStorage.setItem('financialEvaluations', JSON.stringify(evaluations));

    alert('Financial evaluation saved successfully!');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      clientId: '',
      clientName: '',
      evaluationDate: '',
      evaluationType: '',
codex/update-financialevaluationform-with-income-and-expenses
      revenue: '',
      expenses: '',
      assets: '',
      liabilities: '',
      cashFlow: '',
      personalIncome: '',
      spouseIncome: '',
      realEstateIncome: '',
      businessIncome: '',
      otherIncome: '',
      rentMortgage: '',
      groceries: '',
      transportation: '',
      utilities: '',
      insurance: '',
      entertainment: '',
      otherExpenses: '',
      monthlyIncome: '',
      monthlyExpenses: '',
      netIncome: '',
      bsAssets: '',
      bsLiabilities: '',
      netWorth: '',
      lifePolicyInfo: '',
      coverageIncome: '',
      coverageYears: '',
      coverageNeeded: '',
      debtList: '',
      debtStrategy: '',
      goals: ''
    });
    setSelectedClient(null);
  };

  const tabs = [
    { id: 'cashflow', label: 'Cashflow', icon: FiCreditCard },
    { id: 'balance', label: 'Balance Sheet', icon: FiFileText },
    { id: 'policies', label: 'Life Insurance Policies', icon: FiShield },
    { id: 'calculator', label: 'Life Insurance Calculator', icon: FiEdit },
    { id: 'debts', label: 'Debt Stacking', icon: FiLayers },
    { id: 'goals', label: 'Goals and Dreams', icon: FiFlag }
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

            {activeTab === 'cashflow' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Cashflow</h2>

                <h3 className="text-md font-semibold text-gray-800">Income</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Personal Income</label>
                    <input
                      type="number"
                      name="personalIncome"
                      value={formData.personalIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Income</label>
                    <input
                      type="number"
                      name="spouseIncome"
                      value={formData.spouseIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Real Estate Income</label>
                    <input
                      type="number"
                      name="realEstateIncome"
                      value={formData.realEstateIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Income</label>
                    <input
                      type="number"
                      name="businessIncome"
                      value={formData.businessIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Income</label>
                    <input
                      type="number"
                      name="otherIncome"
                      value={formData.otherIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <h3 className="text-md font-semibold text-gray-800">Expenses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rent / Mortgage</label>
                    <input
                      type="number"
                      name="rentMortgage"
                      value={formData.rentMortgage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Groceries</label>
                    <input
                      type="number"
                      name="groceries"
                      value={formData.groceries}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
                    <input
                      type="number"
                      name="transportation"
                      value={formData.transportation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Utilities</label>
                    <input
                      type="number"
                      name="utilities"
                      value={formData.utilities}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                    <input
                      type="number"
                      name="insurance"
                      value={formData.insurance}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entertainment</label>
                    <input
                      type="number"
                      name="entertainment"
                      value={formData.entertainment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Expenses</label>
                    <input
                      type="number"
                      name="otherExpenses"
                      value={formData.otherExpenses}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses</label>
                  <input
                    type="number"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Net Income</label>
                  <input
                    type="number"
                    name="netIncome"
                    value={formData.netIncome}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            )}

            {activeTab === 'balance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Balance Sheet</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assets
                    </label>
                    <input
                      type="number"
                      name="bsAssets"
                      value={formData.bsAssets}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liabilities
                    </label>
                    <input
                      type="number"
                      name="bsLiabilities"
                      value={formData.bsLiabilities}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Net Worth
                  </label>
                  <input
                    type="number"
                    name="netWorth"
                    value={formData.netWorth}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Life Insurance Policies</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Information
                  </label>
                  <textarea
                    name="lifePolicyInfo"
                    value={formData.lifePolicyInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Life Insurance Calculator</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income to Replace
                    </label>
                    <input
                      type="number"
                      name="coverageIncome"
                      value={formData.coverageIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Coverage
                    </label>
                    <input
                      type="number"
                      name="coverageYears"
                      value={formData.coverageYears}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Needed
                  </label>
                  <input
                    type="number"
                    name="coverageNeeded"
                    value={formData.coverageNeeded}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            )}

            {activeTab === 'debts' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Debt Stacking</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Debts
                  </label>
                  <textarea
                    name="debtList"
                    value={formData.debtList}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordering Strategy
                  </label>
                  <textarea
                    name="debtStrategy"
                    value={formData.debtStrategy}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Goals and Dreams</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Goals
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
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