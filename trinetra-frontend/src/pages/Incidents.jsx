// src/pages/Incidents.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
  AlertTriangle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle,
  XCircle,
  Radio,
  Wifi,
  RefreshCw,
  Calendar,
  MapPin,
  Zap,
  Target,
  FileText,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Incidents = () => {
  const [sortField, setSortField] = useState('time');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const incidents = [
    { id: 'TR-001', time: '18:42', zone: 'Darshan', type: 'Crowd Surge', severity: 'Critical', response: '4 min', status: 'Resolved' },
    { id: 'TR-002', time: '18:31', zone: 'Queue A', type: 'High Density', severity: 'High', response: '3 min', status: 'Resolved' },
    { id: 'TR-003', time: '17:54', zone: 'Gate 3', type: 'Barricade', severity: 'Medium', response: '6 min', status: 'Resolved' },
    { id: 'TR-004', time: '17:20', zone: 'VIP Corridor', type: 'Security', severity: 'Low', response: '2 min', status: 'Resolved' },
    { id: 'TR-005', time: '16:45', zone: 'Exit', type: 'Medical', severity: 'High', response: '5 min', status: 'Active' },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return { text: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/30', dot: 'bg-[#EF4444] animate-pulse' };
      case 'High': return { text: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/30', dot: 'bg-[#F59E0B]' };
      case 'Medium': return { text: 'text-[#D6A84F]', bg: 'bg-[#D6A84F]/10', border: 'border-[#D6A84F]/30', dot: 'bg-[#D6A84F]' };
      case 'Low': return { text: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/10', border: 'border-[#38BDF8]/30', dot: 'bg-[#38BDF8]' };
      default: return { text: 'text-[#9CA3AF]', bg: 'bg-[#9CA3AF]/10', border: 'border-[#9CA3AF]/30', dot: 'bg-[#9CA3AF]' };
    }
  };

  const getStatusColor = (status) => {
    return status === 'Resolved' ? 'text-[#22C55E]' : 'text-[#F59E0B]';
  };

  const getStatusDot = (status) => {
    return status === 'Resolved' ? 'bg-[#22C55E]' : 'bg-[#F59E0B] animate-pulse';
  };

  // Filtered and sorted incidents
  const filteredIncidents = incidents.filter(incident => {
    if (filterSeverity !== 'all' && incident.severity.toLowerCase() !== filterSeverity) return false;
    if (searchTerm && !incident.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !incident.zone.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !incident.type.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'time') {
      aVal = parseInt(a.time.replace(':', ''));
      bVal = parseInt(b.time.replace(':', ''));
    }
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Statistics
  const stats = {
    total: incidents.length,
    active: incidents.filter(i => i.status === 'Active').length,
    critical: incidents.filter(i => i.severity === 'Critical').length,
    resolved: incidents.filter(i => i.status === 'Resolved').length
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
      transition: { duration: 0.3 }
    }
  };

  const SortableHeader = ({ field, label }) => {
    const isActive = sortField === field;
    return (
      <th 
        className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider cursor-pointer hover:text-[#F5F5F0] transition-colors group"
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center space-x-1.5">
          <span>{label}</span>
          {isActive ? (
            sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-[#D6A84F]" /> : <ChevronDown className="w-3 h-3 text-[#D6A84F]" />
          ) : (
            <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-30 transition-opacity" />
          )}
        </div>
      </th>
    );
  };

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
              <span className="text-[10px] text-[#D6A84F] tracking-[0.15em] uppercase font-medium">TRINETRA / INCIDENT INTELLIGENCE</span>
              <div className="w-px h-3 bg-[#D6A84F]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">Operations Active</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">Incident Command</h1>
            <p className="text-[#9CA3AF] text-sm">Track, investigate and manage security incidents across monitored temple zones.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-lg bg-[#0B0F15]">
              <span className="text-[8px] text-[#9CA3AF] tracking-wider uppercase">{incidents.length} Total Incidents</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-[#0B0F15] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <RefreshCw className={`w-4 h-4 text-[#9CA3AF] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Incident Summary Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: 'Total Incidents', value: stats.total, icon: FileText, color: 'border-[#D6A84F]/20 text-[#D6A84F]' },
            { label: 'Active', value: stats.active, icon: Activity, color: 'border-[#F59E0B]/20 text-[#F59E0B]' },
            { label: 'Critical', value: stats.critical, icon: AlertTriangle, color: 'border-[#EF4444]/20 text-[#EF4444]' },
            { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'border-[#22C55E]/20 text-[#22C55E]' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-[#0B0F15] rounded-xl border ${stat.color} p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <stat.icon className="w-4 h-4 opacity-60" />
                <span className="text-[8px] uppercase tracking-wider text-[#9CA3AF]">{stat.label}</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search + Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search incident ID, zone, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B0F15] text-[#F5F5F0] rounded-xl pl-10 pr-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F]/30 transition-all placeholder:text-[#9CA3AF] outline-none text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-[#0B0F15] text-[#F5F5F0] rounded-xl px-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F]/30 transition-all outline-none text-sm"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button size="sm" variant="secondary">
              <Filter className="w-4 h-4 mr-1.5" />
              Filter
            </Button>
            <Button size="sm" variant="secondary">
              <FileText className="w-4 h-4 mr-1.5" />
              Export Log
            </Button>
          </div>
        </motion.div>

        {/* Security Event Log */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0B0F15] rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.06)]">
            <div>
              <h3 className="text-sm font-bold text-[#F5F5F0]">Security Event Log</h3>
              <p className="text-xs text-[#9CA3AF]">Chronological record of detected security incidents</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">Live Archive</span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <SortableHeader field="id" label="Incident" />
                  <SortableHeader field="time" label="Time" />
                  <SortableHeader field="zone" label="Zone" />
                  <SortableHeader field="type" label="Type" />
                  <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">Severity</th>
                  <SortableHeader field="response" label="Response" />
                  <SortableHeader field="status" label="Status" />
                  <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sortedIncidents.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mb-3">
                            <CheckCircle className="w-8 h-8 text-[#22C55E]" />
                          </div>
                          <p className="text-sm font-medium text-[#F5F5F0]">No Security Incidents</p>
                          <p className="text-xs text-[#9CA3AF] mt-1">No incidents have been recorded for the current monitoring period.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedIncidents.map((incident, index) => {
                      const severity = getSeverityColor(incident.severity);
                      const isActive = incident.status === 'Active';
                      return (
                        <motion.tr
                          key={incident.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`border-b border-[rgba(255,255,255,0.04)] hover:bg-[#10151D] transition-colors group ${isActive ? 'bg-[#F59E0B]/5' : ''}`}
                          style={isActive ? { borderLeft: '3px solid #F59E0B' } : {}}
                        >
                          <td className="py-3 px-4">
                            <span className="text-xs font-mono font-medium text-[#D6A84F]">{incident.id}</span>
                          </td>
                          <td className="py-3 px-4 text-sm text-[#9CA3AF] flex items-center space-x-1.5">
                            <Clock className="w-3 h-3" />
                            <span>{incident.time}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-xs font-medium text-[#F5F5F0] uppercase tracking-wider">{incident.zone}</span>
                          </td>
                          <td className="py-3 px-4 text-sm text-[#9CA3AF]">{incident.type}</td>
                          <td className="py-3 px-4">
                            <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg ${severity.bg} ${severity.border} border`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${severity.dot}`}></span>
                              <span className={`text-xs font-bold ${severity.text}`}>{incident.severity}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-[#9CA3AF] flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{incident.response}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`inline-flex items-center space-x-1.5 ${isActive ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(incident.status)}`}></span>
                              <span className="text-xs font-medium uppercase tracking-wider">{incident.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button className="flex items-center space-x-1 text-xs text-[#9CA3AF] hover:text-[#D6A84F] transition-colors group">
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden p-4 space-y-3">
            <AnimatePresence>
              {sortedIncidents.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-[#22C55E]" />
                  </div>
                  <p className="text-sm font-medium text-[#F5F5F0]">No Security Incidents</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">No incidents have been recorded for the current monitoring period.</p>
                </div>
              ) : (
                sortedIncidents.map((incident, index) => {
                  const severity = getSeverityColor(incident.severity);
                  const isActive = incident.status === 'Active';
                  return (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-[#10151D] rounded-xl border border-[rgba(255,255,255,0.06)] p-4 ${isActive ? 'border-l-4 border-l-[#F59E0B]' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-[#D6A84F]">{incident.id}</span>
                            <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded ${severity.bg} ${severity.text}`}>
                              {incident.severity}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-[#F5F5F0] mt-1">{incident.type}</p>
                          <p className="text-xs text-[#9CA3AF]">{incident.zone}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(incident.status)}`}></span>
                          <span className={`text-[10px] font-medium uppercase ${isActive ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                            {incident.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{incident.time}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{incident.response}</span>
                        </span>
                        <button className="flex items-center space-x-1 text-[#D6A84F] hover:text-[#F3C66B] transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-[10px]">View</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
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
              <Target className="w-3 h-3 text-[#38BDF8]" />
              <span>Incident Tracking</span>
            </span>
          </div>
          <span>TRINETRA • Incident Intelligence v2.0</span>
        </div>
      </div>
    </div>
  );
};

export default Incidents;