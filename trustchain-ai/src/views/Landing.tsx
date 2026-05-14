import { ArrowRight, QrCode, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-12 pb-24 px-4 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-on-tertiary-container/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-on-tertiary-container/10 text-on-tertiary-container px-4 py-1.5 rounded-full">
              <Zap size={16} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-wider">AI-Powered Integrity</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-[1.1] tracking-tight">
              Verify Before You Pay.{' '}
              <span className="text-secondary">Secure Your Supply Chain</span> with AI.
            </h1>

            <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Bridge the trust gap in the Nigerian retail ecosystem. Leverage advanced AI risk
              assessments to validate products and vendors instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/verify">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-secondary text-on-secondary h-14 px-8 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/20"
                >
                  <QrCode size={20} />
                  Verify Product
                </motion.button>
              </Link>
              <Link to="/verify">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto border-2 border-secondary text-secondary h-14 px-8 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/5 transition-colors"
                >
                  <ShieldCheck size={20} />
                  Verify Vendor
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="bg-surface-container-low p-4 rounded-2xl border border-on-surface/10 shadow-2xl overflow-hidden group">
              {/* ── FIXED: was lh3.googleusercontent.com ── */}
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=70"
                alt="AI Dashboard"
                className="rounded-xl w-full h-auto grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-10 right-10 glass-panel p-4 rounded-xl shadow-xl max-w-[240px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-on-tertiary-container/10 flex items-center justify-center text-on-tertiary-container">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface">Trust Score</p>
                    <p className="text-2xl font-bold text-on-tertiary-container">98%</p>
                  </div>
                </div>
                <p className="text-[10px] text-on-surface-variant font-medium">Verified via TrustChain AI Engine</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-white border-y border-on-surface/5">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center">
          <p className="text-xs font-bold text-on-surface-variant mb-8 uppercase tracking-[0.2em]">Industry Partnerships</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-white font-bold text-xs">S</div>
              <span className="text-xl font-extrabold tracking-tight">Powered by Squad</span>
            </div>
            <span className="text-xl font-bold">Digital Integrity Hub</span>
            <span className="text-xl font-bold">SafeTrade NG</span>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Advanced Protection for Every Stakeholder
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Our multi-layered AI approach ensures that every transaction is backed by data, not just promises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-white p-8 md:p-12 rounded-3xl border border-on-surface/5 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-error-container/40 text-error rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-4">99.9% Fraud Reduction</h3>
              <p className="text-on-surface-variant max-w-md text-base leading-relaxed">
                Our neural networks analyze over 50 data points per transaction to detect counterfeit
                products and fraudulent vendor patterns before you part with your capital.
              </p>
            </div>
            <div className="mt-12 flex gap-2 relative z-10">
              <span className="bg-error/10 text-error px-4 py-1 rounded-full text-xs font-bold">High Risk Flagged</span>
              <span className="bg-on-tertiary-container/10 text-on-tertiary-container px-4 py-1 rounded-full text-xs font-bold">System Alert</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-primary-container p-8 md:p-12 rounded-3xl flex flex-col justify-between text-white"
          >
            <div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Squad API Native</h3>
              <p className="text-on-primary-container text-sm leading-relaxed">
                Seamlessly integrated with Squad's payment infrastructure for instant escrow and secure settlements.
              </p>
            </div>
            <Link to="#" className="mt-8 inline-flex items-center gap-2 text-secondary-fixed text-sm font-bold group">
              View Documentation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-surface-container-high p-8 md:p-12 rounded-3xl border border-on-surface/5"
          >
            <div className="w-14 h-14 bg-on-tertiary-container/10 text-on-tertiary-container rounded-2xl flex items-center justify-center mb-8">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">AI Trust Scores</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Dynamic, real-time scoring system that updates vendor reliability based on historical
              performance and live feedback loops.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-surface-container-low p-8 md:p-12 rounded-3xl border border-on-surface/5 flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-on-surface mb-4">Built for the African Ecosystem</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Tailored risk models that understand local trade nuances, from Lagos wholesalers to regional distributors.
              </p>
              <button className="font-bold text-sm text-secondary border-b-2 border-secondary/30 hover:border-secondary transition-all">
                Learn about our models
              </button>
            </div>
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl aspect-video">
              {/* ── FIXED: was lh3.googleusercontent.com ── */}
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=70"
                alt="African marketplace"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto bg-secondary rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-primary-container/80 mix-blend-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-secondary tracking-tight">
              Ready to Secure Your Next Shipment?
            </h2>
            <p className="text-xl text-on-secondary/80 max-w-2xl mx-auto">
              Join thousands of vendors and retailers using TrustChain AI to eliminate transaction risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/verify">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-secondary h-14 px-10 rounded-2xl font-bold shadow-xl transition-all"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary-container text-on-secondary-container h-14 px-10 rounded-2xl font-bold"
              >
                Talk to Sales
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
