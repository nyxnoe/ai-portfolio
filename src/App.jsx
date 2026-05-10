import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Github, Linkedin, Mail, Download, ChevronDown, Menu, X, Send, MapPin, Phone,
  Code2, Brain, Database, BarChart2, Wrench, Layers
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO DATA 
   ═══════════════════════════════════════════════════════════ */
const DATA = {
  personal: {
    name: "Nihal Prasad",
    roles: ["AI/ML Engineer", "Python Developer", "Data Analyst", "Problem Solver"],
    email: "nihalgood1234@gmail.com",
    phone: "+91 82503 46972",
    location: "Burdwan, India",
    github: "https://github.com/nyxnoe",
    linkedin: "https://linkedin.com/in/nihalprasad-nyx",
    bio: "Computer Science undergraduate (2026) focusing on scalable AI solutions. I specialize in building predictive models, end-to-end machine learning pipelines, and deploying NLP classification systems. Experienced in processing large real-world datasets and evaluating generative frameworks.",
  },
  stats: [
    { label: "ML Models Built", value: "15+", icon: "🫆" },
    { label: "Records Processed", value: "50K+", icon: "📊" },
    { label: "Best Accuracy", value: "92%", icon: "🎯" },
    { label: "Projects", value: "10+", icon: "👾" },
  ],
  skills: {
    Programming: [
      { name: "Python", level: 90 }, { name: "SQL", level: 80 }, { name: "C++", level: 75 }, { name: "Java", level: 65 }
    ],
    "AI / ML": [
      { name: "Scikit-learn", level: 88 }, { name: "Machine Learning", level: 85 }, { name: "NLP & Text Analysis", level: 78 }, { name: "TensorFlow", level: 65 }
    ],
    "LLMs & APIs": [
      { name: "Ollama (Local LLMs)", level: 85 }, { name: "OpenRouter", level: 88 }, { name: "Cohere", level: 75 }, { name: "FAISS", level: 80 }
    ],
    Analytics: [
      { name: "Pandas & NumPy", level: 88 }, { name: "Matplotlib / Seaborn", level: 85 }, { name: "Power BI / Tableau", level: 70 }
    ],
    Frameworks: [
      { name: "Streamlit", level: 82 }, { name: "FastAPI / Flask", level: 80 }, { name: "React", level: 65 }
    ],
    Tools: [
      { name: "Git & GitHub", level: 85 }, { name: "Docker", level: 60 }, { name: "Supabase / DBs", level: 75 }
    ],
  },
  projects: [
    {
      id: 1, // New Project!
      title: "TalentProof AI",
      short: "AI-powered recruitment and candidate evaluation platform.",
      desc: "Developed an intelligent screening system that utilizes large language models to analyze resumes and conduct automated technical evaluations. Integrated OpenRouter for cloud LLMs and Ollama for secure, local inference processing.",
      tech: ["Python", "FastAPI", "React", "OpenRouter", "Ollama", "LLMs"],
      category: "AI/ML",
      github: "https://github.com/nyxnoe",
      metrics: ["Automated Screening", "Local & Cloud LLMs"],
      accent: "#a855f7", // A sleek purple neon glow
    },
    {
      id: 2,
      title: "Agentic RAG Evaluation System",
      short: "Advanced retrieval framework evaluating EU AI Act compliance.",
      desc: "Developed an Agentic Retrieval-Augmented Generation (RAG) system. Engineered data ingestion pipelines and comprehensive evaluation scripts utilizing FAISS for vector search, Cohere for robust embeddings, and Ollama for local LLM inference against EU AI Act datasets.",
      tech: ["Python", "FAISS", "Cohere", "Ollama", "LLMs"],
      category: "AI/ML",
      github: "https://github.com/nyxnoe",
      metrics: ["Agentic Framework", "Vector Search"],
      accent: "#f59e0b",
    },
    {
      id: 3,
      title: "AURA — AI Chat System",
      short: "Interactive AI chat with real-time responses & <1s latency.",
      desc: "Engineered an interactive full-stack AI chat system. Integrated OpenRouter LLMs for intelligent conversations. Reduced response latency to <1 second and cut runtime errors by 40% through backend API optimization.",
      tech: ["Python", "Streamlit", "FastAPI", "React", "Supabase", "OpenRouter"],
      category: "AI/ML",
      github: "https://github.com/nyxnoe",
      metrics: ["<1s response", "40% fewer errors"],
      accent: "#06b6d4",
    },
    {
      id: 4,
      title: "TruthGuard — Misinformation Detector",
      short: "NLP fake news classifier with 85–90% accuracy on 10K+ samples.",
      desc: "NLP-based classification system for fake news detection. Processed 10,000+ text samples using TF-IDF vectorization. Achieved 85-90% accuracy with Logistic Regression and SVM, decreasing false predictions by ~20%.",
      tech: ["Python", "Flask", "Scikit-learn", "NLP"],
      category: "AI/ML",
      github: "https://github.com/nyxnoe",
      metrics: ["85–90% accuracy", "10K+ samples"],
      accent: "#8b5cf6",
    },
    {
      id: 5,
      title: "Kagazi Brand Identity & Web",
      short: "Origami-style aesthetic branding and landing page.",
      desc: "Designed an origami-inspired logo and visual identity for a paper company called Kagazi. Translated the aesthetic into a clean, modern web interface showcasing interactive UI elements and animated storytelling features.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Design"],
      category: "Web App",
      github: "https://github.com/nyxnoe",
      metrics: ["Brand Identity", "Interactive UI"],
      accent: "#ec4899",
    },
    {
      id: 6,
      title: "FitNation & Women's Health AI",
      short: "Predictive ML models for personalized health tracking.",
      desc: "Developed predictive machine learning models to analyze user biometrics. Generated personalized workout, nutrition, and wellness insights using Python and Pandas.",
      tech: ["Python", "ML", "Pandas", "Scikit-learn"],
      category: "Data Science",
      github: "https://github.com/nyxnoe",
      metrics: ["Predictive Insights", "Biometric Analytics"],
      accent: "#ec4899",
    },
    {
      id: 7,
      title: "Real Estate Price Estimator",
      short: "Regression models predicting housing market trends.",
      desc: "Analyzed extensive real estate datasets to build highly accurate predictive regression models estimating property values based on location, size, and market features.",
      tech: ["Python", "Regression", "Data Analytics", "NumPy"],
      category: "Data Science",
      github: "https://github.com/nyxnoe",
      metrics: ["Regression Analytics", "Market Forecasting"],
      accent: "#3b82f6",
    },
    {
      id: 8,
      title: "GitHub Profile Explorer",
      short: "Live interactive analytics dashboard using REST APIs.",
      desc: "Web application fetching and visualizing live GitHub user data—including repositories, contribution graphs, and language usage—via the GitHub REST API.",
      tech: ["React", "JavaScript", "REST API", "Data Viz"],
      category: "Web App",
      github: "https://github.com/nyxnoe",
      metrics: ["Live API Data", "Interactive UI"],
      accent: "#f43f5e",
    }
  ],
  experience: [
    {
      role: "AI/ML Intern",
      company: "KVON Tech",
      period: "Jun 2025 – Sep 2025",
      location: "Jaipur",
      points: [
        "Constructed and optimized classification models achieving 88–92% accuracy.",
        "Processed 15,000+ record datasets, enhancing data quality by 25%.",
        "Boosted model performance by 15% via feature engineering & tuning.",
        "Presented final solutions detailing deployment strategies to stakeholders.",
      ],
      tech: ["Python", "Scikit-learn", "Pandas"],
      accent: "#06b6d4",
    },
    {
      role: "ML & AI Trainee",
      company: "Solitaire Infosys",
      period: "Jun 2024 – Jul 2024",
      location: "Onsite",
      points: [
        "Trained on 10,000+ record real-world datasets to develop predictive models.",
        "Implemented and evaluated 3+ machine learning models, achieving 85% accuracy.",
        "Streamlined preprocessing workflows, achieving a 30% reduction in processing time.",
      ],
      tech: ["Python", "Pandas", "Scikit-learn"],
      accent: "#8b5cf6",
    },
  ],
  certifications: [
    { title: "Oracle Certified Foundations Associate", issuer: "Oracle", area: "AI & Cloud Fundamentals", icon: "🏆", color: "#f59e0b" },
    { title: "Applied AI – Winter Certification 2025", issuer: "CSRBOX × IBM", area: "Applied Artificial Intelligence", icon: "🤖", color: "#06b6d4" },
    { title: "Advanced Diploma – Computer Applications", issuer: "ADCA", area: "Computer Applications", icon: "💻", color: "#8b5cf6" },
  ],
};

/* ═══════════════
   ANIMATION VARIANTS
   ═══════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/* ═══════════════
   COMPONENTS
   ═══════════════ */

// Neural Canvas Background (Optimized)
function NeuralBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodes = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
      ctx.lineWidth = 0.5;

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${1 - distance / 120})`;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
}

// Section Header
const SectionHeader = ({ label, title }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-[1px] bg-cyan-400" />
      <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">{label}</span>
    </div>
    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-slate-100">{title}</h2>
  </motion.div>
);

// Typewriter Hook
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typeSpeed = isDeleting ? 40 : 80;
    
    if (!isDeleting && text === currentWord) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentWord.slice(0, text.length + (isDeleting ? -1 : 1)));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

/* ═══════════════
   MAIN SECTIONS
   ═══════════════ */

function Hero() {
  const typedText = useTypewriter(DATA.personal.roles);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-6 z-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:54px_54px] pointer-events-none" />
      
      <motion.div 
        variants={staggerContainer} initial="hidden" animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-mono text-xs tracking-wider">Available for opportunities</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-orbitron text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
          <span className="grad-text">{DATA.personal.name}</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="h-10 mb-6">
          <span className="text-xl md:text-2xl text-slate-300 font-exo font-medium">
            {typedText}
            <span className="animate-pulse text-cyan-400">|</span>
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="text-slate-400 max-w-2xl mx-auto mb-10 text-base md:text-lg font-exo leading-relaxed">
          {DATA.personal.bio}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-16">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-exo font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            View Projects
          </button>
          <a href={DATA.personal.github} target="_blank" rel="noreferrer" 
            className="flex items-center gap-2 px-8 py-3 rounded-xl border border-slate-600 text-slate-300 font-exo hover:border-slate-400 hover:text-white transition-colors">
            <Github size={18} /> GitHub
          </a>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {DATA.stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="glass p-4 cursor-default hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-orbitron text-xl font-bold text-cyan-400">{stat.value}</div>
              <div className="text-xs text-slate-400 font-exo mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
}

function Skills() {
  const categories = Object.keys(DATA.skills);
  const [active, setActive] = useState(categories[0]);
  
  const icons = {
    "Programming": <Code2 size={16}/>, "AI / ML": <Brain size={16}/>, 
    "Analytics": <BarChart2 size={16}/>, "Frameworks": <Layers size={16}/>, 
    "Databases": <Database size={16}/>, "Tools": <Wrench size={16}/>
  };

  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Technical Arsenal" title="Skills & Technologies" />
        
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-exo text-sm border transition-all ${
                active === cat ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}>
              {icons[cat]} {cat}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {DATA.skills[active].map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-exo text-slate-200 text-sm font-medium">{skill.name}</span>
                  <span className="font-mono text-cyan-400 text-xs">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(DATA.projects.map(p => p.category))];
  
  const filteredProjects = filter === "All" 
    ? DATA.projects 
    : DATA.projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="What I've Built" title="Featured Projects" />
        
        {/* Interactive Category Filter */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)} 
              className={`px-5 py-2 rounded-full font-mono text-xs transition-all duration-300 border ${
                filter === cat 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Glowing Project Cards */}
        <motion.div 
          layout 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={project.id} 
              whileHover={{ y: -10, boxShadow: `0 20px 40px -10px ${project.accent}40` }} 
              className="glass overflow-hidden flex flex-col h-full group border-slate-700 hover:border-transparent transition-all"
            >
              <div className="h-1.5 w-full transition-all duration-500 group-hover:h-2" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />
              <div className="p-6 flex flex-col flex-grow relative overflow-hidden">
                
                {/* Subtle background glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: project.accent }} />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="px-3 py-1 text-[10px] font-mono rounded-md border" style={{ color: project.accent, backgroundColor: `${project.accent}10`, borderColor: `${project.accent}30` }}>
                    {project.category}
                  </span>
                  <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-transform hover:scale-110">
                    <Github size={22} />
                  </a>
                </div>
                <h3 className="text-xl font-orbitron font-bold text-slate-100 mb-2 relative z-10">{project.title}</h3>
                <p className="text-sm font-exo text-slate-400 mb-5 flex-grow relative z-10 leading-relaxed">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {project.metrics.map(m => (
                    <span key={m} className="text-[10px] font-mono px-2 py-1 border rounded bg-slate-900/50" style={{ borderColor: `${project.accent}40`, color: project.accent }}>
                      {m}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 relative z-10">
                  {project.tech.map(t => (
                    <span key={t} className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Work History" title="Experience & Education" />
        
        <div className="relative mt-12 border-l border-slate-700 ml-4 md:ml-0">
          {DATA.experience.map((exp, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 relative pl-8 md:pl-12">
              <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full border-4 border-background bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <div className="glass p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-slate-100">{exp.role}</h3>
                    <span className="text-cyan-400 font-exo font-medium">{exp.company}</span>
                  </div>
                  <div className="mt-2 md:mt-0 text-left md:text-right">
                    <div className="text-sm font-mono text-slate-400">{exp.period}</div>
                    <div className="text-xs font-exo text-slate-500">{exp.location}</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-sm font-exo text-slate-300 flex items-start">
                      <span className="text-cyan-400 mr-2 mt-0.5">▹</span> {point}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education Block */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative pl-8 md:pl-12">
             <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full border-4 border-background bg-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
             <div className="glass p-6 border-purple-500/30">
               <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-slate-100">B.Tech — Computer Science</h3>
                    <span className="text-purple-400 font-exo font-medium">B.R.C.M College of Engineering & Technology</span>
                    <p className="text-xs text-slate-400 mt-2">Focus: Data Science & ML · DSA · Artificial Intelligence</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-left md:text-right">
                    <div className="text-sm font-mono text-slate-400 mb-1">Jun 2022 – Present</div>
                    <div className="text-sm font-orbitron font-bold text-purple-400">CGPA: 7.1</div>
                  </div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Sent successfully! I'll be in touch.");
    setTimeout(() => setFormStatus(null), 4000);
    e.target.reset();
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader label="Get In Touch" title="Let's Connect" />
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-slate-400 font-exo max-w-xl mx-auto mb-10">
          I'm actively looking for AI/ML engineering roles, data analytics positions, or exciting collaborations. My inbox is always open.
        </motion.p>
        
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass p-8 max-w-lg mx-auto mb-12">
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-mono text-slate-400 mb-1 block">NAME</label>
              <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 mb-1 block">EMAIL</label>
              <input required type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 transition-all" />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 mb-1 block">MESSAGE</label>
              <textarea required rows={4} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 transition-all resize-y" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-exo font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Send size={18} /> Send Message
            </button>
            {formStatus && <p className="text-cyan-400 text-sm font-exo text-center mt-4">{formStatus}</p>}
          </form>
        </motion.div>

        <div className="flex justify-center gap-6">
          <a href={DATA.personal.github} target="_blank" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"><Github size={24} /></a>
          <a href={DATA.personal.linkedin} target="_blank" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"><Linkedin size={24} /></a>
          <a href={`mailto:${DATA.personal.email}`} className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"><Mail size={24} /></a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════
   APP ROOT
   ═══════════ */
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-background text-slate-200 font-exo min-h-screen relative selection:bg-cyan-500/30">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left z-50" style={{ scaleX }} />
      <NeuralBg />
      
      <nav className="fixed top-0 w-full glass rounded-none border-t-0 border-x-0 border-b border-white/5 z-40 px-6 py-4 flex justify-between items-center">
        <div className="font-orbitron font-bold text-xl tracking-widest text-cyan-400">NP<span className="text-purple-500">_</span></div>
        <div className="hidden md:flex gap-6">
          {['hero', 'skills', 'projects', 'experience', 'contact'].map(item => (
            <button key={item} onClick={() => document.getElementById(item)?.scrollIntoView({behavior:'smooth'})} className="text-sm font-exo font-medium text-slate-400 hover:text-cyan-400 capitalize transition-colors">
              {item}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 pt-16">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="py-6 border-t border-slate-800 text-center relative z-10 bg-background/80 backdrop-blur-md">
        <p className="text-xs font-mono text-slate-500">© {new Date().getFullYear()} Nihal Prasad. Engineered with React & Tailwind.</p>
      </footer>
    </div>
  );
}