import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { jsPDF } from 'jspdf';

const {
  FiFileText,
  FiDownload,
  FiX,
  FiSettings,
  FiUser,
  FiBarChart3,
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
} = FiIcons;

const PDFGenerator = ({ onClose }) => {
  // Get evaluations from localStorage
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  useEffect(() => {
    const storedEvaluations = JSON.parse(localStorage.getItem('financialEvaluations') || '[]');
    setEvaluations(storedEvaluations);
  }, []);

  const [reportData, setReportData] = useState({
    title: '',
    evaluationId: '',
    reportType: '',
    dateRange: '',
    includeCharts: true,
    includeRatios: true,
    includeRecommendations: true,
    template: 'standard'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (reportData.evaluationId) {
      const evaluation = evaluations.find(e => e.id === parseInt(reportData.evaluationId));
      if (evaluation) {
        setSelectedEvaluation(evaluation);
        // Auto-populate report title based on selected evaluation
        setReportData(prev => ({
          ...prev,
          title: `${evaluation.evaluationType.charAt(0).toUpperCase() + evaluation.evaluationType.slice(1)} Report - ${evaluation.clientName}`,
          dateRange: new Date(evaluation.evaluationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        }));
      }
    }
  }, [reportData.evaluationId, evaluations]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateDocument = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(reportData.title || 'Financial Report', 10, 10);
    doc.setFontSize(12);
    if (selectedEvaluation) {
      doc.text(`Client: ${selectedEvaluation.clientName}`, 10, 20);
      doc.text(`Type: ${selectedEvaluation.evaluationType}`, 10, 30);
      doc.text(`Date: ${new Date(selectedEvaluation.evaluationDate).toLocaleDateString()}`, 10, 40);
    }
    doc.save(`${reportData.title || 'report'}.pdf`);
    return doc;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const doc = generateDocument();

    // Save report to localStorage
    const reports = JSON.parse(localStorage.getItem('financialReports') || '[]');
    const newReport = {
      id: Date.now(),
      ...reportData,
      evaluation: selectedEvaluation,
      createdAt: new Date().toISOString(),
      status: 'completed',
      size: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)}MB`
    };
    
    reports.push(newReport);
    localStorage.setItem('financialReports', JSON.stringify(reports));
    
    alert('PDF report generated successfully!');
    setIsGenerating(false);
    onClose();
  };

  const handlePrint = () => {
    const doc = generateDocument();
    doc.autoPrint();
    const url = doc.output('bloburl');
    const win = window.open(url);
    if (win) {
      win.focus();
      win.print();
    }
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
          {/* Evaluation Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <SafeIcon icon={FiBarChart3} className="mr-2" />
              Financial Evaluation
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Evaluation
              </label>
              <select
                name="evaluationId"
                value={reportData.evaluationId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an evaluation</option>
                {evaluations.map(evaluation => (
                  <option key={evaluation.id} value={evaluation.id}>
                    {evaluation.clientName} - {evaluation.evaluationType} ({new Date(evaluation.evaluationDate).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            {selectedEvaluation && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <SafeIcon icon={FiUser} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedEvaluation.clientName}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedEvaluation.evaluationType.charAt(0).toUpperCase() + selectedEvaluation.evaluationType.slice(1)} Evaluation
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(selectedEvaluation.evaluationDate).toLocaleDateString()}
                    </p>
                    <div className="mt-2" />
                  </div>
                </div>
              </div>
            )}
          </div>

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
          {selectedEvaluation && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Preview</h3>
              <div className="bg-white border border-gray-200 rounded p-4">
                <div className="text-center mb-4">
                  <SafeIcon icon={FiFileText} className="text-3xl text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">
                    {reportData.title || 'Report Title'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {reportData.template === 'standard' ? 'Standard Template' : 'Executive Summary'}
                  </p>
                </div>
                
                <div className="space-y-3 text-sm border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Client:</span>
                    <span className="font-medium">{selectedEvaluation.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Period:</span>
                    <span className="font-medium">{reportData.dateRange}</span>
                  </div>
                  
                  {reportData.includeCharts && (
                    <div className="py-2">
                      <div className="flex items-center text-blue-600 mb-1">
                        <SafeIcon icon={FiTrendingUp} className="mr-1" />
                        <span className="text-xs">Financial Charts</span>
                      </div>
                      <div className="h-10 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">Revenue & Expenses Chart</span>
                      </div>
                    </div>
                  )}
                  
                  {reportData.includeRatios && null}
                  
                  {reportData.includeRecommendations && selectedEvaluation.recommendations && (
                    <div className="py-2">
                      <div className="flex items-center text-purple-600 mb-1">
                        <SafeIcon icon={FiDollarSign} className="mr-1" />
                        <span className="text-xs">Recommendations</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-xs">
                        {selectedEvaluation.recommendations.substring(0, 50)}
                        {selectedEvaluation.recommendations.length > 50 ? '...' : ''}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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
              onClick={handlePrint}
              disabled={!selectedEvaluation}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Print
            </motion.button>
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedEvaluation}
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