import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  duration = 900,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      const current = value * eased;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}