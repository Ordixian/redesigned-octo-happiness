import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, AlertTriangle, CheckCircle,
  ChevronRight, ArrowRight, Download, Lock,
  X, Sparkles
} from 'lucide-react';
import { api } from '../api/client';

export default function Result() {
  const location = useLocation();
  const report = location.state?.data;

  const [showPayment, setShowPayment] = useState(false);
  const [payEmail, setPayEmail] = useState('');
  const [payAmount, setPayAmount] = useState('5000');
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6 text-center">
        <div className="bg-white rounded-2xl p-12 shadow border border-on-surface/5">
          <AlertTriangle size={48} className="text-error mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-on-surface mb-3">No Result Found</h1>
          <p className="text-on-surface-variant mb-8">You haven't run a verification yet.</p>
          <Link to="/verify">
            <button className="bg-secondary text-on-secondary px-8 h-12 rounded-xl font-bold">Go to Verify</button>
          </Link>
        </div>
      </div>
    );
  }

  const { analysis } = report;
  const isLow = analysis.level === 'LOW';
  const isMed = analysis.level === 'MEDIUM';
  const isHigh = analysis.level === 'HIGH';
  const ringColor = isLow ? '#0d9488' : isMed ? '#0051d5' : '#ba1a1a';
  const ringOffset = 502 - (analysis.score / 100) * 502;

  const handlePayment = async () => {
    setPayError(null);
    if (!payEmail) return setPayError('Email is required.');
    setPayLoading(true);
    try {
      const payData = new FormData();
      payData.append('email', payEmail);
      payData.append('amount', payAmount);
      payData.append('verification_id', report.id || 'DEMO_ID');
      
      const response = await api.post('/payments/initiate', payData);
      
      if (response.data?.status === 200 && response.data?.data?.checkout_url) {
        setCheckoutUrl(response.data.data.checkout_url);
        setPaySuccess(true);
      } else {
        setPayError('Payment initialization failed. Check backend logs.');
      }
    } catch (error: any) {
      setPayError(error.response?.data?.detail || 'Connection to payment server failed.');
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
            <span className="text-secondary">#{report.id || 'SCAN'}</span>
          </nav>
          <h1 className="text-3xl font-bold text-on-surface">Verification Result</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-bold shadow-lg" style={{ backgroundColor: ringColor }}>
          {isLow ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          {analysis.verdict}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Score Ring */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 glass-panel rounded-2xl p-8 flex flex-col items-center text-center" style={{ borderTop: `4px solid ${ringColor}` }}>
          <span className="text-xs font-bold text-on-surface-variant mb-6 uppercase tracking-widest">Trust Score Index</span>
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-44 h-44 -rotate-90">
              <circle cx="88" cy="88" r="80" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-surface-container-high" />
              <motion.circle cx="88" cy="88" r="80" fill="transparent" stroke={ringColor} strokeWidth="12" strokeLinecap="round" strokeDasharray="502" initial={{ strokeDashoffset: 502 }} animate={{ strokeDashoffset: ringOffset }} transition={{ duration: 1.2 }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold" style={{ color: ringColor }}>{analysis.score}</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-1">/ 100</span>
            </div>
          </div>
          <div className="px-6 py-2 rounded-full font-bold text-xs text-white flex items-center gap-2" style={{ backgroundColor: ringColor }}>
            <ShieldCheck size={14} /> {analysis.level} RISK
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="glass-panel rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">Forensic Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-on-surface/5">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Product Name</p>
                <p className="text-sm font-bold text-on-surface">{analysis.product_name || 'Generic Medicine'}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-on-surface/5">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">NAFDAC Registry</p>
                <p className="text-sm font-bold text-on-surface">{analysis.forensic_match ? '✅ Verified Match' : '❌ No Official Record'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Action */}
      {!isHigh && (
        <div className="flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPayment(true)}
            className="bg-on-tertiary-container text-white px-12 h-14 rounded-2xl font-bold flex items-center gap-3 shadow-xl"
          >
            <Sparkles size={20} /> Proceed to Verified Payment
          </motion.button>
        </div>
      )}

      {/* Squad Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <button onClick={() => setShowPayment(false)} className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface"><X size={20} /></button>
              
              {paySuccess ? (
                <div className="text-center py-6 space-y-6">
                  <CheckCircle size={64} className="text-on-tertiary-container mx-auto" />
                  <h3 className="text-2xl font-bold">Secure Link Ready</h3>
                  <a href={checkoutUrl!} target="_blank" rel="noopener noreferrer" className="flex w-full h-12 rounded-xl bg-on-tertiary-container text-white font-bold items-center justify-center gap-2">
                    Open Squad Checkout <ArrowRight size={18} />
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Initialize Secure Payment</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Email Address</label>
                      <input type="email" value={payEmail} onChange={e => setPayEmail(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-surface-container-low" placeholder="customer@email.com" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Amount (NGN)</label>
                      <input type="text" value={payAmount} readOnly className="w-full h-12 px-4 rounded-xl border border-on-surface/10 bg-surface-container-highest/20 text-on-surface-variant" />
                    </div>
                  </div>
                  {payError && <p className="text-xs text-error font-medium">{payError}</p>}
                  <button onClick={handlePayment} disabled={payLoading} className="w-full h-12 rounded-xl bg-on-tertiary-container text-white font-bold disabled:opacity-50">
                    {payLoading ? 'Connecting to Squad...' : 'Generate Secure Link'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
