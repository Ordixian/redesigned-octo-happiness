import { motion } from 'framer-motion';
import { 
  Zap, Shield, Search, History, 
  ChevronRight, ArrowUpRight, CheckCircle, 
  AlertCircle, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Total Scans', value: '1,284', icon: Search, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Verified Authentic', value: '1,102', icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Flagged Risks', value: '182', icon: AlertCircle, color: 'bg-rose-500/10 text-rose-500' },
  ];

  const recentActivity = [
    { id: 'TX-9021', name: 'Paracetamol 500mg', status: 'Authentic', time: '2 mins ago' },
    { id: 'TX-9020', name: 'Amoxicillin Caps', status: 'Flagged', time: '15 mins ago' },
    { id: 'TX-9019', name: 'Vitamin C Syrup', status: 'Authentic', time: '1 hour ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-12 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-on-surface mb-2">Trust Intelligence Dashboard</h1>
        <p className="text-on-surface-variant">Real-time monitoring of your verified pharmaceutical supply chain.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-on-surface/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <Activity size={16} className="text-on-surface-variant opacity-30" />
            </div>
            <p className="text-sm font-bold text-on-surface-variant mb-1 uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-3xl font-bold text-on-surface">{stat.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Section */}
        <section className="lg:col-span-8 space-y-8">
          <div className="glass-panel rounded-3xl p-8 border border-on-surface/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <History size={20} className="text-secondary" />
                Recent Verifications
              </h3>
              <button className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity">
                View Full Logs <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-on-surface/5 hover:bg-surface-container-high transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'Authentic' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      <Shield size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{item.name}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{item.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${item.status === 'Authentic' ? 'text-emerald-500' : 'text-rose-500'}`}>{item.status}</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar Actions */}
        <aside className="lg:col-span-4 space-y-6">
          <Link to="/verify">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-on-tertiary-container text-white p-8 rounded-3xl shadow-xl shadow-on-tertiary-container/20 flex flex-col items-center text-center cursor-pointer mb-6"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">New Verification</h4>
              <p className="text-sm text-white/70 mb-6">Instantly scan and verify medical products using forensic AI.</p>
              <div className="h-12 w-full bg-white text-on-tertiary-container rounded-xl flex items-center justify-center font-bold gap-2">
                Launch Scanner <ArrowUpRight size={18} />
              </div>
            </motion.div>
          </Link>

          <div className="glass-panel p-6 rounded-2xl border border-on-surface/5">
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-on-surface-variant">System Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">NAFDAC Registry</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">AI Analysis Engine</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
