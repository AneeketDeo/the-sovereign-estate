/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bolt, 
  ShieldCheck, 
  MessageSquare, 
  BrainCircuit, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  UserSearch, 
  Languages, 
  Settings2, 
  LayoutDashboard, 
  Gavel, 
  ArrowRight,
  ChevronRight,
  Smartphone,
  LogOut,
  User,
  X,
  Mail,
  Lock,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '@supabase/supabase-js';

// Supabase Client Initialization
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: { isOpen: boolean; onClose: () => void; onLoginSuccess: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLoginSuccess(data.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline text-2xl font-bold text-primary">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h3>
            <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="bg-error-container/20 text-error p-3 rounded-lg text-sm mb-6 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-on-surface/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-on-surface/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full primary-gradient text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? 'Sign Up' : 'Login')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ user, onLoginClick, onLogout }: { user: any; onLoginClick: () => void; onLogout: () => void }) => (
  <nav className="fixed top-0 w-full z-50 glass-card shadow-sm">
    <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
      <div className="text-xl font-extrabold text-primary tracking-tighter font-headline">
        The Sovereign Estate
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors font-headline" href="#how-it-works">How it Works</a>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors font-headline" href="#compliance">RERA Compliance</a>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors font-headline" href="#why-ai">Why AI?</a>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full border border-on-surface/5">
              <User className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary truncate max-w-[100px]">{user.email}</span>
            </div>
            <button onClick={onLogout} className="text-on-surface-variant hover:text-error transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <button onClick={onLoginClick} className="text-primary font-bold hover:text-secondary transition-colors">Login</button>
            <button className="primary-gradient text-white px-6 py-2.5 rounded-md font-bold text-sm tracking-tight hover:opacity-90 transition-all">
              Get Started
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <header className="relative pt-32 pb-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold mb-6 tracking-wide uppercase">
          <Bolt className="w-3.5 h-3.5" />
          24/7 Agentic Digital Workforce
        </div>
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-6 leading-[1.1]">
          Stop Losing <span className="text-secondary">₹1.2 Crore</span> in Annual Pipeline to "Slow Responses".
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
          Meet your 24/7 Agentic Digital Workforce. We don't just 'capture' leads; we qualify, match, schedule, and handle RERA paperwork in Hindi, Kannada, and English—all while you sleep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="primary-gradient text-white px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all">
            Join the Beta & Shape the Future
          </button>
          <div className="flex items-center gap-3 px-4 py-2 bg-surface-container rounded-lg">
            <ShieldCheck className="text-secondary w-5 h-5" />
            <span className="text-sm font-semibold text-on-surface-variant">RERA & DPDP Compliant</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="bg-primary-container rounded-2xl shadow-2xl p-6 border border-white/10 relative overflow-hidden min-h-[500px] flex flex-col">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border border-white/20">
                <Settings2 className="text-secondary-container w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-headline">Agentic Orchestration Engine</h4>
                <p className="text-[10px] text-secondary-container font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> SYSTEM LIVE: 142 ACTIVE WORKFLOWS
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-white/60">v4.2-LATEST</span>
            </div>
          </div>

          {/* Workflow Visualization */}
          <div className="flex-1 flex flex-col gap-6 relative">
            {/* Node 1: Lead Intake */}
            <div className="node-pulse bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary-container">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Lead Intake</h5>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-secondary-container/30 text-secondary-container font-bold">WHATSAPP/VOICE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-secondary rounded-full"></div>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">100%</span>
                </div>
              </div>
            </div>

            {/* Connection Line 1 */}
            <div className="w-0.5 h-6 bg-white/10 mx-auto relative">
              <div className="absolute inset-0 workflow-line w-full"></div>
            </div>

            {/* Node 2: Autonomous Qualification */}
            <div className="node-pulse bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-primary/40 flex items-center justify-center text-white/60">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Qualification</h5>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">MULTI-LINGUAL</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-secondary"></span> Budget Verified
                  </span>
                  <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-secondary"></span> RERA Cleared
                  </span>
                </div>
              </div>
            </div>

            {/* Connection Line 2 */}
            <div className="w-0.5 h-6 bg-white/10 mx-auto relative">
              <div className="absolute inset-0 workflow-line w-full"></div>
            </div>

            {/* Node 3: Matchmaking */}
            <div className="node-pulse bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container/40 flex items-center justify-center text-secondary-container">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Intelligent Matching</h5>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-tertiary-container/30 text-secondary-container font-bold">LIVE INVENTORY</span>
                </div>
                <p className="text-[10px] text-white/40">Searching Tower B, Units 402-410...</p>
              </div>
            </div>

            {/* Connection Line 3 */}
            <div className="w-0.5 h-6 bg-white/10 mx-auto relative">
              <div className="absolute inset-0 workflow-line w-full"></div>
            </div>

            {/* Node 4: Scheduling */}
            <div className="node-pulse bg-white/10 border-2 border-secondary/30 p-4 rounded-xl flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Auto-Scheduling</h5>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-white text-primary font-bold">SITE VISIT BOOKED</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-white font-medium">Saturday, 2:00 PM</p>
                  <CheckCircle2 className="text-secondary-container w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute bottom-4 right-4 bg-primary p-3 rounded-lg border border-white/10 shadow-2xl">
            <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Success Rate</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-secondary-container font-headline">94.2%</span>
              <span className="text-[8px] text-secondary font-bold">+2.4%</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  </header>
);

const PainPoints = () => (
  <section className="py-24 bg-surface-container/30">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl font-extrabold text-primary mb-4 tracking-tight">The "Leaky Bucket" Crisis</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">Indian real estate moves at the speed of trust and response. If you're using manual systems, your pipeline is bleeding value every minute.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Timer className="w-6 h-6" />, title: "The 15-Hour Delay", desc: "40% of leads vanish if they aren't engaged within the first 5 minutes of inquiry.", color: "bg-error-container text-error" },
          { icon: <UserSearch className="w-6 h-6" />, title: "The Qualification Trap", desc: "80% of your day is wasted on window shoppers who don't have the budget or intent.", color: "bg-primary-container text-white" },
          { icon: <Calendar className="w-6 h-6" />, title: "The Scheduling Mess", desc: "30% of high-intent leads never make it to the site because of manual booking friction.", color: "bg-tertiary-container text-secondary-container" },
          { icon: <Languages className="w-6 h-6" />, title: "Language Drop-offs", desc: "45% of high-value regional leads are lost due to English-only automated bots.", color: "bg-secondary-container text-secondary" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-on-surface/5 group hover:shadow-md transition-all"
          >
            <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-6`}>
              {item.icon}
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-2">{item.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Comparison = () => (
  <section className="py-24" id="why-ai">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="bg-primary rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-12 bg-primary-container border-r border-white/5">
          <h3 className="font-headline text-2xl font-bold text-white mb-8">Why Current Bots Fall Short</h3>
          <ul className="space-y-6">
            {[
              { title: "Static Automation", desc: "Generic WhatsApp bots that follow a rigid script and cannot handle complex real-estate queries." },
              { title: "The \"Black Box\" Problem", desc: "Zero visibility into what the AI is saying, leading to brand damage and compliance risks." },
              { title: "Ignorant of Context", desc: "Doesn't understand RERA nuances or local market trends across different Indian cities." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <XCircle className="text-error w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 p-12 bg-primary">
          <h3 className="font-headline text-2xl font-bold text-secondary-container mb-8">The Sovereign Agentic AI</h3>
          <ul className="space-y-6">
            {[
              { title: "Dynamic Reasoning", desc: "Our AI plans its responses, adapts to regional dialects, and understands buyer psychology." },
              { title: "Human-in-the-Loop", desc: "Seamless handovers to humans for high-stakes negotiations with full transcript context." },
              { title: "Native Compliance", desc: "Pre-trained on RERA & DPDP guidelines to ensure every conversation is legally sound." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="text-secondary w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 bg-surface-container/30" id="how-it-works">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 p-12 rounded-2xl flex flex-col justify-center">
          <h2 className="font-headline text-4xl font-extrabold text-primary mb-6 leading-tight">Agentic AI Orchestration</h2>
          <p className="text-on-surface-variant text-lg">Four core engines that turn your digital footprint into a high-performance closing machine.</p>
        </div>
        {[
          { icon: <Settings2 className="w-8 h-8" />, title: "The 2-Minute Qualifier", desc: "Instant Voice or WhatsApp scoring based on budget, intent, and timeline. Never chase a cold lead again." },
          { icon: <BrainCircuit className="w-8 h-8" />, title: "Intelligent Matchmaker", desc: "Hybrid matching that cross-references lead preferences with your live inventory in real-time." },
          { icon: <Calendar className="w-8 h-8" />, title: "Autonomous Coordinator", desc: "Calendar-synced site visits. The AI checks your team's availability and sends GPS locations to clients." },
          { icon: <Gavel className="w-8 h-8" />, title: "Compliance Guard", desc: "Digital KYC collection & RERA audit trails automatically generated for every transaction." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-on-surface/5">
            <div className="mb-6 text-secondary">
              {item.icon}
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-3">{item.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
        <div className="md:col-span-2 bg-primary-container rounded-2xl overflow-hidden relative min-h-[300px]">
          <img 
            alt="Data visualization dashboard" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" 
            src="https://picsum.photos/seed/realestate-data/1200/600"
            referrerPolicy="no-referrer"
          />
          <div className="relative p-12 flex flex-col justify-end h-full">
            <h4 className="text-white font-bold text-2xl mb-2">Architectural Data Integrity</h4>
            <p className="text-white/60 text-sm">Every data point is tracked, from the first "Hello" to the final registration.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ROI = () => (
  <section className="py-24 bg-primary text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <div className="text-5xl font-extrabold tracking-tighter mb-4 text-secondary-container">3x</div>
          <h3 className="font-headline text-xl font-bold mb-2">More Site Visits</h3>
          <p className="text-white/60 text-sm">Eliminate booking friction and watch your tour numbers skyrocket.</p>
        </div>
        <div className="md:border-x md:border-white/10">
          <div className="text-5xl font-extrabold tracking-tighter mb-4 text-secondary-container">15+</div>
          <h3 className="font-headline text-xl font-bold mb-2">Hours Saved/Week</h3>
          <p className="text-white/60 text-sm">Reclaim your time from administrative follow-ups and qualification.</p>
        </div>
        <div>
          <div className="text-5xl font-extrabold tracking-tighter mb-4 text-secondary-container">99%</div>
          <h3 className="font-headline text-xl font-bold mb-2">Document Accuracy</h3>
          <p className="text-white/60 text-sm">AI-driven RERA checks ensure zero compliance errors in paperwork.</p>
        </div>
      </div>
    </div>
  </section>
);

const Survey = () => {
  const [selected, setSelected] = useState<string>('');
  const [otherFeedback, setOtherFeedback] = useState<string>('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalMessage = selected === 'Others' ? otherFeedback : selected;
    if (!finalMessage || !email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Anonymous', // Could add a name field if needed
          email,
          message: finalMessage,
          role: 'potential_client'
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-secondary-container/10 border border-secondary/20 p-12 rounded-3xl"
          >
            <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="font-headline text-3xl font-extrabold text-primary mb-4">You're on the list!</h2>
            <p className="text-on-surface-variant">Thank you for your feedback. We'll reach out to you at <strong>{email}</strong> soon.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="survey" className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
        <h2 className="font-headline text-4xl font-extrabold text-primary mb-6">Help us build the perfect broker assistant.</h2>
        <p className="text-on-surface-variant mb-12">We are opening early access to select partners. Share your biggest challenge to get priority on the waitlist.</p>
        <form className="space-y-8 text-left" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block font-bold text-primary">What is your #1 bottleneck?</label>
            <div className="grid gap-4">
              {[
                "Lead Speed: Hard to catch leads in real-time",
                "Qualification: Spending too much time on window shoppers",
                "Paperwork/RERA: Manual documentation is slow and risky",
                "Others"
              ].map((option, i) => (
                <label 
                  key={i} 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    selected === option ? 'border-secondary bg-secondary-container/10' : 'border-on-surface/10 hover:bg-surface-container'
                  }`}
                >
                  <input 
                    className="w-5 h-5 text-secondary focus:ring-secondary border-on-surface/20" 
                    name="bottleneck" 
                    type="radio"
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                  />
                  <span className="font-medium">{option}</span>
                </label>
              ))}
            </div>
            {selected === 'Others' && (
              <div className="mt-4 text-left">
                <label className="block font-bold text-primary mb-2">Please share your challenge</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-on-surface/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 min-h-[100px] resize-y"
                  placeholder="Tell us more about your challenges..."
                  value={otherFeedback}
                  onChange={(e) => setOtherFeedback(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-primary">Your Work Email</label>
            <div className="border-b-2 border-on-surface/10 focus-within:border-primary transition-all">
              <input 
                className="w-full bg-transparent py-3 border-none focus:ring-0 placeholder:text-on-surface-variant/50" 
                placeholder="email@company.com" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button 
              type="submit"
              disabled={loading}
              className="primary-gradient text-white px-10 py-4 rounded-md font-bold text-lg w-full sm:w-auto hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Send Feedback & Get Early Access
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="w-full border-t border-on-surface/5 bg-white">
    <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 py-12 w-full max-w-7xl mx-auto">
      <div className="mb-8 md:mb-0">
        <div className="text-lg font-bold text-primary mb-2">The Sovereign Estate</div>
        <p className="text-on-surface-variant text-sm">© 2026 Sovereign Estate AI. RERA & DPDP Compliant.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm" href="#">Privacy Policy</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm" href="#">Terms of Service</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm" href="#">Security</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm font-semibold" href="#">RERA Badge</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm font-semibold" href="#">DPDP Certified</a>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => {
  const scrollToSurvey = () => {
    document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <motion.button 
        onClick={scrollToSurvey}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white glass-card p-4 rounded-full shadow-2xl flex items-center gap-3 group"
      >
        <span className="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
        <span className="font-bold text-sm text-primary pr-2">Vote on features</span>
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
          <MessageSquare className="w-6 h-6 fill-current" />
        </div>
      </motion.button>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout} 
      />
      <Hero />
      <PainPoints />
      <Comparison />
      <Features />
      <ROI />
      <Survey />
      <Footer />
      <WhatsAppButton />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={setUser}
      />
    </div>
  );
}
