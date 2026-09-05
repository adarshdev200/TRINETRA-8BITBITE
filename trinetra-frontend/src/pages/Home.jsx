// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Shield,
  Users,
  Camera,
  Bell,
  Map,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  Activity,
  ChevronRight,
  BarChart3,
  Cpu,
  Lock,
  Globe,
  Building2,
  Sparkles,
  Layers,
  Zap,
  Star,
  Circle,
  Target,
  Radio,
  Network,
  Scan,
  Video,
  Wifi,
  Signal,
  Navigation,
  Compass,
  Award,
  Flame,
  EyeOff,
  Gauge,
  Radar,
  Database,
  Cloud,
  Server,
  Brain,
  LineChart,
  PlayCircle,
  User,
  ChevronDown,
  Mouse,
  ShieldCheck,
  Monitor
} from 'lucide-react';

export const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const [counters, setCounters] = useState({ temples: 0, visitors: 0, teams: 0, response: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    const targetTemples = 50;
    const targetVisitors = 2000000;
    const targetTeams = 200;
    const targetResponse = 45;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounters({
        temples: Math.min(Math.round(targetTemples * progress), targetTemples),
        visitors: Math.min(Math.round(targetVisitors * progress), targetVisitors),
        teams: Math.min(Math.round(targetTeams * progress), targetTeams),
        response: Math.min(Math.round(targetResponse * progress), targetResponse)
      });
      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Pulse animation for map nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const zones = [
    { name: 'Darshan Area', density: 93, status: 'critical', visitors: 2840, flow: 'critical' },
    { name: 'Queue A', density: 84, status: 'high', visitors: 1850, flow: 'high' },
    { name: 'North Gate', density: 67, status: 'warning', visitors: 920, flow: 'medium' },
    { name: 'South Gate', density: 45, status: 'normal', visitors: 580, flow: 'medium' },
    { name: 'Security Check', density: 32, status: 'normal', visitors: 340, flow: 'low' },
    { name: 'Parking', density: 18, status: 'safe', visitors: 120, flow: 'low' },
  ];

  const timelineEvents = [
    { time: '00:00', event: 'Crowd anomaly detected', status: 'complete' },
    { time: '00:05', event: 'AI verifies abnormal density', status: 'complete' },
    { time: '00:12', event: 'Alert generated', status: 'complete' },
    { time: '00:20', event: 'Security team notified', status: 'active' },
    { time: '00:45', event: 'Response team deployed', status: 'pending' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10';
      case 'high': return 'text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10';
      case 'warning': return 'text-[#E6B85C] border-[#E6B85C]/30 bg-[#E6B85C]/10';
      case 'normal': return 'text-[#38BDF8] border-[#38BDF8]/30 bg-[#38BDF8]/10';
      case 'safe': return 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10';
      default: return 'text-[#6B7280] border-[#6B7280]/30 bg-[#6B7280]/10';
    }
  };

  const getDensityColor = (density) => {
    if (density > 80) return 'text-[#EF4444]';
    if (density > 60) return 'text-[#F59E0B]';
    if (density > 40) return 'text-[#E6B85C]';
    if (density > 20) return 'text-[#38BDF8]';
    return 'text-[#22C55E]';
  };

  const getDensityBarColor = (density) => {
    if (density > 80) return 'bg-[#EF4444]';
    if (density > 60) return 'bg-[#F59E0B]';
    if (density > 40) return 'bg-[#E6B85C]';
    if (density > 20) return 'bg-[#38BDF8]';
    return 'bg-[#22C55E]';
  };

  const features = [
    { id: '01', icon: Brain, title: 'AI Crowd Intelligence', desc: 'Real-time analysis of crowd density, movement patterns, and flow rates across all temple zones.' },
    { id: '02', icon: Video, title: 'Smart CCTV Monitoring', desc: 'AI-powered video analytics with threat detection and automated incident recognition.' },
    { id: '03', icon: Radar, title: 'Predictive Risk Detection', desc: 'Advanced algorithms forecast crowd surges and identify potential risks before they escalate.' },
    { id: '04', icon: Bell, title: 'Emergency Response', desc: 'Instant alert generation and coordinated security team dispatch for critical situations.' },
    { id: '05', icon: Map, title: 'Digital Temple Mapping', desc: 'Comprehensive zone monitoring with real-time status updates and historical data.' },
    { id: '06', icon: Shield, title: 'Security Coordination', desc: 'Centralized command center for managing security teams and response operations.' },
  ];

  const securityStages = [
    { num: '01', title: 'OBSERVE', icon: Eye, desc: 'CCTV + IoT + Entry Sensors' },
    { num: '02', title: 'UNDERSTAND', icon: Brain, desc: 'AI Crowd Analysis' },
    { num: '03', title: 'PREDICT', icon: Radar, desc: 'Risk & Crowd Forecasting' },
    { num: '04', title: 'ALERT', icon: Bell, desc: 'Real-Time Threat Notification' },
    { num: '05', title: 'RESPOND', icon: Shield, desc: 'Security Team Dispatch' },
    { num: '06', title: 'PROTECT', icon: CheckCircle, desc: 'Safer Pilgrimage Experience' },
  ];

  const technologies = [
    'React', 'Node.js', 'MongoDB', 'Socket.io', 'YOLO', 'OpenCV', 'TensorFlow', 'WebRTC'
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F5F0E6] overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080B10]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/trinetra-logo.png" alt="TRINETRA" className="h-14 w-auto" />
            </Link>

            {/* Nav links */}
            <div className="hidden lg:flex items-center space-x-9">
              {[
                { label: 'Home', to: '/', active: true },
                { label: 'Live Monitor', to: '/monitoring' },
                { label: 'Analytics', to: '/analytics' },
                { label: 'Alerts', to: '/alerts' },
                { label: 'About Us', to: '#' },
                { label: 'Contact', to: '#' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative text-sm transition-colors ${item.active ? 'text-white font-medium' : 'text-[#9CA3AF] hover:text-white'}`}
                >
                  {item.label}
                  {item.active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#F5A623] rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Admin login */}
            <Link
              to="/signin"
              className="flex items-center space-x-2 border border-[#F5A623]/60 text-white hover:bg-[#F5A623] hover:text-[#080B10] transition-all duration-300 px-5 py-2 rounded-full text-sm"
            >
              <User className="w-4 h-4" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-28">
        {/* Background image (provided) */}
        <div className="absolute inset-0">
          <img src="/hero-temple.png" alt="" className="w-full h-full object-cover object-center" />
          {/* dark left gradient + edge vignettes for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B10] via-[#080B10]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-[#080B10]/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[#F5A623] text-xs sm:text-sm tracking-[0.2em] font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI POWERED</span>
              <span className="opacity-40">•</span>
              <span>REAL TIME</span>
              <span className="opacity-40">•</span>
              <span>SMARTER TEMPLES</span>
            </div>

            {/* Headline */}
            <h1 className="font-bold leading-[1.03] tracking-tight text-5xl sm:text-6xl lg:text-8xl">
              <span className="text-white block">Smarter Temples.</span>
              <span className="text-[#F5A623] block">Safer Darshan.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-[#C9D1D9] text-base lg:text-lg leading-relaxed max-w-lg">
              Real-time crowd monitoring, predictive analytics and intelligent alerts
              for a smooth and safe experience for every devotee.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center space-x-2.5 bg-[#F5A623] text-[#080B10] font-semibold px-7 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#F5A623]/30 transition-all"
              >
                <Monitor className="w-5 h-5" />
                <span>Enter Command Center</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center space-x-2.5 bg-white/5 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Feature items */}
            <div className="mt-14 flex flex-wrap items-start">
              {[
                { Icon: Camera, color: '#F5A623', title: '24/7 Monitoring', sub: 'Live CCTV & AI Vision' },
                { Icon: Users, color: '#22C55E', title: 'Crowd Analytics', sub: 'Real-time People Count' },
                { Icon: Bell, color: '#F59E0B', title: 'Smart Alerts', sub: 'Predict & Prevent' },
                { Icon: ShieldCheck, color: '#38BDF8', title: 'Secure & Reliable', sub: 'Data Driven Safety' },
              ].map((f, i) => (
                <div
                  key={f.title}
                  className={`py-1 ${i > 0 ? 'pl-6 ml-6 border-l border-white/10' : ''}`}
                >
                  <f.Icon className="w-6 h-6 mb-2" style={{ color: f.color }} />
                  <p className="text-white text-sm font-semibold">{f.title}</p>
                  <p className="text-[#9CA3AF] text-xs mt-0.5">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll to explore */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#9CA3AF]">
          <div className="flex items-center space-x-2">
            <Mouse className="w-4 h-4" />
            <span className="text-xs tracking-wide">Scroll to explore</span>
          </div>
          <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-[#0B0F14] to-[#1A1F2E] border-y border-[#D4A84F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: counters.temples, label: 'Temples Protected', suffix: '+' },
              { value: (counters.visitors / 1000000).toFixed(1), label: 'Daily Visitors Monitored', suffix: 'M+' },
              { value: counters.teams, label: 'Security Teams', suffix: '+' },
              { value: counters.response, label: 'Average Response', suffix: 's' },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <p className="text-4xl lg:text-5xl font-bold text-[#D4A84F]">{item.value}{item.suffix}</p>
                <p className="text-xs text-[#9CA3AF] tracking-wider uppercase mt-1">{item.label}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#D4A84F]/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TRINETRA Section */}
      <section className="py-24 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0F14]">
              INTELLIGENCE <span className="text-[#D4A84F]">BEYOND SURVEILLANCE</span>
            </h2>
            <p className="text-[#6B7280] mt-4">From seeing the crowd to understanding the crowd.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#F8F5F0] rounded-xl border border-[#E5DDD0] p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#D4A84F]/50 group cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full border border-[#D4A84F]/20 flex items-center justify-center group-hover:border-[#D4A84F] transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-[#D4A84F]" />
                  </div>
                  <span className="text-xs font-mono text-[#D4A84F]/50">{feature.id}</span>
                </div>
                <h3 className="text-sm font-bold text-[#0B0F14] mt-4">{feature.title}</h3>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{feature.desc}</p>
                <div className={`mt-4 h-0.5 bg-[#D4A84F]/20 rounded-full transition-all duration-500 ${hoveredFeature === index ? 'w-full' : 'w-12'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Intelligence Section */}
      <section className="py-24 bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E6]">
              FROM OBSERVATION <span className="text-[#D4A84F]">TO PROTECTION</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
            {securityStages.map((stage, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full border-2 border-[#D4A84F]/20 flex items-center justify-center mx-auto mb-3 group-hover:border-[#D4A84F] transition-all duration-300 bg-[#111827]`}>
                    <span className="text-[10px] text-[#D4A84F] font-mono font-bold">{stage.num}</span>
                  </div>
                  {index < 5 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(100%-16px)] w-8 h-px bg-gradient-to-r from-[#D4A84F]/30 to-transparent"></div>
                  )}
                </div>
                <stage.icon className="w-4 h-4 text-[#D4A84F] mx-auto mb-2 opacity-60" />
                <h4 className="text-[10px] text-[#F5F0E6] font-medium tracking-wider">{stage.title}</h4>
                <p className="text-[8px] text-[#9CA3AF] mt-1">{stage.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 lg:hidden">
            <div className="flex items-center space-x-1 text-[#D4A84F]/30">
              {[...Array(5)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="w-1 h-1 rounded-full bg-[#D4A84F]/30"></div>
                  <ChevronRight className="w-3 h-3" />
                </React.Fragment>
              ))}
              <div className="w-1 h-1 rounded-full bg-[#D4A84F]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Intelligence Section */}
      <section className="py-24 bg-[#111827] border-y border-[#D4A84F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-[#0B0F14] rounded-2xl border border-[#D4A84F]/20 p-6">
              <h3 className="text-xs text-[#9CA3AF] tracking-wider uppercase mb-4">Live Crowd Density</h3>
              <div className="space-y-4">
                {zones.slice(0, 4).map((zone, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#F5F0E6]">{zone.name}</span>
                      <span className={`font-bold ${getDensityColor(zone.density)}`}>{zone.density}%</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${getDensityBarColor(zone.density)}`}
                        style={{ width: `${zone.density}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini chart */}
              <div className="mt-4 pt-4 border-t border-[#D4A84F]/10">
                <div className="flex items-end h-12 space-x-1">
                  {[30, 45, 55, 70, 85, 65, 50, 40, 60, 75, 90, 80].map((height, i) => (
                    <div key={i} className="flex-1 bg-[#D4A84F]/20 rounded-sm">
                      <div 
                        className="w-full bg-[#D4A84F] rounded-sm transition-all duration-1000"
                        style={{ height: `${height * 0.6}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E6]">
                SEE RISK BEFORE IT BECOMES <span className="text-[#D4A84F]">AN EMERGENCY</span>
              </h2>
              <p className="text-[#9CA3AF] leading-relaxed">
                TRINETRA doesn't simply monitor incidents; it identifies patterns and 
                predicts dangerous crowd conditions before they escalate.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0B0F14] rounded-lg p-4 border border-[#D4A84F]/10">
                  <p className="text-[8px] text-[#9CA3AF] tracking-wider uppercase">AI Confidence</p>
                  <p className="text-xl font-bold text-[#22C55E]">94.8%</p>
                </div>
                <div className="bg-[#0B0F14] rounded-lg p-4 border border-[#D4A84F]/10">
                  <p className="text-[8px] text-[#9CA3AF] tracking-wider uppercase">Risk Level</p>
                  <p className="text-xl font-bold text-[#F59E0B]">MODERATE</p>
                </div>
                <div className="bg-[#0B0F14] rounded-lg p-4 border border-[#D4A84F]/10">
                  <p className="text-[8px] text-[#9CA3AF] tracking-wider uppercase">Prediction Window</p>
                  <p className="text-xl font-bold text-[#38BDF8]">15 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage + Technology Section */}
      <section className="py-24 bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-16 h-px bg-[#D4A84F]"></div>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F0E6] leading-tight">
                HERITAGE DESERVES <span className="text-[#D4A84F]">INTELLIGENCE.</span>
              </h2>
              <p className="text-[#9CA3AF] leading-relaxed">
                TRINETRA combines India's architectural heritage with artificial intelligence, 
                computer vision, IoT sensing, and real-time communication to create safer 
                pilgrimage environments.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-xs text-[#D4A84F] tracking-wider uppercase">Heritage</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#D4A84F]/50 to-[#D4A84F]/0"></div>
                <span className="text-xs text-[#38BDF8] tracking-wider uppercase">Technology</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#111827] rounded-2xl border border-[#D4A84F]/20 p-8 min-h-[300px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 border-2 border-[#D4A84F]/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-4 border-2 border-[#D4A84F]/30 rounded-full"></div>
                    <div className="absolute inset-8 border-2 border-[#D4A84F]/40 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Eye className="w-12 h-12 text-[#D4A84F]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-[#38BDF8] animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-[#22C55E] animate-pulse delay-300"></div>
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-[8px] text-[#9CA3AF] tracking-wider uppercase">
                    <span className="flex items-center space-x-1">
                      <span className="w-1 h-1 rounded-full bg-[#D4A84F]"></span>
                      <span>AI</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-1 h-1 rounded-full bg-[#38BDF8]"></span>
                      <span>CV</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-1 h-1 rounded-full bg-[#22C55E]"></span>
                      <span>IoT</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#D4A84F]/20 rounded-tr-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#D4A84F]/20 rounded-bl-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Response Section */}
      <section className="py-24 bg-[#1A1118] border-y border-[#7A2634]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #EF4444 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E6]">
              WHEN EVERY <span className="text-[#EF4444]">SECOND</span> MATTERS.
            </h2>
          </div>

          <div className="bg-[#0B0F14]/80 rounded-2xl border border-[#7A2634]/30 p-6 max-w-3xl mx-auto">
            <div className="space-y-4">
              {timelineEvents.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#1A1118] transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'complete' ? 'bg-[#22C55E]' :
                    item.status === 'active' ? 'bg-[#D4A84F] animate-pulse' :
                    'bg-[#4B5563]'
                  }`}></div>
                  <span className="text-xs font-mono text-[#D4A84F] w-16">{item.time}</span>
                  <span className={`text-sm ${
                    item.status === 'complete' ? 'text-[#F5F0E6]' :
                    item.status === 'active' ? 'text-[#D4A84F] font-medium' :
                    'text-[#6B7280]'
                  }`}>{item.event}</span>
                  {item.status === 'active' && (
                    <span className="text-[8px] text-[#D4A84F] animate-pulse ml-auto">● LIVE</span>
                  )}
                  {item.status === 'complete' && (
                    <CheckCircle className="w-3 h-3 text-[#22C55E] ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E6]">
              BUILT FOR <span className="text-[#D4A84F]">REAL-WORLD SCALE</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-5 py-2.5 border border-[#D4A84F]/20 rounded-lg text-sm text-[#9CA3AF] hover:border-[#D4A84F] hover:text-[#F5F0E6] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0B0F14] relative overflow-hidden border-t border-[#D4A84F]/10">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cpath d='M600 50L100 750h1000L600 50z' fill='%23D4A84F' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4A84F]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-20 h-20 mx-auto border-2 border-[#D4A84F]/20 rounded-full flex items-center justify-center mb-8">
            <div className="relative">
              <Eye className="w-10 h-10 text-[#D4A84F]" />
              <div className="absolute -inset-4 border border-[#D4A84F]/10 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F0E6] leading-tight">
            THE FUTURE OF TEMPLE SAFETY
            <br />
            <span className="text-[#D4A84F]">IS INTELLIGENT.</span>
          </h2>
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            Protect every devotee. Preserve every heritage site. Respond before risk becomes an emergency.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link 
              to="/signup" 
              className="bg-[#D4A84F] text-[#0B0F14] px-8 py-3 rounded hover:shadow-lg hover:shadow-[#D4A84F]/20 transition-all duration-300 flex items-center space-x-2 text-sm font-medium tracking-wide"
            >
              <span>Enter TRINETRA Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/signin" 
              className="border border-[#D4A84F]/30 text-[#F5F0E6] px-8 py-3 rounded hover:border-[#D4A84F] transition-all duration-300 text-sm font-medium"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0F14] border-t border-[#D4A84F]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full border border-[#D4A84F]/30 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-[#D4A84F]" />
                </div>
                <span className="text-lg font-bold text-[#F5F0E6]">TRINETRA</span>
              </div>
              <p className="text-xs text-[#D4A84F] leading-relaxed">
                Temple Intelligence & Safety Network
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">Secure System</span>
                <span className="text-[8px] text-[#6B7280]">•</span>
                <span className="text-[8px] text-[#38BDF8] tracking-wider uppercase">AI-Powered</span>
                <span className="text-[8px] text-[#6B7280]">•</span>
                <span className="text-[8px] text-[#D4A84F] tracking-wider uppercase">Real-Time</span>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] text-[#D4A84F] tracking-wider uppercase mb-4">Platform</h4>
              <ul className="space-y-2 text-xs text-[#9CA3AF]">
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Crowd Intelligence</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">CCTV Monitoring</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Incident Detection</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Temple Mapping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-[#D4A84F] tracking-wider uppercase mb-4">Intelligence</h4>
              <ul className="space-y-2 text-xs text-[#9CA3AF]">
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">AI Analytics</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Threat Detection</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Risk Forecasting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-[#D4A84F] tracking-wider uppercase mb-4">Security</h4>
              <ul className="space-y-2 text-xs text-[#9CA3AF]">
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Emergency Response</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Security Coordination</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Team Dispatch</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-[#D4A84F] tracking-wider uppercase mb-4">Company</h4>
              <ul className="space-y-2 text-xs text-[#9CA3AF]">
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#F5F0E6] transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#D4A84F]/10 flex flex-col md:flex-row items-center justify-between">
            <p className="text-[10px] text-[#6B7280] tracking-wider">
              © 2026 TRINETRA • Smart VIT Hackathon • SVH26008
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-[8px] text-[#6B7280] flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-[#22C55E]"></span>
                <span>SECURE SYSTEM</span>
              </span>
              <span className="text-[8px] text-[#6B7280] flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-[#38BDF8]"></span>
                <span>AI-POWERED</span>
              </span>
              <span className="text-[8px] text-[#6B7280] flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D4A84F]"></span>
                <span>REAL-TIME</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Add keyframe animation for scanning effect */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          50% { top: 100%; opacity: 0.5; }
          100% { top: 0; opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;