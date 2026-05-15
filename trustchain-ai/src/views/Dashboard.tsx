import { LayoutDashboard, BarChart3, FileText, Settings, HelpCircle, LogOut, Search, Bell, ShieldCheck, Zap, AlertTriangle, CreditCard, Store, Smartphone, Laptop, Headphones, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Total Verified', value: '42,891', change: '+12.5%', icon: <ShieldCheck />, color: 'text-secondary bg-secondary/10' },
    { label: 'High Risk Flagged', value: '154', change: '+2.1%', icon: <AlertTriangle />, color: 'text-error bg-error/10', border: 'border-r-4 border-error' },
    { label: 'Successful Payments', value: '₦12.4M', change: '+8.4%', icon: <CreditCard />, color: 'text-on-tertiary-container bg-on-tertiary-container/10' },
    { label: 'Active Vendors', value: '1,208', change: '+15', icon: <Store />, color: 'text-on-primary-container bg-on-primary-container/10' },
  ];

  const recentVerifications = [
    { date: 'Oct 24, 14:20', item: 'MacBook Pro M3', icon: <Laptop />, score: '98%', status: 'success' },
    { date: 'Oct 24, 13:45', item: 'iPhone 15 Pro', icon: <Smartphone />, score: '12%', status: 'error' },
    { date: 'Oct 24, 12:10', item: 'Dell XPS 15', icon: <Laptop />, score: '84%', status: 'success' },
    { date: 'Oct 24, 11:30', item: 'Sony WH-1000XM5', icon: <Headphones />, score: 'Pending', status: 'pending' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-on-surface/5 p-6 shrink-0">
        <div className="mb-12">
          <h1 className="text-xl font-extrabold tracking-tight text-on-surface">TrustChain AI</h1>
          <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mt-1">Enterprise Tier</p>
        </div>
        <nav className="flex-1 space-y-2">
          {[
            { name: 'Overview', icon: <LayoutDashboard size={20} />, active: true },
            { name: 'Analytics', icon: <BarChart3 size={20} /> },
            { name: 'Reports', icon: <FileText size={20} /> },
            { name: 'Settings', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-secondary-container text-on-secondary-container shadow-lg shadow-secondary-container/20' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-2 pt-6 border-t border-on-surface/5">
          <button className="w-full mb-6 py-4 px-6 bg-on-tertiary-container text-white font-bold text-sm rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-on-tertiary-container/10">
            Upgrade Plan
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-all">
            <HelpCircle size={20} /> Support
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-surface-container-lowest overflow-y-auto">
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-on-surface/5 px-8 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-lg relative hidden md:block">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
            <input
              type="text"
              placeholder="Global verification search..."
              className="w-full h-11 pl-12 pr-6 rounded-full bg-surface-container-low border-on-surface/10 text-sm font-medium focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><Bell size={20} /></button>
              <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><HelpCircle size={20} /></button>
            </div>
            <Link to="/verify">
              <button className="bg-on-surface text-on-secondary px-6 h-10 rounded-full text-xs font-bold hover:opacity-90 active:scale-95 transition-all">
                Verify Now
              </button>
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-on-surface/10 bg-surface-container-high">
              <img
                src="https://api.dicebear.com/7.x/initials/svg?seed=TC&backgroundColor=0051d5"
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-on-surface">Dashboard Overview</h2>
              <p className="text-on-surface-variant font-medium text-base">Monitoring digital integrity across the ecosystem.</p>
            </div>
            <div className="flex items-center gap-3 bg-on-tertiary-container/10 px-4 py-2 rounded-xl border border-on-tertiary-container/10">
              <Zap size={18} fill="currentColor" className="text-on-tertiary-container" />
              <span className="text-sm font-bold text-on-tertiary-container">AI Engine Live Analysis</span>
              <div className="w-2.5 h-2.5 bg-on-tertiary-container rounded-full animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white border border-on-surface/5 p-6 rounded-2xl shadow-sm relative overflow-hidden ${stat.border || ''}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>{stat.icon}</div>
                  <span className="text-xs font-bold text-on-tertiary-container bg-on-tertiary-container/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                </div>
                <p className="text-sm font-bold text-on-surface-variant opacity-60 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-on-surface">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-on-surface/5 rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className="px-8 py-6 border-b border-on-surface/5 flex justify-between items-center">
                <h4 className="text-xl font-bold text-on-surface">Recent Verifications</h4>
                <button className="text-secondary text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low/50">
                    <tr className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4">Item</th>
                      <th className="px-8 py-4">Trust Score</th>
                      <th className="px-8 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-on-surface/5">
                    {recentVerifications.map((row, idx) => (
                      <tr key={idx} className="group hover:bg-surface-container-low transition-colors">
                        <td className="px-8 py-5 text-sm font-medium text-on-surface">{row.date}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <span className="text-on-surface-variant">{row.icon}</span>
                            <span className="text-sm font-bold text-on-surface">{row.item}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full w-fit ${
                            row.status === 'success' ? 'bg-on-tertiary-container/10 text-on-tertiary-container' :
                            row.status === 'error' ? 'bg-error/10 text-error' :
                            'bg-surface-container-high text-on-surface-variant'
                          }`}>
                            {row.status === 'success' && <ShieldCheck size={14} fill="currentColor" />}
                            {row.status === 'error' && <AlertTriangle size={14} fill="currentColor" />}
                            <span className="text-[11px] font-extrabold">{row.score}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <button className="px-4 py-1.5 border border-on-surface/10 text-[11px] font-bold rounded-lg group-hover:bg-on-surface group-hover:text-white transition-all">
                            {row.status === 'error' ? 'Investigate' : 'Details'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary-container p-8 rounded-3xl text-white relative overflow-hidden group shadow-xl shadow-primary-container/20"
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <Zap size={24} className="text-on-tertiary-cont
