import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function FloatingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; left: string; duration: number; delay: number; scale: number }>>([]);

  useEffect(() => {
    // Generate static initial values to avoid react hydration mismatches
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * -20, // Start some already in progress
      scale: 0.5 + Math.random() * 0.5,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute w-4 h-4 bg-soft-pink/40 rounded-tl-full rounded-br-full blur-[1px]"
          style={{
            left: petal.left,
            scale: petal.scale,
          }}
          animate={{
            y: ["-10vh", "110vh"],
            x: ["-20px", "20px", "-20px"],
            rotate: [0, 180, 360],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            },
            x: {
              duration: petal.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: petal.delay,
            },
            rotate: {
              duration: petal.duration * 0.8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
}
