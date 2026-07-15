import React, { useState } from 'react';
import { 
  Stethoscope, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  Instagram, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Calendar, 
  User, 
  FileText, 
  CheckCircle2, 
  HeartHandshake, 
  Plus, 
  Send,
  Smartphone,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData, Experience } from './data';
import { generateResumePDF } from './pdf';
import profileImg from './assets/images/lohana_profile_1784076228564.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'sobre' | 'experiencia' | 'formacao' | 'diferenciais'>('sobre');
  const [experienceFilter, setExperienceFilter] = useState<'todos' | 'hospitalar' | 'estagio' | 'home_care' | 'odontologia'>('todos');
  const [copiedText, setCopiedText] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'pt'>('pt');
  
  // Dynamic presentation mode: Recruiter can customize the focus!
  const [careerFocus, setCareerFocus] = useState<'geral' | 'enfermagem' | 'saude_bucal'>('geral');

  // Interactive contact message composer
  const [customMessage, setCustomMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  // Ref to track scroll container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Stats Counters
  const stats = [
    { label: 'Formações & Certificados', value: '4+', icon: <GraduationCap className="w-5 h-5 text-teal-600" /> },
    { label: 'Anos de Experiência', value: '2+', icon: <Briefcase className="w-5 h-5 text-teal-600" /> },
    { label: 'Especialidades', value: '2', icon: <Stethoscope className="w-5 h-5 text-teal-600" /> },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const baseMessage = customMessage || `Olá Lohana, vi seu portfólio profissional e gostaria de conversar sobre oportunidades de trabalho em ${careerFocus === 'enfermagem' ? 'Enfermagem' : careerFocus === 'saude_bucal' ? 'Saúde Bucal' : 'Saúde'}.`;
    const encodedMessage = encodeURIComponent(baseMessage);
    window.open(`${portfolioData.whatsappLink}?text=${encodedMessage}`, '_blank');
  };

  const filteredExperiences = portfolioData.experiences.filter(exp => {
    if (experienceFilter === 'todos') return true;
    return exp.type === experienceFilter;
  });

  // Dynamic profile summary depending on focus
  const getDynamicSummary = () => {
    if (careerFocus === 'enfermagem') {
      return "Foco em assistência de enfermagem hospitalar, monitoramento de sinais vitais, administração segura de medicamentos e evolução clínica do paciente. Compromisso rígido com protocolos de segurança e assistência humanizada.";
    }
    if (careerFocus === 'saude_bucal') {
      return "Foco em suporte odontológico avançado, instrumentação cirúrgica, manipulação de materiais de alta qualidade e aplicação rigorosa de protocolos de biossegurança contra infecção cruzada.";
    }
    return portfolioData.profileSummary;
  };

  // Smooth scroll handler inside the custom scrollable element or window
  const scrollToSection = (id: 'sobre' | 'experiencia' | 'formacao' | 'diferenciais') => {
    setActiveTab(id);
    const element = document.getElementById(`sec-${id}`);
    const container = scrollContainerRef.current;
    if (element) {
      if (container && container.scrollHeight > container.clientHeight + 10) {
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        const relativeTop = elementTop - containerTop + container.scrollTop;
        
        container.scrollTo({
          top: relativeTop - 56, // offset for sticky header height (h-14 is 56px)
          behavior: 'smooth'
        });
      } else {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - 120, // offset for sticky header and extra spacing
          behavior: 'smooth'
        });
      }
    }
  };

  // Automatically update the active tab based on scroll position using IntersectionObserver
  React.useEffect(() => {
    const sections: ('sobre' | 'experiencia' | 'formacao' | 'diferenciais')[] = ['sobre', 'experiencia', 'formacao', 'diferenciais'];
    
    const observerOptions = {
      root: null, // relative to viewport (handles both container & window scrolling)
      rootMargin: '-100px 0px -60% 0px', // triggers when the section reaches top-middle
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('sec-', '') as any;
          setActiveTab(id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(`sec-${id}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-start lg:py-8 px-0 sm:px-4 font-sans text-slate-800">
      
      {/* Subtle Desktop Intro Frame Info */}
      <div className="hidden lg:flex max-w-md mb-4 items-center gap-2 text-xs text-slate-500 bg-white/80 backdrop-blur border border-slate-100 rounded-full px-4 py-2 shadow-sm">
        <Smartphone className="w-4 h-4 text-[#0d9488]" />
        <span>Layout otimizado para dispositivos móveis. Veja como fica no celular!</span>
      </div>

      {/* Main Container Simulation */}
      <div className="w-full max-w-md bg-white min-h-screen lg:min-h-[850px] lg:max-h-[920px] lg:rounded-3xl lg:shadow-2xl overflow-hidden flex flex-col relative border-0 lg:border-8 lg:border-slate-800" id="mobile-viewport">
        
        {/* Top Sticky Segment Header with active tab */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
          <div className="flex justify-around items-center h-14 px-2">
            {[
              { id: 'sobre', label: 'Sobre' },
              { id: 'experiencia', label: 'Experiência' },
              { id: 'formacao', label: 'Formação' },
              { id: 'diferenciais', label: 'Diferenciais' }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => scrollToSection(tab.id as any)}
                  className={`relative flex flex-col items-center justify-center text-xs font-bold h-full px-4 transition-colors uppercase tracking-wider cursor-pointer ${
                    active ? 'text-[#0d9488]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {active && (
                    <motion.div 
                      layoutId="activeTabUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0d9488] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Mobile Body */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-24 scroll-smooth">
          
          {/* Cover Banner with teal healthcare-themed design overlay */}
          <div className="relative h-28 bg-gradient-to-r from-[#0d9488] to-[#0f766e] overflow-hidden">
            {/* Ambient medical styling patterns */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Heartbeat pulse ambient graphic */}
            <div className="absolute bottom-2 right-4 text-white/10">
              <svg className="w-24 h-12" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0 25 h30 l5 -15 l5 35 l5 -40 l5 30 l5 -10 h20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Profile Overview Section (Sticky Info above tabs contents) */}
          <div className="px-6 -mt-14 relative z-10 pb-6 border-b border-slate-100">
            <div className="flex flex-col items-center text-center">
              
              {/* Photo Frame with active indicator */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                  <img 
                    src={profileImg} 
                    alt="Lohana Ramos Paludett" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Active status pulse badge */}
                <span className="absolute bottom-2 right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0d9488] border-2 border-white"></span>
                </span>
              </div>

              {/* Title Block */}
              <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-800 uppercase leading-tight">
                {portfolioData.fullName}
              </h1>
              <p className="text-[#0d9488] font-bold text-xs mt-1 uppercase tracking-wider font-mono">
                {portfolioData.shortName}
              </p>
              
              <div className="mt-2 text-sm font-medium text-slate-600 flex flex-col gap-1 items-center">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold uppercase tracking-wide text-xs">
                  <Stethoscope className="w-4 h-4 text-[#0d9488] shrink-0" />
                  <span>Técnica em Enfermagem</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wide text-[10px]">
                  <Briefcase className="w-3.5 h-3.5 text-[#0d9488]/70 shrink-0" />
                  <span>Auxiliar em Saúde Bucal (ASB)</span>
                </div>
              </div>

              {/* COREN ACTIVE Tag */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#0d9488] text-xs font-bold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span>
                <span>COREN RS ATIVO: {portfolioData.coren}</span>
              </div>

              {/* Location Badge */}
              <div className="mt-2 flex items-center gap-1 text-slate-500 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{portfolioData.location}</span>
              </div>

              {/* Instant Social/Contact Connect Buttons (Row layout) */}
              <div className="grid grid-cols-3 gap-3 w-full mt-6">
                
                {/* WhatsApp */}
                <a 
                  id="btn-whatsapp"
                  href={portfolioData.whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 mt-2">WhatsApp</span>
                </a>

                {/* Instagram */}
                <a 
                  id="btn-instagram"
                  href={portfolioData.instagramLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E1306C] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 mt-2">Instagram</span>
                </a>

                {/* E-mail Contact */}
                <button 
                  id="btn-email"
                  onClick={handleCopyEmail}
                  className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-400 text-white flex items-center justify-center group-hover:scale-105 transition-transform relative">
                    <Mail className="w-5 h-5" />
                    {copiedText && (
                      <span className="absolute -top-1 bg-[#0d9488] text-white text-[9px] px-1.5 py-0.5 rounded-md animate-fade-in">Copiado!</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-700 mt-2">E-mail</span>
                </button>

              </div>

              {/* Main Premium PDF Download Button Strip */}
              <div className="-mx-6 mt-6 bg-[#0d9488] py-3.5 px-6 flex items-center justify-between text-white shadow-sm">
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-50">Currículo Completo</p>
                  <p className="text-[10px] text-teal-100/90 font-medium font-mono">Formato otimizado para sistemas ATS</p>
                </div>
                <button
                  id="btn-download-pdf"
                  onClick={generateResumePDF}
                  className="bg-white text-[#0d9488] hover:bg-teal-50 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer uppercase tracking-wider shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                </button>
              </div>

            </div>
          </div>

          {/* Continuous Single-Page Sections (Sobre, Experiência, Formação, Diferenciais) */}
          <div className="px-6 py-8 space-y-12">
            
            {/* SECTION 1: SOBRE MIM */}
            <section id="sec-sobre" className="space-y-6 scroll-mt-14">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-2 bg-[#0d9488] h-5 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Sobre Mim</h2>
              </div>

              {/* Career Focus Customizer */}
              <div className="bg-teal-50/50 rounded-3xl p-4 border border-teal-100/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 mb-2">
                  <Sparkles className="w-4 h-4 text-[#0d9488]" />
                  <span>Selecione a área de interesse do recrutador:</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'geral', label: 'Geral' },
                    { id: 'enfermagem', label: 'Enfermagem' },
                    { id: 'saude_bucal', label: 'Saúde Bucal' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      id={`focus-${item.id}`}
                      onClick={() => setCareerFocus(item.id as any)}
                      className={`py-1.5 px-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${
                        careerFocus === item.id
                          ? 'bg-[#0d9488] text-white shadow-sm'
                          : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objective Section */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Objetivo Profissional</h3>
                <p className="text-sm leading-relaxed text-slate-600 italic font-serif">
                  "{portfolioData.objective}"
                </p>
              </div>

              {/* Profile Summary Section */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Perfil Profissional</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {getDynamicSummary()}
                </p>
              </div>

              {/* Interactive Stats Panel */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center">
                    <div className="mb-1 text-[#0d9488]">{stat.icon}</div>
                    <span className="text-lg font-bold text-slate-800">{stat.value}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-tight mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick Interactive Contact Composer */}
              <div className="bg-[#0d9488] p-6 rounded-3xl text-white shadow-lg shadow-teal-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <HeartHandshake className="w-5 h-5 text-teal-200" />
                  <span className="font-bold text-sm">Gostaria de agendar uma entrevista?</span>
                </div>
                
                {!isComposing ? (
                  <button
                    id="btn-compose-start"
                    onClick={() => setIsComposing(true)}
                    className="w-full bg-white text-[#0d9488] text-xs font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer hover:bg-teal-50 uppercase tracking-wider"
                  >
                    Enviar Mensagem Personalizada
                  </button>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      id="input-whatsapp-message"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Ex: Olá Lohana, gostamos do seu perfil para uma vaga de técnica no hospital. Podemos agendar?"
                      className="w-full text-xs text-slate-800 bg-white p-2.5 rounded-lg border-0 focus:ring-2 focus:ring-teal-400 placeholder:text-slate-400 h-20 resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        id="btn-compose-cancel"
                        onClick={() => {
                          setIsComposing(false);
                          setCustomMessage('');
                        }}
                        className="flex-1 border border-white/25 hover:bg-white/10 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        Cancelar
                      </button>
                      <button
                        id="btn-compose-send"
                        onClick={handleSendWhatsApp}
                        className="flex-1 bg-white text-[#0d9488] hover:bg-teal-50 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 2: EXPERIÊNCIA */}
            <section id="sec-experiencia" className="space-y-6 scroll-mt-14 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 bg-[#0d9488] h-5 rounded-full"></span>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Experiência</h2>
                </div>
                <span className="text-[9px] bg-teal-50 text-[#0d9488] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest border border-teal-100/50">Atuação</span>
              </div>

              {/* Experience Horizontal Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'hospitalar', label: 'Hospitalar' },
                  { id: 'odontologia', label: 'Odontologia/ASB' },
                  { id: 'home_care', label: 'Home Care' },
                  { id: 'estagio', label: 'Estágios' }
                ].map((filt) => (
                  <button
                    key={filt.id}
                    id={`filter-${filt.id}`}
                    onClick={() => setExperienceFilter(filt.id as any)}
                    className={`py-1.5 px-3 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      experienceFilter === filt.id
                        ? 'bg-[#0d9488] text-white animate-pulse-subtle'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {filt.label}
                  </button>
                ))}
              </div>

              {/* Experience Timeline */}
              <div className="relative border-l-2 border-teal-100 pl-4 ml-2 space-y-8 mt-4">
                {filteredExperiences.map((exp, index) => {
                  // Custom tags depending on segment
                  const getThemeStyles = (type: string) => {
                    switch (type) {
                      case 'hospitalar':
                        return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/50', label: 'Enfermagem Hospitalar' };
                      case 'odontologia':
                        return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/50', label: 'Saúde Bucal / ASB' };
                      case 'home_care':
                        return { bg: 'bg-amber-50 text-amber-700 border-amber-200/50', label: 'Cuidados / Home Care' };
                      case 'estagio':
                        return { bg: 'bg-sky-50 text-sky-700 border-sky-200/50', label: 'Estágio Técnico' };
                      default:
                        return { bg: 'bg-slate-50 text-slate-700 border-slate-200/50', label: 'Profissional' };
                    }
                  };
                  const theme = getThemeStyles(exp.type);

                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* Dot accent indicator */}
                      <span className="absolute -left-[23px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#0d9488] border-2 border-white shadow-sm ring-4 ring-teal-50"></span>
                      
                      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                        
                        {/* Segment Tag */}
                        <span className={`inline-block text-[9px] font-bold px-2.5 py-0.5 rounded-full border mb-3 uppercase tracking-wider ${theme.bg}`}>
                          {theme.label}
                        </span>

                        {/* Job Title & Period */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <h4 className="text-sm font-bold text-slate-800 tracking-tight">{exp.role}</h4>
                          <span className="text-[10px] bg-teal-50 text-[#0d9488] border border-teal-100/50 px-3 py-1 rounded-full font-bold uppercase tracking-widest w-max shrink-0">
                            {exp.period}
                          </span>
                        </div>

                        {/* Company Name */}
                        <p className="text-xs font-semibold text-[#0d9488] mt-1">{exp.company}</p>

                        {/* Activities checklist */}
                        <ul className="mt-4 space-y-2">
                          {exp.activities.map((act, actIdx) => (
                            <li key={actIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-[#0d9488] shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>

                      </div>
                    </motion.div>
                  );
                })}

                {filteredExperiences.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-xs bg-slate-50/50 rounded-2xl border border-dashed border-slate-100">
                    Nenhuma experiência registrada nesta categoria.
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 3: FORMAÇÃO */}
            <section id="sec-formacao" className="space-y-6 scroll-mt-14 pt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-2 bg-[#0d9488] h-5 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Formação</h2>
              </div>

              <div className="space-y-4">
                {portfolioData.educationList.map((edu, index) => (
                  <div key={index} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center shrink-0 mt-0.5">
                      {edu.degree.includes('Enfermagem') ? <Stethoscope className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-sm font-bold text-slate-800 leading-snug">{edu.degree}</h4>
                      <p className="text-xs font-bold text-[#0d9488] uppercase tracking-wide">{edu.institution}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {edu.period}
                        </span>
                        <span className="bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights of advanced certifications */}
              <div className="bg-[#0d9488]/10 rounded-3xl p-6 border border-teal-100/50 text-teal-950">
                <h4 className="text-xs font-bold text-teal-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0d9488]" />
                  <span>Habilitações de Destaque</span>
                </h4>
                <ul className="space-y-3.5 text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                    <span><strong>Suporte Básico de Vida (BLS):</strong> Preparada para atuar prontamente em emergências respiratórias e cardíacas de alta gravidade.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                    <span><strong>Instrumentadora Cirúrgica Odontológica:</strong> Expertise no manuseio de autoclave, controle rigoroso de biossegurança e assistência direta a procedimentos invasivos.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 4: DIFERENCIAIS */}
            <section id="sec-diferenciais" className="space-y-6 scroll-mt-14 pt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-2 bg-[#0d9488] h-5 rounded-full"></span>
                <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Diferenciais</h2>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Abaixo estão os diferenciais e competências estratégicas de Lohana estruturadas para passar com excelência por triagens de recrutamento digital (sistemas ATS) e entrevistas técnicas.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: 'Biossegurança Rígida',
                    desc: 'Aplicação máxima de protocols de esterilização e assepsia. Monitoramento do fluxo na CME de forma exemplar.',
                    icon: <ShieldCheck className="w-6 h-6 text-[#0d9488]" />
                  },
                  {
                    title: 'Atuação Dual Versátil',
                    desc: 'Competência simultânea e articulada em enfermagem e rotinas de consultório dentário (ASB).',
                    icon: <Sparkles className="w-6 h-6 text-indigo-600" />
                  },
                  {
                    title: 'Assistência Humanizada',
                    desc: 'Comunicação assertiva, acolhimento integral, alto nível de empatia com idosos e pacientes dependentes.',
                    icon: <Heart className="w-6 h-6 text-rose-600" />
                  },
                  {
                    title: 'Organização Operacional',
                    desc: 'Gerenciamento de prontuários com riqueza técnica, passagem de plantão clara, e presteza sob alta demanda.',
                    icon: <FileText className="w-6 h-6 text-amber-600" />
                  }
                ].map((dif, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                      {dif.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{dif.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">{dif.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete list of ATS keywords */}
              <div>
                <h4 className="text-xs font-bold text-[#0d9488] uppercase tracking-widest mb-3">Palavras-Chave de Competência (ATS)</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.competencies.map((comp, idx) => (
                    <span key={idx} className="text-xs font-semibold text-[#0d9488] bg-teal-50/50 border border-teal-100/30 px-3 py-1.5 rounded-xl">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </section>

          </div>

        </div>

        {/* Sticky Call Action for Quick Booking/Call */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 border-t border-slate-100 backdrop-blur-md flex items-center justify-between gap-3 z-30 shadow-md">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Contato Direto</span>
            <span className="text-xs font-extrabold text-slate-800">{portfolioData.phone}</span>
          </div>
          <a
            id="btn-footer-whatsapp"
            href={portfolioData.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 max-w-[200px] bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-xs py-3 px-3 rounded-2xl shadow-sm text-center flex items-center justify-center gap-1.5 transition-colors active:scale-[0.98] uppercase tracking-wider"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>Falar com Lohana</span>
          </a>
        </div>

      </div>
    </div>
  );
}
