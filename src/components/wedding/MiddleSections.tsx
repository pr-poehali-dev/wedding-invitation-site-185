import { FadeSection, Ornament, SectionTitle, useCountdown, WEDDING_DATE, BOTANICAL_BG, HERO_BG, COUPLE_IMG } from "./shared";

export function CountdownSection() {
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

export function GallerySection() {
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
