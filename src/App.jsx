import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from './lib/mockClerk';
import { motion } from 'framer-motion';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import ClientForm from './components/forms/ClientForm';
import FinancialEvaluationForm from './components/forms/FinancialEvaluationForm';
import PDFReportViewer from './components/reports/PDFReportViewer';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <ClerkProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}

function ProtectedRoutes() {
  return (
    <>
      <SignedIn>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/client-form" element={<ClientForm />} />
            <Route path="/financial-evaluation" element={<FinancialEvaluationForm />} />
            <Route path="/reports" element={<PDFReportViewer />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" replace />
      </SignedOut>
    </>
  );
}

export default App;