import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FadeSection, Ornament, SectionTitle, BOTANICAL_BG } from "./shared";

export function DetailsSection() {
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

export function MapSection() {
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

export function WishesSection() {
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

export function Footer() {
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
