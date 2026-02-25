import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle,
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  Rocket, 
  Sparkles, 
  Layers, 
  Music,
  ChevronRight,
  ChevronLeft,
  ArrowDown,
  Globe,
  Star,
  Gift
} from 'lucide-react';
import { BackgroundCells } from './components/ui/background-ripple-effect';

// Performance optimization: Memoized static components with optimized touch handling
const Button = memo(({ children, className = "", onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`relative overflow-hidden bg-gradient-to-r from-[#00FF88] to-[#00D1FF] text-[#020202] font-black py-5 px-10 rounded-xl transition-all neon-glow-btn group flex items-center justify-center gap-3 uppercase tracking-widest text-sm md:text-base active:scale-95 touch-manipulation ${className}`}
  >
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
    {children}
  </button>
));

const SectionTitle = memo(({ children, highlight, subtitle, description, animate = false }: { children?: React.ReactNode, highlight?: string, subtitle?: string, description?: string, animate?: boolean }) => {
  const content = (
    <div className="text-center mb-16 md:mb-20">
      {subtitle && <span className="text-[#00FF88] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-4">{subtitle}</span>}
      <h2 className="text-3xl md:text-6xl font-black leading-tight">
        {children}
        {highlight && <span className="text-gradient"> {highlight}</span>}
      </h2>
      {description && (
        <p className="mt-6 text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed italic px-4 md:px-0">
          {description}
        </p>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }
  return content;
});

const FAQAccordion = memo(({ item }: { item: { question: string, answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 overflow-hidden rounded-2xl glass-panel transition-all border-white/5 hover:border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors active:bg-white/5"
        aria-expanded={isOpen}
      >
        <span className={`text-base md:text-lg font-bold transition-colors pr-4 ${isOpen ? 'text-[#00FF88]' : 'text-gray-200'}`}>{item.question}</span>
        <div className={`p-2 rounded-full glass-panel transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-[#00FF88]/10' : ''}`}>
          <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 ${isOpen ? 'text-[#00FF88]' : 'text-gray-500'}`} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 border-t border-white/5">
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const TestimonialCarousel = memo(() => {
  const images = [
    { src: "https://i.imgur.com/9i60L1M.jpeg", w: 800, h: 1000 },
    { src: "https://i.imgur.com/Eb5eOKI.jpeg", w: 800, h: 1000 },
    { src: "https://i.imgur.com/EINlKJb.png", w: 800, h: 1000 },
    { src: "https://i.imgur.com/xv8vgRF.jpeg", w: 800, h: 1000 },
    { src: "https://i.imgur.com/CVgweZN.jpeg", w: 800, h: 1000 },
    { src: "https://i.imgur.com/4kmKtq9.jpeg", w: 800, h: 1000 }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    })
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <div className="relative w-full flex flex-col items-center px-4">
      <div className="relative w-full max-w-4xl h-[450px] md:h-[650px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 }, 
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full flex items-center justify-center p-2 md:p-4"
          >
            <div className="glass-panel p-1.5 md:p-2 rounded-3xl md:rounded-[2.5rem] border-[#00FF88]/20 shadow-2xl overflow-hidden h-full aspect-[4/5]">
              <img 
                src={images[currentIndex].src} 
                width={images[currentIndex].w}
                height={images[currentIndex].h}
                alt={`Depoimento do aluno ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-2xl md:rounded-[2rem]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-0 z-10 p-3 rounded-full glass-panel border-white/10 hover:border-[#00FF88]/40 hover:bg-[#00FF88]/5 transition-all hidden md:block"
          onClick={() => paginate(-1)}
          aria-label="Depoimento Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-[#00FF88]" />
        </button>
        <button
          className="absolute right-0 z-10 p-3 rounded-full glass-panel border-white/10 hover:border-[#00FF88]/40 hover:bg-[#00FF88]/5 transition-all hidden md:block"
          onClick={() => paginate(1)}
          aria-label="Próximo Depoimento"
        >
          <ChevronRight className="w-6 h-6 text-[#00FF88]" />
        </button>
      </div>

      <div className="flex gap-2 md:gap-3 mt-8 md:mt-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 md:h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 md:w-8 bg-[#00FF88]' : 'w-2 md:w-3 bg-white/20'
            }`}
            aria-label={`Ir para depoimento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

const RibbonContent = memo(({ reverse = false }: { reverse?: boolean }) => (
  <div className={reverse ? "flex items-center gap-12 animate-marquee-reverse py-2 whitespace-nowrap" : "flex items-center gap-12 animate-marquee py-2 whitespace-nowrap"}>
    {[...Array(20)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 whitespace-nowrap flex-shrink-0">
         <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88]"></span>
         <span className="text-white font-black text-[14px] italic tracking-tighter uppercase flex gap-3 whitespace-nowrap">
           VIOLINO <span className="text-[#00FF88]">DO ZERO</span> 2026
         </span>
      </div>
    ))}
  </div>
));

const App: React.FC = () => {
  const [checklist, setChecklist] = useState([false, false, false, false]);

  const toggleCheck = useCallback((index: number) => {
    setChecklist(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const scrollToPricing = useCallback(() => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToSpecialOffer = useCallback(() => {
    const element = document.getElementById('special-offer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleCheckout = useCallback(() => {
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    window.location.href = 'https://pay.kiwify.com.br/ZQnfEu4';
  }, []);

  const handleCheckoutBasic = useCallback(() => {
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    window.location.href = 'https://pay.kiwify.com.br/Nil8OFn'; 
  }, []);

  return (
    <div className="relative min-h-screen text-white selection:bg-[#00FF88] selection:text-black bg-grid">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <BackgroundCells>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto px-6 py-16 md:py-20 relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-[#00FF88]/10 border border-[#00FF88]/30 px-4 py-2 rounded-full mb-6 md:mb-8 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />
              <span className="text-[#00FF88] font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold">Início Imediato</span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-black leading-[1.1] mb-6 md:mb-8 tracking-tighter text-white">
              Sua Primeira Música <br />
              <span className="text-gradient">em 7 Dias</span>
            </h1>
            
            <p className="text-gray-400 text-sm md:text-2xl mb-10 md:mb-12 max-w-3xl leading-relaxed px-2">
              Descubra o método testado para tocar sua primeira música no violino em apenas uma semana. Comece do zero absoluto com um passo a passo simples e direto.
            </p>
            
            <div className="w-full sm:w-auto px-4 sm:px-0">
              <Button onClick={scrollToSpecialOffer} className="w-full sm:w-auto min-w-[280px]">
                QUERO TOCAR VIOLINO <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </BackgroundCells>
      </section>

      {/* Ribbons */}
      <div className="relative z-20 h-40 md:h-64 overflow-hidden bg-[#020202]">
        <div className="absolute w-[200%] h-10 md:h-14 bg-black border-y border-white/10 flex items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[7deg] z-10">
           <RibbonContent />
        </div>
        <div className="absolute w-[200%] h-10 md:h-14 bg-black border-y border-white/10 flex items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[2deg] z-20">
           <RibbonContent reverse />
        </div>
      </div>

      {/* Interactive Assessment */}
      <section className="py-20 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionTitle 
            animate
            subtitle="Diagnóstico Inicial" 
            highlight="7 DIAS?"
            description="Marque os desafios que impedem você de tocar sua primeira música em uma semana."
          >
            Você acredita que pode tocar em
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-3 md:gap-8 mb-16 md:mb-20">
            {[
              "Sente que o violino é um instrumento difícil demais sozinho?",
              "Vídeos soltos na internet te deixam mais confuso?",
              "Tem medo de adquirir vícios de postura?",
              "Gostaria de tocar suas músicas favoritas do zero?"
            ].map((question, idx) => (
              <div 
                key={idx} 
                onClick={() => toggleCheck(idx)}
                className={`group flex items-center gap-4 p-5 md:p-8 rounded-[1.2rem] md:rounded-[2rem] glass-panel cursor-pointer transition-all duration-300 active:scale-[0.98] ${checklist[idx] ? 'border-[#00FF88]/50 bg-[#00FF88]/5' : 'hover:border-white/20'}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center transition-all ${checklist[idx] ? 'bg-[#00FF88] border-[#00FF88]' : 'border-white/10 group-hover:border-[#00FF88]/30'}`}>
                  {checklist[idx] ? <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-black" /> : <div className="w-1 h-1 rounded-full bg-white/10"></div>}
                </div>
                <p className={`text-sm md:text-lg transition-all leading-tight ${checklist[idx] ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>
                  {question}
                </p>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel rounded-[1.5rem] md:rounded-[3rem] p-6 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
              <Music className="w-24 h-24 md:w-48 md:h-48 text-[#00FF88]" />
            </div>
            
            <p className="text-gray-400 text-[10px] md:text-lg mb-4 font-mono tracking-widest uppercase">Plano de Estudo:</p>
            <h3 className="text-xl md:text-5xl font-black mb-8 md:mb-10 uppercase italic tracking-tighter text-white leading-tight">
              Com o Desafio <br className="md:hidden" /><span className="text-[#00FF88]">Violino do Zero</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-3 md:gap-6 max-w-3xl mx-auto mb-10 md:mb-12 text-left">
              {[
                "Postura correta desde o primeiro dia",
                "Sua primeira música completa em 7 dias",
                "Aprender sem teoria musical chata",
                "Passo a passo bem estruturado e validado"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 md:p-4 glass-panel rounded-xl md:rounded-2xl border-white/5">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] md:text-base text-gray-300 font-medium leading-tight">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
            
            <Button onClick={scrollToPricing} className="mx-auto w-full sm:w-auto">
              Garantir Minha Vaga <ArrowRight className="w-5 h-5 ml-1"/>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Phases */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Fases da Jornada" highlight="sua evolução">Acompanhe seu progresso</SectionTitle>

          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-3 lg:gap-0 relative">
             {[
               { step: "Fase 1", title: "Fundamentos", desc: "Postura e as primeiras notas com som limpo.", icon: <BookOpen className="w-6 h-6 md:w-7 md:h-7"/> },
               { step: "Fase 2", title: "Mecanismo", desc: "Agilidade para os dedos e coordenação motora.", icon: <Zap className="w-6 h-6 md:w-7 md:h-7"/> },
               { step: "Fase 3", title: "Repertório", desc: "Toque sua primeira música completa em apenas 7 dias.", icon: <Globe className="w-6 h-6 md:w-7 md:h-7"/> }
             ].map((item, i) => (
               <React.Fragment key={i}>
                 <div className="flex-1 group relative p-6 md:p-12 glass-panel border-[#00FF88]/10 bg-gradient-to-b from-[#00FF88]/5 to-transparent z-10 rounded-[1.2rem] lg:first:rounded-r-none lg:last:rounded-l-none">
                    <div className="flex justify-between items-start mb-6 md:mb-10">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-[#00FF88] text-[#020202] shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                          {item.icon}
                        </div>
                        <span className="font-mono text-[9px] text-[#00FF88]/60 tracking-[0.3em] uppercase font-bold">{item.step}</span>
                    </div>
                    <h4 className="text-xl md:text-3xl font-black mb-3 md:mb-5 tracking-tighter text-white">{item.title}</h4>
                    <p className="text-gray-400 text-xs md:text-base leading-relaxed mb-8 md:mb-10">{item.desc}</p>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-[#00FF88]/40"></div>
                    </div>
                 </div>
                 {i < 2 && (
                    <div className="hidden lg:flex items-center justify-center -mx-4 z-30">
                      <div className="w-8 h-8 rounded-full glass-panel border-[#00FF88]/40 flex items-center justify-center bg-[#020202]">
                         <ChevronRight className="w-4 h-4 text-[#00FF88]" />
                      </div>
                    </div>
                 )}
               </React.Fragment>
             ))}
          </div>
        </div>
      </section>

      {/* What you will receive */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            animate
            subtitle="Conteúdo Completo" 
            highlight="receber"
            description="Tudo o que você precisa para sair do absoluto zero e tocar com confiança."
          >
            Tudo o que você vai
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Método Passo a Passo",
                desc: "Aulas direto ao ponto, sem enrolação, focadas no que realmente importa.",
                tag: "CONTEÚDO",
                icon: <Music className="w-6 h-6 text-[#00FF88]" />,
                iconBg: "bg-[#00FF88]/10",
                borderColor: "border-[#00FF88]/20"
              },
              {
                title: "Material Didático",
                desc: "Material em PDF para acompanhar cada aula e praticar em casa.",
                tag: "RECURSOS",
                icon: <Music className="w-6 h-6 text-[#00D1FF]" />,
                iconBg: "bg-[#00D1FF]/10",
                borderColor: "border-[#00D1FF]/20"
              },
              {
                title: "Atualizações Futuras",
                desc: "Compre hoje pelo valor atual e receba todas as atualizações sem custo adicional.",
                tag: "EXCLUSIVO",
                icon: <Rocket className="w-6 h-6 text-[#00FF88]" />,
                iconBg: "bg-[#00FF88]/10",
                borderColor: "border-[#00FF88]/20"
              },
              {
                title: "Bônus: Primeiros Hinos",
                desc: "Módulo exclusivo ensinando hinos e músicas clássicas simples.",
                tag: "BÔNUS",
                icon: <Gift className="w-6 h-6 text-[#00D1FF]" />,
                iconBg: "bg-[#00D1FF]/10",
                borderColor: "border-[#00D1FF]/20",
                hasDot: true,
                dotColor: "bg-[#00D1FF]"
              },
              {
                title: "Bônus: Leitura de Partitura",
                desc: "Você irá conseguir ler e entender partituras de forma simplificada.",
                tag: "BÔNUS",
                icon: <Star className="w-6 h-6 text-[#00FF88]" />,
                iconBg: "bg-[#00FF88]/10",
                borderColor: "border-[#00FF88]/20",
                hasDot: true,
                dotColor: "bg-[#00FF88]"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-[2rem] glass-panel border ${item.borderColor} flex flex-col items-start gap-6 group hover:bg-white/[0.02] transition-colors`}
              >
                {item.hasDot && (
                  <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${item.dotColor} shadow-[0_0_10px_currentColor]`}></div>
                )}
                
                <div className="w-full flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center border border-white/5`}>
                    {item.icon}
                  </div>
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest text-gray-400 uppercase">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-black mb-3 text-white tracking-tight uppercase">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            animate 
            subtitle="Resultados Reais" 
            highlight="alunos"
            description="Veja o que os alunos estão compartilhando sobre sua evolução."
          >
            O que dizem nossos
          </SectionTitle>

          <TestimonialCarousel />
          
          <div className="mt-12 md:mt-20 flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 md:px-8 py-4 glass-panel rounded-2xl md:rounded-3xl border-white/5">
              <div className="flex -space-x-2.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#020202] bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=violinist-${i}`} width="32" height="32" alt="Aluno" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="text-center md:text-left">
                <p className="text-[11px] md:text-base font-medium text-gray-400">
                  Junte-se a <span className="text-white font-bold">+250 alunos</span>.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-[#00FF88] fill-[#00FF88]" />)}
                  <span className="text-[9px] text-[#00FF88] ml-1.5 font-bold uppercase tracking-widest">Nota 4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Block */}
      <section id="pricing" className="py-20 md:py-32 px-4 md:px-6 overflow-hidden scroll-mt-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Basic Offer */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-[2rem] md:rounded-[3rem] p-1 border-white/10 flex flex-col"
            >
              <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[1.9rem] md:rounded-[2.9rem] p-8 md:p-12 text-center flex-1 flex flex-col">
                <div className="inline-block glass-panel px-4 py-1.5 rounded-full border-white/10 text-gray-400 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] mb-8">
                  Oferta Básica
                </div>
                <h3 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter leading-tight text-white">
                  Início <br /><span className="text-gray-400">Essencial</span>
                </h3>

                <div className="space-y-3 mb-10 text-left max-w-xs mx-auto flex-1">
                  {[
                    { text: "Método Música em 7 Dias", included: true },
                    { text: "Acesso Anual", included: true },
                    { text: "Material Didático (PDF)", included: true },
                    { text: "Atualizações Futuras", included: false },
                    { text: "Bônus Leitura de Partituras", included: false },
                    { text: "Bônus Primeiros Hinos", included: false },
                    { text: "Certificado de Conclusão", included: false },
                    { text: "Garantia de 7 Dias", included: false }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      {item.included ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] flex-shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-white/10 flex-shrink-0" />
                      )}
                      <span className={`text-[11px] md:text-sm font-medium ${item.included ? 'text-gray-300' : 'text-white/20 line-through'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <div className="flex flex-col items-center">
                    <span className="text-white text-5xl md:text-6xl font-black tracking-tighter leading-none">R$ 17</span>
                    <span className="text-white/20 text-[9px] font-mono mt-3 uppercase tracking-[0.2em]">Pagamento Único</span>
                  </div>
                </div>

                <Button onClick={handleCheckoutBasic} className="w-full py-4 text-base bg-none bg-white/5 text-white border border-white/10 hover:bg-white/10 neon-glow-btn-hover shadow-none">
                  Escolher Plano Básico
                </Button>
              </div>
            </motion.div>

            {/* Special Offer */}
            <motion.div 
              id="special-offer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-[2rem] md:rounded-[3rem] p-1 border-[#00FF88]/30 flex flex-col relative scroll-mt-24"
            >
              {/* Mais Vendido Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-[#00FF88] text-black px-6 py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  🔥 Mais Vendido
                </div>
              </div>

              <div className="bg-[#050505]/90 backdrop-blur-3xl rounded-[1.9rem] md:rounded-[2.9rem] p-8 md:p-12 text-center flex-1 flex flex-col border border-[#00FF88]/10">
                <div className="inline-block glass-panel px-4 py-1.5 rounded-full border-[#00FF88]/20 text-[#00FF88] font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] mb-8">
                  Oferta Especial
                </div>
                <h3 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter leading-tight text-white">
                  Experiência <br /><span className="text-gradient">Completa</span>
                </h3>

                <div className="space-y-3 mb-10 text-left max-w-xs mx-auto flex-1">
                  {[
                    "Método Música em 7 Dias",
                    "Acesso Anual",
                    "Material Didático (PDF)",
                    "Atualizações Futuras",
                    "Bônus Leitura de Partituras",
                    "Bônus Primeiros Hinos",
                    "Certificado de Conclusão",
                    "Garantia de 7 Dias"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] flex-shrink-0" />
                      <span className="text-[11px] md:text-sm font-medium text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <p className="text-gray-500 line-through text-xs font-bold mb-1">De R$ 197,00</p>
                  <div className="flex flex-col items-center">
                    <span className="text-gradient text-6xl md:text-7xl font-black tracking-tighter leading-none">R$ 37</span>
                    <span className="text-white/40 text-[9px] font-mono mt-3 uppercase tracking-[0.2em]">ou 4x de R$ 10,07</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full py-5 text-lg">
                  Ativar Acesso VIP <Rocket className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Risk Zero */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-[1.5rem] md:rounded-[4rem] p-6 md:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-10 border-[#00FF88]/20 bg-gradient-to-br from-[#00FF88]/5 to-transparent">
              <div className="relative">
                <div className="w-32 h-32 md:w-56 md:h-56 rounded-full glass-panel border-[#00FF88]/30 flex items-center justify-center">
                  <ShieldCheck className="w-16 h-16 md:w-24 md:h-24 text-[#00FF88]" />
                </div>
                <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-[#020202] border-2 border-[#00FF88] px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl rotate-12">
                  <span className="text-sm md:text-xl font-black text-[#00FF88]">7 DIAS</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left px-2">
                <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter uppercase text-white leading-tight">Satisfação <span className="text-[#00FF88] italic">Garantida</span></h2>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                  Teste por 7 dias. Se não gostar, devolvemos seu dinheiro integralmente. Sem burocracia.
                </p>
              </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
           <div className="flex items-center gap-2 mb-10 md:mb-12 justify-center">
              <Layers className="w-4 h-4 md:w-5 md:h-5 text-[#00D1FF]" />
              <h2 className="text-xl md:text-3xl font-black tracking-tighter uppercase text-white">Dúvidas Frequentes</h2>
           </div>
           {[
             { q: "Preciso ter o violino?", a: "Sim, para praticar você precisará do instrumento. No curso dou dicas de como escolher seu primeiro violino." },
             { q: "É possível aprender em 7 dias?", a: "Sim! O método foca no que é essencial para você tocar sua primeira melodia completa já na primeira semana." },
             { q: "Nunca toquei nada, consigo?", a: "Com certeza! O método foi desenhado especificamente para iniciantes do zero absoluto." },
             { q: "Por quanto tempo tenho acesso?", a: "Seu acesso é anual. Pode ver as aulas quantas vezes precisar dentro desse período." }
           ].map((faq, i) => (
             <FAQAccordion key={i} item={{question: faq.q, answer: faq.a}} />
           ))}
        </div>
      </section>

      <footer className="py-12 md:py-20 px-6 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="flex items-center gap-3">
             <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-tr from-[#00FF88] to-[#00D1FF] flex items-center justify-center font-black text-[#020202]">V</div>
             <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">Violino do Zero 2026</p>
          </div>
          <p className="text-gray-600 text-[9px] font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Desafio Violino do Zero.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;