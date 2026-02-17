import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
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
  Gift,
  Terminal,
  Layout as LayoutIcon,
  MessageSquare
} from 'lucide-react';
import { BackgroundCells } from './components/ui/background-ripple-effect';

const Button = ({ children, className = "", onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`relative overflow-hidden bg-gradient-to-r from-[#00FF88] to-[#00D1FF] text-[#020202] font-black py-5 px-10 rounded-xl transition-all neon-glow-btn group flex items-center justify-center gap-3 uppercase tracking-widest text-sm md:text-base ${className}`}
  >
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
    {children}
  </button>
);

const SectionTitle = ({ children, highlight, subtitle, description, animate = false }: { children?: React.ReactNode, highlight?: string, subtitle?: string, description?: string, animate?: boolean }) => {
  const content = (
    <div className="text-center mb-16 md:mb-20">
      {subtitle && <span className="text-[#00FF88] font-mono text-xs tracking-[0.3em] uppercase block mb-4">{subtitle}</span>}
      <h2 className="text-3xl md:text-6xl font-black leading-tight">
        {children}
        {highlight && <span className="text-gradient"> {highlight}</span>}
      </h2>
      {description && (
        <p className="mt-6 text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed italic">
          {description}
        </p>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }
  return content;
};

const FAQAccordion: React.FC<{ item: { question: string, answer: string } }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 overflow-hidden rounded-2xl glass-panel transition-all border-white/5 hover:border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left transition-colors"
      >
        <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-[#00FF88]' : 'text-gray-200'}`}>{item.question}</span>
        <div className={`p-2 rounded-full glass-panel transition-transform ${isOpen ? 'rotate-180 bg-[#00FF88]/10' : ''}`}>
          <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 ${isOpen ? 'text-[#00FF88]' : 'text-gray-500'}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 border-t border-white/5">
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialCarousel = () => {
  const images = [
    "https://i.imgur.com/9i60L1M.jpeg",
    "https://i.imgur.com/Eb5eOKI.jpeg",
    "https://i.imgur.com/EINlKJb.png",
    "https://i.imgur.com/xv8vgRF.jpeg",
    "https://i.imgur.com/CVgweZN.jpeg",
    "https://i.imgur.com/4kmKtq9.jpeg"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full max-w-4xl h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
          >
            <div className="glass-panel p-2 rounded-3xl md:rounded-[2.5rem] border-[#00FF88]/20 shadow-2xl overflow-hidden h-full">
              <img 
                src={images[currentIndex]} 
                alt={`Depoimento ${currentIndex + 1}`}
                className="w-full h-full object-contain md:object-cover rounded-2xl md:rounded-[2rem]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 z-10 p-3 rounded-full glass-panel border-white/10 hover:border-[#00FF88]/40 hover:bg-[#00FF88]/5 transition-all hidden md:block"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6 text-[#00FF88]" />
        </button>
        <button
          className="absolute right-4 z-10 p-3 rounded-full glass-panel border-white/10 hover:border-[#00FF88]/40 hover:bg-[#00FF88]/5 transition-all hidden md:block"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6 text-[#00FF88]" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-3 mt-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex ? 'w-8 bg-[#00FF88]' : 'w-3 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [checklist, setChecklist] = useState([false, false, false, false]);

  const toggleCheck = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    // Dispara o evento de rastreamento do Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    // Redireciona para o checkout
    window.location.href = 'https://pay.kiwify.com.br/ZQnfEu4';
  };

  const RibbonContent = ({ reverse = false }: { reverse?: boolean }) => (
    <div className={reverse ? "flex items-center gap-12 animate-marquee-reverse py-2 whitespace-nowrap" : "flex items-center gap-12 animate-marquee py-2 whitespace-nowrap"}>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 whitespace-nowrap flex-shrink-0">
           <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88]"></span>
           <span className="text-white font-black text-[14px] italic tracking-tighter uppercase flex gap-3 whitespace-nowrap">
             VIOLINO <span className="text-[#00FF88]">DO ZERO</span> 2026
           </span>
        </div>
      ))}
      {[...Array(10)].map((_, i) => (
        <div key={`dup-${i}`} className="flex items-center gap-12 whitespace-nowrap flex-shrink-0">
           <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88]"></span>
           <span className="text-white font-black text-[14px] italic tracking-tighter uppercase flex gap-3 whitespace-nowrap">
             VIOLINO <span className="text-[#00FF88]">DO ZERO</span> 2026
           </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen text-white selection:bg-[#00FF88] selection:text-black bg-grid">
      <div className="bg-radial-glow fixed inset-0 pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <BackgroundCells>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto px-6 py-20 relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-[#00FF88]/10 border border-[#00FF88]/30 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#00FF88]" />
              <span className="text-[#00FF88] font-mono text-[10px] uppercase tracking-widest font-bold">Início Imediato Disponível</span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter pointer-events-none text-white">
              O Começo Certo <br />
              <span className="text-gradient">no Violino</span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-2xl mb-12 max-w-3xl leading-relaxed pointer-events-none">
              Descubra um caminho simples e direto para dar seus primeiros passos no violino com qualidade. Desenvolvido para quem quer começar do zero e sentir a emoção de tocar suas primeiras músicas com segurança.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
              <Button onClick={scrollToPricing} className="w-full sm:w-auto min-w-[280px]">
                QUERO TOCAR VIOLINO <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </BackgroundCells>
      </section>

      {/* Ribbons */}
      <div className="relative z-20 py-16 md:py-24 overflow-hidden bg-[#020202] flex flex-col items-center justify-center">
        <div className="absolute w-[150%] h-10 md:h-14 bg-black border-y border-white/10 flex items-center transform -rotate-[7deg] z-10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
           <RibbonContent />
        </div>
        <div className="absolute w-[150%] h-10 md:h-14 bg-black border-y border-white/10 flex items-center transform rotate-[2deg] z-20 shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
           <RibbonContent reverse />
        </div>
      </div>

      {/* Interactive Assessment */}
      <section className="py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionTitle 
            animate
            subtitle="Diagnóstico Inicial" 
            highlight="SIM!"
            description="Marque os desafios que impedem você de tocar violino."
          >
            Você se identifica com algum destes pontos? Responda
          </SectionTitle>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 gap-4 md:gap-8 mb-20"
          >
            {[
              "Sente que o violino é um instrumento difícil demais para aprender sozinho?",
              "Já tentou ver vídeos soltos na internet mas acabou ficando mais confuso?",
              "Tem medo de adquirir vícios de postura que prejudiquem sua evolução?",
              "Gostaria de tocar suas músicas favoritas mas não sabe por onde começar?"
            ].map((question, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                onClick={() => toggleCheck(idx)}
                className={`group flex items-center gap-5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] glass-panel cursor-pointer transition-all duration-500 ${checklist[idx] ? 'border-[#00FF88]/50 bg-[#00FF88]/5' : 'hover:border-white/20'}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${checklist[idx] ? 'bg-[#00FF88] border-[#00FF88] shadow-[0_0_20px_rgba(0,255,136,0.5)]' : 'border-white/10 group-hover:border-[#00FF88]/30'}`}>
                  {checklist[idx] ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-black" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>}
                </div>
                <p className={`text-base md:text-lg transition-all ${checklist[idx] ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>
                  {question}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Music className="w-32 h-32 md:w-48 md:h-48 text-[#00FF88]" />
            </div>
            
            <p className="text-gray-400 text-sm md:text-lg mb-4 font-mono tracking-widest uppercase">Plano de Estudo:</p>
            <h3 className="text-2xl md:text-5xl font-black mb-10 uppercase italic tracking-tighter text-white">
              Com o Desafio <span className="text-[#00FF88]">Violino do Zero</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-12 text-left">
              {[
                "Dominar a postura correta desde o primeiro dia",
                "Tocar suas primeiras músicas em tempo recorde",
                "Aprender sem depender de partitura ou conceitos chatos de teoria musical",
                "Aprender com um passo a passo bem estruturado e validado"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-4 glass-panel rounded-2xl border-white/5 group hover:border-[#00FF88]/30 transition-all">
                  <div className="mt-1 p-1 bg-[#00FF88]/20 rounded-lg group-hover:bg-[#00FF88] transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] group-hover:text-[#020202]" />
                  </div>
                  <p className="text-xs md:text-base text-gray-300 font-medium group-hover:text-white transition-colors">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
            
            <Button onClick={scrollToPricing} className="mx-auto">
              Garantir Minha Vaga <ArrowRight className="w-5 h-5"/>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="py-24 md:py-32 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Fases da Jornada" highlight="sua evolução">Acompanhe seu progresso</SectionTitle>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.3 } }
            }}
            className="flex flex-col lg:flex-row items-stretch justify-center gap-0 relative"
          >
             {[
               { step: "Fase 1", title: "Fundamentos Elite", desc: "Postura, empunhadura do arco e as primeiras notas com som limpo e cristalino.", icon: <BookOpen className="w-6 h-6 md:w-7 md:h-7"/> },
               { step: "Fase 2", title: "Mecanismo Ativo", desc: "Exercícios de agilidade para os dedos e coordenação motora avançada.", icon: <Zap className="w-6 h-6 md:w-7 md:h-7"/> },
               { step: "Fase 3", title: "Repertório", desc: "Aplicação de toda técnica nas músicas que você sempre sonhou em tocar.", icon: <Globe className="w-6 h-6 md:w-7 md:h-7"/> }
             ].map((item, i) => (
               <React.Fragment key={i}>
                 <motion.div 
                   variants={{
                     hidden: { opacity: 0, y: 30 },
                     visible: { opacity: 1, y: 0 }
                   }}
                   transition={{ duration: 0.8 }}
                   className="flex-1 group relative p-8 md:p-12 transition-all duration-700 glass-panel border-[#00FF88]/10 bg-gradient-to-b from-[#00FF88]/5 to-transparent z-10 hover:border-[#00FF88]/40 shadow-none rounded-[2rem] lg:first:rounded-r-none lg:last:rounded-l-none"
                 >
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 bg-[#00FF88] text-[#020202] shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                          {item.icon}
                        </div>
                        <span className="font-mono text-[10px] text-[#00FF88]/60 tracking-[0.4em] uppercase font-bold">{item.step}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black mb-5 tracking-tighter text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 group-hover:text-gray-200 transition-colors">{item.desc}</p>
                    <div className="h-1 w-full bg-[#00FF88]/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-[#00FF88]/40 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite]"></div>
                        </div>
                    </div>
                 </motion.div>
                 
                 {i < 2 && (
                    <motion.div 
                      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                      className="hidden lg:flex items-center justify-center -mx-4 z-30"
                    >
                      <div className="w-8 h-8 rounded-full glass-panel border-[#00FF88]/40 flex items-center justify-center bg-[#020202]">
                         <ChevronRight className="w-4 h-4 text-[#00FF88]" />
                      </div>
                    </motion.div>
                 )}

                 {i < 2 && (
                    <div className="lg:hidden flex justify-center -my-5 py-2 z-30">
                      <div className="w-10 h-10 rounded-full glass-panel border-[#00FF88]/40 flex items-center justify-center bg-[#020202]">
                         <ArrowDown className="w-4 h-4 text-[#00FF88]" />
                      </div>
                    </div>
                 )}
               </React.Fragment>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 md:py-32 px-6 overflow-hidden">
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
          
          <div className="mt-20 flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-4 glass-panel rounded-3xl border-white/5">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020202] bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=violinist-${i}`} alt="Aluno" />
                  </div>
                ))}
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm md:text-base font-medium text-gray-400">
                  Junte-se a <span className="text-white font-bold">+250 alunos</span> que já iniciaram sua jornada.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1 mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#00FF88] fill-[#00FF88]" />)}
                  <span className="text-[10px] text-[#00FF88] ml-2 font-bold uppercase tracking-widest">Nota 4.9/5 nas avaliações</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Get Block */}
      <section className="py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            animate 
            subtitle="Conteúdo Completo" 
            highlight="receber"
            description="Tudo o que você precisa para sair do absoluto zero e tocar com confiança."
          >
            Tudo o que você vai
          </SectionTitle>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { icon: <Music className="w-8 h-8" />, title: "Método Passo a Passo", desc: "Aulas direto ao ponto, sem enrolação, focadas no que realmente importa.", tag: "CONTEÚDO", accent: "#00FF88" },
              { icon: <Music className="w-8 h-8" />, title: "MATERIAL DIDÁTICO", desc: "Material em PDF para acompanhar cada aula e praticar em casa.", tag: "RECURSOS", accent: "#00D1FF" },
              { icon: <Rocket className="w-8 h-8" />, title: "ATUALIZAÇÕES FUTURAS", desc: "Compre hoje pelo valor atual e receba todas as atualizações sem custo adicional.", tag: "EXCLUSIVO", accent: "#00FF88" },
              { icon: <Gift className="w-8 h-8" />, title: "Bônus: Primeiros Hinos", desc: "Módulo exclusivo ensinando hinos e músicas clássicas simples.", tag: "BÔNUS", isBonus: true, accent: "#00D1FF" },
              { icon: <Star className="w-8 h-8" />, title: "Bônus: Teoria Básica", desc: "Tudo o que você precisa de teoria musical aplicado ao violino.", tag: "BÔNUS", isBonus: true, accent: "#00FF88" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`relative group bg-[#080808] rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden shadow-2xl`}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${item.accent}, transparent)` }}
                />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-105 transition-all duration-500`} style={{ color: item.accent }}>
                      {item.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-gray-400 group-hover:text-white transition-colors`}>
                      {item.tag}
                    </span>
                  </div>
                  
                  <h4 className="text-xl md:text-2xl font-black mb-4 tracking-tighter uppercase text-gray-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed group-hover:text-gray-400 transition-colors">
                    {item.desc}
                  </p>
                </div>

                {item.isBonus && (
                  <div className="absolute top-4 right-4">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: item.accent, boxShadow: `0 0 10px ${item.accent}` }}></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Offer */}
      <section id="pricing" className="py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
           <div className="absolute -top-5 -left-5 md:-top-10 md:-left-10 w-16 h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-[#00FF88]/30 rounded-tl-3xl"></div>
           <div className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 w-16 h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-[#00D1FF]/30 rounded-br-3xl"></div>
           
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="glass-panel rounded-[3rem] md:rounded-[4rem] p-1 border-white/10"
           >
              <div className="bg-[#050505]/90 backdrop-blur-3xl rounded-[2.9rem] md:rounded-[3.9rem] p-8 md:p-20 text-center">
                 <div className="inline-block glass-panel px-4 md:px-6 py-2 rounded-full border-[#00FF88]/20 text-[#00FF88] font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-8 md:mb-12">
                   Oferta Especial de Lançamento
                 </div>
                 <h3 className="text-3xl md:text-6xl font-black mb-12 md:mb-16 tracking-tighter leading-tight text-white">
                   Garanta sua Vaga no <span className="text-gradient">Desafio Violino</span>
                 </h3>

                 <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6 mb-16 md:mb-20 text-left max-w-2xl mx-auto">
                    {[
                      "Curso Violino do Zero",
                      "Acesso Anual",
                      "Material Didático (PDF)",
                      "Atualizações Futuras",
                      "Certificado de Conclusão",
                      "Garantia de 7 Dias"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                         <div className="p-1 rounded-md glass-panel border-[#00FF88]/30 group-hover:bg-[#00FF88] transition-all">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] group-hover:text-[#020202]" />
                         </div>
                         <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                 </div>

                 <div className="mb-12 md:mb-16 relative">
                    <p className="text-gray-500 line-through text-base md:text-lg font-bold mb-2">De R$ 197,00</p>
                    <div className="flex flex-col items-center">
                       <span className="text-gradient text-6xl md:text-9xl font-black tracking-tighter leading-none">R$ 37</span>
                       <span className="text-white/40 text-[10px] md:text-xs font-mono mt-4 uppercase tracking-[0.3em]">ou 4x de R$ 10,07</span>
                    </div>
                 </div>

                 <Button onClick={handleCheckout} className="w-full py-6 md:py-8 text-lg md:text-xl tracking-[0.1em]">
                   Ativar Acesso Agora <Rocket className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                 </Button>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 md:py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden border-[#00FF88]/20 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-transparent"
          >
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
              <div className="relative">
                <div className="w-40 h-40 md:w-64 md:h-64 rounded-full glass-panel border-[#00FF88]/30 flex items-center justify-center relative">
                  <div className="bg-gradient-to-tr from-[#00FF88] to-[#00D1FF] w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,255,136,0.3)]">
                    <ShieldCheck className="w-12 h-12 md:w-20 md:h-20 text-[#020202]" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#020202] border-2 border-[#00FF88] px-4 py-2 rounded-xl rotate-12">
                  <span className="block text-xl font-black text-[#00FF88] leading-none">7 DIAS</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-tight text-white">
                  Satisfação <span className="text-[#00FF88] italic">Garantida</span>
                </h2>
                <p className="text-gray-400 text-base md:text-xl leading-relaxed mb-8">
                  Teste o curso por 7 dias. Se não gostar da metodologia ou sentir que o violino não é para você, devolvemos seu dinheiro integralmente. Risco zero.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"></div>
                      <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">Reembolso 100% Digital</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
           <div className="flex items-center gap-2 mb-12 justify-center">
              <Layers className="w-5 h-5 text-[#00D1FF]" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white">Perguntas Frequentes</h2>
           </div>
           {[
             { q: "Preciso ter o violino?", a: "Sim, para praticar as aulas você precisará de um instrumento. No curso dou dicas de como escolher o seu primeiro violino." },
             { q: "Nunca toquei nada, consigo?", a: "Com certeza! O método foi desenhado especificamente para quem está saindo do zero absoluto ou para quem é iniciante." },
             { q: "As aulas são ao vivo?", a: "As aulas são gravadas em alta definição para você assistir quando e onde quiser, no seu ritmo." },
             { q: "Por quanto tempo tenho acesso?", a: "Seu acesso é anual. Pode ver e rever as aulas quantas vezes precisar dentro desse período." }
           ].map((faq, i) => (
             <FAQAccordion key={i} item={{question: faq.q, answer: faq.a}} />
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00FF88] to-[#00D1FF] flex items-center justify-center font-black text-[#020202]">V</div>
             <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Violino do Zero V.2026</p>
          </div>
          <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest text-center">
            © {new Date().getFullYear()} Desafio Violino do Zero. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse delay-75"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;