// src/pages/Alerts.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  AlertTriangle, 
  Eye, 
  Users, 
  CheckCircle, 
  XCircle,
  Filter,
  Search,
  Clock,
  Shield,
  Activity,
  Radio,
  Wifi,
  MapPin,
  Zap,
  Target,
  Bell,
  ChevronRight,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Alerts = () => {
  const { alerts, zones } = useRealtimeData();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);

  // Alert statistics
  const stats = {
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
    total: alerts.length,
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return { bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/30', glow: 'shadow-[#EF4444]/20', text: 'text-[#EF4444]' };
      case 'high': return { bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/30', glow: 'shadow-[#F59E0B]/20', text: 'text-[#F59E0B]' };
      case 'medium': return { bg: 'bg-[#D6A84F]/10', border: 'border-[#D6A84F]/30', glow: 'shadow-[#D6A84F]/20', text: 'text-[#D6A84F]' };
      case 'low': return { bg: 'bg-[#38BDF8]/10', border: 'border-[#38BDF8]/30', glow: 'shadow-[#38BDF8]/20', text: 'text-[#38BDF8]' };
      default: return { bg: 'bg-[#9CA3AF]/10', border: 'border-[#9CA3AF]/30', glow: 'shadow-[#9CA3AF]/20', text: 'text-[#9CA3AF]' };
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'critical': return AlertTriangle;
      case 'high': return Zap;
      case 'medium': return Bell;
      case 'low': return Activity;
      default: return AlertTriangle;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return 'LIVE';
      case 'acknowledged': return 'ACKNOWLEDGED';
      case 'resolved': return 'RESOLVED';
      case 'dismissed': return 'DISMISSED';
      default: return status.toUpperCase();
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10';
      case 'acknowledged': return 'text-[#D6A84F] border-[#D6A84F]/30 bg-[#D6A84F]/10';
      case 'resolved': return 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10';
      case 'dismissed': return 'text-[#9CA3AF] border-[#9CA3AF]/30 bg-[#9CA3AF]/10';
      default: return 'text-[#9CA3AF] border-[#9CA3AF]/30 bg-[#9CA3AF]/10';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.severity !== filter) return false;
    if (searchTerm && !alert.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !alert.zone.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const activeAlerts = filteredAlerts.filter(a => a.status === 'active' || a.status === 'acknowledged');

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
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-[#080A0D] p-4 lg:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D6A84F]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#D6A84F]/2 rounded-full blur-3xl"></div>
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
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 border border-[#D6A84F]/20 rounded-full bg-[#D6A84F]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#D6A84F] tracking-[0.15em] uppercase font-medium">System Live</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-2">Alert Command Center</h1>
            <p className="text-[#9CA3AF] text-sm">Real-time threat detection and incident response across monitored temple zones.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 text-sm text-[#9CA3AF]">
              <Clock className="w-4 h-4" />
              <span>Updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-[#0D1117] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <RefreshCw className={`w-4 h-4 text-[#9CA3AF] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Alert Summary Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 lg:grid-cols-5 gap-3 mb-6"
        >
          {[
            { label: 'Critical', count: stats.critical, icon: AlertTriangle, color: 'border-[#EF4444]/30 text-[#EF4444] bg-[#EF4444]/5', glow: 'shadow-[#EF4444]/10' },
            { label: 'High', count: stats.high, icon: Zap, color: 'border-[#F59E0B]/30 text-[#F59E0B] bg-[#F59E0B]/5', glow: 'shadow-[#F59E0B]/10' },
            { label: 'Medium', count: stats.medium, icon: Bell, color: 'border-[#D6A84F]/30 text-[#D6A84F] bg-[#D6A84F]/5', glow: 'shadow-[#D6A84F]/10' },
            { label: 'Resolved', count: stats.resolved, icon: CheckCircle, color: 'border-[#22C55E]/30 text-[#22C55E] bg-[#22C55E]/5', glow: 'shadow-[#22C55E]/10' },
            { label: 'Total Today', count: stats.total, icon: Activity, color: 'border-[#D6A84F]/20 text-[#F5F5F0] bg-[#0D1117]/50', glow: 'shadow-[#D6A84F]/5' },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`bg-[#0D1117] rounded-xl border ${stat.color} p-4 shadow-lg ${stat.glow}`}
            >
              <div className="flex items-center justify-between">
                <stat.icon className="w-4 h-4 opacity-60" />
                <span className="text-[8px] uppercase tracking-wider text-[#9CA3AF]">{stat.label}</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">{stat.count}</p>
              {stat.count > 0 && stat.label !== 'Total Today' && (
                <span className="text-[8px] text-[#9CA3AF]">
                  {stat.label === 'Critical' ? 'Immediate attention' :
                   stat.label === 'High' ? 'Requires response' :
                   stat.label === 'Medium' ? 'Under observation' :
                   'Handled incidents'}
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Live Incident Banner */}
        {activeAlerts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-[#0D1117] rounded-xl border border-[#D6A84F]/20 p-4 mb-6 overflow-hidden"
          >
            {/* Scanning line animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F]/30 to-transparent animate-[scan_3s_linear_infinite]"></div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative z-10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
                  <span className="text-xs font-bold text-[#EF4444] tracking-wider uppercase">Live Security Monitoring</span>
                </div>
                <span className="text-sm text-[#F5F5F0]">
                  {activeAlerts.length} active incidents detected across {new Set(activeAlerts.map(a => a.zone)).size} zones
                </span>
              </div>
              <button className="flex items-center space-x-2 text-[#D6A84F] hover:text-[#F4C96B] transition-colors text-sm mt-2 lg:mt-0">
                <span>View Live Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Filter + Search Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6"
        >
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            {['all', 'critical', 'high', 'medium', 'low'].map((severity) => {
              const isActive = filter === severity;
              const count = severity === 'all' ? alerts.length : alerts.filter(a => a.severity === severity).length;
              return (
                <button
                  key={severity}
                  onClick={() => setFilter(severity)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0D1117] border border-[#D6A84F] text-[#D6A84F] shadow-lg shadow-[#D6A84F]/10'
                      : 'bg-[#0D1117] border border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:text-[#F5F5F0] hover:border-[#D6A84F]/30'
                  }`}
                >
                  {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                  {count > 0 && (
                    <span className={`ml-2 text-[8px] ${
                      isActive ? 'text-[#D6A84F]' : 'text-[#9CA3AF]'
                    }`}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex-1 flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search alerts, zones, incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0D1117] text-[#F5F5F0] rounded-xl pl-10 pr-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F]/30 transition-all placeholder:text-[#9CA3AF] outline-none text-sm"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-[#0D1117] border border-[rgba(255,255,255,0.08)] hover:border-[#D6A84F]/30 transition-colors">
              <Filter className="w-4 h-4 text-[#9CA3AF]" />
            </button>
          </div>
        </motion.div>

        {/* Alert Feed */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filteredAlerts.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="bg-[#0D1117] rounded-xl border border-[rgba(255,255,255,0.08)] p-12 text-center"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 border-2 border-[#D6A84F]/20 rounded-full"></div>
                <div className="absolute inset-2 border-2 border-[#D6A84F]/30 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-[#D6A84F]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F0]">All Systems Clear</h3>
              <p className="text-[#9CA3AF] mt-2">No active security incidents detected across monitored zones.</p>
              <p className="text-xs text-[#9CA3AF]/50 mt-4">LAST SCAN · {new Date().toLocaleTimeString()}</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredAlerts.map((alert, index) => {
                const severityColors = getSeverityColor(alert.severity);
                const SeverityIcon = getSeverityIcon(alert.severity);
                const isActive = alert.status === 'active' || alert.status === 'acknowledged';
                
                return (
                  <motion.div
                    key={alert.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    layout
                    className={`bg-[#0D1117] rounded-xl border ${severityColors.border} p-4 hover:bg-[#121820] transition-all hover:shadow-lg hover:shadow-black/30 group`}
                    style={{
                      borderLeftWidth: '4px',
                      borderLeftColor: alert.severity === 'critical' ? '#EF4444' :
                                     alert.severity === 'high' ? '#F59E0B' :
                                     alert.severity === 'medium' ? '#D6A84F' : '#38BDF8'
                    }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${severityColors.bg} flex-shrink-0`}>
                            <SeverityIcon className={`w-4 h-4 ${severityColors.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-2">
                              <span className={`text-xs font-bold tracking-wider uppercase ${severityColors.text}`}>
                                {alert.severity}
                              </span>
                              {isActive && (
                                <span className="flex items-center space-x-1 text-[10px] text-[#EF4444]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
                                  <span>LIVE</span>
                                </span>
                              )}
                              {alert.status === 'resolved' && (
                                <span className="flex items-center space-x-1 text-[10px] text-[#22C55E]">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>RESOLVED</span>
                                </span>
                              )}
                              {alert.status === 'acknowledged' && (
                                <span className="flex items-center space-x-1 text-[10px] text-[#D6A84F]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]"></span>
                                  <span>ACKNOWLEDGED</span>
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-semibold text-[#F5F5F0] mt-1">{alert.title}</h3>
                            <p className="text-sm text-[#9CA3AF] mt-0.5">{alert.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-3 h-3 text-[#9CA3AF]" />
                                <span className="text-[#9CA3AF]">ZONE</span>
                                <span className="text-[#F5F5F0] font-medium">{alert.zone}</span>
                              </div>
                              {alert.riskScore && (
                                <div className="flex items-center space-x-2">
                                  <Target className="w-3 h-3 text-[#9CA3AF]" />
                                  <span className="text-[#9CA3AF]">RISK SCORE</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-16 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full ${
                                          alert.riskScore > 80 ? 'bg-[#EF4444]' :
                                          alert.riskScore > 60 ? 'bg-[#F59E0B]' :
                                          alert.riskScore > 40 ? 'bg-[#D6A84F]' :
                                          'bg-[#38BDF8]'
                                        }`}
                                        style={{ width: `${alert.riskScore}%` }}
                                      />
                                    </div>
                                    <span className={`font-bold ${
                                      alert.riskScore > 80 ? 'text-[#EF4444]' :
                                      alert.riskScore > 60 ? 'text-[#F59E0B]' :
                                      alert.riskScore > 40 ? 'text-[#D6A84F]' :
                                      'text-[#38BDF8]'
                                    }`}>
                                      {alert.riskScore}
                                    </span>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center space-x-2">
                                <Clock className="w-3 h-3 text-[#9CA3AF]" />
                                <span className="text-[#9CA3AF]">DETECTED</span>
                                <span className="text-[#F5F5F0] font-medium">
                                  {new Date(alert.createdAt).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 lg:flex-shrink-0">
                        {isActive ? (
                          <>
                            <Button size="sm" variant="secondary" className="border-[#D6A84F]/30 text-[#D6A84F] hover:border-[#D6A84F]">
                              <Eye className="w-3.5 h-3.5 mr-1.5" />
                              View
                            </Button>
                            <Button size="sm" variant="secondary" className="bg-[#D6A84F]/10 border-[#D6A84F]/30 text-[#D6A84F] hover:bg-[#D6A84F]/20">
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                              Acknowledge
                            </Button>
                            <Button size="sm" variant="danger" className="bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/20">
                              <Users className="w-3.5 h-3.5 mr-1.5" />
                              Dispatch
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="secondary" className="border-[rgba(255,255,255,0.08)]">
                            <Eye className="w-3.5 h-3.5 mr-1.5" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
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
          </div>
          <span>TRINETRA • Alert Center v2.0</span>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          50% { top: 100%; opacity: 0.3; }
          100% { top: 0; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Alerts;