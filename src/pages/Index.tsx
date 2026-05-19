import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-08-18T12:00:00");

const HERO_BG = "https://cdn.poehali.dev/projects/8af6ef6a-3434-4ec3-a6ff-6c43f3cdf5f0/bucket/b4fd7645-f859-4e9f-ae6a-4e664cfd0882.jpeg";
const COUPLE_IMG = "https://cdn.poehali.dev/projects/8af6ef6a-3434-4ec3-a6ff-6c43f3cdf5f0/files/0cbd6ee2-8ea3-4cd2-980c-9c616ee017e5.jpg";
const BOTANICAL_BG = "https://cdn.poehali.dev/projects/8af6ef6a-3434-4ec3-a6ff-6c43f3cdf5f0/files/f7ae6fcd-c5fb-4373-94e6-3fdfce25434d.jpg";

function useCountdown(target: Date) {
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

function useFadeIn() {
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

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <span style={{ color: "var(--gold)", fontSize: "10px" }}>✦</span>
      <span style={{ color: "var(--gold)", fontSize: "18px" }}>❧</span>
      <span style={{ color: "var(--gold)", fontSize: "10px" }}>✦</span>
    </div>
  );
}

function SectionTitle({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
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

function NavBar() {
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

function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center top" }}
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

function StorySection() {
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

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  return (
    <section id="countdown" className="py-24 px-6 relative overflow-hidden" style={{ background: "var(--taupe-dark)" }}>
      <div className="absolute inset-0" style={{ backgroundImage: `url(${BOTANICAL_BG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, filter: "saturate(0)" }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <FadeSection>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-light)", marginBottom: "12px" }}>
            ДО ТОРЖЕСТВА ОСТАЛОСЬ
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", marginBottom: "2.5rem" }}>
            18 августа 2026
          </h2>
        </FadeSection>

        <FadeSection delay={150}>
          <div className="grid grid-cols-4 gap-4 md:gap-10">
            {[
              { value: days, label: "дней" },
              { value: hours, label: "часов" },
              { value: minutes, label: "минут" },
              { value: seconds, label: "секунд" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                  color: "var(--cream)", lineHeight: 1,
                  textShadow: "0 0 40px rgba(212,184,120,0.25)"
                }}>
                  {String(item.value).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-light)", marginTop: "8px" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        <FadeSection delay={300}>
          <Ornament />
          <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", color: "rgba(245,240,232,0.5)", fontSize: "1.15rem", marginTop: "8px" }}>
            Каждая секунда приближает нас к этому дню
          </p>
        </FadeSection>
      </div>
    </section>
  );
}

function GallerySection() {
  const photos = [
    BOTANICAL_BG, HERO_BG, COUPLE_IMG,
    COUPLE_IMG, BOTANICAL_BG, HERO_BG,
  ];

  return (
    <section id="gallery" className="py-24 px-6 petal-bg">
      <div className="max-w-5xl mx-auto">
        <FadeSection>
          <SectionTitle label="Фотогалерея" title="Наши моменты" subtitle="Мгновения, которые останутся в сердце навсегда" />
        </FadeSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((src, i) => (
            <FadeSection key={i} delay={i * 70} className="overflow-hidden">
              <div className="overflow-hidden" style={{ aspectRatio: i % 3 === 1 ? "3/4" : "4/5" }}>
                <img
                  src={src}
                  alt={`Фото ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: "sepia(6%) brightness(1.02)" }}
                />
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailsSection() {
  const items = [
    { icon: "Calendar", title: "Дата", lines: ["18 августа 2026", "вторник"] },
    { icon: "Clock", title: "Время", lines: ["Сбор гостей в 12:00", "Церемония в 13:00"] },
    { icon: "MapPin", title: "Место", lines: ["Банкетный зал «Эдем»", "ул. Розовая, 1"] },
    { icon: "Shirt", title: "Дресс-код", lines: ["Нежные тона", "Пастельные оттенки"] },
  ];

  return (
    <section id="details" className="py-24 px-6" style={{ background: "var(--petal)" }}>
      <div className="max-w-4xl mx-auto">
        <FadeSection>
          <SectionTitle label="Детали торжества" title="Всё, что нужно знать" />
        </FadeSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {items.map((item, i) => (
            <FadeSection key={i} delay={i * 100}>
              <div className="text-center p-6" style={{ background: "var(--warm-white)", border: "1px solid rgba(184,152,90,0.15)" }}>
                <div className="flex justify-center mb-4">
                  <Icon name={item.icon} size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1rem", color: "var(--taupe-dark)", marginBottom: "6px", letterSpacing: "0.04em" }}>
                  {item.title}
                </h3>
                {item.lines.map((l, j) => (
                  <p key={j} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "var(--taupe)" }}>{l}</p>
                ))}
              </div>
            </FadeSection>
          ))}
        </div>

        <FadeSection delay={200}>
          <div className="text-center p-10" style={{ background: "var(--warm-white)", border: "1px solid rgba(184,152,90,0.18)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.9rem", color: "var(--taupe-dark)", marginBottom: "1.5rem" }}>
              Программа дня
            </h3>
            <div className="space-y-4 max-w-xs mx-auto">
              {[
                ["12:00", "Встреча гостей"],
                ["13:00", "Выездная церемония"],
                ["14:00", "Торжественный банкет"],
                ["16:00", "Первый танец"],
                ["00:00", "Прощальный вальс"],
              ].map(([time, event]) => (
                <div key={time} className="flex items-center gap-4">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "var(--gold)", minWidth: "48px" }}>{time}</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(184,152,90,0.2)" }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "var(--taupe)" }}>{event}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section id="map" className="py-24 px-6 petal-bg">
      <div className="max-w-4xl mx-auto">
        <FadeSection>
          <SectionTitle label="Как добраться" title="Карта и маршрут" />
        </FadeSection>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <FadeSection delay={100}>
            <div style={{ border: "1px solid rgba(184,152,90,0.2)", overflow: "hidden" }}>
              <div className="w-full flex items-center justify-center flex-col"
                style={{ height: "320px", background: "linear-gradient(135deg, #c5d4b2 0%, var(--petal) 100%)" }}>
                <Icon name="MapPin" size={42} style={{ color: "var(--gold)", marginBottom: "14px" }} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--taupe-dark)" }}>Банкетный зал «Эдем»</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--taupe)", marginTop: "4px" }}>ул. Розовая, 1</p>
              </div>
            </div>
          </FadeSection>

          <FadeSection delay={200}>
            <div className="space-y-6">
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.15rem", color: "var(--taupe-dark)", marginBottom: "8px" }}>
                  Адрес
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--taupe)", lineHeight: 1.7 }}>
                  ул. Розовая, д. 1<br />Банкетный зал «Эдем»
                </p>
              </div>
              <div style={{ height: "1px", background: "rgba(184,152,90,0.18)" }} />
              {[
                { icon: "Car", label: "На автомобиле", text: "Бесплатная парковка перед зданием. Навигатор: «ул. Розовая, 1»" },
                { icon: "Train", label: "Общественный транспорт", text: "Автобусы № 12, 34, остановка «Розовая улица»" },
              ].map((item) => (
                <div key={item.icon} className="flex gap-4">
                  <Icon name={item.icon} size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                  <div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.8rem", color: "var(--taupe-dark)", marginBottom: "4px" }}>{item.label}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--taupe)" }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}

function WishesSection() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([
    { name: "Мама", text: "Желаем вам вечной любви, счастья и взаимопонимания! Будьте счастливы!" },
    { name: "Друзья", text: "Пусть ваш союз будет крепким, как скала, и нежным, как весенний цветок." },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;
    setWishes(prev => [{ name, text: wish }, ...prev]);
    setName("");
    setWish("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", background: "transparent", outline: "none", resize: "none" as const,
    border: "1px solid rgba(212,184,120,0.3)", color: "var(--cream)", borderRadius: 0,
    fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
  };

  return (
    <section id="wishes" className="py-24 px-6 relative overflow-hidden" style={{ background: "var(--taupe-dark)" }}>
      <div className="absolute inset-0" style={{ backgroundImage: `url(${BOTANICAL_BG})`, backgroundSize: "cover", opacity: 0.06, filter: "saturate(0) brightness(0.4)" }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeSection>
          <div className="text-center mb-12">
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-light)", marginBottom: "12px" }}>
              КНИГА ПОЖЕЛАНИЙ
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Оставьте пожелание
            </h2>
            <Ornament />
          </div>
        </FadeSection>

        <FadeSection delay={150}>
          <form onSubmit={handleSubmit} className="mb-12 p-8" style={{ background: "rgba(245,240,232,0.05)", border: "1px solid rgba(212,184,120,0.18)" }}>
            <div className="mb-4">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" style={inputStyle} />
            </div>
            <div className="mb-6">
              <textarea value={wish} onChange={e => setWish(e.target.value)} placeholder="Ваше пожелание молодожёнам..." rows={4} style={inputStyle} />
            </div>
            <button type="submit" className="w-full py-3 transition-all duration-300 hover:opacity-80"
              style={{ background: "var(--gold)", color: "var(--taupe-dark)", border: "none", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", cursor: "pointer" }}>
              {submitted ? "✓ Пожелание отправлено" : "Оставить пожелание"}
            </button>
          </form>
        </FadeSection>

        <div className="space-y-4">
          {wishes.map((w, i) => (
            <FadeSection key={i} delay={i * 100}>
              <div className="p-6" style={{ background: "rgba(245,240,232,0.05)", border: "1px solid rgba(212,184,120,0.12)" }}>
                <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(245,240,232,0.82)", lineHeight: 1.65, marginBottom: "10px" }}>
                  «{w.text}»
                </p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-light)" }}>
                  — {w.name}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-14 text-center petal-bg" style={{ borderTop: "1px solid rgba(184,152,90,0.15)" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "3rem", color: "var(--taupe-dark)", marginBottom: "6px" }}>
        А <span style={{ color: "var(--gold)" }}>&</span> Т
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--taupe)" }}>18 августа 2026</p>
      <Ornament />
      <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "1rem", color: "var(--taupe)", opacity: 0.65 }}>
        С любовью ждём вас на нашем празднике
      </p>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <StorySection />
      <CountdownSection />
      <GallerySection />
      <DetailsSection />
      <MapSection />
      <WishesSection />
      <Footer />
    </div>
  );
}
