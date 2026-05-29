import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Flower } from "lucide-react";
import { FloatingPetals } from "./components/Petals";
import { MemoryModal } from "./components/MemoryModal";
import { memories } from "./data";
import { Memory } from "./types";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  
  const { scrollYProgress } = useScroll();
  
  // Background and Text color transitions for the cinematic night ending
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.7, 0.85, 1],
    ["#FFFCF9", "#FFFCF9", "#2A2633", "#1A1A24"]
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.7, 0.85, 1],
    ["#5A4D4A", "#5A4D4A", "#E8DCC4", "#FDFBF7"]
  );

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedMemory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedMemory]);

  return (
    <motion.main 
      className="min-h-screen relative font-sans"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FCE4EC] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E8EAF6] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#F5F5DC] rounded-full blur-[100px] opacity-20"></div>
      </div>
      
      <FloatingPetals />

      {/* Opening Section Overlay */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-center px-6 max-w-2xl flex flex-col items-center"
            >
              <span className="block text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-6 drop-shadow-sm">Chapter I — The Beginning</span>
              <h1 className="font-serif text-4xl md:text-5xl text-warm-dark tracking-tight leading-relaxed mb-12 font-light drop-shadow-sm">
                “For the girl who makes ordinary days feel softer.”
              </h1>
              <button
                onClick={() => setEntered(true)}
                className="px-10 py-3 rounded-full border border-warm-dark/10 bg-white/40 text-warm-dark/80 hover:bg-white/60 hover:border-warm-dark/20 transition-all duration-500 font-sans tracking-[0.3em] text-[10px] uppercase shadow-xl shadow-pink-100/20 backdrop-blur-md cursor-pointer"
              >
                Enter Garden
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${!entered ? "opacity-0 h-screen overflow-hidden" : "opacity-100"} transition-opacity duration-1000`}>
        {/* Emotional Scroll Section */}
        <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5 }}
            className="font-serif text-3xl md:text-5xl text-center max-w-xl leading-relaxed font-light drop-shadow-sm"
          >
            "you came quietly."
          </motion.h2>
        </section>

        <section className="min-h-screen flex items-center justify-center pt-12 pb-12 px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5 }}
            className="font-serif text-3xl md:text-5xl text-center max-w-xl leading-relaxed font-light drop-shadow-sm"
          >
            "but somehow, everything changed."
          </motion.h2>
        </section>

        <section className="min-h-screen flex items-center justify-center pt-12 pb-24 px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5 }}
            className="font-serif text-3xl md:text-5xl text-center max-w-xl leading-relaxed font-light drop-shadow-sm"
          >
            "even silence feels warm with you."
          </motion.h2>
        </section>

        {/* Interactive Flower Garden */}
        <section className="relative w-full max-w-3xl min-h-[120vh] mx-auto py-24 px-4 sm:px-12 z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-sans font-light tracking-widest text-sm mb-24 opacity-60 uppercase"
          >
            A garden of memories
          </motion.p>
          
          <div className="relative w-full h-[800px]">
            {memories.map((m) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: m.delay, type: "spring" }}
                className="absolute flex items-center justify-center group cursor-pointer"
                style={{ top: m.top, left: m.left }}
                onClick={() => setSelectedMemory(m)}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="relative flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-soft-pink/20 blur-xl absolute" />
                  <Flower 
                    size={32} 
                    strokeWidth={1}
                    className="text-warm-dark/50 group-hover:text-warm-dark transition-colors duration-500 z-10 drop-shadow-md" 
                  />
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute top-full whitespace-nowrap font-serif text-sm tracking-wider">
                    {m.date}
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Final Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="flex flex-wrap justify-center items-center gap-4 text-[13px] italic mb-8 mx-auto opacity-70 font-light">
              <span>you came quietly.</span>
              <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
              <span>everything changed.</span>
              <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
              <span>here to stay.</span>
            </div>
            
            <div className="text-center space-y-2 max-w-2xl">
              <p className="font-light text-lg md:text-xl mb-6 opacity-80 leading-relaxed">
                “If I could give you a place to live forever, I think it would look like this.”
              </p>
              
              <motion.div
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true, margin: "0px" }}
                 transition={{ duration: 2, delay: 0.5 }}
              >
                 <h2 className="font-serif text-5xl md:text-6xl font-light py-4 tracking-tight drop-shadow-sm mb-4">
                   Happy Anniversary
                 </h2>
                 <div className="flex justify-center gap-4 pt-4 items-center opacity-60">
                   <div className="w-10 h-px bg-current"></div>
                   <span className="text-[11px] uppercase tracking-[0.4em] mb-0">A Garden For Us</span>
                   <div className="w-10 h-px bg-current"></div>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

      </div>

      <MemoryModal 
        memory={selectedMemory} 
        onClose={() => setSelectedMemory(null)} 
      />
    </motion.main>
  );
}
