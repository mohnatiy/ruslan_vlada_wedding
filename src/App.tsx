import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { MapPin, Calendar as CalendarIcon, Heart, Clock, Utensils, Music, GlassWater, Gift, Send, ChevronDown, Bell, X, Phone } from "lucide-react";

import photo1 from './assets/photo1.jpg';
import photo2 from './assets/photo2.jpg';
import photo3 from './assets/photo3.jpg';
import photo4 from './assets/photo4.jpg';
import photo5 from './assets/photo5.jpg';

const WavyLine = ({ to, color, bgColor, upsideDown = false }: { to?: "cream" | "olive" | "dark", color?: string, bgColor?: string, upsideDown?: boolean }) => {
  const fill = color || (to === "cream" ? "#FAF9F6" : (to === "dark" ? "#1A240A" : "#4A5D23"));
  const bgStyle = bgColor ? { backgroundColor: bgColor } : {};
  const bgClass = !bgColor ? (to === "cream" ? "bg-olive" : "bg-cream") : "";
  
  return (
    <div className={`w-full relative z-20 select-none pointer-events-none -my-[3px] ${bgClass}`} style={bgStyle}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-[40px] sm:h-[80px] block scale-y-[1.15] ${upsideDown ? 'rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,120 L0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

const BackgroundSketches = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] select-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wedding-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
          <g stroke="#4A5D23" strokeWidth="0.8" fill="none">
            {/* Flower 1 */}
            <path d="M 50 50 Q 60 20 80 40 T 110 50" />
            <path d="M 50 50 Q 80 80 110 50" />
            {/* Flower 2 */}
            <path d="M 200 150 Q 220 120 240 150 T 280 150" />
            {/* Hearts */}
            <path d="M 150 50 Q 160 30 170 50 Q 180 70 150 90 Q 120 70 130 50 Q 140 30 150 50" />
            {/* Rings */}
            <circle cx="50" cy="220" r="12" />
            <circle cx="65" cy="225" r="12" />
            {/* Sparkles */}
            <path d="M 250 250 L 255 265 L 270 270 L 255 275 L 250 290 L 245 275 L 230 270 L 245 265 Z" />
            <path d="M 100 120 L 110 130 M 110 120 L 100 130" />
            {/* Arches */}
            <path d="M 200 50 Q 250 0 300 50" strokeDasharray="4 4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wedding-pattern)" />
    </svg>
  </div>
);

const SoftMinimalFrame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative p-2 sm:p-4 bg-white/50 backdrop-blur-sm rounded-[40px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-white mx-auto ${className}`}>
    <div className="absolute inset-0 border-[2px] border-olive/15 rounded-[40px] m-2 pointer-events-none" />
    <div className="relative z-10 overflow-hidden rounded-[32px]">
      {children}
    </div>
  </div>
);

const ArchedWindowFrame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative mx-auto p-3 sm:p-5 ${className} w-full`}>
    {/* Frame Background */}
    <div className="absolute inset-0 bg-cream/95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-t-full rounded-b-xl border border-gold/30" />
    
    {/* Inner dashed border */}
    <div className="absolute inset-2 sm:inset-3 border-[1.5px] border-dashed border-gold/60 rounded-t-full rounded-b-xl pointer-events-none" />
    
    {/* Content Container */}
    <div className="relative z-10 overflow-hidden shadow-inner border border-olive/10 h-full" style={{ borderTopLeftRadius: '9999px', borderTopRightRadius: '9999px', borderBottomLeftRadius: '0.75rem', borderBottomRightRadius: '0.75rem' }}>
      {children}
    </div>

    {/* Elegant embellishment at bottom */}
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-end gap-1 text-gold z-20 drop-shadow-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
        <path d="M12 2C9 2 7 5 9 8C6 6 2 8 4 11C2 14 6 16 9 14C7 17 9 20 12 20C15 20 17 17 15 14C18 16 22 14 20 11C22 8 18 6 15 8C17 5 15 2 12 2Z" />
      </svg>
    </div>
  </div>
);

const FadeInWhenVisible = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const CountdownTimer = () => {
  const targetDate = new Date('2026-07-19T16:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-3 sm:gap-6 mt-10">
      {[
        { label: "Дней", value: timeLeft.days },
        { label: "Часов", value: timeLeft.hours },
        { label: "Минут", value: timeLeft.minutes },
        { label: "Секунд", value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-olive rounded-full flex items-center justify-center text-cream font-serif text-xl sm:text-3xl border-2 border-gold/40 shadow-lg mb-2">
            {item.value}
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-olive/80 font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// Move random generation outside to prevent re-renders and fix potential infinity loops
const sparkles = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  size: `${Math.random() * 2 + 1}px`,
}));

const flowers = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 90 + 5}%`,
  left: `${Math.random() * 90 + 5}%`,
  rotation: `${Math.random() * 360}deg`,
  scale: Math.random() * 0.2 + 0.15,
  opacity: Math.random() * 0.15 + 0.05,
}));

const stars = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 95 + 2}%`,
  left: `${Math.random() * 95 + 2}%`,
  rotation: `${Math.random() * 360}deg`,
  scale: Math.random() * 0.15 + 0.1,
  delay: `${Math.random() * 4}s`,
}));

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRSVPSuccess, setIsRSVPSuccess] = useState(false);
  const [isRSVPLoading, setIsRSVPLoading] = useState(false);
  const [attendance, setAttendance] = useState<string>("yes");

  const { scrollYProgress } = useScroll();
  const yFinal = useTransform(scrollYProgress, [0.8, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <BackgroundSketches />
      
      {/* ENTRANCE SCREEN */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="entrance"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-[radial-gradient(circle_at_70%_20%,_#8B9474_0%,_#4A5D23_60%,_#2D3A15_100%)] z-[2000] flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Sparkles/Stars */}
            {sparkles.map((s) => (
              <div
                key={s.id}
                className="absolute bg-white rounded-full animate-sparkle opacity-0"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                  boxShadow: "0 0 10px white",
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-12 text-center"
            >
              <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto border-8 border-white/20 rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-float">
                <img 
                  src={photo1} 
                  alt="Couple" 
                  className="w-full h-full object-cover bg-olive/20"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Envelope Body */}
              <div className="w-[280px] h-[190px] bg-[#f9e4e8] rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-visible">
                {/* Flap */}
                <div 
                  className="absolute top-0 left-0 w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-t-[100px] border-t-[#f2d0d8] z-30"
                />

                {/* Burgundy Wax Seal - Pulsing */}
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 z-[40]">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="w-14 h-14 bg-[#721c24] rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.5),0_5px_15px_rgba(0,0,0,0.3)] flex items-center justify-center border-2 border-[#5a161d] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                      <span className="font-serif text-xl text-white/70 select-none">RV</span>
                      <div className="absolute top-1 left-2 w-2 h-2 bg-white/10 rounded-full blur-[1px]" />
                    </div>
                    <motion.div 
                      animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-[-10px] bg-[#721c24] rounded-full -z-10 blur-xl"
                    />
                  </motion.div>
                </div>
                
                {/* Drawn flower base on envelope */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[#c99aa3] w-32 h-16 flex justify-center items-end pointer-events-none z-10">
                   <svg width="60" height="40" viewBox="0 0 100 60">
                     <path d="M50,60 Q45,30 20,25 Q30,40 50,60" fill="currentColor" />
                     <path d="M50,60 Q55,30 80,25 Q70,40 50,60" fill="currentColor" />
                     <path d="M48,35 Q30,10 50,0 Q70,10 52,35 Z" fill="currentColor" />
                     <circle cx="50" cy="35" r="5" fill="currentColor" className="text-gold/50" />
                   </svg>
                </div>
              </div>
            </motion.div>

            {/* Decorative Sketches Removed */}
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-12 font-cursive text-3xl text-gold tracking-widest drop-shadow-md text-center w-full"
            >
              Открыть приглашение в сказку
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND SPARKLES (ONLY VISIBLE WHEN OPEN) */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden opacity-50">
          {stars.map((s) => (
            <div
              key={s.id + 'star'}
              className="absolute text-white animate-pulse opacity-60"
              style={{
                top: s.top,
                left: s.left,
                transform: `rotate(${s.rotation}) scale(${s.scale})`,
                animationDelay: s.delay,
                animationDuration: `3s`,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 100 100">
                <path d="M50,0 Q50,50 100,50 Q50,50 50,100 Q50,50 0,50 Q50,50 50,0 Z" fill="currentColor" />
              </svg>
            </div>
          ))}
          {sparkles.map((s) => (
            <div
              key={s.id + 'main'}
              className="absolute bg-white rounded-full animate-sparkle opacity-0 shadow-[0_0_10px_white]"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
              }}
            />
          ))}
          {flowers.map((f) => (
            <div
              key={f.id + 'flower'}
              className="absolute text-gold pointer-events-none"
              style={{
                top: f.top,
                left: f.left,
                transform: `rotate(${f.rotation}) scale(${f.scale})`,
                opacity: f.opacity
              }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50,10 C60,40 90,40 90,50 C90,60 60,60 50,90 C40,60 10,60 10,50 C10,40 40,40 50,10 Z" fill="currentColor" />
                <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* MAIN CONTENT */}
      {isOpen && (
        <main className="relative z-10">
          {/* Scroll Cat Progress */}
          <div className="fixed right-2 sm:right-6 top-0 bottom-0 w-10 pointer-events-none z-50">
            <div 
              className="absolute left-1/2 -translate-x-1/2 text-olive drop-shadow-md transition-all duration-300"
              style={{ top: `${scrollProgress}%`, marginTop: '-20px' }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <ChevronDown size={32} strokeWidth={2} className="text-olive drop-shadow-sm opacity-80" />
              </motion.div>
            </div>
          </div>

          {/* SECTION 1: WELCOME */}
          <section className="bg-olive min-h-[80vh] flex flex-col justify-center items-center py-24 px-4 text-center relative overflow-hidden">
            <FadeInWhenVisible className="z-10 w-full flex flex-col items-center">
              <p className="text-[11px] uppercase tracking-[8px] mb-6 opacity-100 px-5 font-serif italic text-[#faf9f6] font-bold text-center">Приглашают разделить свой счастливый день</p>
              <h1 className="font-cursive text-7xl sm:text-8xl mb-12 text-gold drop-shadow-xl px-5 leading-tight text-center">Руслан & Влада</h1>
              
              {/* Photo 2: First photo on page 2 */}
              <div className="max-w-[700px] mx-auto px-4 relative w-full flex justify-center">
                  <img 
                    src={photo2} 
                    alt="Bride and Groom" 
                    className="w-full object-cover max-h-[75vh] min-h-[350px] sm:min-h-[550px] bg-olive/10 block transition-transform duration-1000 hover:scale-[1.02] rounded-2xl shadow-2xl relative z-10"
                  />
              </div>
              
              <p className="font-cursive text-4xl mt-16 italic text-[#faf9f6] px-5 drop-shadow-md text-center">Когда «однажды» становится «навсегда» </p>
            </FadeInWhenVisible>
            
            {/* Decorative Arches */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
               <svg className="w-full h-full" viewBox="0 0 1200 800">
                  <path d="M0,100 Q600,0 1200,100" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                  <path d="M0,700 Q600,800 1200,700" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
               </svg>
            </div>
          </section>

          <WavyLine to="cream" />

          {/* SECTION 2: DATE */}
          <section className="bg-cream py-20 px-5 text-center text-gray-800 overflow-hidden">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-8 uppercase tracking-widest text-olive">19 Июля 2026</h2>
              <div className="relative flex justify-around items-center max-w-[400px] mx-auto py-10 scale-110">
                <div className="absolute inset-0 m-auto -z-0 pointer-events-none flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-56 h-56 text-[#c24d67] opacity-40">
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      d="M50,35 C50,35 48,24 34,24 C24,24 18,32 18,42 C18,56 34,68 50,81 C66,68 82,56 82,42 C82,32 76,24 66,24 C52,24 50,35 50,35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.7 }}
                      transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                      d="M52,37 C52,37 50,26 36,26 C26,26 21,34 21,43 C21,57 36,67 52,82 C68,67 83,57 83,43 C83,34 78,26 68,26 C53,26 52,37 52,37"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1 z-10">
                  <p className="text-[10px] font-bold opacity-60">СБ</p>
                  <p className="font-serif text-4xl">18</p>
                </div>
                <div className="flex-1 z-10 transform scale-125">
                  <p className="text-[10px] font-bold text-pink">ВС</p>
                  <p className="font-serif text-4xl text-pink">19</p>
                </div>
                <div className="flex-1 z-10 text-gray-400">
                  <p className="text-[10px] font-bold opacity-60">ПН</p>
                  <p className="font-serif text-4xl">20</p>
                </div>
              </div>
              <p className="mt-6 font-medium text-olive/80">Ждем вас к 16:00</p>
              
              <CountdownTimer />

              <div className="mt-10 flex justify-center">
                <a 
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Свадьба+Руслана+и+Влады&dates=20260719T160000/20260719T230000&details=Свадебное+торжество&location=Ресторан+%C2%ABОнегин%C2%BB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-olive hover:bg-olive/90 text-cream px-6 py-3 rounded-full font-serif transition-all shadow-[0_4px_14px_rgba(74,93,35,0.3)] hover:shadow-[0_6px_20px_rgba(74,93,35,0.4)] hover:-translate-y-1 active:translate-y-0"
                >
                  <Bell className="w-5 h-5" />
                  <span>Поставить будильник</span>
                </a>
              </div>
            </FadeInWhenVisible>
          </section>

          {/* Photo 3: Second photo on page 2 */}
          <div className="bg-cream pb-12 sm:pb-24 px-4">
            <FadeInWhenVisible>
              <div className="max-w-[700px] mx-auto">
                <SoftMinimalFrame>
                  <img src={photo3} alt="Couple" className="w-full object-cover max-h-[60vh] min-h-[300px] sm:min-h-[400px]" />
                </SoftMinimalFrame>
              </div>
            </FadeInWhenVisible>
          </div>

          <WavyLine to="olive" />

          {/* SECTION 3: LOCATION */}
          <section className="bg-olive py-20 px-4 text-center relative">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-4 text-cream uppercase tracking-widest px-5">Место события</h2>
              <p className="font-serif text-2xl sm:text-3xl text-gold mb-1 px-5 uppercase tracking-tighter">Загородный клуб Онегин</p>
              <p className="text-[10px] sm:text-xs text-white mb-10 tracking-[0.4em] uppercase font-bold">Большая веранда</p>
              
              {/* Photo 5: Venue Photo (3rd Photo on Page 2) */}
              <div className="max-w-[800px] mx-auto px-4 mb-10">
                <SoftMinimalFrame>
                  <img 
                    src={photo5} 
                    alt="Wedding Venue" 
                    className="w-full object-cover max-h-[60vh] min-h-[300px] sm:min-h-[400px] bg-olive/10 block rounded-none sm:rounded-lg shadow-2xl"
                  />
                </SoftMinimalFrame>
              </div>

              <div className="space-y-2 mb-10">
                <p className="text-sm opacity-90 max-w-[400px] mx-auto px-5 italic">Тишковское лесничество, Московская обл.</p>
                <div className="flex items-center justify-center gap-2 text-gold/80 text-xs tracking-widest uppercase font-bold">
                  <MapPin size={14} />
                  <span>Метро для трансфера: Шипиловская</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border-4 border-white mx-auto max-w-[90%] shadow-xl mb-8">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=37.717537%2C56.074255&z=15&pt=37.717537%2C56.074255%2Cpm2rdl" 
                  width="100%" 
                  height="300" 
                  frameBorder="0"
                  title="Map to Onegin"
                />
              </div>

              <a 
                href="https://yandex.ru/maps/?rtext=~56.074255,37.717537" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-cream text-olive rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:scale-105 hover:bg-gold hover:text-cream transition-all duration-300"
              >
                Построить маршрут
              </a>
            </FadeInWhenVisible>
          </section>

          <WavyLine to="cream" />

          {/* SECTION 4: DRESS CODE */}
          <section className="bg-cream py-20 px-5 text-center text-gray-800">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-6 uppercase tracking-widest text-olive">Дресс-код</h2>
              <p className="max-w-[400px] mx-auto text-sm leading-relaxed mb-10">
                Поддержите нас Вашими улыбками и объятиями, а также красивыми нарядами в цветовой гамме мероприятия:
              </p>

              <div className="space-y-12 max-w-[600px] mx-auto">
                {/* Ladies Palette */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[4px] font-bold text-olive/50 font-serif">Для Леди</p>
                  <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-6 justify-items-center">
                    {[
                      { color: "#F2D0D8", label: "Пудровый" },
                      { color: "#C24D67", label: "Роза" },
                      { color: "#E5D3B3", label: "Шампань" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] uppercase font-bold opacity-30 tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-6 justify-items-center max-w-[200px] mx-auto sm:max-w-none">
                    {[
                      { color: "#B3C8BA", label: "Мята" },
                      { color: "#4A5D23", label: "Олива" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] uppercase font-bold opacity-30 tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gentlemen Palette */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[4px] font-bold text-olive/50 font-serif">Для Джентльменов</p>
                  <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-6 justify-items-center">
                    {[
                      { color: "#2D3A15", label: "Хвоя" },
                      { color: "#8B9474", label: "Шалфей" },
                      { color: "#5D4037", label: "Кофе" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] uppercase font-bold opacity-30 tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-6 justify-items-center max-w-[200px] mx-auto sm:max-w-none">
                    {[
                      { color: "#D5B08D", label: "Песочный" },
                      { color: "#3A3A3A", label: "Графит" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] uppercase font-bold opacity-30 tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[11px] italic text-gray-500 max-w-[250px] mx-auto mt-12 mb-10">
                Для лесной площадки рекомендуем выбирать удобную обувь.
              </p>
            </FadeInWhenVisible>
          </section>

          <WavyLine to="olive" />

          {/* SECTION 5: SCHEDULE */}
          <section className="bg-olive py-20 px-5">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl text-center mb-16 text-cream uppercase tracking-widest">Программа дня</h2>
              <div className="max-w-[400px] mx-auto space-y-12 relative">
                {/* The vertical line */}
                <div className="absolute left-[35px] top-[35px] bottom-[35px] w-[2px] bg-gold/30 -z-0" />
                
                {[
                  { time: "15:00", title: "Welcome", desc: "Сбор гостей и фуршет", icon: <Clock /> },
                  { time: "16:00", title: "Церемония", desc: "Самый важный момент", icon: <Heart /> },
                  { time: "17:00", title: "Ужин", desc: "Торжественный банкет", icon: <Utensils /> },
                  { time: "23:00", title: "Финал", desc: "Окончание вечера", icon: <Bell /> },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 text-left relative z-10"
                  >
                    <div className="min-w-[70px] h-[70px] rounded-full bg-olive text-cream flex items-center justify-center font-bold border-2 border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] text-lg bg-olive/100">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold mb-1 tracking-wide text-gold">{item.title}</h3>
                      <p className="text-sm opacity-80">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeInWhenVisible>
          </section>

          <WavyLine to="cream" />

          {/* SECTION 6: GIFTS */}
          <section className="bg-cream py-20 px-5 text-center text-gray-800">
            <FadeInWhenVisible>
              <div className="max-w-[500px] mx-auto bg-white/40 p-8 sm:p-12 rounded-3xl shadow-lg border border-gold/10">
                <Gift className="w-12 h-12 mx-auto text-gold mb-6" />
                <h2 className="font-serif text-3xl mb-6 uppercase tracking-widest text-olive">Пожелания по подаркам</h2>
                <p className="text-sm leading-relaxed opacity-90 max-w-[400px] mx-auto text-olive/90">
                  Мы не хотим обременять вас выбором подарка — будем благодарны вкладу в бюджет нашей семьи.
                </p>
              </div>
            </FadeInWhenVisible>
          </section>

          <WavyLine to="olive" color="#4A5D23" />

          {/* SECTION 6.5: CONTACTS - Premium Redesign */}
          <section className="bg-olive py-24 px-5 text-cream relative overflow-hidden">
            {/* Elegant Background Accents */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            
            <FadeInWhenVisible>
              <div className="max-w-[700px] mx-auto text-center">
                <div className="mb-16 space-y-4">
                  <span className="text-[10px] uppercase tracking-[8px] text-gold/60 font-serif italic">Wedding Concierge</span>
                  <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.2em] text-cream">Ваши помощники</h2>
                  <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
                  <p className="text-sm opacity-80 italic font-serif max-w-[300px] mx-auto leading-relaxed">Если у вас есть вопросы или сюрпризы — наш организатор всегда на связи:</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 mb-20">
                  {/* Elena */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative p-10 bg-white/[0.03] border border-white/10 rounded-[3rem] group overflow-hidden backdrop-blur-sm"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />
                    <p className="font-serif text-4xl text-gold mb-4 group-hover:scale-110 transition-transform duration-500">Елена</p>
                    <div className="flex flex-col items-center gap-4">
                        <a href="tel:+79150222308" className="flex items-center gap-3 text-lg sm:text-xl font-mono tracking-tight text-cream/80 hover:text-gold transition-colors">
                            <Phone size={16} className="text-gold/50" />
                            +7 915 022 2308
                        </a>
                        <div className="text-[9px] uppercase tracking-[3px] opacity-40">Звонок / Telegram</div>
                    </div>
                  </motion.div>

                  {/* Viktoria */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative p-10 bg-white/[0.03] border border-white/10 rounded-[3rem] group overflow-hidden backdrop-blur-sm"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />
                    <p className="font-serif text-4xl text-gold mb-4 group-hover:scale-110 transition-transform duration-500">Виктория</p>
                    <div className="flex flex-col items-center gap-4">
                        <a href="tel:+79262711951" className="flex items-center gap-3 text-lg sm:text-xl font-mono tracking-tight text-cream/80 hover:text-gold transition-colors">
                            <Phone size={16} className="text-gold/50" />
                            +7 926 271-19-51
                        </a>
                        <div className="text-[9px] uppercase tracking-[3px] opacity-40">Звонок / Telegram</div>
                    </div>
                  </motion.div>
                </div>

                <div className="relative inline-block group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-cream/20 to-gold/20 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                  <motion.a 
                    href="https://t.me/+B-NMidxkT040YjZi"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative inline-flex items-center gap-4 bg-[#2D3A15] px-12 py-5 rounded-full border border-gold/40 text-gold hover:text-cream transition-all font-serif italic text-xl shadow-xl"
                  >
                    <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span>Присоединиться к чату гостей</span>
                  </motion.a>
                </div>
              </div>
            </FadeInWhenVisible>
          </section>

          <WavyLine to="olive" color="#4A5D23" bgColor="transparent" />

          {/* SECTION 7: RSVP */}
          <section className="bg-olive py-24 px-5 text-cream relative overflow-hidden">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-12 text-center uppercase tracking-widest text-cream">Анкета гостя</h2>
              <div className="max-w-[400px] sm:max-w-[500px] mx-auto bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl space-y-6 border border-white/20 text-gray-800 relative z-10">
                <AnimatePresence mode="wait">
                  {isRSVPSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Send size={36} />
                      </div>
                      <h3 className="font-serif text-3xl text-olive mb-4 italic">Спасибо!</h3>
                      <p className="text-sm opacity-70 leading-relaxed">Ваш ответ успешно отправлен.<br />Мы с нетерпением ждем встречи!</p>
                      <button 
                        onClick={() => setIsRSVPSuccess(false)}
                        className="mt-10 text-[10px] font-bold uppercase tracking-[4px] text-[#c24d67] hover:underline cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                      >
                        Изменить ответ
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsRSVPLoading(true);
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        
                        const drinks = formData.getAll("drinks") as string[];
                        const transport = formData.get("transport") || "";
                        
                        const data = {
                          attendance: attendance === "yes" ? "Приду" : "Не смогу",
                          name: formData.get("name") || "",
                          menu: attendance === "yes" ? (formData.get("wishes") || "") : "-",
                          drinks: attendance === "yes" ? drinks : [],
                          dietary: formData.get("dietary") || "",
                          comments: formData.get("comments") || "",
                          transport: attendance === "yes" ? transport : "-"
                        };
                        
                        const scriptUrl = "https://script.google.com/macros/s/AKfycbzUL5JsyKY8S1MaHnPTbRDhtrGols2fdkD9_ff4OyE3uKlId3PnNGpSXAigNAJ7SBQ/exec"; 

                        if (scriptUrl) {
                          fetch(scriptUrl, { 
                            method: "POST", 
                            body: JSON.stringify(data), 
                            mode: "no-cors"
                          })
                            .then(() => {
                              setIsRSVPSuccess(true);
                              setIsRSVPLoading(false);
                            })
                            .catch((error) => {
                              console.error("Ошибка формы:", error);
                              setIsRSVPLoading(false);
                              alert("Ошибка при отправке.");
                            });
                        } else {
                          setTimeout(() => {
                            setIsRSVPSuccess(true);
                            setIsRSVPLoading(false);
                          }, 1000);
                        }
                      }}
                    >
                      <div className="mb-8">
                        <label className="block text-[10px] font-bold uppercase tracking-[4px] text-olive/50 mb-4">Ваше решение</label>
                        <div className="grid grid-cols-1 gap-3">
                          <label className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="attendance" 
                              value="yes" 
                              checked={attendance === "yes"}
                              onChange={() => setAttendance("yes")}
                              className="peer hidden" 
                            />
                            <div className="flex items-center justify-between px-5 py-4 border-2 border-gray-100 rounded-2xl peer-checked:bg-olive peer-checked:text-white peer-checked:border-olive transition-all text-sm font-medium group">
                              <span>С радостью приду</span>
                              <div className="w-5 h-5 rounded-full border-2 border-gray-200 peer-checked:border-white flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </label>
                          <label className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="attendance" 
                              value="no" 
                              checked={attendance === "no"}
                              onChange={() => setAttendance("no")}
                              className="peer hidden" 
                            />
                            <div className="flex items-center justify-between px-5 py-4 border-2 border-gray-100 rounded-2xl peer-checked:bg-[#c24d67] peer-checked:text-white peer-checked:border-[#c24d67] transition-all text-sm font-medium">
                              <span>Не смогу быть</span>
                              <X className="w-4 h-4 opacity-40" />
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-[10px] font-bold uppercase tracking-[4px] text-olive/50 mb-3">Ваше Имя</label>
                        <input 
                          name="name"
                          type="text" 
                          placeholder="Имя и Фамилия"
                          required
                          className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-olive/20 outline-none transition-all placeholder:text-gray-300 font-medium"
                        />
                      </div>
                      
                      <AnimatePresence>
                        {attendance === "yes" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden space-y-6"
                          >
                            <div className="pt-2">
                              <label className="block text-[10px] font-bold uppercase tracking-[4px] text-olive/50 mb-3">Основное блюдо</label>
                              <div className="relative">
                                <select name="wishes" className="w-full bg-gray-50 border-none p-5 pr-12 rounded-2xl focus:ring-2 focus:ring-olive/20 outline-none appearance-none truncate font-medium text-sm">
                                  <option>Миньон с картофельным гратеном</option>
                                  <option>Перепелка с жареным кремом</option>
                                  <option>Стейк лосося с красной икрой</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-[4px] text-olive/50 mb-4">Напитки</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Игристое вино", "Белое вино", "Красное вино", "Виски", "Коньяк", "Водка", "Безалкогольные"].map((drink) => (
                                  <label key={drink} className="flex items-center gap-3 text-[11px] cursor-pointer hover:bg-olive/5 p-3 rounded-xl border border-gray-100 transition-colors">
                                    <input type="checkbox" name="drinks" value={drink} className="w-4 h-4 accent-olive cursor-pointer" />
                                    <span className="font-medium">{drink}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-[4px] text-olive/50 mb-3">Есть ли у вас ограничения по питанию?</label>
                              <input 
                                name="dietary"
                                type="text" 
                                placeholder="Например: аллергия на орехи"
                                className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-olive/20 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-[4px] text-olive/50 mb-3">Ваши вопросы или пожелания</label>
                              <textarea 
                                name="comments"
                                rows={3}
                                placeholder="То, что мы не спросили..."
                                className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-olive/20 outline-none transition-all placeholder:text-gray-300 font-medium text-sm resize-none"
                              />
                            </div>

                              <div className="pb-4">
                                <label className="block text-[10px] font-bold uppercase tracking-[4px] text-olive/50 mb-3">Трансфер</label>
                                <div className="relative">
                                  <select name="transport" className="w-full bg-gray-50 border-none p-5 pr-12 rounded-2xl focus:ring-2 focus:ring-olive/20 outline-none appearance-none font-medium text-sm">
                                    <option>Трансфер от м. Шипиловская</option>
                                    <option>На своей машине (нужно парковочное место)</option>
                                    <option>Самостоятельно (такси)</option>
                                  </select>
                                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                              </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.button 
                        type="submit"
                        disabled={isRSVPLoading}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        className={`w-full bg-[#1A240A] hover:bg-[#2D3A15] text-white py-6 rounded-2xl font-bold tracking-[0.2em] text-[10px] shadow-2xl transition-all cursor-pointer uppercase mt-4 ${isRSVPLoading ? 'opacity-50 cursor-wait' : ''}`}
                      >
                        {isRSVPLoading ? "Отправляем..." : "Подтвердить участие"}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeInWhenVisible>
          </section>

          {/* FINAL PHOTO SECTION - Smooth Transition from RSVP */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A240A] mt-[-1px]">
            <div className="absolute inset-0 z-0">
               <img src={photo4} className="w-full h-full object-cover object-center" alt="Final Portrait" />
               <div className="absolute inset-0 bg-black/20" />
            </div>
            
            {/* Soft blending gradients */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#4A5D23] to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A240A] z-[1]" />
            
            <FadeInWhenVisible className="relative z-10 text-center px-4 w-full">
               <div className="max-w-[800px] mx-auto py-12">
                 <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="font-cursive text-7xl sm:text-9xl mb-8 text-gold drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                 >
                    До встречи!
                 </motion.p>
                 <div className="w-32 h-[1px] bg-gold/50 mx-auto mb-12 shadow-lg" />
                 <div className="space-y-6">
                    <p className="text-[10px] sm:text-xs tracking-[0.6em] uppercase opacity-90 text-cream italic font-bold">
                      С огромной любовью,
                    </p>
                    <p className="font-serif text-5xl sm:text-7xl uppercase tracking-[0.15em] text-cream leading-tight drop-shadow-2xl">
                      Руслан <span className="text-gold">&</span> Влада
                    </p>
                 </div>
               </div>
            </FadeInWhenVisible>
          </section>

          {/* FOOTER */}
          <footer className="bg-[#1A240A] py-20 text-center text-cream relative">
            <FadeInWhenVisible>
              <p className="font-cursive text-4xl text-gold mb-6 opacity-90 italic">Руслан & Влада</p>
              <div className="flex items-center justify-center gap-6 mb-2 opacity-60">
                <div className="h-px w-12 bg-gold/30" />
                <p className="text-[11px] uppercase tracking-[10px]">19.07.2026</p>
                <div className="h-px w-12 bg-gold/30" />
              </div>
            </FadeInWhenVisible>
          </footer>
        </main>
      )}
    </div>
  );
}

