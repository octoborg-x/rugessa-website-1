import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 32,
  delay = 0,
  duration = 0.7,
  scale,
  className = '',
  once = false, // Animate as user scrolls back and forth or down the page
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'fade':
      case 'zoom':
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();
  const initialScale = direction === 'zoom' ? 0.94 : scale !== undefined ? scale : 1;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        scale: initialScale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount: 0.12,
        margin: '0px 0px -50px 0px',
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth luxury ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Pixels to shift (+ = upward on scroll down, - = downward)
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 40,
  direction = 'vertical',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const transformValue = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={`overflow-visible ${className}`}>
      <motion.div
        style={direction === 'vertical' ? { y: transformValue } : { x: transformValue }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  loading?: 'lazy' | 'eager';
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  speed = 30,
  loading = 'lazy',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        style={{ y, scale }}
        className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <ScrollReveal delay={index * 0.06} direction="up" distance={24}>
            {child}
          </ScrollReveal>
        );
      })}
    </div>
  );
};

export const ScrollProgressBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[var(--color-teal-600)] via-[var(--color-gold-400)] to-[var(--color-teal-400)] origin-left z-50 pointer-events-none shadow-xs ${className}`}
    />
  );
};

