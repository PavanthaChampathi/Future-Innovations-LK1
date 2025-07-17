import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import QuoteUpload from './components/QuoteUpload';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import AdminPanel from './components/admin/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              {/* Admin routes */}
              <Route path="/admin/*" element={<AdminPanel />} />
              
              {/* Main website routes */}
              <Route path="/" element={
                <>
                  <Navbar />
                  <main>
                    <Hero />
                    <Services />
                    <About />
                    <QuoteUpload />
                    <Contact />
                  </main>
                  <Footer />
                </>
              } />
              
              {/* 404 page for any unmatched routes */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;