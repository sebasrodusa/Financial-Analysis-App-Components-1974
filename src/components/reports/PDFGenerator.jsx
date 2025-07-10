import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiDownload, FiX, FiSettings, FiUser, FiBarChart3 } = FiIcons;

const PDFGenerator = ({ onClose }) => {
  const [reportData, setReportData] = useState({
    title: '',
    client: '',
    reportType: '',
    dateRange: '',
    includeCharts: true,
    includeRatios: true,
    includeRecommendations: true,
    template: 'standard'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would use a library like jsPDF or call an API
    console.log('Generating PDF with data:', reportData);
    alert('PDF report generated successfully!');
    
    setIsGenerating(false);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiFileText} className="text-2xl text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Generate PDF Report</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <SafeIcon icon={FiSettings} className="mr-2" />
              Report Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={reportData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter report title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="client"
                  value={reportData.client}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type
                  </label>
                  <select
                    name="reportType"
                    value={reportData.reportType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="quarterly">Quarterly Analysis</option>
                    <option value="annual">Annual Review</option>
                    <option value="loan">Loan Application</option>
                    <option value="investment">Investment Analysis</option>
                    <option value="risk">Risk Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <input
                    type="text"
                    name="dateRange"
                    value={reportData.dateRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Q4 2024"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  reportData.template === 'standard'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setReportData(prev => ({ ...prev, template: 'standard' }))}
              >
                <h4 className="font-medium text-gray-900">Standard Template</h4>
                <p className="text-sm text-gray-600">Professional layout with charts and tables</p>
              </div>
              
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  reportData.template === 'executive'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setReportData(prev => ({ ...prev, template: 'executive' }))}
              >
                <h4 className="font-medium text-gray-900">Executive Summary</h4>
                <p className="text-sm text-gray-600">Condensed format for executive review</p>
              </div>
            </div>
          </div>

          {/* Content Options */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Content Options</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="includeCharts"
                  checked={reportData.includeCharts}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Include Financial Charts</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="includeRatios"
                  checked={reportData.includeRatios}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Include Financial Ratios</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="includeRecommendations"
                  checked={reportData.includeRecommendations}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Include Recommendations</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Preview</h3>
            <div className="bg-white border border-gray-200 rounded p-4 min-h-32">
              <div className="text-center">
                <SafeIcon icon={FiFileText} className="text-3xl text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {reportData.title || 'Report Title'} - {reportData.client || 'Client Name'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {reportData.template === 'standard' ? 'Standard Template' : 'Executive Summary'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <motion.button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiDownload} />
              <span>{isGenerating ? 'Generating...' : 'Generate PDF'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PDFGenerator;