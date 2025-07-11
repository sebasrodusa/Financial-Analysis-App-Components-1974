import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import PDFGenerator from './PDFGenerator';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiDownload, FiEye, FiPlus, FiFilter, FiSearch, FiX, FiUser, FiCalendar } = FiIcons;

const PDFReportViewer = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showGenerator, setShowGenerator] = useState(false);

  // Load reports from localStorage
  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('financialReports') || '[]');
    if (storedReports.length > 0) {
      setReports(storedReports);
    } else {
      // Fallback to sample reports if none are in localStorage
      setReports([
        {
          id: 1,
          title: 'Q4 2024 Financial Analysis - ABC Corp',
          type: 'quarterly',
          client: 'ABC Corp',
          date: '2024-12-15',
          size: '2.4 MB',
          status: 'completed'
        },
        {
          id: 2,
          title: 'Annual Review - Tech Innovations Inc',
          type: 'annual',
          client: 'Tech Innovations Inc',
          date: '2024-12-10',
          size: '3.1 MB',
          status: 'completed'
        },
        {
          id: 3,
          title: 'Loan Application Analysis - StartupXYZ',
          type: 'loan',
          client: 'StartupXYZ',
          date: '2024-12-08',
          size: '1.8 MB',
          status: 'completed'
        },
        {
          id: 4,
          title: 'Investment Analysis - GreenTech Solutions',
          type: 'investment',
          client: 'GreenTech Solutions',
          date: '2024-12-05',
          size: '2.9 MB',
          status: 'pending'
        },
        {
          id: 5,
          title: 'Risk Assessment - Manufacturing Co',
          type: 'risk',
          client: 'Manufacturing Co',
          date: '2024-12-01',
          size: '2.2 MB',
          status: 'completed'
        }
      ]);
    }
  }, []);

  // Update reports list when a new report is generated
  useEffect(() => {
    if (!showGenerator) {
      const storedReports = JSON.parse(localStorage.getItem('financialReports') || '[]');
      if (storedReports.length > 0) {
        setReports(storedReports);
      }
    }
  }, [showGenerator]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.evaluation?.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || report.type === filterType || report.reportType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleViewReport = (report) => {
    setSelectedReport(report);
    // In a real app, you would open the PDF viewer here
  };

  const handleDownloadReport = (report) => {
    // In a real app, you would trigger the download here
    alert(`Downloading ${report.title}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'quarterly':
        return 'bg-blue-100 text-blue-800';
      case 'annual':
        return 'bg-purple-100 text-purple-800';
      case 'loan':
        return 'bg-green-100 text-green-800';
      case 'investment':
        return 'bg-orange-100 text-orange-800';
      case 'risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showGenerator) {
    return <PDFGenerator onClose={() => setShowGenerator(false)} />;
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiFileText} className="text-2xl text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">PDF Reports</h1>
            <p className="text-gray-600">Manage and view your financial reports</p>
          </div>
        </div>
        <motion.button
          onClick={() => setShowGenerator(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SafeIcon icon={FiPlus} />
          <span>Generate Report</span>
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
              <option value="loan">Loan Analysis</option>
              <option value="investment">Investment</option>
              <option value="risk">Risk Assessment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Reports ({filteredReports.length})
          </h2>
          <div className="space-y-4">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <SafeIcon icon={FiFileText} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <SafeIcon icon={FiUser} className="mr-1" />
                      <span>{report.client || report.evaluation?.clientName}</span>
                      
                      {report.dateRange && (
                        <span className="ml-3 flex items-center">
                          <SafeIcon icon={FiCalendar} className="mr-1" />
                          {report.dateRange}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type || report.reportType)}`}>
                        {(report.type || report.reportType || '').charAt(0).toUpperCase() + (report.type || report.reportType || '').slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="text-right">
                    <p>{formatDate(report.date || report.createdAt)}</p>
                    <p>{report.size}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => handleViewReport(report)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="View Report"
                    >
                      <SafeIcon icon={FiEye} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDownloadReport(report)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Download Report"
                    >
                      <SafeIcon icon={FiDownload} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredReports.length === 0 && (
              <div className="text-center py-8">
                <SafeIcon icon={FiFileText} className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No reports found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedReport && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedReport.title}</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Report Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Client</p>
                    <p className="font-medium">{selectedReport.client || selectedReport.evaluation?.clientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(selectedReport.date || selectedReport.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium capitalize">{selectedReport.type || selectedReport.reportType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium capitalize">{selectedReport.status}</p>
                  </div>
                </div>
              </div>
              
              {selectedReport.evaluation && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Financial Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Monthly Income</p>
                      <p className="text-lg font-semibold">${Number(selectedReport.evaluation.monthlyIncome || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Monthly Expenses</p>
                      <p className="text-lg font-semibold">${Number(selectedReport.evaluation.monthlyExpenses || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Net Income</p>
                      <p className="text-lg font-semibold">${Number(selectedReport.evaluation.netIncome || 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-center py-8 bg-gray-100 rounded-lg">
                <SafeIcon icon={FiFileText} className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">PDF Viewer would be implemented here</p>
                <p className="text-sm text-gray-500">
                  In a real application, you would integrate with a PDF viewer library like react-pdf or pdf.js to display the actual PDF content.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => handleDownloadReport(selectedReport)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <SafeIcon icon={FiDownload} className="mr-2" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PDFReportViewer;