// src/pages/Analytics.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  AlertTriangle,
  Calendar,
  Activity,
  Zap,
  Target,
  Shield,
  Eye,
  Wifi,
  Radio,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Info,
  Sparkles,
  Brain,
  LineChart,
  PieChart,
  BarChart
} from 'lucide-react';
import {
  LineChart as ReLineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export const Analytics = () => {
  const [period, setPeriod] = useState('today');
  const [hoveredInsight, setHoveredInsight] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    totalVisitors: 0,
    peakCrowd: 0,
    incidents: 0,
    avgResponse: 0
  });

  // Sample data - keep existing structure
  const visitorData = [
    { time: '12:00', visitors: 3200 },
    { time: '13:00', visitors: 4500 },
    { time: '14:00', visitors: 5800 },
    { time: '15:00', visitors: 7200 },
    { time: '16:00', visitors: 6800 },
    { time: '17:00', visitors: 8452 },
    { time: '18:00', visitors: 9200 },
  ];

  const incidentData = [
    { name: 'Crowd Surge', value: 45 },
    { name: 'High Density', value: 30 },
    { name: 'Barricade', value: 15 },
    { name: 'Security', value: 10 },
  ];

  const responseData = [
    { day: 'Mon', time: 4.2 },
    { day: 'Tue', time: 3.8 },
    { day: 'Wed', time: 4.5 },
    { day: 'Thu', time: 3.2 },
    { day: 'Fri', time: 2.8 },
    { day: 'Sat', time: 3.5 },
    { day: 'Sun', time: 4.0 },
  ];

  const COLORS = ['#D6A84F', '#F3C969', '#EF4444', '#38BDF8'];

  const insights = [
    {
      id: '01',
      title: 'PEAK CROWD WINDOW',
      metric: '18:00 – 19:30',
      description: 'Crowd density is typically 32% above the daily average during this period.',
      badge: 'HIGH CONFIDENCE',
      icon: TrendingUp,
      color: 'text-[#D6A84F]',
      bg: 'bg-[#D6A84F]/10'
    },
    {
      id: '02',
      title: 'QUEUE PERFORMANCE',
      metric: 'QUEUE B',
      description: 'Currently processing visitors 18% faster than Queue A.',
      badge: 'OPTIMIZATION OPPORTUNITY',
      icon: Users,
      color: 'text-[#F3C969]',
      bg: 'bg-[#F3C969]/10'
    },
    {
      id: '03',
      title: 'SECURITY RESPONSE',
      metric: '3.6 MIN AVG',
      description: 'Average response time improved by 14% this week.',
      badge: 'POSITIVE TREND',
      icon: Shield,
      color: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]/10'
    }
  ];

  // Animate values on load
  useEffect(() => {
    const targets = {
      totalVisitors: 8452,
      peakCrowd: 9200,
      incidents: 24,
      avgResponse: 3.6
    };
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedValues({
        totalVisitors: Math.round(targets.totalVisitors * progress),
        peakCrowd: Math.round(targets.peakCrowd * progress),
        incidents: Math.round(targets.incidents * progress),
        avgResponse: Number((targets.avgResponse * progress).toFixed(1))
      });
      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0D1117]/95 backdrop-blur-sm border border-[#D6A84F]/20 rounded-xl p-3 shadow-2xl shadow-black/50">
          <p className="text-xs text-[#9CA3AF]">{label}</p>
          <p className="text-sm font-bold text-[#F5F5F0]">{payload[0].value.toLocaleString()} visitors</p>
          <div className="mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-[#22C55E]" />
            <span className="text-xs text-[#22C55E]">+12.4%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom donut tooltip
  const DonutTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0D1117]/95 backdrop-blur-sm border border-[#D6A84F]/20 rounded-xl p-3 shadow-2xl shadow-black/50">
          <p className="text-sm font-medium text-[#F5F5F0]">{payload[0].name}</p>
          <p className="text-xs text-[#9CA3AF]">{payload[0].value}% of incidents</p>
        </div>
      );
    }
    return null;
  };

  // Custom bar tooltip
  const BarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0D1117]/95 backdrop-blur-sm border border-[#D6A84F]/20 rounded-xl p-3 shadow-2xl shadow-black/50">
          <p className="text-xs text-[#9CA3AF]">{label}</p>
          <p className="text-sm font-bold text-[#F5F5F0]">{payload[0].value} min</p>
        </div>
      );
    }
    return null;
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
    <div className="min-h-screen bg-[#07090C] p-4 lg:p-6 relative overflow-hidden">
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6"
        >
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#D6A84F] tracking-[0.15em] uppercase font-medium">TRINETRA INTELLIGENCE</span>
              <div className="w-px h-3 bg-[#D6A84F]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">Live Data Stream</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">Security Analytics</h1>
            <p className="text-[#9CA3AF] text-sm">Real-time intelligence, crowd behavior and operational performance across monitored temple zones.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            {['today', '7days', '30days', 'custom'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  period === p
                    ? 'bg-[#0D1117] border border-[#D6A84F] text-[#D6A84F] shadow-lg shadow-[#D6A84F]/10'
                    : 'bg-[#0D1117] border border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:text-[#F5F5F0] hover:border-[#D6A84F]/30'
                }`}
              >
                {p === 'today' ? 'Today' : p === '7days' ? '7 Days' : p === '30days' ? '30 Days' : 'Custom'}
                {p === 'custom' && <Calendar className="w-3 h-3 inline ml-1.5" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* KPI Intelligence Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {[
            { 
              label: 'Total Visitors', 
              value: animatedValues.totalVisitors.toLocaleString(), 
              icon: Users, 
              trend: '+12.4%',
              trendUp: true,
              subtitle: 'vs yesterday',
              color: 'border-[#D6A84F]/20 text-[#D6A84F]',
              glow: 'shadow-[#D6A84F]/10'
            },
            { 
              label: 'Peak Crowd', 
              value: animatedValues.peakCrowd.toLocaleString(), 
              icon: TrendingUp, 
              trend: '18:00 – 19:30',
              trendUp: true,
              subtitle: 'peak window',
              color: 'border-[#F3C969]/20 text-[#F3C969]',
              glow: 'shadow-[#F3C969]/10'
            },
            { 
              label: 'Incidents', 
              value: animatedValues.incidents, 
              icon: AlertTriangle, 
              trend: '-14%',
              trendUp: false,
              subtitle: 'vs previous period',
              color: 'border-[#EF4444]/20 text-[#EF4444]',
              glow: 'shadow-[#EF4444]/10'
            },
            { 
              label: 'Avg Response', 
              value: `${animatedValues.avgResponse} min`, 
              icon: Clock, 
              trend: '-18%',
              trendUp: false,
              subtitle: 'Improved',
              color: 'border-[#22C55E]/20 text-[#22C55E]',
              glow: 'shadow-[#22C55E]/10'
            },
          ].map((kpi, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-[#0D1117] rounded-xl border ${kpi.color} p-4 shadow-lg ${kpi.glow} hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <kpi.icon className="w-4 h-4 opacity-60" />
                <span className={`text-[8px] font-medium flex items-center space-x-1 ${
                  kpi.trendUp ? 'text-[#22C55E]' : 'text-[#EF4444]'
                }`}>
                  {kpi.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{kpi.trend}</span>
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">{kpi.value}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[8px] uppercase tracking-wider text-[#9CA3AF]">{kpi.label}</span>
                <span className="text-[8px] text-[#9CA3AF]">{kpi.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#F5F5F0]">AI Operational Insights</h2>
              <p className="text-xs text-[#9CA3AF]">Automated observations from current security and crowd data.</p>
            </div>
            <div className="flex items-center space-x-2 text-[8px] text-[#9CA3AF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
              <span>AI Engine Active</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`bg-[#0D1117] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 hover:border-[#D6A84F]/30 transition-all hover:-translate-y-0.5 group cursor-pointer`}
                onMouseEnter={() => setHoveredInsight(index)}
                onMouseLeave={() => setHoveredInsight(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${insight.bg}`}>
                      <insight.icon className={`w-4 h-4 ${insight.color}`} />
                    </div>
                    <span className="text-[8px] text-[#9CA3AF] font-mono">{insight.id}</span>
                  </div>
                  <span className="text-[7px] px-2 py-1 rounded-full bg-[#D6A84F]/10 text-[#D6A84F] tracking-wider uppercase">
                    {insight.badge}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#F5F5F0] mt-2">{insight.title}</h3>
                <p className="text-sm font-bold text-[#D6A84F] mt-1">{insight.metric}</p>
                <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{insight.description}</p>
                <div className={`mt-3 h-0.5 bg-[#D6A84F]/20 rounded-full transition-all duration-500 ${hoveredInsight === index ? 'w-full' : 'w-12'}`}></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Visitor Footfall Chart - 2/3 width */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card elevated className="border border-[rgba(255,255,255,0.08)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F5F0]">Visitor Footfall</h3>
                  <p className="text-xs text-[#9CA3AF]">Hourly visitor activity</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#F5F5F0]">{animatedValues.totalVisitors.toLocaleString()}</p>
                    <span className="text-[10px] text-[#22C55E] flex items-center justify-end">
                      <ArrowUpRight className="w-3 h-3" />
                      +12.4% today
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                    <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">Live</span>
                  </div>
                </div>
              </div>
              <div className="h-64 lg:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#4A5058" 
                      fontSize={10} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#4A5058" 
                      fontSize={10} 
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#D6A84F" 
                      strokeWidth={2.5} 
                      dot={false}
                      activeDot={{ 
                        r: 6, 
                        fill: '#D6A84F',
                        stroke: '#0D1117',
                        strokeWidth: 2
                      }}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Incident Distribution - 1/3 width */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card elevated className="border border-[rgba(255,255,255,0.08)] p-6 h-full">
              <h3 className="text-sm font-bold text-[#F5F5F0] mb-1">Incident Distribution</h3>
              <p className="text-xs text-[#9CA3AF] mb-4">Security events by category</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={incidentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                      animationDuration={1000}
                      animationBegin={500}
                    >
                      {incidentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#07090C" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip content={<DonutTooltip />} />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                {incidentData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-[10px] text-[#9CA3AF]">{item.name}</span>
                    <span className="text-[10px] text-[#F5F5F0] font-medium ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Security Response Performance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card elevated className="border border-[rgba(255,255,255,0.08)] p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#F5F5F0]">Security Response Performance</h3>
                <p className="text-xs text-[#9CA3AF]">Average emergency response time · Last 7 days</p>
              </div>
              <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                <div className="text-right">
                  <p className="text-xl font-bold text-[#22C55E]">3.6 min</p>
                  <span className="text-[10px] text-[#22C55E] flex items-center justify-end">
                    <ArrowDownRight className="w-3 h-3" />
                    -18% improvement
                  </span>
                </div>
                <div className="w-px h-8 bg-[rgba(255,255,255,0.08)]"></div>
                <div className="text-right">
                  <p className="text-xs text-[#9CA3AF]">Target</p>
                  <p className="text-sm font-bold text-[#F5F5F0]">4.5 min</p>
                </div>
              </div>
            </div>
            <div className="h-56 lg:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={responseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#4A5058" 
                    fontSize={10} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#4A5058" 
                    fontSize={10} 
                    axisLine={false}
                    tickLine={false}
                    label={{ 
                      value: 'Minutes', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: '#4A5058', fontSize: 10 }
                    }}
                  />
                  <Tooltip content={<BarTooltip />} />
                  <Bar 
                    dataKey="time" 
                    fill="#D6A84F" 
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                    animationDuration={800}
                    animationBegin={300}
                  >
                    {responseData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.time <= 3.5 ? '#22C55E' : entry.time <= 4.0 ? '#D6A84F' : '#EF4444'}
                      />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Analytics Summary / Performance Band */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-6"
        >
          {[
            { label: 'Crowd Management', value: 92, status: 'Optimal', color: 'text-[#D6A84F]' },
            { label: 'Security Coverage', value: 98.4, status: 'All zones monitored', color: 'text-[#22C55E]' },
            { label: 'Response SLA', value: 94, status: 'Within target', color: 'text-[#F3C969]' },
          ].map((item, index) => (
            <div key={index} className="bg-[#0D1117] rounded-xl border border-[rgba(255,255,255,0.08)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">{item.label}</span>
                <span className={`text-xs font-bold ${item.color}`}>{item.status}</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${item.color}`}>{item.value}%</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.value >= 90 ? 'bg-[#22C55E]' : 
                      item.value >= 80 ? 'bg-[#D6A84F]' : 
                      'bg-[#EF4444]'
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
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
              <Brain className="w-3 h-3 text-[#F3C969]" />
              <span>Analytics Processing</span>
            </span>
          </div>
          <span>TRINETRA • Analytics Intelligence v2.0</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;