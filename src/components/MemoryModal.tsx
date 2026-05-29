import { motion, AnimatePresence } from "motion/react";
import { Memory } from "../types";
import { X } from "lucide-react";

interface Props {
  memory: Memory | null;
  onClose: () => void;
}

export function MemoryModal({ memory, onClose }: Props) {
  return (
    <AnimatePresence>
      {memory && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-warm-dark/20 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(90,77,74,0.1)] rounded-[2rem] p-6 max-w-sm w-full pointer-events-auto relative overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-colors text-warm-dark/60 z-10"
              >
                <X size={20} />
              </button>
              
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative shadow-inner">
                <img
                  src={memory.image}
                  alt={memory.date}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="px-2 text-center text-warm-dark">
                <span className="block text-[10px] uppercase tracking-widest opacity-50 mb-3 italic">
                  {memory.date}
                </span>
                <p className="font-sans text-sm font-light leading-relaxed mb-4 text-warm-dark/80">
                  {memory.message}
                </p>
                {memory.joke && (
                  <p className="font-sans text-xs italic opacity-60">
                    {memory.joke}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
