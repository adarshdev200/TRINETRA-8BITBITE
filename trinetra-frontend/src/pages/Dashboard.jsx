// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { MetricCard } from '../components/dashboard/MetricCard';
import { ZoneStatusGrid } from '../components/dashboard/ZoneStatusGrid';
import { LiveAlerts } from '../components/dashboard/LiveAlerts';
import { CrowdTrendChart } from '../components/dashboard/CrowdTrendChart';
import { 
  Users, 
  User, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Wifi,
  Radio,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Gauge,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard = () => {
  const { zones, alerts, stats, loading, room, bands } = useRealtimeData();
  const sosBands = (bands || []).filter(b => b.sos);
  const onlineBands = (bands || []).filter(b => b.online);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    visitorsInside: 0,
    todayFootfall: 0,
    activeAlerts: 0,
    criticalZones: 0
  });

  const criticalAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high');

  const didAnimateRef = useRef(false);

  // Count up once on first load; after that, track live values directly so
  // socket updates don't restart the animation from zero each tick.
  useEffect(() => {
    if (!loading && stats) {
      const targets = {
        visitorsInside: stats.visitorsInside || 0,
        todayFootfall: stats.todayFootfall || 0,
        activeAlerts: stats.activeAlerts || 0,
        criticalZones: stats.criticalZones || 0
      };
      if (didAnimateRef.current) {
        setAnimatedValues(targets);
        return;
      }
      didAnimateRef.current = true;
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setAnimatedValues({
          visitorsInside: Math.round(targets.visitorsInside * progress),
          todayFootfall: Math.round(targets.todayFootfall * progress),
          activeAlerts: Math.round(targets.activeAlerts * progress),
          criticalZones: Math.round(targets.criticalZones * progress)
        });
        if (currentStep >= steps) clearInterval(interval);
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [loading, stats]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-2 border-[#D6A84F]/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 border-2 border-[#D6A84F]/30 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Eye className="w-10 h-10 text-[#D6A84F]" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#F5F5F0]">TRINETRA</h2>
          <p className="text-[#9CA3AF] mt-2">Synchronizing security intelligence...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090D] p-4 lg:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D6A84F]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#38BDF8]/2 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #D6A84F 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        {/* Gold architectural line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#D6A84F]/20 to-transparent"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-[#07090D]/50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6"
        >
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#D6A84F] tracking-[0.15em] uppercase font-medium">TRINETRA / SECURITY OPERATIONS</span>
              <div className="w-px h-3 bg-[#D6A84F]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">System Live</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">Temple Security Command Center</h1>
            <p className="text-[#9CA3AF] text-sm">Real-time intelligence across crowd density, security zones and active incidents.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            {criticalAlerts.length > 0 && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] animate-pulse" />
                <span className="text-[10px] font-bold text-[#EF4444]">{criticalAlerts.length} CRITICAL</span>
              </div>
            )}
            <div className="flex items-center space-x-2 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-lg bg-[#0B0F15]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-[8px] text-[#9CA3AF] tracking-wider uppercase">Live Monitoring</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-[#0B0F15] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <RefreshCw className={`w-4 h-4 text-[#9CA3AF] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Command Status Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0B0F15] rounded-xl border-t-2 border-[#D6A84F]/30 p-4 mb-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D6A84F]/5 via-transparent to-transparent"></div>
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-xs font-bold text-[#F5F5F0] tracking-wider uppercase">Live Monitoring</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span className="text-[#9CA3AF]">Crowd</span>
                <span className="text-[#F5F5F0] font-medium">{stats.visitorsInside.toLocaleString()}</span>
              </div>
              <div className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></div>
              <div className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-[#9CA3AF]">Security</span>
                <span className="text-[#F5F5F0] font-medium">24/7</span>
              </div>
              <div className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></div>
              <div className="flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-[#9CA3AF]">Zones</span>
                <span className="text-[#F5F5F0] font-medium">{zones.length}</span>
              </div>
              <div className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`w-3.5 h-3.5 ${criticalAlerts.length > 0 ? 'text-[#EF4444] animate-pulse' : 'text-[#22C55E]'}`} />
                <span className="text-[#9CA3AF]">Alerts</span>
                <span className={`font-medium ${criticalAlerts.length > 0 ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
                  {stats.activeAlerts}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-[#9CA3AF]">
              <span>Last Sync: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Darshan Room — LIVE from backend (occupancy + gate + bands) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#0B0F15] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-[#D6A84F]" />
              <h2 className="text-sm font-bold text-[#F5F5F0]">Darshan Room — Live</h2>
              <span className={`text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full ${room ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#9CA3AF]/10 text-[#9CA3AF]'}`}>
                {room ? 'Backend Connected' : 'Waiting for backend'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {/* Occupancy */}
              <div className="min-w-[160px]">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Occupancy</span>
                  <span className="text-[#F5F5F0] text-sm font-bold">
                    {room ? `${room.occupancy}/${room.capacity}` : '—'}
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${room && room.overCapacity ? 'bg-[#EF4444]' : 'bg-[#D6A84F]'}`}
                    style={{ width: room ? `${Math.min(100, Math.round((room.occupancy / room.capacity) * 100))}%` : '0%' }}
                  ></div>
                </div>
              </div>

              {/* Gate */}
              <div className="text-center">
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">Gate</div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  room?.gate === 'OPEN'
                    ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                    : room?.gate === 'CLOSED'
                    ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                    : 'bg-[#9CA3AF]/10 text-[#9CA3AF] border-[rgba(255,255,255,0.08)]'
                }`}>
                  {room?.gate ?? '—'}
                </div>
              </div>

              {/* Bands */}
              <div className="text-center">
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">Bands Online</div>
                <div className="text-[#F5F5F0] text-sm font-bold flex items-center justify-center space-x-1">
                  <Radio className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{onlineBands.length}</span>
                </div>
              </div>

              {/* SOS */}
              <div className="text-center">
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">SOS</div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  sosBands.length > 0
                    ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 animate-pulse'
                    : 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                }`}>
                  {sosBands.length > 0 ? `${sosBands.length} ACTIVE` : 'CLEAR'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Visitors Inside"
              value={animatedValues.visitorsInside.toLocaleString()}
              icon={<Users className="w-5 h-5" />}
              trend={8.4}
              subtitle="from previous hour"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Today's Footfall"
              value={animatedValues.todayFootfall.toLocaleString()}
              icon={<User className="w-5 h-5" />}
              trend={12.3}
              subtitle="vs yesterday"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Active Alerts"
              value={animatedValues.activeAlerts.toString().padStart(2, '0')}
              icon={<AlertTriangle className={`w-5 h-5 ${animatedValues.activeAlerts > 0 ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`} />}
              subtitle={animatedValues.activeAlerts > 0 ? `${criticalAlerts.length} critical` : 'All clear'}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Critical Zones"
              value={animatedValues.criticalZones.toString().padStart(2, '0')}
              icon={<Activity className={`w-5 h-5 ${animatedValues.criticalZones > 0 ? 'text-[#EF4444]' : 'text-[#22C55E]'}`} />}
              subtitle={animatedValues.criticalZones > 0 ? 'Requires attention' : 'All zones stable'}
            />
          </motion.div>
        </motion.div>

        {/* Main Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crowd Intelligence */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0B0F15] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6A84F]/5 rounded-full blur-2xl"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-[#F5F5F0]">Crowd Intelligence</h2>
                    <p className="text-xs text-[#9CA3AF]">Live visitor movement</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                      <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">Live</span>
                    </div>
                    <span className="text-[8px] text-[#9CA3AF] tracking-wider uppercase">Real-Time</span>
                  </div>
                </div>
                <CrowdTrendChart />
              </div>
            </motion.div>

            {/* Zone Security Matrix */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0B0F15] rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-[#F5F5F0]">Zone Security Matrix</h2>
                  <p className="text-xs text-[#9CA3AF]">Live occupancy and operational status across monitored temple zones</p>
                </div>
                <div className="flex items-center space-x-3 text-[8px] text-[#9CA3AF]">
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                    <span>Normal</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]"></span>
                    <span>Elevated</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
                    <span>Critical</span>
                  </span>
                </div>
              </div>
              <ZoneStatusGrid />
            </motion.div>
          </div>

          {/* Right Column - Live Alerts */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#0B0F15] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-[#F5F5F0]">Live Incidents</h2>
                  <p className="text-xs text-[#9CA3AF]">Real-time security events</p>
                </div>
                {criticalAlerts.length > 0 && (
                  <div className="flex items-center space-x-1.5 px-2 py-1 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
                    <span className="text-[8px] font-bold text-[#EF4444]">{criticalAlerts.length} PRIORITY</span>
                  </div>
                )}
              </div>
              <LiveAlerts />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs text-[#9CA3AF]">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <Radio className="w-3 h-3 text-[#22C55E]" />
              <span>System Online</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Wifi className="w-3 h-3 text-[#D6A84F]" />
              <span>AI Engine Active</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Gauge className="w-3 h-3 text-[#38BDF8]" />
              <span>Real-time Analytics</span>
            </span>
          </div>
          <span>TRINETRA • Command Center v2.0</span>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;