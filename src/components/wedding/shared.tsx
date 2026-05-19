import { useEffect, useRef, useState } from "react";

export const WEDDING_DATE = new Date("2026-08-18T12:00:00");

export const HERO_BG = "https://cdn.poehali.dev/projects/8af6ef6a-3434-4ec3-a6ff-6c43f3cdf5f0/bucket/b4fd7645-f859-4e9f-ae6a-4e664cfd0882.jpeg";
export const COUPLE_IMG = "https://cdn.poehali.dev/projects/8af6ef6a-3434-4ec3-a6ff-6c43f3cdf5f0/files/0cbd6ee2-8ea3-4cd2-980c-9c616ee017e5.jpg";
export const BOTANICAL_BG = "https://cdn.poehali.dev/projects/8af6ef6a-3434-4ec3-a6ff-6c43f3cdf5f0/files/f7ae6fcd-c5fb-4373-94e6-3fdfce25434d.jpg";

export function useCountdown(target: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <span style={{ color: "var(--gold)", fontSize: "10px" }}>✦</span>
      <span style={{ color: "var(--gold)", fontSize: "18px" }}>❧</span>
      <span style={{ color: "var(--gold)", fontSize: "10px" }}>✦</span>
    </div>
  );
}

export function SectionTitle({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      {label && (
        <p className="font-display mb-3" style={{ color: "var(--gold)", letterSpacing: "0.3em", fontSize: "11px", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
          {label}
        </p>
      )}
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--taupe-dark)", lineHeight: 1.05 }}>
        {title}
      </h2>
      <Ornament />
      {subtitle && (
        <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "1.15rem", color: "var(--taupe)", maxWidth: "480px", margin: "0 auto" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
