// src/pages/auth/SignUp.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Building2,
  UserCheck,
  Fingerprint,
  Eye as EyeIcon,
  Wifi,
  Camera,
  Activity,
  Radio,
  Network,
  Users,
  Zap,
  Clock,
  Target
} from "lucide-react";
import { Navbar } from "../../components/Navbar";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "operator",
    department: "Control Room"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Password strength checker
  useEffect(() => {
    const pass = formData.password;
    if (!pass) {
      setPasswordStrength(0);
      return;
    }
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 10) strength++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    setPasswordStrength(Math.min(strength, 4));
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    setLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      // Simulate API call - for now just show success
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "operator", label: "Control Room Operator" },
    { value: "security", label: "Security Personnel" },
    { value: "viewer", label: "Viewer" }
  ];

  const departments = [
    "Control Room",
    "Security",
    "Emergency Response",
    "Administration",
    "IT & Infrastructure"
  ];

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-[#4A5058]";
    if (passwordStrength === 1) return "bg-[#E05252]";
    if (passwordStrength === 2) return "bg-[#F59E0B]";
    if (passwordStrength === 3) return "bg-[#D4A72C]";
    return "bg-[#35C98A]";
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return "None";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Moderate";
    if (passwordStrength === 3) return "Strong";
    return "Very Strong";
  };

  const passwordsMatch = formData.password && formData.confirmPassword && 
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-[#07090C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090C] via-[#0B0F14] to-[#07090C]"></div>
        
        {/* Temple silhouette */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cpath d='M600 50L100 750h1000L600 50z' fill='%23D4A72C'/%3E%3Cpath d='M600 150L200 750h800L600 150z' fill='%23D4A72C' opacity='0.7'/%3E%3Cpath d='M600 250L300 750h600L600 250z' fill='%23D4A72C' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        
        {/* Subtle gold glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A72C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#D4A72C]/3 rounded-full blur-3xl"></div>
        
        {/* Mandala/geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #D4A72C 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Gold architectural lines */}
        <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#D4A72C]/0 via-[#D4A72C]/20 to-[#D4A72C]/0"></div>
        <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-r from-[#D4A72C]/0 via-[#D4A72C]/20 to-[#D4A72C]/0"></div>
        <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-[#D4A72C]/0 via-[#D4A72C]/20 to-[#D4A72C]/0"></div>
        <div className="absolute bottom-0 left-0 w-px h-32 bg-gradient-to-b from-[#D4A72C]/0 via-[#D4A72C]/20 to-[#D4A72C]/0"></div>
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
              <span className="text-[8px] text-[#8A929D] tracking-wider uppercase">System Ready</span>
            </div>
          </div>

          {/* Main Branding */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
                <span className="text-[#F4F0E7]">JOIN THE</span>
                <br />
                <span className="text-[#D4A72C]">TRINETRA NETWORK</span>
              </h2>
              <p className="text-[#8A929D] mt-4 max-w-sm leading-relaxed text-sm">
                Become part of the intelligence network protecting temples, pilgrims, 
                and heritage sites through AI-powered security.
              </p>
            </div>

            {/* HUD Centerpiece */}
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 border-2 border-[#D4A72C]/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 border-2 border-[#D4A72C]/30 rounded-full animate-spin-slow-reverse"></div>
              <div className="absolute inset-8 border-2 border-[#D4A72C]/40 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img src="/trinetra-icon.png" alt="TRINETRA" className="w-16 h-16 object-contain" />
                  <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-[#D4A72C] animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-[#35C98A] animate-pulse delay-300"></div>
                </div>
              </div>
              
              {/* HUD annotations */}
              <div className="absolute -top-6 -right-8 text-[6px] text-[#D4A72C] tracking-wider uppercase font-mono">AI Engine</div>
              <div className="absolute -bottom-6 -left-8 text-[6px] text-[#D4A72C] tracking-wider uppercase font-mono">CCTV</div>
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 text-[6px] text-[#D4A72C] tracking-wider uppercase font-mono">Crowd AI</div>
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 text-[6px] text-[#D4A72C] tracking-wider uppercase font-mono">Threat Detection</div>
            </div>

            {/* Network Status Panel */}
            <div className="bg-[#0B0F14]/80 border border-[#D4A72C]/10 rounded-xl p-4 max-w-sm backdrop-blur-sm">
              <p className="text-[8px] text-[#8A929D] tracking-wider uppercase mb-2 font-mono">Network Status</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'AI Engine', status: 'Online', icon: Wifi },
                  { label: 'CCTV Network', status: 'Connected', icon: Camera },
                  { label: 'Crowd Analytics', status: 'Active', icon: Activity },
                  { label: 'Emergency Response', status: 'Ready', icon: Radio },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <item.icon className="w-3 h-3 text-[#D4A72C]" />
                    <span className="text-[7px] text-[#8A929D] font-mono">{item.label}</span>
                    <span className={`text-[7px] font-mono ${
                      item.status === 'Online' || item.status === 'Active' || item.status === 'Ready' 
                        ? 'text-[#35C98A]' 
                        : 'text-[#E05252]'
                    }`}>
                      ● {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Target, title: 'Intelligence', desc: 'Real-time crowd analytics and AI-powered threat detection.' },
                { icon: Zap, title: 'Response', desc: 'Coordinate emergency teams and respond to incidents faster.' },
                { icon: Shield, title: 'Protection', desc: 'Help protect devotees and preserve temple heritage.' },
              ].map((benefit, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex items-center space-x-2 mb-1">
                    <benefit.icon className="w-3 h-3 text-[#D4A72C] group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] text-[#F4F0E7] font-medium tracking-wider uppercase">{benefit.title}</span>
                  </div>
                  <p className="text-[7px] text-[#8A929D] leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="space-y-1">
            <p className="text-[7px] text-[#8A929D] tracking-wider uppercase">
              TRINETRA • Tracking & Risk Intelligence Network for Emergency Threat Recognition & Analytics
            </p>
            <p className="text-[7px] text-[#D4A72C]/50 tracking-wider">
              SVH26008 • Heritage & Culture
            </p>
          </div>
        </div>

        {/* Right Side - Registration Terminal */}
        <div className="bg-[#11161D] rounded-2xl border border-[#D4A72C]/20 p-8 shadow-2xl shadow-black/50 relative overflow-hidden">
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A72C]/5 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Decorative corner lines */}
          <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#D4A72C]/10 rounded-tr"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#D4A72C]/10 rounded-bl"></div>

          <div className="relative z-10 max-h-[85vh] overflow-y-auto pr-1">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-4 h-4 text-[#D4A72C]" />
              <span className="text-[10px] text-[#D4A72C] tracking-[0.15em] uppercase font-medium">Secure Registration</span>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#F4F0E7]">Create your access</h2>
              <p className="text-sm text-[#8A929D] mt-1">
                Register for the TRINETRA security intelligence network.
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center space-x-4 mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-mono font-bold transition-all ${
                    step === activeStep 
                      ? 'border-[#D4A72C] text-[#D4A72C] bg-[#D4A72C]/10' 
                      : 'border-[#4A5058] text-[#4A5058]'
                  }`}>
                    {String(step).padStart(2, '0')}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-px ${
                      step < activeStep ? 'bg-[#D4A72C]' : 'bg-[#4A5058]'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="bg-[#35C98A]/10 border border-[#35C98A]/30 text-[#35C98A] text-sm p-3 rounded-xl flex items-center space-x-2 mb-4">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>✓ Registration Verified — Account created. Redirecting to secure login…</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-[#E05252]/10 border border-[#E05252]/30 text-[#E05252] text-sm p-3 rounded-xl flex items-start space-x-2 mb-4">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div>
                <label className="block text-[10px] font-medium text-[#8A929D] tracking-wider uppercase mb-2">
                  Operator Identity
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A929D] group-focus-within:text-[#D4A72C] transition-colors" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-[#0A0D11] text-[#F4F0E7] rounded-xl pl-10 pr-4 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all placeholder:text-[#4A5058] outline-none"
                    placeholder="Choose your username"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[10px] font-medium text-[#8A929D] tracking-wider uppercase mb-2">
                  Official Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A929D] group-focus-within:text-[#D4A72C] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0A0D11] text-[#F4F0E7] rounded-xl pl-10 pr-4 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all placeholder:text-[#4A5058] outline-none"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Role & Department */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-medium text-[#8A929D] tracking-wider uppercase mb-2">
                    Command Role
                  </label>
                  <div className="relative group">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A929D]" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full bg-[#0A0D11] text-[#F4F0E7] rounded-xl pl-9 pr-4 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all appearance-none outline-none"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[#8A929D] tracking-wider uppercase mb-2">
                    Department
                  </label>
                  <div className="relative group">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A929D]" />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full bg-[#0A0D11] text-[#F4F0E7] rounded-xl pl-9 pr-4 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all appearance-none outline-none"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[10px] font-medium text-[#8A929D] tracking-wider uppercase mb-2">
                  Security Key
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A929D] group-focus-within:text-[#D4A72C] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#0A0D11] text-[#F4F0E7] rounded-xl pl-10 pr-12 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all placeholder:text-[#4A5058] outline-none"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A929D] hover:text-[#F4F0E7] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-1 bg-[#4A5058] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${getStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        />
                      </div>
                      <span className={`text-[8px] font-mono ${
                        passwordStrength === 0 ? 'text-[#4A5058]' :
                        passwordStrength === 1 ? 'text-[#E05252]' :
                        passwordStrength === 2 ? 'text-[#F59E0B]' :
                        passwordStrength === 3 ? 'text-[#D4A72C]' :
                        'text-[#35C98A]'
                      }`}>
                        {getStrengthLabel()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-[10px] font-medium text-[#8A929D] tracking-wider uppercase mb-2">
                  Verify Security Key
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A929D] group-focus-within:text-[#D4A72C] transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#0A0D11] text-[#F4F0E7] rounded-xl pl-10 pr-12 py-3 border border-[#D4A72C]/10 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C]/30 transition-all placeholder:text-[#4A5058] outline-none"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A929D] hover:text-[#F4F0E7] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="mt-1 flex items-center space-x-2">
                    {passwordsMatch ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-[#35C98A]" />
                        <span className="text-[8px] text-[#35C98A] font-mono">✓ Passwords match</span>
                      </>
                    ) : (
                      <span className="text-[8px] text-[#E05252] font-mono">✗ Passwords do not match</span>
                    )}
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D4A72C]/30 bg-[#0A0D11] text-[#D4A72C] focus:ring-[#D4A72C] focus:ring-offset-0 focus:ring-offset-[#11161D] mt-0.5"
                />
                <label className="text-xs text-[#8A929D]">
                  I agree to the{' '}
                  <Link to="#" className="text-[#D4A72C] hover:text-[#F2C94C] transition-colors">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="#" className="text-[#D4A72C] hover:text-[#F2C94C] transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#9F7A20] to-[#D4A72C] text-[#07090C] font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#D4A72C]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm tracking-wide group"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Initializing Access...</span>
                  </>
                ) : (
                  <>
                    <span>Request Secure Access</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-4">
              <p className="text-sm text-[#8A929D]">
                Already have command access?{' '}
                <Link to="/signin" className="text-[#D4A72C] hover:text-[#F2C94C] font-medium transition-colors">
                  Sign In →
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
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUp;