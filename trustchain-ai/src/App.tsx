/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './views/Landing';
import Verify from './views/Verify';
import Result from './views/Result';
import Dashboard from './views/Dashboard';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-secondary/20 selection:text-secondary">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Landing />
                </motion.div>
              } 
            />
            <Route 
              path="/verify" 
              element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Verify />
                </motion.div>
              } 
            />
            <Route 
              path="/result" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                   <Result />
                </motion.div>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                   <Dashboard />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

