// src/pages/CrowdManagement.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Users, 
  Clock, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  User,
  Eye,
  Wifi,
  Radio,
  Target,
  Zap,
  Shield,
  MapPin,
  Gauge,
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Minus,
  Plus,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CrowdManagement = () => {
  const { zones, stats, loading } = useRealtimeData();
  const [selectedZone, setSelectedZone] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);

  // Filter queues from zones
  const queues = zones.filter((z) => z.type === 'queue' || z.type === 'darshan' || z.type === 'entrance');

  // Find fastest and most congested
  const fastestQueue = queues.length > 0 ? queues.reduce((a, b) => (a.queueTime < b.queueTime ? a : b)) : null;
  const mostCongested = queues.length > 0 ? queues.reduce((a, b) => (a.density > b.density ? a : b)) : null;

  const getDensityStatus = (density) => {
    if (density >= 80) return { label: 'CRITICAL', color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', dot: 'bg-[#EF4444] animate-pulse' };
    if (density >= 60) return { label: 'HIGH LOAD', color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', dot: 'bg-[#F59E0B]' };
    if (density >= 30) return { label: 'MODERATE', color: 'text-[#D6A84F]', bg: 'bg-[#D6A84F]/10', dot: 'bg-[#D6A84F]' };
    return { label: 'LOW LOAD', color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10', dot: 'bg-[#22C55E]' };
  };

  const getDensityColor = (density) => {
    if (density >= 80) return 'bg-[#EF4444]';
    if (density >= 60) return 'bg-[#F59E0B]';
    if (density >= 30) return 'bg-[#D6A84F]';
    return 'bg-[#22C55E]';
  };

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

  return (
    <div className="min-h-screen bg-[#080A0F] p-4 lg:p-6 relative overflow-hidden">
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
              <span className="text-[10px] text-[#D6A84F] tracking-[0.15em] uppercase font-medium">TRINETRA / CROWD INTELLIGENCE</span>
              <div className="w-px h-3 bg-[#D6A84F]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">System Live</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">Crowd Management</h1>
            <p className="text-[#9CA3AF] text-sm">Monitor and manage crowd flow across all monitored zones.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-lg bg-[#0D1117]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-[8px] text-[#9CA3AF] tracking-wider uppercase">Live Monitoring</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-[#0D1117] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <RefreshCw className={`w-4 h-4 text-[#9CA3AF] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Top Statistics */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {[
            { 
              label: 'Current Visitors', 
              value: stats.visitorsInside.toLocaleString(), 
              icon: Users, 
              color: 'border-[#D6A84F]/20 text-[#D6A84F]',
              glow: 'shadow-[#D6A84F]/10',
              trend: '+8.4%',
              trendUp: true
            },
            { 
              label: 'Avg Queue Time', 
              value: `${stats.avgQueueTime} min`, 
              icon: Clock, 
              color: 'border-[#38BDF8]/20 text-[#38BDF8]',
              glow: 'shadow-[#38BDF8]/10',
              trend: '-12%',
              trendUp: false
            },
            { 
              label: 'Fastest Queue', 
              value: fastestQueue?.name || 'N/A', 
              icon: TrendingUp, 
              color: 'border-[#22C55E]/20 text-[#22C55E]',
              glow: 'shadow-[#22C55E]/10',
              subtitle: `${fastestQueue?.queueTime || 0} min wait`
            },
            { 
              label: 'Most Congested', 
              value: mostCongested?.name || 'N/A', 
              icon: AlertTriangle, 
              color: 'border-[#EF4444]/20 text-[#EF4444]',
              glow: 'shadow-[#EF4444]/10',
              subtitle: `${mostCongested?.density || 0}% capacity`
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-[#0D1117] rounded-xl border ${metric.color} p-4 shadow-lg ${metric.glow} hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <metric.icon className="w-4 h-4 opacity-60" />
                {metric.trend && (
                  <span className={`text-[8px] font-medium flex items-center space-x-1 ${
                    metric.trendUp ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}>
                    {metric.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{metric.trend}</span>
                  </span>
                )}
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">{metric.value}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[8px] uppercase tracking-wider text-[#9CA3AF]">{metric.label}</span>
                {metric.subtitle && (
                  <span className="text-[8px] text-[#9CA3AF]">{metric.subtitle}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Crowd Flow Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#F5F5F0]">Live Crowd Flow</h2>
              <p className="text-xs text-[#9CA3AF]">Real-time occupancy across monitored zones</p>
            </div>
            <div className="flex items-center space-x-3 text-[8px] text-[#9CA3AF]">
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                <span>Low</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]"></span>
                <span>Moderate</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                <span>High</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
                <span>Critical</span>
              </span>
            </div>
          </div>

          <div className="bg-[#0D1117] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 overflow-x-auto">
            <div className="flex items-center min-w-max space-x-6 py-2">
              {zones.slice(0, 6).map((zone, index) => {
                const status = getDensityStatus(zone.density);
                const isLast = index === zones.slice(0, 6).length - 1;
                return (
                  <React.Fragment key={zone.id}>
                    <div className="flex flex-col items-center group cursor-pointer" onClick={() => setSelectedZone(zone)}>
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full border-2 ${status.color} flex items-center justify-center group-hover:scale-110 transition-transform bg-[#080A0F]`}>
                          <span className="text-[10px] font-bold text-[#F5F5F0]">{zone.density}%</span>
                          <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${status.dot}`}></div>
                        </div>
                        {zone.status === 'critical' && (
                          <div className="absolute -inset-1 rounded-full border-2 border-[#EF4444]/30 animate-pulse"></div>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-[10px] font-medium text-[#F5F5F0]">{zone.name}</p>
                        <p className="text-[8px] text-[#9CA3AF]">{zone.currentOccupancy} people</p>
                        {zone.queueTime > 0 && (
                          <p className="text-[8px] text-[#9CA3AF]">{zone.queueTime} min wait</p>
                        )}
                      </div>
                    </div>
                    {!isLast && (
                      <div className="flex items-center">
                        <div className="w-8 h-px bg-gradient-to-r from-[#D6A84F]/30 to-[#D6A84F]/10"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]/20"></div>
                        <div className="w-8 h-px bg-gradient-to-r from-[#D6A84F]/10 to-[#D6A84F]/30"></div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Queue Intelligence */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#F5F5F0]">Queue Intelligence</h2>
              <p className="text-xs text-[#9CA3AF]">Live capacity and waiting-time analysis</p>
            </div>
            <div className="flex items-center space-x-2 text-[8px] text-[#9CA3AF]">
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                <span>Optimal</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]"></span>
                <span>Moderate</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                <span>Critical</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {queues.map((queue, index) => {
              const status = getDensityStatus(queue.density);
              return (
                <motion.div
                  key={queue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-[#0D1117] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 hover:border-[#D6A84F]/30 transition-all hover:-translate-y-0.5 group"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${status.bg} flex items-center justify-center`}>
                        <Users className={`w-4 h-4 ${status.color}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[#F5F5F0]">{queue.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                          <span className={`text-[8px] font-medium ${status.color}`}>{status.label}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#F5F5F0]">{queue.currentOccupancy}</p>
                      <p className="text-[8px] text-[#9CA3AF]">people</p>
                    </div>
                  </div>

                  {/* Capacity Visualization */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#9CA3AF]">Capacity</span>
                      <span className={`font-bold ${status.color}`}>{queue.density}%</span>
                    </div>
                    <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${getDensityColor(queue.density)}`}
                        style={{ width: `${queue.density}%` }}
                      />
                    </div>
                  </div>

                  {/* Wait Time & Details */}
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                    <div>
                      <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Est. Wait</p>
                      <p className="text-sm font-bold text-[#F5F5F0]">{queue.queueTime || 0} min</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Status</p>
                      <p className={`text-xs font-medium ${status.color}`}>{status.label}</p>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className={`mt-3 h-0.5 bg-[#D6A84F]/20 rounded-full transition-all duration-500 group-hover:w-full w-12`}></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

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
          <span>TRINETRA • Crowd Intelligence v2.0</span>
        </div>
      </div>
    </div>
  );
};

export default CrowdManagement;