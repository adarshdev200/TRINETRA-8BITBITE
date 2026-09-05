// src/pages/NotFound.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  AlertCircle, 
  Shield, 
  Wifi, 
  Radio, 
  Activity,
  Eye,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const NotFound = () => {
  const [pulseState, setPulseState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseState(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#080A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0F] via-[#0D1118] to-[#080A0F]"></div>
        
        {/* Subtle red/amber glow for error state */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#EF4444]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#E6A23C]/3 rounded-full blur-3xl"></div>
        
        {/* Faint grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #E6A23C 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Temple-inspired geometric pattern */}
        <div className="absolute inset-0 opacity-[0.01]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 800'%3E%3Cpath d='M500 50L50 750h900L500 50z' fill='%23E6A23C' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-[#080A0F]/50"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Temple-inspired framing - Top */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#E6A23C]/30 to-transparent"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#E6A23C]/20"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#E6A23C]/30 to-transparent"></div>
          </div>
        </div>

        {/* System Status Label */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-2 mb-8"
        >
          <div className="flex items-center space-x-2 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-full bg-[#0D1118]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6A23C] animate-pulse"></span>
            <span className="text-[8px] text-[#E6A23C] tracking-[0.15em] uppercase font-medium">TRINETRA Security Network</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2 py-1 border border-[#EF4444]/20 rounded-full bg-[#EF4444]/5">
            <span className="w-1 h-1 rounded-full bg-[#EF4444] animate-pulse"></span>
            <span className="text-[6px] text-[#EF4444] tracking-wider uppercase">Sector Unavailable</span>
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-4"
        >
          <h1 className="text-8xl lg:text-9xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-[#F5F5F0] via-[#F5F5F0] to-[#E6A23C]/50 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          {/* Subtle glow behind 404 */}
          <div className="absolute -inset-20 bg-[#E6A23C]/5 rounded-full blur-3xl -z-10"></div>
        </motion.div>

        {/* Decorative line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-gradient-to-r from-transparent via-[#E6A23C]/40 to-transparent mx-auto mb-6"
        ></motion.div>

        {/* Error Icon with Security Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            {/* Outer ring */}
            <div className="w-24 h-24 rounded-full border-2 border-[#EF4444]/20 flex items-center justify-center">
              {/* Middle ring */}
              <div className="w-20 h-20 rounded-full border border-[#EF4444]/10 flex items-center justify-center">
                {/* Inner ring */}
                <div className="w-16 h-16 rounded-full bg-[#EF4444]/5 border border-[#EF4444]/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
                </div>
              </div>
            </div>
            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#E6A23C]/20"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#E6A23C]/20"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#E6A23C]/20"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#E6A23C]/20"></div>
            {/* Pulse ring */}
            <div className={`absolute -inset-2 rounded-full border border-[#EF4444]/20 animate-pulse opacity-${pulseState === 0 ? '100' : '30'}`}></div>
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3 mb-6"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0]">SECTOR NOT FOUND</h2>
          <p className="text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
            The requested location could not be found within the TRINETRA security network.
          </p>
        </motion.div>

        {/* System Diagnostic Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#0D1118] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 max-w-sm mx-auto mb-8"
        >
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-[rgba(255,255,255,0.06)]">
            <Activity className="w-3 h-3 text-[#9CA3AF]" />
            <span className="text-[8px] text-[#9CA3AF] tracking-wider uppercase font-mono">System Diagnostic</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF] font-mono">REQUEST STATUS</span>
              <span className="text-[#EF4444] font-mono font-bold flex items-center space-x-1">
                <XCircle className="w-3 h-3" />
                <span>FAILED</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF] font-mono">SECTOR</span>
              <span className="text-[#9CA3AF] font-mono">UNKNOWN</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF] font-mono">NETWORK STATUS</span>
              <span className="text-[#22C55E] font-mono font-bold flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>OPERATIONAL</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF] font-mono">SECURITY CORE</span>
              <span className="text-[#22C55E] font-mono font-bold flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>ACTIVE</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          <Link to="/dashboard">
            <Button 
              className="group bg-[#0D1118] border-2 border-[#E6A23C]/30 text-[#E6A23C] hover:bg-[#E6A23C] hover:text-[#080A0F] hover:border-[#E6A23C] hover:shadow-lg hover:shadow-[#E6A23C]/20 transition-all duration-300 px-6 py-3 rounded-xl text-sm font-medium"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span>Return to Command Center</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>

          <p className="text-[10px] text-[#9CA3AF]/50">
            or return to the previous sector
          </p>
        </motion.div>

        {/* Temple-inspired framing - Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#E6A23C]/20 to-transparent"></div>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 rounded-full bg-[#E6A23C]/10"></div>
              <div className="w-1 h-1 rounded-full bg-[#E6A23C]/20"></div>
              <div className="w-1 h-1 rounded-full bg-[#E6A23C]/10"></div>
            </div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#E6A23C]/20 to-transparent"></div>
          </div>
        </motion.div>

        {/* Footer status */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center justify-center space-x-4 text-[8px] text-[#9CA3AF]"
        >
          <span className="flex items-center space-x-1.5">
            <Radio className="w-3 h-3 text-[#22C55E]" />
            <span>System Online</span>
          </span>
          <span className="w-px h-3 bg-[rgba(255,255,255,0.08)]"></span>
          <span className="flex items-center space-x-1.5">
            <Wifi className="w-3 h-3 text-[#E6A23C]" />
            <span>AI Engine Active</span>
          </span>
          <span className="w-px h-3 bg-[rgba(255,255,255,0.08)]"></span>
          <span className="flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-[#22C55E]" />
            <span>Security Core: Active</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;