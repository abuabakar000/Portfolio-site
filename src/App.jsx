import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Code,
  Briefcase,
  Mail,
  BarChart,
  Github,
  Linkedin,
  FileText,
  Search,
  Music,
  Sun,
  Moon,
  Monitor,
  Send,
  Terminal,
  Code2,
  Download,
  Wrench,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Home,
  Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import emailjs from '@emailjs/browser';
import ProjectCard from './components/ProjectCard';
import ExperienceItem from './components/ExperienceItem';
import SkillsSphere from './components/SkillsSphere';
import profilePic from './assets/profile.png';
import logoDark from './assets/logo-dark.png';
import logoLight from './assets/logo-light.png';
import devCollabImg from './assets/devcollab.jpg';
import tgbImg from './assets/tgb.png';
import resumeFile from './assets/Resume.pdf';

// Hardcoded Static Data
const PROJECTS_DATA = [
  {
    id: 1,
    title: "DevCollab",
    description: "A full-stack platform where developers can share projects, connect, and collaborate in real time.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    category: "Full Stack",
    image: devCollabImg,
    liveLink: "https://dev-collab-frontend-alpha.vercel.app/"
  },
  {
    id: 2,
    title: "The Good Burger",
    description: "A modern restaurant web application that showcases menu items, enables online ordering, and delivers a smooth, responsive user experience across all devices.",
    techStack: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    category: "Web App",
    image: tgbImg,
    liveLink: "https://the-good-burger.vercel.app/"
  }
];

const EXPERIENCE_DATA = [
  {
    id: 1,
    company: "Self-Employed",
    role: "Full Stack Developer",
    duration: "2026 – Present",
    description: [
      "Developed custom MERN stack applications",
      "Implemented secure authentication systems (JWT, role-based access)",
      "Built and deployed production-ready web apps"
    ],
    type: "work"
  },
  {
    id: 2,
    company: "INNOV8",
    role: "Frontend Developer",
    duration: "2024 – 2025",
    description: [
      "Built responsive web applications",
      "Optimized UI performance and improved user experience",
      "Collaborated with backend team for feature implementation"
    ],
    type: "work"
  },
  {
    id: 3,
    company: "Saffron Labs",
    role: "Trainee (Frontend Intern)",
    duration: "2024",
    description: [
      "Assisted in developing UI components using React",
      "Learned and applied CSS best practices for responsive design",
      "Gained hands-on experience with modern frontend development workflows"
    ],
    type: "work"
  }
];

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative w-full flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 overflow-hidden ${active
      ? 'text-brand-purple'
      : 'text-text-muted hover:text-text-base'
      }`}
  >
    {/* Active background with holographic border */}
    {active && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute inset-0 bg-sidebar-bg/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    )}

    {/* Content */}
    <div className="relative z-10 flex items-center w-full">
      <div className="flex items-center gap-2">
        {/* Coding Pointer */}
        <span className={`font-mono text-sm font-bold transition-all duration-300 ${active ? 'text-brand-purple opacity-100' : 'opacity-0 -translate-x-2'
          }`}>
          //
        </span>

        <Icon
          size={16}
          className={`transition-all duration-300 ${active ? 'text-brand-purple scale-110 uppercase' : 'group-hover:scale-110'
            }`}
        />
      </div>

      <span className={`ml-3 text-[13px] font-bold tracking-tight transition-all duration-300 ${active ? 'translate-x-[2px] italic' : ''
        }`}>
        {label}
      </span>

      {/* Trailing cursor for active item */}
      {active && (
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="ml-1.5 w-[6px] h-[14px] bg-brand-purple/40 rounded-[1px]"
        />
      )}
    </div>
  </button>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('Introduction');
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [experience, setExperience] = useState(EXPERIENCE_DATA);
  const [loading, setLoading] = useState(false);
  const [projectsIndex, setProjectsIndex] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour12: false }));
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('sending');

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString()
      };

      // Real credentials provided by the user
      await emailjs.send(
        'service_8c2zrkp',
        'template_ku109p6',
        templateParams,
        'Pd8py1WJIMBGGJUE9'
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const mainContentRef = useRef(null);

  useEffect(() => {
    const resetScroll = () => {
      if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
      window.scrollTo(0, 0);
    };

    // Wait for the exit animation (0.4s) to finish before resetting scroll
    const timer = setTimeout(resetScroll, 400);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on section change
  }, [activeSection]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Removed API fetching for static content

  const sections = [
    { id: 'Introduction', icon: Home },
    { id: 'About Me', icon: Fingerprint },
    { id: 'Projects', icon: Code },
    { id: 'Skills & Tools', icon: Wrench },
    { id: 'Experience', icon: Briefcase },
    { id: 'Contact', icon: Mail },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'Introduction':
        return (
          <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-10 lg:gap-20 items-center">
            {/* Left Column: Text Content */}
            <div className="flex-1 space-y-6 text-left">
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-base leading-[1.1]"
                >
                  Abu Bakar Khawaja
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-muted leading-tight"
                >
                  Less talk. More building.
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg text-text-base leading-relaxed max-w-2xl"
              >
                I am a <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">Software Engineer</span> specializing in <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">full-stack development</span>, building scalable and high-performance digital products. I design and architect fast, reliable web applications using technologies such as <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">Next.js, React, Tailwind CSS, Node.js, Express, and MongoDB.</span> With a strong focus on backend architecture, security, and system design, I deliver clean, efficient, <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">production-ready software</span> built for real-world impact.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-row items-center justify-center lg:justify-start gap-4 pt-4 sm:pt-6"
              >
                <a
                  href={resumeFile}
                  download="Abu Bakar Khawaja.pdf"
                  className="group relative bg-brand-purple text-white px-6 py-3 rounded-lg text-sm font-bold tracking-tight hover:brightness-110 transition-all flex items-center gap-2 overflow-hidden"
                >
                  <Download size={16} className="relative z-10" />
                  <span className="relative z-10">Get Resume</span>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
                <button
                  onClick={() => setActiveSection('Contact')}
                  className="group bg-sidebar-bg/50 border border-border-base text-text-muted hover:text-text-base hover:bg-[#1a1a1a] hover:border-border-base px-6 py-3 rounded-lg text-sm font-bold tracking-tight transition-all duration-200"
                >
                  Send Email
                </button>
              </motion.div>
            </div>

            {/* Right Column: Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative shrink-0"
            >
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-brand-purple/20 blur-[60px] rounded-full" />

                {/* Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border-base bg-sidebar-bg shadow-2xl flex items-center justify-center group">
                  {/* Real Image Template */}
                  <img
                    src={profilePic}
                    alt="Abubakar Khawaja"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Large Overlapping Brackets (scaled for mobile) */}
                <div className="absolute -top-6 -left-6 sm:-top-12 sm:-left-12 text-brand-purple/60 dark:text-brand-purple/20 font-mono text-[80px] sm:text-[160px] font-thin select-none pointer-events-none group-hover:opacity-40 transition-opacity z-10">{'<'}</div>
                <div className="absolute -bottom-12 -right-4 sm:-bottom-20 sm:-right-8 text-brand-purple/60 dark:text-brand-purple/20 font-mono text-[80px] sm:text-[160px] font-thin select-none pointer-events-none group-hover:opacity-40 transition-opacity z-10">{'>'}</div>
              </div>
            </motion.div>
          </div>
        );

      case 'About Me':
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-base"
              >
                About Abu Bakar Khawaja
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-muted leading-snug"
              >
                I don’t just write code — I engineer scalable systems.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-6 max-w-3xl"
            >
              <p className="text-lg text-text-base leading-relaxed">
                I’m a <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">Software Engineer</span> and <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">MERN Stack Developer</span> specializing in building <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">production-grade and scalable web applications</span>. Using MongoDB, Express, React, and Node.js, I develop high-performance platforms designed to handle real users, real traffic, and complex business logic — not tutorial-level builds.
              </p>
              <p className="text-lg text-text-base leading-relaxed">
                With a strong foundation in <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">backend architecture</span>, API design, authentication systems, and database optimization, I focus on writing <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">clean, maintainable code</span> that scales. I build live applications with real-time features, secure data handling, and infrastructure-ready server logic built for growth.
              </p>
              <p className="text-lg text-text-base leading-relaxed">
                I approach every project with an <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">engineering mindset</span> — prioritizing scalability, performance, and long-term reliability from day one. My objective is simple: deliver robust software that performs under pressure and creates <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">measurable impact</span>.
              </p>
            </motion.div>
          </div>
        );

      case 'Projects': {
        const visibleProjects = projects.slice(projectsIndex, projectsIndex + 2);

        return (
          <div className="space-y-8 sm:space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-6">
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-base tracking-tight"
                >
                  Featured Projects
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-lg text-text-base leading-relaxed max-w-2xl"
                >
                  A curated collection of my <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">featured projects</span>, showcasing innovative solutions and modern architectures.
                </motion.p>
              </div>

              {/* Sleek Minimalist Carousel Navigation */}
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-sidebar-bg/40 backdrop-blur-xl border border-border-base rounded-2xl p-1.5 shadow-lg relative group">
                  {/* Previous Button */}
                  <button
                    onClick={() => setProjectsIndex(Math.max(0, projectsIndex - 1))}
                    disabled={projectsIndex === 0}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${projectsIndex === 0
                      ? 'opacity-20 cursor-not-allowed'
                      : 'hover:bg-brand-purple/10 text-text-muted hover:text-brand-purple cursor-pointer'
                      }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-1.5 px-4 border-x border-border-base/10">
                    {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${i === Math.floor(projectsIndex / 2)
                          ? 'w-6 bg-brand-purple'
                          : 'w-2 bg-border-base/30'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setProjectsIndex(Math.min(projects.length - 2, projectsIndex + 1))}
                    disabled={projectsIndex >= projects.length - 2}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${projectsIndex >= projects.length - 2
                      ? 'opacity-20 cursor-not-allowed'
                      : 'hover:bg-brand-purple/10 text-text-muted hover:text-brand-purple cursor-pointer'
                      }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Rotating Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative overflow-hidden min-h-[400px] sm:min-h-[480px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-40 justify-center">
              <Terminal size={10} className="text-brand-purple" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">system.projects_carousel_ready</span>
            </div>
          </div>
        );
      }

      case 'Skills & Tools':
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-base tracking-tight"
              >
                Technical Arsenal
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg text-text-base leading-relaxed max-w-2xl"
              >
                An interactive visualization of my core competencies, focusing on <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">modern full-stack technologies</span> and <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">scalable architecture</span>.
              </motion.p>
            </div>

            <div className="relative mt-12">
              <SkillsSphere isDarkMode={isDarkMode} />
            </div>
          </div>
        );

      case 'Experience':
        return (
          <div className="space-y-12">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-base tracking-tight"
              >
                Professional Experience
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg text-text-base leading-relaxed max-w-2xl"
              >
                My <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">professional journey</span> and <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">career milestones</span> in the software industry.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-2xl"
            >
              {experience.map(item => (
                <ExperienceItem key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        );

      case 'Contact':
        return (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div className="space-y-4 text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-base tracking-tight"
              >
                Let&apos;s Build Something <span className="text-brand-purple">Real.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-text-base leading-relaxed max-w-2xl"
              >
                I&apos;m currently open to <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">new opportunities</span> and freelance projects.
                <br />Drop a message and let&apos;s build something <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">amazing</span>!
              </motion.p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              {/* Email Card - Order 1 on Mobile */}
              <div className="order-1 lg:order-none lg:col-span-2 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="group p-6 bg-sidebar-bg/40 border border-border-base rounded-3xl transition-all duration-300 hover:border-brand-purple/50 hover:bg-sidebar-bg/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-muted tracking-tight">Email Me</p>
                      <p className="text-lg font-bold text-text-base">abubakarkhawaja412@gmail.com</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Form - Moved to Order 2 on Mobile, Col-span-3 on Desktop */}
              <div className="order-2 lg:order-none lg:col-span-3 lg:row-span-2 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-sidebar-bg/30 backdrop-blur-xl border border-border-base rounded-[40px] p-8 lg:p-10 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />

                  <AnimatePresence mode="wait">
                    {formStatus === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                      >
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          >
                            <User size={40} />
                          </motion.div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-text-base">Message Received!</h3>
                          <p className="text-text-muted">I’ll get back to you as soon as possible.</p>
                        </div>
                        <button
                          onClick={() => setFormStatus('idle')}
                          className="text-sm font-bold text-brand-purple hover:underline"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-6">
                            <label className="text-xs font-bold text-text-muted tracking-tight ml-1">Who’s This?</label>
                            <input
                              required
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Your Name"
                              className="w-full bg-bg-base/50 border border-border-base hover:border-brand-purple/30 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 text-sm font-medium text-text-base transition-all placeholder:text-text-muted/40"
                            />
                          </div>
                          <div className="space-y-6">
                            <label className="text-xs font-bold text-text-muted tracking-tight ml-1">Where Do I Reply?</label>
                            <input
                              required
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Your Email"
                              className="w-full bg-bg-base/50 border border-border-base hover:border-brand-purple/30 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 text-sm font-medium text-text-base transition-all placeholder:text-text-muted/40"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <label className="text-xs font-bold text-text-muted tracking-tight ml-1">What’s the Plan?</label>
                          <textarea
                            required
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell me about your project..."
                            rows={5}
                            className="w-full bg-bg-base/50 border border-border-base hover:border-brand-purple/30 rounded-3xl px-5 py-4 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 text-sm font-medium text-text-base transition-all resize-none placeholder:text-text-muted/40"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={formStatus === 'sending'}
                          className={`group w-full ${formStatus === 'error' ? 'bg-red-500' : 'bg-brand-purple'} hover:brightness-110 text-white text-sm font-bold tracking-tight h-16 rounded-2xl flex items-center justify-center space-x-3 transition-all relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {formStatus === 'sending' ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Dispatching...</span>
                              </>
                            ) : (
                              <>
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <span>Transmit Message</span>
                              </>
                            )}
                          </span>
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Availability & Socials - Order 3 on Mobile, Left Column on Desktop */}
              <div className="order-3 lg:order-none lg:col-span-2 space-y-8 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="group p-6 bg-sidebar-bg/40 border border-border-base rounded-3xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-sidebar-bg/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Monitor size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-muted tracking-tight">Availability</p>
                      <p className="text-lg font-bold text-text-base">Available for freelance & contract work</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-4 pt-4"
                >
                  <p className="text-xs font-bold text-text-muted tracking-tight px-2">Digital Footprint</p>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://github.com/abuabakar000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 p-4 bg-sidebar-bg/20 border border-border-base rounded-2xl hover:bg-brand-purple/5 hover:border-brand-purple/30 transition-all text-text-muted hover:text-text-base"
                    >
                      <Github size={18} />
                      <span className="font-bold text-sm">GitHub</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://www.linkedin.com/in/abu-bakar-khawaja-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 p-4 bg-sidebar-bg/20 border border-border-base rounded-2xl hover:bg-brand-purple/5 hover:border-brand-purple/30 transition-all text-text-muted hover:text-text-base"
                    >
                      <Linkedin size={18} />
                      <span className="font-bold text-sm">LinkedIn</span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-bg-base text-text-base selection:bg-brand-purple/30 selection:text-brand-purple font-sans tracking-tight transition-colors duration-300">
        {/* Top Navbar */}
        <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border-base bg-bg-base/80 backdrop-blur-xl z-[100] flex items-center justify-between px-6 lg:px-12 transition-colors duration-300">
          <div className="flex items-center space-x-12">
            <div
              onClick={() => setActiveSection('Introduction')}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-transform duration-300 group-hover:scale-105">
                <img src={isDarkMode ? logoDark : logoLight} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:block text-lg sm:text-xl font-bold tracking-tighter transition-colors group-hover:text-brand-purple truncate sm:max-w-none">abubakar.khawaja</span>
            </div>
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-text-muted">
              <a
                href="https://www.linkedin.com/in/abu-bakar-khawaja-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group p-2 transition-colors text-text-muted hover:text-text-base"
              >
                <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-tight">LinkedIn</span>
              </a>

              <a
                href="https://github.com/abuabakar000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group p-2 transition-colors text-text-muted hover:text-text-base"
              >
                <Github size={16} className="group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-tight">GitHub</span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-sidebar-bg px-3 py-1.5 rounded-full border border-border-base">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-base font-bold text-text-base tracking-tight">{time}</span>
            </div>

            <a
              href="https://github.com/abuabakar000"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden p-2 text-text-muted hover:text-text-base transition-colors"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/abu-bakar-khawaja-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden p-2 text-text-muted hover:text-[#0077b5] transition-colors"
            >
              <Linkedin size={18} />
            </a>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-text-muted hover:text-text-base transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-text-muted hover:text-text-base transition-colors relative z-[110]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </nav>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[105] bg-bg-base lg:hidden flex flex-col p-4 pt-6"
            >
              {/* Premium Top Bar inside Menu */}
              <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center rotate-45 text-text-base">
                    <Send size={16} />
                  </div>
                  <span className="text-base font-bold tracking-tight text-text-base">abubakar.khawaja</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2.5 bg-sidebar-bg px-4 py-2 rounded-full border border-border-base shadow-lg shadow-black/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                    <span className="text-xs font-black font-mono text-text-base uppercase tracking-tighter">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                    </span>
                  </div>

                  <div className="flex items-center bg-sidebar-bg/50 px-1 py-1 rounded-full border border-border-base/50">

                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="p-1.5 text-text-muted hover:text-text-base transition-all"
                    >
                      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-1.5 text-text-muted hover:text-brand-purple transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Navigation Area */}
              <div className="flex-1 overflow-y-auto px-1 scrollbar-hide pb-10">
                <div className="flex flex-col space-y-2.5">
                  {/* "Home" Section - Direct from Inspiration */}
                  <button
                    onClick={() => { setActiveSection('Introduction'); setIsMobileMenuOpen(false); }}
                    className={`flex items-center justify-between p-5 rounded-[24px] transition-all duration-300 border ${activeSection === 'Introduction'
                      ? 'bg-sidebar-bg border-brand-purple/30 text-text-base shadow-xl shadow-black/10'
                      : 'bg-sidebar-bg/30 border-border-base/40 text-text-base hover:bg-sidebar-bg/60'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <Home
                        size={18}
                        className={`transition-colors duration-300 ${activeSection === 'Introduction' ? 'text-brand-purple' : 'opacity-40'}`}
                      />
                      <span className="text-lg font-bold tracking-tight">Introduction</span>
                    </div>
                    <ChevronRight size={18} className="opacity-40" />
                  </button>

                  {/* Other Sections */}
                  {sections.filter(s => s.id !== 'Introduction').map((section) => (
                    <button
                      key={section.id}
                      onClick={() => { setActiveSection(section.id); setIsMobileMenuOpen(false); }}
                      className={`group flex items-center justify-between p-5 rounded-[24px] transition-all duration-300 border ${activeSection === section.id
                        ? 'bg-sidebar-bg border-brand-purple/30 text-text-base shadow-xl shadow-brand-purple/5'
                        : 'bg-sidebar-bg/30 border-border-base/40 text-text-base hover:bg-sidebar-bg/60'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <section.icon
                          size={18}
                          className={`transition-colors duration-300 ${activeSection === section.id ? 'text-brand-purple' : 'opacity-40'}`}
                        />
                        <span className="text-lg font-bold tracking-tight">{section.id}</span>
                      </div>
                      <ChevronRight
                        size={18}
                        className={`transition-all duration-300 ${activeSection === section.id ? 'opacity-100' : 'opacity-20 group-hover:opacity-60'}`}
                      />
                    </button>
                  ))}
                </div>

                {/* Mobile Social Links */}
                <div className="mt-12 flex items-center justify-center gap-4">
                  <a href="https://github.com/abuabakar000" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-sidebar-bg rounded-2xl flex items-center justify-center text-text-muted hover:text-text-base border border-border-base hover:border-brand-purple/30 transition-all group overflow-hidden relative">
                    <Github size={20} className="relative z-10 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://www.linkedin.com/in/abu-bakar-khawaja-dev" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-sidebar-bg rounded-2xl flex items-center justify-center text-text-muted hover:text-text-base border border-border-base hover:border-brand-purple/30 transition-all group overflow-hidden relative">
                    <Linkedin size={20} className="relative z-10 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-16 flex min-h-[calc(100vh-64px)] overflow-hidden">
          {/* Left Sidebar */}
          <aside className="w-64 fixed left-0 top-16 bottom-0 border-r border-border-base p-6 hidden lg:block overflow-y-auto bg-sidebar-bg scrollbar-hide transition-all duration-300">

            <div className="space-y-1">
              {sections.map((section) => (
                <SidebarLink
                  key={section.id}
                  icon={section.icon}
                  label={section.id}
                  active={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border-base">
              <div className="p-4 rounded-2xl border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-transparent">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Current Status</p>
                <p className="text-[13px] font-bold text-emerald-500 tracking-tight">Open to work</p>
              </div>
            </div>
          </aside>

          <main
            ref={mainContentRef}
            className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto bg-bg-base transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
              >
                {loading ? (
                  <div className="h-96 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : renderContent()}

                {/* Section Navigation - Inside motion.div to avoid flickering */}
                {!loading && (
                  <div className="mt-10 sm:mt-16 mb-8 flex items-center justify-between">
                    {/* Previous Button */}
                    <div className="flex-1">
                      {sections.findIndex(s => s.id === activeSection) > 0 && (
                        <button
                          onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) - 1].id)}
                          className="group flex items-center gap-2 sm:gap-3 text-text-muted hover:text-text-base transition-all px-2 sm:px-4 py-2 rounded-lg hover:bg-[#1a1a1a] border border-transparent hover:border-border-base transition-colors duration-200 cursor-pointer"
                        >
                          <ChevronLeft size={18} className="sm:size-5 transition-transform group-hover:-translate-x-1" />
                          <span className="text-sm sm:text-lg font-bold text-text-base tracking-tight">
                            {sections[sections.findIndex(s => s.id === activeSection) - 1].id}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Next Button */}
                    <div className="flex-1 flex justify-end">
                      {sections.findIndex(s => s.id === activeSection) < sections.length - 1 && (
                        <button
                          onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) + 1].id)}
                          className="group flex items-center gap-2 sm:gap-3 text-text-muted hover:text-text-base transition-all px-2 sm:px-4 py-2 rounded-lg hover:bg-[#1a1a1a] border border-transparent hover:border-border-base transition-colors duration-200 cursor-pointer"
                        >
                          <span className="text-sm sm:text-lg font-bold text-text-base tracking-tight">
                            {sections[sections.findIndex(s => s.id === activeSection) + 1].id}
                          </span>
                          <ChevronRight size={18} className="sm:size-5 transition-transform group-hover:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer Space */}
            <div className="mt-32 pt-12 border-t border-border-base flex justify-between items-center text-text-muted text-[11px] font-medium tracking-wide">
              <span>© 2026 CODED WITH HEART</span>
              <div className="flex items-center space-x-4">
                <a href="https://github.com/abuabakar000" target="_blank" rel="noopener noreferrer" className="hover:text-text-base cursor-pointer transition-colors uppercase">GitHub</a>
                <a href="https://www.linkedin.com/in/abu-bakar-khawaja-dev" target="_blank" rel="noopener noreferrer" className="hover:text-text-base cursor-pointer transition-colors uppercase">LinkedIn</a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
