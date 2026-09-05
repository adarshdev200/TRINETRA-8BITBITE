// src/pages/Security.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
  Shield,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  User,
  Search,
  Filter,
  ChevronDown,
  Wifi,
  Radio,
  Activity,
  Eye,
  AlertTriangle,
  Zap,
  Target,
  RefreshCw,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  XCircle,
  Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Security = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const securityTeams = [
    { id: 'team-01', name: 'Security Team 01', zone: 'Entrance', officers: 6, status: 'available' },
    { id: 'team-02', name: 'Security Team 02', zone: 'Queue A', officers: 5, status: 'on-duty' },
    { id: 'team-03', name: 'Security Team 03', zone: 'Darshan', officers: 8, status: 'responding' },
    { id: 'team-04', name: 'Security Team 04', zone: 'Emergency Response', officers: 6, status: 'available' },
    { id: 'team-05', name: 'Security Team 05', zone: 'VIP Area', officers: 4, status: 'available' },
  ];

  // Derived statistics
  const availableTeams = securityTeams.filter(team => team.status === 'available');
  const respondingTeams = securityTeams.filter(team => team.status === 'responding');
  const onDutyTeams = securityTeams.filter(team => team.status === 'on-duty');
  const totalOfficers = securityTeams.reduce((total, team) => total + team.officers, 0);
  const hasResponding = respondingTeams.length > 0;

  const filteredTeams = securityTeams.filter(team => {
    if (filterStatus !== 'all' && team.status !== filterStatus) return false;
    if (searchTerm && !team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !team.zone.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case 'available':
        return { 
          color: 'text-[#22C55E]', 
          bg: 'bg-[#22C55E]/10', 
          border: 'border-[#22C55E]/30',
          dot: 'bg-[#22C55E]',
          label: 'AVAILABLE',
          sublabel: 'Ready for Deployment',
          glow: 'shadow-[#22C55E]/10'
        };
      case 'on-duty':
        return { 
          color: 'text-[#38BDF8]', 
          bg: 'bg-[#38BDF8]/10', 
          border: 'border-[#38BDF8]/30',
          dot: 'bg-[#38BDF8]',
          label: 'ON DUTY',
          sublabel: 'Currently Deployed',
          glow: 'shadow-[#38BDF8]/10'
        };
      case 'responding':
        return { 
          color: 'text-[#F59E0B]', 
          bg: 'bg-[#F59E0B]/10', 
          border: 'border-[#F59E0B]/30',
          dot: 'bg-[#F59E0B] animate-pulse',
          label: 'RESPONDING',
          sublabel: 'En Route to Incident',
          glow: 'shadow-[#F59E0B]/10'
        };
      default:
        return { 
          color: 'text-[#9CA3AF]', 
          bg: 'bg-[#9CA3AF]/10', 
          border: 'border-[#9CA3AF]/30',
          dot: 'bg-[#9CA3AF]',
          label: 'UNKNOWN',
          sublabel: 'Status Unknown',
          glow: 'shadow-[#9CA3AF]/10'
        };
    }
  };

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
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E6A23C]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#38BDF8]/2 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #E6A23C 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#E6A23C]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Active Response Banner */}
        {hasResponding && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-[#F59E0B] animate-pulse" />
                <span className="text-xs font-bold text-[#F59E0B] tracking-wider uppercase">Active Response</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-[#F5F5F0] font-medium">{respondingTeams[0].name}</span>
                <span className="text-[#9CA3AF]">•</span>
                <span className="text-[#9CA3AF]">{respondingTeams[0].zone}</span>
                <span className="text-[#9CA3AF]">•</span>
                <span className="text-[#F59E0B] font-medium">{respondingTeams[0].officers} Officers Deployed</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 lg:mt-0">
              <span className="flex items-center space-x-1.5 text-[10px] text-[#F59E0B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
                <span>LIVE</span>
              </span>
              <span className="text-[10px] text-[#9CA3AF]">Time in Response: 4:32</span>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6"
        >
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#E6A23C] tracking-[0.15em] uppercase font-medium">TRINETRA / SECURITY OPERATIONS</span>
              <div className="w-px h-3 bg-[#E6A23C]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">All Teams Connected</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">Security Operations</h1>
            <p className="text-[#9CA3AF] text-sm">Personnel & Deployment Center • Coordinate security teams, monitor deployments, and manage emergency response personnel.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-3 text-xs text-[#9CA3AF]">
              <span className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-[#E6A23C]" />
                <span>{totalOfficers} Officers</span>
              </span>
              <span className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></span>
              <span className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-[#E6A23C]" />
                <span>{securityTeams.length} Teams</span>
              </span>
              <span className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-[#22C55E]" />
                <span>{availableTeams.length} Available</span>
              </span>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-[#0D1118] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <RefreshCw className={`w-4 h-4 text-[#9CA3AF] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <Button className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors">
              <Plus className="w-4 h-4 mr-1.5" />
              Deploy Team
            </Button>
          </div>
        </motion.div>

        {/* Operational Summary */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: 'Total Teams', value: securityTeams.length, icon: Shield, color: 'border-[#E6A23C]/20 text-[#E6A23C]' },
            { label: 'Officers on Duty', value: totalOfficers, icon: User, color: 'border-[#38BDF8]/20 text-[#38BDF8]' },
            { label: 'Available', value: availableTeams.length, icon: CheckCircle, color: 'border-[#22C55E]/20 text-[#22C55E]' },
            { label: 'Responding', value: respondingTeams.length, icon: AlertTriangle, color: 'border-[#F59E0B]/20 text-[#F59E0B]' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-[#0D1118] rounded-xl border ${stat.color} p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <stat.icon className="w-4 h-4 opacity-60" />
                <span className="text-[8px] uppercase tracking-wider text-[#9CA3AF]">{stat.label}</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Deployment Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0D1118] rounded-xl border border-[#E6A23C]/20 p-4 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-xs font-bold text-[#F5F5F0] tracking-wider uppercase">Security Network</span>
              </div>
              <span className="text-[10px] text-[#22C55E]">● All Teams Connected</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                <span className="text-[#9CA3AF]">Available</span>
                <span className="text-[#F5F5F0] font-bold">{availableTeams.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                <span className="text-[#9CA3AF]">On Duty</span>
                <span className="text-[#F5F5F0] font-bold">{onDutyTeams.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
                <span className="text-[#9CA3AF]">Responding</span>
                <span className="text-[#F59E0B] font-bold">{respondingTeams.length}</span>
              </div>
              <div className="text-[10px] text-[#9CA3AF]">
                Last Sync: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter / Control Bar */}
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
              placeholder="Search teams or zones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0D1118] text-[#F5F5F0] rounded-xl pl-10 pr-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all placeholder:text-[#9CA3AF] outline-none text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            {['all', 'available', 'on-duty', 'responding'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-[#0D1118] border border-[#E6A23C] text-[#E6A23C] shadow-lg shadow-[#E6A23C]/10'
                    : 'bg-[#0D1118] border border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:text-[#F5F5F0]'
                }`}
              >
                {status === 'all' ? 'All Teams' : 
                 status === 'on-duty' ? 'On Duty' :
                 status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <select className="bg-[#0D1118] text-[#F5F5F0] rounded-xl px-3 py-2 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all outline-none text-xs">
              <option>Sort: Status</option>
              <option>Sort: Name</option>
              <option>Sort: Zone</option>
            </select>
          </div>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {filteredTeams.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="col-span-full bg-[#0D1118] rounded-xl border border-[rgba(255,255,255,0.08)] p-12 text-center"
            >
              <Shield className="w-12 h-12 text-[#9CA3AF]/30 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-[#F5F5F0]">No Security Teams</h3>
              <p className="text-xs text-[#9CA3AF] mt-1">No personnel units are currently registered with the security network.</p>
            </motion.div>
          ) : (
            filteredTeams.map((team, index) => {
              const statusConfig = getStatusConfig(team.status);
              const isHovered = hoveredTeam === team.id;
              const isResponding = team.status === 'responding';

              return (
                <motion.div
                  key={team.id}
                  variants={itemVariants}
                  className={`bg-[#0D1118] rounded-xl border transition-all duration-300 group ${
                    isHovered ? 'border-[#E6A23C] shadow-lg shadow-[#E6A23C]/10 -translate-y-1' : 'border-[rgba(255,255,255,0.08)]'
                  } ${isResponding ? 'border-l-4 border-l-[#F59E0B]' : ''}`}
                  onMouseEnter={() => setHoveredTeam(team.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full border-2 ${statusConfig.border} flex items-center justify-center ${statusConfig.bg}`}>
                          <Shield className={`w-5 h-5 ${statusConfig.color}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#F5F5F0]">{team.name}</h3>
                          <p className="text-xs text-[#9CA3AF]">{team.zone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-[#9CA3AF] font-mono">{team.id.toUpperCase()}</span>
                        <div className="flex items-center space-x-1.5 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
                          <span className={`text-[8px] font-bold ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[rgba(255,255,255,0.06)] mb-3"></div>

                    {/* Team Info */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Personnel</p>
                        <div className="flex items-center space-x-1.5 mt-1">
                          <Users className="w-3.5 h-3.5 text-[#E6A23C]" />
                          <span className="text-sm font-bold text-[#F5F5F0]">{team.officers} Officers</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Deployment Zone</p>
                        <div className="flex items-center space-x-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E6A23C]" />
                          <span className="text-sm font-medium text-[#F5F5F0]">{team.zone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Deployment Readiness */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[8px]">
                        <span className="text-[#9CA3AF] uppercase tracking-wider">Deployment Readiness</span>
                        {team.status === 'available' && (
                          <span className="text-[#22C55E] font-bold">READY</span>
                        )}
                        {team.status === 'on-duty' && (
                          <span className="text-[#38BDF8] font-bold">DEPLOYED</span>
                        )}
                        {team.status === 'responding' && (
                          <span className="text-[#F59E0B] font-bold animate-pulse">IN RESPONSE</span>
                        )}
                      </div>
                      <div className="mt-1 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            team.status === 'available' ? 'bg-[#22C55E]' :
                            team.status === 'on-duty' ? 'bg-[#38BDF8]' :
                            'bg-[#F59E0B] animate-pulse'
                          }`}
                          style={{ 
                            width: team.status === 'available' ? '100%' :
                                   team.status === 'on-duty' ? '100%' :
                                   '100%'
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
                      <span className="text-[8px] text-[#9CA3AF]">{statusConfig.sublabel}</span>
                      {team.status === 'available' && (
                        <Button size="sm" className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-all group">
                          <Send className="w-3.5 h-3.5 mr-1.5 group-hover:translate-x-0.5 transition-transform" />
                          Dispatch
                        </Button>
                      )}
                      {team.status === 'responding' && (
                        <div className="flex items-center space-x-2 text-[#F59E0B]">
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                          <span className="text-[10px] font-medium">Responding</span>
                        </div>
                      )}
                      {team.status === 'on-duty' && (
                        <Button size="sm" variant="secondary" className="border-[#38BDF8]/30 text-[#38BDF8] hover:border-[#38BDF8]">
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          View Status
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between text-[10px] text-[#9CA3AF] gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <Radio className="w-3 h-3 text-[#22C55E]" />
              <span>System Online</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Wifi className="w-3 h-3 text-[#E6A23C]" />
              <span>All Teams Connected</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Gauge className="w-3 h-3 text-[#38BDF8]" />
              <span>Deployment Ready</span>
            </span>
          </div>
          <span>TRINETRA • Security Operations v2.0</span>
        </div>
      </div>
    </div>
  );
};

export default Security;