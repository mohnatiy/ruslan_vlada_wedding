import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar as CalendarIcon, Heart, Clock, Utensils, Music, GlassWater } from "lucide-react";

const TornPaper = ({ to }: { to: "cream" | "olive" }) => {
  const fill = to === "cream" ? "#FAF9F6" : "#4A5D23";
  // More controlled jagged edge to prevent "bleeding" or floating gaps
  return (
    <div className="w-full h-[30px] relative z-20 select-none pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 L1200,0 L1200,10 L1190,15 L1175,8 L1160,20 L1145,12 L1130,22 L1115,10 L1100,18 L1085,8 L1070,20 L1055,12 L1040,22 L1025,10 L1010,18 L995,8 L980,20 L965,12 L950,22 L935,10 L920,18 L905,8 L890,20 L875,12 L860,22 L845,10 L830,18 L815,8 L800,20 L785,12 L770,22 L755,10 L740,18 L725,8 L710,20 L695,12 L680,22 L665,10 L650,18 L635,8 L620,20 L605,12 L590,22 L575,10 L560,18 L545,8 L530,20 L515,12 L500,22 L485,10 L470,18 L455,8 L440,20 L425,12 L410,22 L395,10 L380,18 L365,8 L350,20 L335,12 L320,22 L305,10 L290,18 L275,8 L260,20 L245,12 L230,22 L215,10 L200,18 L185,8 L170,20 L155,12 L140,22 L125,10 L110,18 L95,8 L80,20 L65,12 L50,22 L35,10 L20,18 L0,5 Z"
          fill={fill}
          className={to === 'cream' ? 'origin-center' : 'origin-center rotate-180'}
        />
      </svg>
    </div>
  );
};

const VintageFrame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative p-6 sm:p-10 ${className}`}>
    {/* Frame Background Layer */}
    <div className="absolute inset-4 sm:inset-6 bg-cream shadow-2xl z-0" />
    
    {/* Vine Corner - Top Left */}
    <svg className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 text-gold z-20" viewBox="0 0 100 100">
      <path d="M10,90 Q10,10 90,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="90" r="2" fill="currentColor" />
      <path d="M15,50 Q25,25 50,15" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M10,70 C10,30 40,10 80,10" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M85,10 L95,10" stroke="currentColor" strokeWidth="2" />
      <path d="M10,85 L10,95" stroke="currentColor" strokeWidth="2" />
    </svg>
    
    {/* Vine Corner - Top Right */}
    <svg className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 text-gold z-20 scale-x-[-1]" viewBox="0 0 100 100">
      <path d="M10,90 Q10,10 90,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15,50 Q25,25 50,15" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="90" r="2" fill="currentColor" />
    </svg>

    {/* Vine Corner - Bottom Left */}
    <svg className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 text-gold z-20 scale-y-[-1]" viewBox="0 0 100 100">
      <path d="M10,90 Q10,10 90,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15,50 Q25,25 50,15" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="90" r="2" fill="currentColor" />
    </svg>

    {/* Vine Corner - Bottom Right */}
    <svg className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 text-gold z-20 scale-[-1]" viewBox="0 0 100 100">
      <path d="M10,90 Q10,10 90,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15,50 Q25,25 50,15" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="90" r="2" fill="currentColor" />
    </svg>

    <div className="relative z-10 overflow-hidden rounded-sm border border-gold/10">
      {children}
    </div>
  </div>
);

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
                  <div className="w-[75px] h-[75px] bg-[#c24d67] rounded-full border-4 border-[#a63a52] shadow-lg animate-pulse-custom flex items-center justify-center relative overflow-hidden">
                    {/* Wax texture mock */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]" />
                    {/* Tiny flower icon on wax seal */}
                    <div className="absolute top-1 text-white/30 rotate-45">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="font-cursive text-white text-xl relative z-10 select-none">
                      R & V
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Flower Drawing on Envelope */}
            <div className="absolute -bottom-10 -right-10 opacity-20 text-cream pointer-events-none rotate-[-15deg]">
              <svg width="200" height="200" viewBox="0 0 100 100">
                <path d="M50,80 Q60,50 80,30" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="80" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M75,25 Q80,10 85,25" fill="none" stroke="currentColor" />
                <path d="M85,35 Q100,30 85,25" fill="none" stroke="currentColor" />
              </svg>
            </div>
            
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
          <section className="bg-olive py-20 px-4 text-center">
            <FadeInWhenVisible>
              <p className="text-[10px] uppercase tracking-[6px] mb-4 opacity-80 px-5">Приглашение</p>
              <h1 className="font-cursive text-6xl sm:text-7xl mb-10 text-gold drop-shadow-sm px-5">Руслан & Влада</h1>
              
              {/* Decorative Photo Frame */}
              <div className="max-w-[700px] mx-auto px-4">
                <VintageFrame>
                  <img 
                    src="photo1.jpg" 
                    alt="Bride and Groom" 
                    className="w-full object-cover max-h-[70vh] block transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                </VintageFrame>
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
          <section className="bg-olive py-20 px-4 text-center">
            <FadeInWhenVisible>
              <h2 className="font-serif text-3xl mb-4 text-cream uppercase tracking-widest px-5">Место события</h2>
              <p className="font-cursive text-5xl text-gold mb-8 px-5">«Онегин»</p>
              
              {/* Decorative Photo Frame for Location */}
              <div className="max-w-[800px] mx-auto px-4 mb-10">
                <VintageFrame>
                  <img 
                    src="photo2.jpg" 
                    alt="Wedding Venue" 
                    className="w-full object-cover max-h-[60vh] block"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                </VintageFrame>
              </div>

              <p className="text-sm mb-10 opacity-90 max-w-[300px] mx-auto px-5 italic">Тишковское лесничество, Московская обл.</p>

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
              <p className="text-center text-xs mb-8 opacity-60 max-w-[300px] mx-auto italic">
                Для отправки ответов в Google Таблицы необходимо вставить URL вашего Google Script в код
              </p>
              <div className="max-w-[400px] mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-3xl shadow-xl space-y-6 border border-olive/10">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    
                    // ИНСТРУКЦИЯ ПО GOOGLE SHEETS:
                    // 1. Создайте Google Таблицу
                    // 2. Инструменты -> Редактор скриптов
                    // 3. Используйте скрипт для обработки POST запроса
                    // 4. Опубликуйте как веб-приложение (доступ для всех)
                    // 5. Вставьте URL ниже
                    const scriptUrl = "https://script.google.com/macros/s/AKfycbxYMbeAL0gBtIBtnWbFlxKNlT-1oJRpGs1683RFGVPToicKYR8LoGC6dUZqGN2A-0E/exec"; 

                    if (scriptUrl) {
                      fetch(scriptUrl, { method: "POST", body: formData, mode: "no-cors" })
                        .then(() => alert("Спасибо! Ваш ответ отправлен."))
                        .catch((error) => {
                          console.error("Ошибка формы:", error);
                          alert("Ошибка при отправке.");
                        });
                    } else {
                      console.log("Form Data:", data);
                      alert("Форма работает! Ваши данные: " + JSON.stringify(data) + "\n\nДля реальной отправки в Google Таблицы нужен URL скрипта.");
                    }
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-olive mb-2">Ваше Имя</label>
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Иван Иванов"
                      required
                      className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-olive/20 outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-olive mb-2">Пожелания по меню</label>
                    <select name="menu" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-olive/20 outline-none appearance-none">
                      <option>Мясо</option>
                      <option>Рыба</option>
                      <option>Вегетарианское</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-olive mb-2">Напитки</label>
                    <select name="drinks" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-olive/20 outline-none appearance-none">
                      <option>Вино (белое/красное)</option>
                      <option>Игристое</option>
                      <option>Крепкий алкоголь</option>
                      <option>Безалкогольные</option>
                    </select>
                  </div>
                  
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#c24d67] hover:bg-[#a63a52] text-white py-5 rounded-xl font-bold tracking-widest text-sm shadow-xl transition-colors cursor-pointer uppercase"
                  >
                    Я обязательно приду
                  </motion.button>
                </form>
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

