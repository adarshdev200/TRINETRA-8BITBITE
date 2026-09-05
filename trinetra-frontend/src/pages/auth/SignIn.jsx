// src/pages/auth/SignIn.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Fingerprint,
  Camera,
  Users,
  Activity,
  Wifi,
  Radio,
  Eye as EyeIcon
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Navbar } from "../../components/Navbar";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Pre-fill with demo credentials
  const fillDemoCredentials = () => {
    setEmail("admin@trinetra.com");
    setPassword("admin123");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      await login(email, password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080A0D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D] via-[#0D1117] to-[#080A0D]"></div>
        
        {/* Temple silhouette */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cpath d='M600 50L100 750h1000L600 50z' fill='%23D4A72C'/%3E%3Cpath d='M600 150L200 750h800L600 150z' fill='%23D4A72C' opacity='0.7'/%3E%3Cpath d='M600 250L300 750h600L600 250z' fill='%23D4A72C' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        
        {/* Subtle gold glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A72C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#D4A72C]/3 rounded-full blur-3xl"></div>
        
        {/* Mandala/geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #D4A72C 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Gold architectural lines */}
        <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#D4A72C]/0 via-[#D4A72C]/30 to-[#D4A72C]/0"></div>
        <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-r from-[#D4A72C]/0 via-[#D4A72C]/30 to-[#D4A72C]/0"></div>
        <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-[#D4A72C]/0 via-[#D4A72C]/30 to-[#D4A72C]/0"></div>
        <div className="absolute bottom-0 left-0 w-px h-32 bg-gradient-to-b from-[#D4A72C]/0 via-[#D4A72C]/30 to-[#D4A72C]/0"></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 min-h-[600px] pt-16">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-between p-8 relative">
          {/* Top Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 border border-[#D4A72C]/20 rounded-full bg-[#D4A72C]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35C98A] animate-pulse"></span>
                <span className="text-[8px] text-[#D4A72C] tracking-[0.15em] uppercase font-medium">Security Network — Online</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35C98A]"></span>
              <span className="text-[8px] text-[#8B929D] tracking-wider uppercase">System Operational</span>
            </div>
          </div>

          {/* Main Branding */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-[#F5F1E8]">THE THIRD EYE</span>
                <br />
                <span className="text-[#D4A72C]">OF TEMPLE SAFETY</span>
              </h1>
              <p className="text-[#8B929D] mt-4 max-w-sm leading-relaxed text-sm">
                AI-powered intelligence for safer temples, smarter crowd management, 
                and faster emergency response.
              </p>
            </div>

            {/* Third Eye Emblem */}
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-2 border-[#D4A72C]/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 border-2 border-[#D4A72C]/30 rounded-full"></div>
              <div className="absolute inset-8 border-2 border-[#D4A72C]/40 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img src="/trinetra-icon.png" alt="TRINETRA" className="w-16 h-16 object-contain" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4A72C] animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#35C98A] animate-pulse delay-300"></div>
                </div>
              </div>
              {/* HUD rings */}
              <div className="absolute -top-4 -right-4 w-6 h-6 border-l-2 border-t-2 border-[#D4A72C]/20 rounded-tl"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-r-2 border-b-2 border-[#D4A72C]/20 rounded-br"></div>
              <div className="absolute top-1/2 -right-6 w-px h-8 bg-gradient-to-b from-[#D4A72C]/0 via-[#D4A72C]/30 to-[#D4A72C]/0"></div>
              <div className="absolute top-1/2 -left-6 w-px h-8 bg-gradient-to-b from-[#D4A72C]/0 via-[#D4A72C]/30 to-[#D4A72C]/0"></div>
            </div>

            {/* Security Intelligence Panel */}
            <div className="bg-[#0D1117]/80 border border-[#D4A72C]/10 rounded-xl p-4 max-w-sm backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Wifi, label: 'AI Engine', status: 'online' },
                  { icon: Camera, label: 'CCTV Network', status: 'online' },
                  { icon: Activity, label: 'Crowd Analytics', status: 'active' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <item.icon className="w-4 h-4 text-[#D4A72C] mx-auto mb-1" />
                    <p className="text-[7px] text-[#8B929D] tracking-wider uppercase">{item.label}</p>
                    <div className="flex items-center justify-center space-x-1 mt-0.5">
                      <span className={`w-1 h-1 rounded-full ${
                        item.status === 'online' ? 'bg-[#35C98A]' : 'bg-[#E05252]'
                      } animate-pulse`}></span>
                      <span className="text-[6px] text-[#8B929D] uppercase">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="space-y-2">
            <p className="text-[8px] text-[#8B929D] tracking-wider uppercase">
              TRINETRA • Tracking & Risk Intelligence Network for Emergency Threat Recognition & Analytics
            </p>
            <p className="text-[8px] text-[#D4A72C]/50 tracking-wider">
              SVH26008 • Heritage & Culture
            </p>
          </div>
        </div>

        {/* Right Side - Login Panel */}
        <div className="bg-[#11161D] rounded-2xl border border-[#D4A72C]/20 p-8 shadow-2xl shadow-black/50 relative overflow-hidden">
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A72C]/5 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Decorative corner lines */}
          <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#D4A72C]/10 rounded-tr"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#D4A72C]/10 rounded-bl"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-4 h-4 text-[#D4A72C]" />
              <span className="text-[10px] text-[#D4A72C] tracking-[0.15em] uppercase font-medium">Secure Command Access</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#F5F1E8]">Welcome back</h2>
              <p className="text-sm text-[#8B929D] mt-1">
                Sign in to access the TRINETRA security command center.
              </p>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="bg-[#35C98A]/10 border border-[#35C98A]/30 text-[#35C98A] text-sm p-3 rounded-xl flex items-center space-x-2 mb-4">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>✓ Authentication Verified — Entering command center…</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-[#E05252]/10 border border-[#E05252]/30 text-[#E05252] text-sm p-3 rounded-xl flex items-start space-x-2 mb-4">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-[10px] font-medium text-[#8B929D] tracking-wider uppercase mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B929D] group-focus-within:text-[#D4A72C] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0D11] text-[#F5F1E8] rounded-xl pl-10 pr-4 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all placeholder:text-[#4A5058] outline-none"
                    placeholder="admin@trinetra.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] font-medium text-[#8B929D] tracking-wider uppercase">
                    Password
                  </label>
                  <button 
                    type="button"
                    className="text-[10px] text-[#D4A72C] hover:text-[#F2C94C] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B929D] group-focus-within:text-[#D4A72C] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0A0D11] text-[#F5F1E8] rounded-xl pl-10 pr-12 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all placeholder:text-[#4A5058] outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B929D] hover:text-[#F5F1E8] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Demo Creds */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D4A72C]/30 bg-[#0A0D11] text-[#D4A72C] focus:ring-[#D4A72C] focus:ring-offset-0 focus:ring-offset-[#11161D]"
                  />
                  <span className="text-xs text-[#8B929D] group-hover:text-[#F5F1E8] transition-colors">Remember this device</span>
                </label>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-xs text-[#D4A72C] hover:text-[#F2C94C] transition-colors flex items-center space-x-1"
                >
                  <span>Demo Access</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#9F7A20] to-[#D4A72C] text-[#080A0D] font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#D4A72C]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm tracking-wide"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Access Command Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials Panel */}
            <div className="mt-4 p-3 bg-[#0A0D11] rounded-xl border border-[#D4A72C]/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#8B929D] tracking-wider uppercase">Demo Access</span>
                <span className="text-[8px] text-[#D4A72C]/50">Sandbox Environment</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-[#8B929D]">admin@trinetra.com</span>
                <span className="text-[#8B929D]">••••••••</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#D4A72C]/10"></div>
                <span className="text-[8px] text-[#8B929D] uppercase tracking-wider">or continue with</span>
                <div className="flex-1 h-px bg-[#D4A72C]/10"></div>
              </div>
              <div className="flex items-center justify-center space-x-3 mt-4">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#0D1117] text-[#8B929D] rounded-xl hover:border-[#D4A72C] transition-all border border-[#D4A72C]/10 hover:text-[#F5F1E8]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.93-4.2 2.93-7.39z"/>
                    <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.55 0-4.71-1.72-5.49-4.04H3.27v2.5A9.74 9.74 0 0 0 12 21.5z"/>
                    <path fill="#FBBC05" d="M6.51 13.61A5.85 5.85 0 0 1 6.2 12c0-.56.1-1.1.31-1.61V7.89H3.27A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.11l3.24-2.5z"/>
                    <path fill="#EA4335" d="M12 6.35c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.73 5.39l3.24 2.5C7.29 8.07 9.45 6.35 12 6.35z"/>
                  </svg>
                  <span className="text-xs hidden sm:inline">Google</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#0D1117] text-[#8B929D] rounded-xl hover:border-[#D4A72C] transition-all border border-[#D4A72C]/10 hover:text-[#F5F1E8]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.18 9.18 0 0 1 12 7.07c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.28 10.28 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
                  </svg>
                  <span className="text-xs hidden sm:inline">GitHub</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#0D1117] text-[#8B929D] rounded-xl hover:border-[#D4A72C] transition-all border border-[#D4A72C]/10 hover:text-[#F5F1E8]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2zm-1.1 17.9h1.73L8.28 4.02H6.42L17.8 19.9z"/>
                  </svg>
                  <span className="text-xs hidden sm:inline">Twitter</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-[#8B929D]">
                New to TRINETRA?{' '}
                <Link to="/signup" className="text-[#D4A72C] hover:text-[#F2C94C] font-medium transition-colors">
                  Create secure account →
                </Link>
              </p>
            </div>
          </div>
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

export default SignIn;