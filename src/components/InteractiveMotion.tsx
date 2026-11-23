import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { LayoutGrid } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  1. Top Scroll Progress Line                                               */
/* -------------------------------------------------------------------------- */
export function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-light-primary origin-left z-50 pointer-events-none"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Soft Floating Blurred Blue Shapes + Subtle Scroll Parallax + Cursor Aura*/
/* -------------------------------------------------------------------------- */
export function FloatingBlueBlobs() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 2400], [0, -90]);
  const yMedium = useTransform(scrollY, [0, 2400], [0, 110]);
  const [cursor, setCursor] = useState({ x: -500, y: -500, active: false });
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    setIsFinePointer(fine);
    if (!fine || shouldReduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY, active: true });
    };
    const handleLeave = () => {
      setCursor((prev) => ({ ...prev, active: false }));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Top-right soft electric blue orb with scroll parallax */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: ySlow }}
        className={`absolute -top-28 -right-24 h-[420px] w-[420px] md:h-[560px] md:w-[560px] rounded-full bg-[#2F5BFF]/[0.08] blur-[110px] ${
          shouldReduceMotion ? '' : 'animate-blob-a'
        }`}
      />
      {/* Mid-left gentle indigo-blue wash */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: yMedium }}
        className={`absolute top-[42%] -left-32 h-[360px] w-[360px] md:h-[480px] md:w-[480px] rounded-full bg-[#2F5BFF]/[0.06] blur-[120px] ${
          shouldReduceMotion ? '' : 'animate-blob-b'
        }`}
      />
      {/* Lower-right subtle accent glow near contact */}
      <div
        className={`hidden md:block absolute bottom-16 right-[8%] h-[340px] w-[340px] rounded-full bg-[#2F5BFF]/[0.055] blur-[115px] ${
          shouldReduceMotion ? '' : 'animate-blob-a'
        }`}
      />

      {/* Mouse-following soft ambient spotlight (desktop fine pointer only) */}
      {isFinePointer && !shouldReduceMotion && (
        <div
          className="fixed top-0 left-0 h-[440px] w-[440px] rounded-full bg-[#2F5BFF]/[0.045] blur-[95px] transition-opacity duration-300"
          style={{
            opacity: cursor.active ? 1 : 0,
            transform: `translate3d(${cursor.x - 220}px, ${cursor.y - 220}px, 0)`,
            willChange: 'transform, opacity',
          }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Headline Word-by-Word Reveal                                           */
/* -------------------------------------------------------------------------- */
interface WordRevealProps {
  text: string;
  className?: string;
}

export function WordReveal({ text, className = '' }: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '108%', opacity: 0, rotateX: 25 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.48,
              delay: index * 0.085,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Fade-and-Rise on Scroll Section + Staggered Grid Containers            */
/* -------------------------------------------------------------------------- */
interface ScrollRevealSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function ScrollRevealSection({
  children,
  id,
  className = '',
  delay = 0,
}: ScrollRevealSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export function StaggerRevealItem({
  children,
  index = 0,
  className = '',
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.46,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. 3D Tilt Card + Interactive Cursor Spotlight Glow                       */
/* -------------------------------------------------------------------------- */
interface TiltCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 4.5,
  onClick,
  onKeyDown,
  ...rest
}: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    hovering: false,
  });
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduceMotion || !isFinePointer || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      const px = relX - 0.5;
      const py = relY - 0.5;
      setTilt({
        rotateX: Number((-py * maxTilt * 2).toFixed(2)),
        rotateY: Number((px * maxTilt * 2).toFixed(2)),
        glowX: Number((relX * 100).toFixed(1)),
        glowY: Number((relY * 100).toFixed(1)),
        hovering: true,
      });
    },
    [shouldReduceMotion, isFinePointer, maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      hovering: false,
    }));
  }, []);

  const style: React.CSSProperties =
    shouldReduceMotion || !isFinePointer
      ? {}
      : {
          transform: tilt.hovering
            ? `perspective(950px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-5px)`
            : 'perspective(950px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: tilt.hovering
            ? 'transform 110ms ease-out, box-shadow 250ms cubic-bezier(0.2, 0, 0, 1), border-color 200ms ease'
            : 'transform 280ms cubic-bezier(0.2, 0, 0, 1), box-shadow 250ms cubic-bezier(0.2, 0, 0, 1), border-color 200ms ease',
          willChange: 'transform',
        };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={style}
      className={`group relative overflow-hidden hover:border-[#2F5BFF]/30 ${className}`}
      {...rest}
    >
      {/* Subtle cursor-tracking specular sheen */}
      {!shouldReduceMotion && isFinePointer && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: tilt.hovering ? 1 : 0,
            background: `radial-gradient(320px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(47, 91, 255, 0.065), transparent 70%)`,
          }}
        />
      )}
      {children}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Magnetic Button / Anchor with Tap Ripple                               */
/* -------------------------------------------------------------------------- */
interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface MagneticActionBaseProps {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  strength?: number;
}

type MagneticLinkProps = MagneticActionBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: 'a';
  };

type MagneticButtonProps = MagneticActionBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as: 'button';
  };

export function MagneticAction(props: MagneticLinkProps | MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const elRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const strength = props.strength ?? 6;
  const rippleColor = props.rippleColor ?? 'rgba(255, 255, 255, 0.35)';

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !isFinePointer || !elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * strength;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const triggerRipple = (e: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || !elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const id = Date.now() + Math.random();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    setRipples((prev) => [...prev.slice(-3), { id, x, y, size }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 560);
  };

  const magneticStyle: React.CSSProperties = shouldReduceMotion
    ? {}
    : {
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 240ms cubic-bezier(0.2, 0, 0, 1)'
            : 'transform 80ms ease-out',
      };

  const rippleNodes = ripples.map((r) => (
    <span
      key={r.id}
      aria-hidden="true"
      className="tap-ripple"
      style={{
        left: r.x,
        top: r.y,
        width: r.size,
        height: r.size,
        backgroundColor: rippleColor,
      }}
    />
  ));

  if (props.as === 'button') {
    const {
      as: _as,
      children,
      className = '',
      rippleColor: _rc,
      strength: _st,
      onPointerDown,
      ...buttonRest
    } = props;
    return (
      <button
        ref={elRef as React.RefObject<HTMLButtonElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerDown={(e) => {
          triggerRipple(e);
          onPointerDown?.(e);
        }}
        style={magneticStyle}
        className={`relative overflow-hidden ${className}`}
        {...buttonRest}
      >
        {rippleNodes}
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }

  const {
    as: _as,
    children,
    className = '',
    rippleColor: _rc,
    strength: _st,
    onPointerDown,
    ...anchorRest
  } = props;

  return (
    <a
      ref={elRef as React.RefObject<HTMLAnchorElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={(e) => {
        triggerRipple(e);
        onPointerDown?.(e);
      }}
      style={magneticStyle}
      className={`relative overflow-hidden ${className}`}
      {...anchorRest}
    >
      {rippleNodes}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
        {children}
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Resilient Image with Fallback Container                                */
/* -------------------------------------------------------------------------- */
interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-light-primary-container via-light-surface-container-low to-light-surface-container p-6 text-center">
        <LayoutGrid
          className="w-8 h-8 text-light-primary"
          aria-hidden="true"
        />
        <span className="font-headline text-title-md text-light-on-surface">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
