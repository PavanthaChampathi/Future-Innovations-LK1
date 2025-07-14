import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import QuotationManager from './QuotationManager';
import OrderManager from './OrderManager';
import ServiceManager from './ServiceManager';
import AdminLogin from './AdminLogin';
import { useAuth } from '../../contexts/AuthContext';

const AdminPanel = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/quotations" element={<QuotationManager />} />
          <Route path="/orders" element={<OrderManager />} />
          <Route path="/services" element={<ServiceManager />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;