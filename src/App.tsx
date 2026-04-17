import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  ShieldCheck,
  FileText,
  Zap,
  Globe,
  Lock,
  Cpu,
  Layers,
  Twitter,
  Linkedin,
} from 'lucide-react';

// Logo Component
const Logo = ({ className = 'w-7 h-7', fill = 'white' }) => (
  <svg
    className={className}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M128 32C73.3 32 32 73.3 32 128s41.3 96 96 96 96-41.3 96-96S182.7 32 128 32zm0 160c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
      fill={fill}
      opacity="0.3"
    />
    <circle cx="128" cy="128" r="48" fill={fill} />
    <circle cx="128" cy="128" r="24" fill="white" opacity="0.5" />
  </svg>
);

function App() {
  // Refs for scroll-tied videos
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const combinedVideoRef = useRef<HTMLVideoElement>(null);
  const combinedSectionRef = useRef<HTMLDivElement>(null);

  // Scroll-based video playback logic
  useEffect(() => {
    const videos = [
      { video: videoRef.current, section: sectionRef.current },
      { video: combinedVideoRef.current, section: combinedSectionRef.current },
    ];

    const handleScroll = () => {
      videos.forEach(({ video, section }) => {
        if (!video || !section || video.duration <= 0) return;

        const rect = section.getBoundingClientRect();
        const progress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

        const clampedProgress = Math.max(0, Math.min(1, progress));

        if (!video.seeking) {
          video.currentTime = video.duration * clampedProgress;
        }
      });
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const icons = [Cpu, Layers, Zap, Globe, Lock];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* A. Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
        <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150">
              Services
            </a>
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150">
              How It Works
            </a>
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150">
              About Us
            </a>
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150">
              Pricing
            </a>
          </div>
          <button className="gradient-border-btn text-sm font-semibold text-white rounded-full px-5 py-2 hover:opacity-90">
            Get started
          </button>
        </div>
      </nav>

      {/* B. Hero Section */}
      <main className="relative flex flex-col items-center justify-start px-6 pt-[140px] text-center min-h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            style={{
              pointerEvents: 'none',
              opacity: 1,
              transform: 'scale(1.5) translateY(25%) rotate(36deg)',
            }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKV.../hero.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Fade Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10" />

        {/* Content Wrap */}
        <div className="relative z-20 flex flex-col items-center">
          <h1 className="animate-float-up text-[60px] leading-[1.05] tracking-[-0.04em] font-semibold text-white max-w-[700px]">
            <span className="text-zinc-500">A New Way</span>
            <br />
            to Manage Your
            <br />
            Digital Wealth
          </h1>

          <p className="animate-float-up-delay mt-8 text-lg text-zinc-400 max-w-[420px] leading-relaxed">
            Take full control of your crypto assets with our comprehensive portfolio management platform.
          </p>

          {/* Floating Badge */}
          <div className="animate-float-up-delay-3 mt-16 bg-zinc-900/80 backdrop-blur-xl rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-zinc-800 px-6 py-4 flex items-center gap-4">
            <Logo />
            <span className="text-sm font-medium text-zinc-200 whitespace-nowrap">
              Your All-in-One Crypto Portfolio
            </span>
            <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <circle
                cx="14"
                cy="14"
                r="12"
                stroke="#3f3f46"
                strokeWidth="3"
                fill="none"
              />
              <path
                className="spin-ring"
                d="M14 2 A12 12 0 0 1 26 14"
                stroke="url(#spinnerGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </main>

      {/* C. Data / Stats Grid */}
      <section className="relative z-20 bg-black border-y border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4">
          <div className="p-12 border-zinc-800 flex flex-col gap-4 border-b md:border-b-0 md:border-r">
            <div className="text-5xl font-semibold tracking-tight">12+</div>
            <div className="text-sm text-zinc-500 uppercase tracking-widest">Assets supported</div>
          </div>
          <div className="p-12 border-zinc-800 flex flex-col gap-4 border-b md:border-b-0 md:border-r">
            <div className="text-5xl font-semibold tracking-tight">1,000+</div>
            <div className="text-sm text-zinc-500 uppercase tracking-widest">Active portfolios</div>
          </div>
          <div className="p-12 border-zinc-800 flex flex-col gap-4 border-b md:border-b-0 md:border-r">
            <div className="text-5xl font-semibold tracking-tight">$10b</div>
            <div className="text-sm text-zinc-500 uppercase tracking-widest">Volume processed</div>
          </div>
          <div className="p-12 border-zinc-800 flex flex-col gap-4 border-b md:border-b-0">
            <div className="text-5xl font-semibold tracking-tight">20+</div>
            <div className="text-sm text-zinc-500 uppercase tracking-widest">Countries covered</div>
          </div>
        </div>
        <div className="py-6 border-t border-zinc-800 text-center">
          <div className="text-xs text-zinc-600 uppercase tracking-[0.3em]">Trusted by crypto's leading teams</div>
        </div>
      </section>

      {/* D. Feature Block */}
      <section className="relative z-20 py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side - Text */}
          <div className="flex flex-col">
            <h2 className="text-[60px] leading-[1.05] tracking-[-0.04em] font-semibold mb-8">
              Master your <br />
              <span className="text-zinc-500">digital assets</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-md leading-relaxed mb-10">
              Our advanced algorithms provide deep insights into your portfolio performance, helping you make smarter investment decisions.
            </p>
            <button className="gradient-border-btn px-8 py-3 font-semibold text-white rounded-full hover:opacity-90">
              Explore Analytics
            </button>
          </div>

          {/* Right Side - Immersive Video Card */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl aspect-[3/4]">
              <video
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKV.../feature.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* E. Scroll-Tied Product/Wealth Section */}
      <section
        ref={sectionRef}
        className="relative flex flex-col items-start justify-end px-6 py-40 text-left bg-black border-t border-zinc-900 mt-[-200px] overflow-hidden min-h-[1100px]"
      >
        {/* Background Video Package */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-top opacity-60"
            playsInline
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKV.../wealth.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black via-black/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        </div>

        {/* Floating Text Content */}
        <div className="relative z-20 flex flex-col items-start mb-20 max-w-7xl mx-auto w-full">
          <h2 className="animate-float-up text-[80px] leading-[1] tracking-[-0.05em] font-semibold text-white max-w-[900px]">
            Where wealth <br />
            takes shape
          </h2>
          <p className="animate-float-up-delay mt-10 text-lg text-zinc-400 max-w-md leading-relaxed">
            Transform your digital assets into a thriving portfolio with our intelligent automation and real-time insights.
          </p>
          <button className="animate-float-up-delay-3 mt-14 bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
            Get in touch
          </button>
        </div>
      </section>

      {/* F. Animated Bento Feature Grid */}
      <section className="relative z-20 py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Icon Row */}
          <div className="flex justify-center gap-8 mb-12">
            {icons.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-14 h-14 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              >
                <Icon className="w-6 h-6" />
              </motion.div>
            ))}
          </div>

          {/* Centered Header */}
          <div className="text-center mb-24">
            <h2 className="text-[60px] leading-[1.05] tracking-[-0.04em] font-semibold">
              Built for the <span className="text-zinc-500">future</span>
            </h2>
          </div>

          {/* Dynamic CSS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[40px] p-12 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-500 shadow-2xl overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 z-0">
                <video
                  className="opacity-100 transition-opacity duration-500 w-full h-full object-cover object-top"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKV.../card1.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
              </div>
              <div className="relative z-20">
                <h3 className="text-4xl font-semibold mb-6 tracking-tight text-white">
                  Real-time <br />
                  Analytics
                </h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Monitor every transaction and movement across multiple chains in a single, unified interface.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[40px] p-12 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-500 shadow-2xl overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 z-0">
                <video
                  className="opacity-100 transition-opacity duration-500 w-full h-full object-cover object-center"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKV.../card2.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
              </div>
              <div className="relative z-20">
                <h3 className="text-4xl font-semibold mb-6 tracking-tight text-white">
                  Smart <br />
                  Security
                </h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Enterprise-grade protection for your digital assets with multi-signature support and cold storage.
                </p>
              </div>
            </div>

            {/* Card 3 - Spans 2 columns */}
            <div className="relative md:col-span-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[40px] p-12 md:flex-row gap-12 items-center group hover:border-zinc-700 transition-all duration-500 shadow-2xl overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 z-0">
                <video
                  className="opacity-100 transition-opacity duration-500 w-full h-full object-cover object-bottom"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKV.../card3.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
              </div>
              <div className="relative z-20 flex-1">
                <h3 className="text-4xl font-semibold mb-6 tracking-tight text-white">
                  Automated Reporting
                </h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Generate tax-ready reports and performance audits with a single click. Stay compliant across all jurisdictions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* G. Seamless Fusion Phase: Combined CTA & Footer */}
      <section ref={combinedSectionRef} className="relative z-20 bg-black overflow-hidden">
        {/* Shared Background Video Structure */}
        <div className="absolute inset-0 z-0">
          <video
            ref={combinedVideoRef}
            className="w-full h-full object-cover opacity-30"
            playsInline
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKV.../footer.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        </div>

        {/* CTA Block Zone */}
        <div className="relative z-20 py-48 text-center">
          <div className="max-w-5xl mx-auto px-6">
            {/* Floating Logo */}
            <div className="animate-float-up mb-16 inline-flex">
              <div className="w-20 h-20 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[24px] shadow-2xl flex items-center justify-center">
                <Logo className="w-10 h-10" />
              </div>
            </div>

            <h2 className="animate-float-up text-[80px] leading-[1] tracking-[-0.05em] font-semibold mb-10 text-white">
              Ready to scale your <br />
              <span className="text-white">digital wealth?</span>
            </h2>

            <p className="animate-float-up-delay text-xl text-zinc-400 mb-16 max-w-2xl mx-auto leading-relaxed">
              Join thousands of investors who trust our platform to manage, grow, and protect their crypto assets.
            </p>

            <div className="animate-float-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-8">
              <button className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                Get Started Now
              </button>
              <button className="border border-zinc-800 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Footer Block Zone */}
        <footer className="relative z-20 py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Top Layout */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
              {/* Left Col */}
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="flex items-center gap-3">
                  <Logo className="w-8 h-8" />
                  <span className="text-2xl font-semibold tracking-tighter">CRYPTOFLOW</span>
                </div>
                <p className="text-zinc-500 max-w-xs leading-relaxed text-center lg:text-left">
                  Your trusted partner in crypto portfolio management. Secure, intelligent, and built for the future.
                </p>
              </div>

              {/* Right Col Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {/* Platform */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Platform</h4>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      Services
                    </a>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      How It Works
                    </a>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      Pricing
                    </a>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Company</h4>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      About Us
                    </a>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      Careers
                    </a>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      Contact
                    </a>
                  </div>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Legal</h4>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      Privacy
                    </a>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      Terms
                    </a>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      Cookies
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-zinc-600">
                © 2026 CryptoFlow. All rights reserved.
              </div>
              <div className="flex gap-8">
                <a
                  href="https://x.com/KaiNovasWarm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 uppercase tracking-widest font-bold hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-xs text-zinc-500 uppercase tracking-widest font-bold hover:text-white transition-colors"
                >
                  Discord
                </a>
                <a
                  href="#"
                  className="text-xs text-zinc-500 uppercase tracking-widest font-bold hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default App;
