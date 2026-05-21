import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { FadeSection, SectionTitle, HERO_BG, COUPLE_IMG } from "./shared";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#story", label: "История" },
    { href: "#countdown", label: "Таймер" },
    { href: "#gallery", label: "Галерея" },
    { href: "#details", label: "Детали" },
    { href: "#wishes", label: "Пожелания" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(250,247,242,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(184,152,90,0.15)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(92,74,50,0.06)" : "none",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.2rem", color: scrolled ? "var(--taupe-dark)" : "var(--cream)", letterSpacing: "0.1em", textDecoration: "none" }}>
          А <span style={{ color: "var(--gold)" }}>&</span> Т
        </a>
        <div className="hidden md:flex gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                color: scrolled ? "var(--taupe)" : "rgba(245,240,232,0.85)", textDecoration: "none", transition: "opacity 0.2s"
              }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center center" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(60,45,30,0.2) 0%, rgba(40,28,18,0.42) 100%)" }} />

      <div className="relative z-10 text-center px-6 py-24" style={{ maxWidth: "720px" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(245,240,232,0.75)", marginBottom: "1.5rem" }}>
          ПРИГЛАШАЕМ ВАС НА НАШУ СВАДЬБУ
        </p>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#f5f0e8", fontSize: "clamp(3.5rem, 11vw, 8rem)", lineHeight: 0.9, letterSpacing: "0.06em", margin: 0 }}>
          АЭЛИТА
        </h1>
        <div className="flex items-center justify-center gap-5 my-3">
          <div style={{ width: "80px", height: "1px", background: "var(--gold-light)", opacity: 0.6 }} />
          <span style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", color: "var(--gold-light)", fontSize: "3rem", lineHeight: 1 }}>&</span>
          <div style={{ width: "80px", height: "1px", background: "var(--gold-light)", opacity: 0.6 }} />
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#f5f0e8", fontSize: "clamp(3.5rem, 11vw, 8rem)", lineHeight: 0.9, letterSpacing: "0.06em", margin: 0 }}>
          ТУЗАГАШ
        </h1>

        <div className="flex items-center justify-center gap-4 mt-8">
          <span style={{ color: "rgba(212,184,120,0.5)", fontSize: "10px" }}>✦</span>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--gold-light)", fontSize: "1.6rem", letterSpacing: "0.22em" }}>
            18 · 08 · 2026
          </p>
          <span style={{ color: "rgba(212,184,120,0.5)", fontSize: "10px" }}>✦</span>
        </div>

        <a href="#countdown"
          className="inline-block mt-10 transition-all duration-300"
          style={{
            border: "1px solid rgba(212,184,120,0.55)",
            color: "var(--gold-light)",
            padding: "12px 36px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}>
          До свадьбы
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} style={{ color: "rgba(245,240,232,0.45)" }} />
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="py-24 px-6 petal-bg">
      <div className="max-w-4xl mx-auto">
        <FadeSection>
          <SectionTitle label="Наша история" title="Как всё начиналось" />
        </FadeSection>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <FadeSection delay={100}>
            <div className="relative">
              <img
                src={COUPLE_IMG}
                alt="Аэлита и Тузагаш"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4", filter: "sepia(8%) brightness(1.02)" }}
              />
              <div style={{ position: "absolute", inset: "-10px", border: "1px solid rgba(184,152,90,0.25)", pointerEvents: "none", zIndex: 1 }} />
            </div>
          </FadeSection>

          <div className="space-y-9">
            {[
              { year: "Первая встреча", text: "Всё началось с одного взгляда — момента, который изменил всё. Судьба свела нас вместе, и с тех пор наши сердца бьются в унисон." },
              { year: "Наша любовь", text: "Каждый день рядом стал подарком. Мы учились понимать друг друга, поддерживать и вдохновлять — и поняли, что созданы друг для друга." },
              { year: "Предложение", text: "В особенный вечер Тузагаш встал на колено и предложил Аэлите разделить с ним всю жизнь. Ответ был — да, без единого сомнения." },
            ].map((item, i) => (
              <FadeSection key={i} delay={200 + i * 150}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 mt-2">
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.25rem", color: "var(--taupe-dark)", marginBottom: "6px" }}>
                      {item.year}
                    </h3>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--taupe)" }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}