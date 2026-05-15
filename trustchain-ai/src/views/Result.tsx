import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, AlertTriangle, CheckCircle,
  ChevronRight, ArrowRight, Download, Lock,
  X, Loader
} from 'lucide-react';
import { api } from '../api/client';

export default function Result() {
  const location = useLocation();
  const report = location.state?.data;

  const [showPayment, setShowPayment] = useState(false);
  const [payEmail, setPayEmail]       = useState('');
  const [payAmount, setPayAmount]     = useState('12500');
  const [payLoading, setPayLoading]   = useState(false);
  const [payError, setPayError]       = useState<string | null>(null);
  const [paySuccess, setPaySuccess]   = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6 text-center">
        <div className="bg-white rounded-2xl p-12 shadow border border-on-surface/5">
          <AlertTriangle size={48} className="text-error mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-on-surface mb-3">No Result Found</h1>
          <p className="text-on-surface-variant mb-8">
            You haven't run a verification yet.
          </p>
          <Link to="/verify">
            <button className="bg-secondary text-on-secondary px-8 h-12 rounded-xl font-bold">
              Go to Verify
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { analysis } = report;
  const isLow  = analysis.level === 'LOW';
  const isMed  = analysis.level === 'MEDIUM';
  const isHigh = analysis.level === 'HIGH';
  const ringColor  = isLow ? '#0d9488' : isMed ? '#0051d5' : '#ba1a1a';
  const ringOffset = 502 - (analysis.score / 100) * 502;

  const handlePayment = async () => {
    setPayError(null);
    if (!payEmail) return setPayError('Email is required.');
    if (!payAmount || isNaN(Number(payAmount))) return setPayError('Enter a valid amount.');
    setPayLoading(true);
    try {
      const payData = new FormData();
      payData.append('email', payEmail);
      payData.append('amount', payAmount);
      payData.append('verification_id', report.id);
      const response = await api.post('/payments/initiate', payData);
      if (response.status === 200 && response.data?.checkout_url) {
        setCheckoutUrl(response.data.checkout_url);
        setPaySuccess(true);
      } else {
        setPayError('Payment initialization failed. Try again.');
      }
    } catch (error: unknown) {
      setPayError(error instanceof Error ? error.message : 'Payment failed.');
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-12 py-12">

      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-1 text-on-surface-variant mb-2 text-xs font-bold">
            <Link to="/" className="hover:text-secondary">Home</Link>
            <ChevronRight size={14} />
            <Link to="/verify" className="hover:text-secondary">Verify</Link>
            <ChevronRight size={14} />
            <span className="text-secondary">#{report.id}</span>
          </nav>
          <h1 className="text-3xl font-bold text-on-surface">Verification Result</h1>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-bold shadow-lg"
          style={{ backgroundColor: ringColor }}
        >
          {isLow ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          {analysis.verdict}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

        {/* Score Ring */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-panel rounded-2xl p-8 flex flex-col items-center text-center"
          style={{ borderTop: `4px solid ${ringColor}` }}
        >
          <span className="text-xs font-bold text-on-surface-variant mb-6 uppercase tracking-widest">
            Trust Score Index
          </span>
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-44 h-44 -rotate-90">
              <circle cx="88" cy="88" r="80" fill="transparent"
                stroke="currentColor" strokeWidth="12"
                className="text-surface-container-high" />
              <motion.circle
                cx="88" cy="88" r="80" fill="transparent"
                stroke={ringColor} strokeWidth="12" strokeLinecap="round"
                strokeDasharray="502"
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: ringOffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-5xl font-bold"
                style={{ color: ringColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {analysis.score}
              </motion.span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-1">
                / 100
              </span>
            </div>
          </div>
          <div className="px-6 py-2 rounded-full font-bold text-xs text-white flex items-center gap-2"
            style={{ backgroundColor: ringColor }}>
            <ShieldCheck size={14} />
            {isLow ? 'Low Risk' : isMed ? 'Medium Risk' : 'High Risk'}
          </div>
          <p className="mt-6 text-on-surface-variant text-sm font-medium leading-relaxed">
            AI analyzed product registration, vendor signals, and pricing to generate this score.
          </p>
        </motion.div>

        {/* Right Side */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle size={20} className="text-secondary" />
              Risk Flags Analysis
            </h3>
            {analysis.flags.length === 0 ? (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-on-tertiary-container/5 border border-on-tertiary-container/20">
                <CheckCircle size={24} className="text-on-tertiary-container shrink-0" />
                <div>
                  <p className="text-sm font-bold text-on-surface">No risk flags detected</p>
                  <p className="text-xs text-on-surface-variant mt-1">All checks passed.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.flags.map((flag: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-error/5 border border-error/20">
                    <div className="p-2 rounded-full bg-error/10 text-error shrink-0">
                      <AlertTriangle size={14} />
                    </div>
                    <p className="text-sm text-on-surface font-medium leading-relaxed">{flag}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Verification ID', value: report.id },
                { label: 'Product',         value: report.product_name || report.product },
                { label: 'Vendor',          value: report.vendor_name  || report.vendor },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                    {label}
                  </span>
                  <span className="text-sm font-bold text-on-surface">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center space-y-8 bg-surface-container-highest/30 p-12 rounded-3xl border border-on-surface/5"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full blur-2xl opacity-20"
                style={{ backgroundColor: ringColor }} />
              <ShieldCheck size={56} className="relative" style={{ color: ringColor }} fill="currentColor" />
            </div>
          </div>

          {isHigh ? (
            <>
              <h2 className="text-2xl font-bold text-error">Payment Blocked</h2>
              <p className="text-base text-on-surface-variant">
                High risk detected. Request additional documents before proceeding.
              </p>
              <Link to="/verify">
                <button className="px-10 h-14 rounded-2xl font-bold border-2 border-error text-error hover:bg-error/5 transition-colors">
                  Re-verify with More Info
                </button>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-on-surface">Secure Your Purchase</h2>
              <p className="text-base text-on-surface-variant">
                {isLow
                  ? 'Product and vendor passed verification. Proceed to pay securely via Squad.'
                  : 'Medium risk detected. Review flags above before proceeding.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPayment(true)}
                  className="bg-on-tertiary-container text-white px-10 h-14 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl group"
                >
                  Proceed to Verified Payment via Squad
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 h-14 rounded-2xl font-bold border-2 border-on-surface/10 text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Download Report
                </motion.button>
              </div>
            </>
          )}

          <div className="flex items-center justify-center gap-2 text-on-surface-variant opacity-60">
            <Lock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              End-to-End Encrypted Verification Journey
            </span>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
            >
              <button
                onClick={() => { setShowPayment(false); setPayError(null); setPaySuccess(false); }}
                className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface"
              >
                <X size={20} />
              </button>

              {paySuccess ? (
                <div className="text-center py-6 space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="mx-auto w-20 h-20 rounded-full bg-on-tertiary-container/10 flex items-center justify-center"
                  >
                    <CheckCircle size={48} className="text-on-tertiary-container" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-on-surface">Payment Initiated!</h3>
                  <p className="text-on-surface-variant text-sm">
                    Click below to complete payment on Squad's checkout.
                  </p>
                  {checkoutUrl && (
                    
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full h-12 rounded-xl bg-on-tertiary-container text-white font-bold items-center justify-center gap-2"
                    >
                      Open Squad Checkout <ArrowRight size={18} />
                    </a>
                  )}
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full h-12 rounded-xl border-2 border-on-surface/10 font-bold text-on-surface"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 p-3 rounded-xl bg-on-tertiary-container/5 border border-on-tertiary-container/20 text-on-tertiary-container text-xs font-bold">
                    ✓ Verification #{report.id} — {analysis.verdict}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-6">Confirm Payment via Squad</h3>
                  <div className="space-y-4 mb-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={payEmail}
                        onChange={e => setPayEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-surface-container-low focus:ring-2 focus:ring-secondary outline-n
