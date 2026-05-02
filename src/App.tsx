import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar as CalendarIcon, Heart, Clock, Utensils, Music, GlassWater } from "lucide-react";

const TornPaper = ({ to }: { to: "cream" | "olive" }) => {
  const fill = to === "cream" ? "#FAF9F6" : "#4A5D23";
  return (
    <div className="w-full h-[50px] relative z-10 select-none pointer-events-none">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0V100c100-20,200,40,300,10,100-30,200,30,300,0,100-30,200,30,300,0,100-30,200,30,300,0V0Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Sparkles generation
  const sparkles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    size: `${Math.random() * 4 + 2}px`,
  }));

  return (
    <div className="min-h-screen">
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
                  src="photo1.jpg" 
                  alt="Couple" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop";
                  }}
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
              <div className="w-[280px] h-[190px] bg-cream rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-visible">
                {/* Flap */}
                <div 
                  className="absolute top-0 left-0 w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-t-[100px] border-t-[#E5D3B3]"
                />
                
                {/* Heart Seal */}
                <div className="absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-20 group-hover:scale-110 transition-transform duration-500">
                  <div className="heart-shape animate-pulse-custom flex items-center justify-center">
                    <span className="rotate-45 font-cursive text-white text-base sm:text-lg absolute top-[-5px] left-[5px] w-full text-center whitespace-nowrap">
                      R & V
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-12 font-cursive text-3xl text-gold tracking-widest drop-shadow-md"
            >
              Открыть сказку
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {isOpen && (
        <main className="relative">
          {/* SECTION 1: WELCOME */}
          <section className="bg-olive py-20 px-0 text-center">
            <FadeInWhenVisible>
              <p className="text-[10px] uppercase tracking-[6px] mb-4 opacity-80 px-5">Приглашение</p>
              <h1 className="font-cursive text-6xl sm:text-7xl mb-10 text-gold drop-shadow-sm px-5">Руслан & Влада</h1>
              <div className="w-full shadow-2xl overflow-hidden mb-8">
                <img 
                  src="photo1.jpg" 
                  alt="Bride and Groom" 
                  className="w-full object-cover max-h-[80vh]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <p className="font-cursive text-3xl mt-12 italic text-gold px-5">Однажды и навсегда...</p>
            </FadeInWhenVisible>
          </section>

          <TornPaper to="cream" />

          {/* SECTION 2: DATE */}
          <section className="bg-cream py-20 px-5 text-center text-gray-800 overflow-hidden">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-8 uppercase tracking-widest text-olive">19 Июля 2026</h2>
              <div className="relative flex justify-around items-center max-w-[400px] mx-auto py-10 scale-110">
                <Heart className="absolute inset-0 m-auto text-pink opacity-10 w-48 h-48 -z-0" />
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
            </FadeInWhenVisible>
          </section>

          <TornPaper to="olive" />

          {/* SECTION 3: LOCATION */}
          <section className="bg-olive py-20 px-0 text-center">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-4 text-cream uppercase tracking-widest px-5">Место события</h2>
              <p className="font-cursive text-5xl text-gold mb-2 px-5">«Онегин»</p>
              <p className="text-sm mb-10 opacity-90 max-w-[300px] mx-auto px-5">Тишковское лесничество, Московская обл.</p>
              
              <div className="w-full shadow-2xl overflow-hidden mb-10">
                <img 
                  src="photo2.jpg" 
                  alt="Wedding Venue" 
                  className="w-full object-cover max-h-[60vh]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="rounded-2xl overflow-hidden border-4 border-white mx-auto max-w-[90%] shadow-xl">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=37.717537%2C56.074255&z=15&pt=37.717537%2C56.074255%2Cpm2rdl" 
                  width="100%" 
                  height="300" 
                  frameBorder="0"
                  title="Map to Onegin"
                />
              </div>
            </FadeInWhenVisible>
          </section>

          <TornPaper to="cream" />

          {/* SECTION 4: DRESS CODE */}
          <section className="bg-cream py-20 px-5 text-center text-gray-800">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-6 uppercase tracking-widest text-olive">Дресс-код</h2>
              <p className="max-w-[300px] mx-auto text-sm leading-relaxed mb-8">
                Мы будем рады, если вы поддержите цветовую гамму нашей свадьбы в своих нарядах:
              </p>
              <div className="flex justify-center gap-4 mb-10">
                {[
                  { color: "#4A5D23", label: "Оливковый" },
                  { color: "#DCAE96", label: "Пудровый" },
                  { color: "#E5D3B3", label: "Шампань" },
                  { color: "#8B9474", label: "Шалфей" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div 
                      className="w-14 h-14 rounded-full border-4 border-white shadow-md"
                      style={{ backgroundColor: item.color }}
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-[11px] italic text-gray-500 max-w-[250px] mx-auto">
                Для лесной площадки рекомендуем выбирать удобную обувь.
              </p>
            </FadeInWhenVisible>
          </section>

          <TornPaper to="olive" />

          {/* SECTION 5: SCHEDULE */}
          <section className="bg-olive py-20 px-5">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl text-center mb-16 text-cream uppercase tracking-widest">Программа дня</h2>
              <div className="max-w-[400px] mx-auto space-y-12 relative">
                {/* The vertical line */}
                <div className="absolute left-[35px] top-[35px] bottom-[35px] w-[2px] bg-gold/30 -z-0" />
                
                {[
                  { time: "16:00", title: "Welcome", desc: "Сбор гостей и фуршет", icon: <GlassWater /> },
                  { time: "17:00", title: "Церемония", desc: "Самый важный момент", icon: <Heart /> },
                  { time: "18:30", title: "Ужин", desc: "Торжественный банкет", icon: <Utensils /> },
                  { time: "21:00", title: "Танцы", desc: "Праздничная вечеринка", icon: <Music /> },
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

          <TornPaper to="cream" />

          {/* SECTION 6: RSVP */}
          <section className="bg-cream py-24 px-5 pb-32 text-gray-800">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-10 text-center uppercase tracking-widest text-olive">Анкета гостя</h2>
              <div className="max-w-[400px] mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-3xl shadow-xl space-y-6 border border-olive/10">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-olive mb-2">Ваше Имя</label>
                  <input 
                    type="text" 
                    placeholder="Иван Иванов"
                    className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-olive/20 outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-olive mb-2">Пожелания по меню</label>
                  <select className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-olive/20 outline-none appearance-none">
                    <option>Мясо</option>
                    <option>Рыба</option>
                    <option>Вегетарианское</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-olive mb-2">Напитки</label>
                  <select className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-olive/20 outline-none appearance-none">
                    <option>Вино (белое/красное)</option>
                    <option>Игристое</option>
                    <option>Крепкий алкоголь</option>
                    <option>Безалкогольные</option>
                  </select>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#c24d67] hover:bg-[#a63a52] text-white py-5 rounded-xl font-bold tracking-widest text-sm shadow-xl transition-colors cursor-pointer mt-4 uppercase"
                >
                  Я обязательно приду
                </motion.button>
              </div>
            </FadeInWhenVisible>
          </section>

          {/* FOOTER */}
          <footer className="bg-olive py-12 text-center border-t border-cream/10">
            <p className="font-cursive text-4xl text-gold mb-2">Руслан & Влада</p>
            <p className="text-[10px] uppercase tracking-[4px] opacity-60">2026.07.19</p>
          </footer>
        </main>
      )}
    </div>
  );
}

