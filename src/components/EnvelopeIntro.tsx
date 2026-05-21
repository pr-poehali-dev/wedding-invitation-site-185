import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage =
  | "ambient"
  | "envelope"
  | "seal-click"
  | "opening"
  | "letter"
  | "zoom"
  | "done";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

const ease = [0.43, 0.13, 0.23, 0.96] as const;

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<Stage>("ambient");
  const [muted, setMuted] = useState(true);
  const [sealCracked, setSealCracked] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStage("envelope"), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleSealClick = () => {
    if (stage !== "envelope") return;
    setStage("seal-click");
    setTimeout(() => setSealCracked(true), 400);
    setTimeout(() => setStage("opening"), 900);
    setTimeout(() => setStage("letter"), 2400);
    setTimeout(() => setStage("zoom"), 5200);
    setTimeout(() => onComplete(), 7600);
  };

  const skipAll = () => {
    setStage("done");
    setTimeout(() => onComplete(), 600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden select-none"
      style={{ background: "#1a1208" }}
      animate={stage === "zoom" ? { scale: 1.12 } : { scale: 1 }}
      transition={{ duration: 2.4, ease }}
    >
      {/* ── Ambient background glow ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(184,152,90,0.18) 0%, rgba(92,58,22,0.22) 40%, transparent 75%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* ── Warm fog layers ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 30% 75%, rgba(212,184,120,0.07) 0%, transparent 65%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 70% 25%, rgba(245,230,200,0.05) 0%, transparent 60%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1 }}
      />

      {/* ── Sound button ── */}
      <motion.button
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-3 py-2"
        style={{
          border: "1px solid rgba(212,184,120,0.25)",
          background: "rgba(245,240,232,0.06)",
          color: "rgba(212,184,120,0.75)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => setMuted((m) => !m)}
      >
        <span style={{ fontSize: "14px" }}>{muted ? "🔇" : "🔈"}</span>
        {muted ? "Включить атмосферу" : "Выключить"}
      </motion.button>

      {/* ── Skip button ── */}
      <motion.button
        className="absolute bottom-6 right-6 z-50"
        style={{
          color: "rgba(212,184,120,0.4)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          background: "transparent",
          border: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        onClick={skipAll}
      >
        Пропустить
      </motion.button>

      {/* ══════════════════════════════════
          ENVELOPE
      ══════════════════════════════════ */}
      <AnimatePresence>
        {(stage === "envelope" ||
          stage === "seal-click" ||
          stage === "opening") && (
          <motion.div
            key="envelope-wrap"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
            transition={{ duration: 1.8, ease }}
          >
            {/* Envelope body */}
            <div
              className="relative"
              style={{ width: "min(340px, 82vw)", cursor: "pointer" }}
              onClick={handleSealClick}
            >
              {/* ── Envelope body ── */}
              <div
                style={{
                  width: "100%",
                  paddingBottom: "68%",
                  position: "relative",
                  background:
                    "linear-gradient(170deg, #f0e6d2 0%, #e8d9be 55%, #dccfa8 100%)",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                {/* Inner envelope texture lines */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(184,152,90,0.06) 28px, rgba(184,152,90,0.06) 29px)",
                  }}
                />

                {/* Bottom V-flap */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "55%",
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(184,152,90,0.08) 100%)",
                    clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                  }}
                />

                {/* Left shadow triangle */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 45%)",
                  }}
                />
                {/* Right shadow triangle */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(225deg, rgba(0,0,0,0.08) 0%, transparent 45%)",
                  }}
                />

                {/* ── Flap animation ── */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "52%",
                    transformOrigin: "top center",
                    background:
                      "linear-gradient(180deg, #e8d9be 0%, #ddd0b0 100%)",
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                  }}
                  animate={
                    stage === "opening"
                      ? { rotateX: -145, opacity: 1 }
                      : { rotateX: 0, opacity: 1 }
                  }
                  transition={{ duration: 1.4, ease }}
                />

                {/* ── Wax seal ── */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                  animate={
                    stage === "seal-click"
                      ? { scale: [1, 1.06, 0.97, 1.02, 1], rotate: [0, -1, 1, -0.5, 0] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  {/* Seal disc */}
                  <motion.div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 38% 35%, #d4b878 0%, #b8985a 40%, #8b6e3a 100%)",
                      boxShadow:
                        "0 4px 16px rgba(92,58,22,0.5), 0 1px 4px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    animate={sealCracked ? { opacity: 0, scale: 1.15 } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Outer ring */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "5px",
                        borderRadius: "50%",
                        border: "1px solid rgba(245,230,200,0.35)",
                      }}
                    />
                    {/* Monogram */}
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: "1.15rem",
                        color: "rgba(245,235,210,0.92)",
                        letterSpacing: "0.05em",
                        userSelect: "none",
                        zIndex: 1,
                      }}
                    >
                      А&Т
                    </span>
                  </motion.div>

                  {/* Crack overlay */}
                  <AnimatePresence>
                    {sealCracked && (
                      <motion.div
                        style={{
                          position: "absolute",
                          inset: "-6px",
                          borderRadius: "50%",
                          pointerEvents: "none",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Crack lines */}
                        {[30, 100, 175, 255].map((angle, i) => (
                          <div
                            key={i}
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "52px",
                              height: "1px",
                              background:
                                "linear-gradient(90deg, rgba(245,235,210,0.7), transparent)",
                              transformOrigin: "0 50%",
                              transform: `rotate(${angle}deg)`,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Subtle envelope border */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid rgba(184,152,90,0.3)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* ── Prompt text ── */}
            <motion.p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.9rem",
                color: "rgba(212,184,120,0.55)",
                letterSpacing: "0.08em",
                marginTop: "28px",
                textAlign: "center",
              }}
              animate={
                stage === "seal-click" || stage === "opening"
                  ? { opacity: 0 }
                  : { opacity: [0, 1] }
              }
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              Нажмите на печать, чтобы открыть приглашение
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          LETTER RISING FROM ENVELOPE
      ══════════════════════════════════ */}
      <AnimatePresence>
        {(stage === "opening" || stage === "letter" || stage === "zoom") && (
          <motion.div
            key="letter"
            className="absolute flex items-center justify-center"
            style={{ inset: 0, pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: stage === "opening" ? 0.8 : 0, duration: 0.8 }}
          >
            <motion.div
              style={{
                width: "min(380px, 88vw)",
                background:
                  "linear-gradient(175deg, #faf7f0 0%, #f5ede0 60%, #ede3d0 100%)",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)",
                padding: "clamp(32px, 7vw, 52px)",
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.6, ease }}
            >
              {/* Paper texture lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 26px, rgba(184,152,90,0.06) 26px, rgba(184,152,90,0.06) 27px)",
                  pointerEvents: "none",
                }}
              />

              {/* Gold top border */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "12%",
                  right: "12%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(184,152,90,0.6), transparent)",
                }}
              />

              {/* Corner ornaments */}
              {[
                { top: "14px", left: "14px" },
                { top: "14px", right: "14px" },
                { bottom: "14px", left: "14px" },
                { bottom: "14px", right: "14px" },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    ...pos,
                    width: "14px",
                    height: "14px",
                    borderTop: i < 2 ? "1px solid rgba(184,152,90,0.4)" : "none",
                    borderBottom: i >= 2 ? "1px solid rgba(184,152,90,0.4)" : "none",
                    borderLeft: i % 2 === 0 ? "1px solid rgba(184,152,90,0.4)" : "none",
                    borderRight: i % 2 === 1 ? "1px solid rgba(184,152,90,0.4)" : "none",
                  }}
                />
              ))}

              {/* Letter content */}
              <div className="relative z-10 text-center">
                {/* Small monogram */}
                <motion.div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color: "var(--gold)",
                    letterSpacing: "0.25em",
                    marginBottom: "24px",
                    opacity: 0.7,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  А &amp; Т
                </motion.div>

                {/* Divider */}
                <motion.div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(184,152,90,0.45), transparent)",
                    marginBottom: "28px",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.4, duration: 1, ease }}
                />

                {/* Main quote line 1 */}
                <motion.p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                    color: "#5c4a32",
                    lineHeight: 1.55,
                    marginBottom: "6px",
                    letterSpacing: "0.02em",
                  }}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: 1.8, duration: 1.2, ease }}
                >
                  В каждой истории любви
                </motion.p>

                {/* Main quote line 2 */}
                <motion.p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                    color: "#5c4a32",
                    lineHeight: 1.55,
                    marginBottom: "28px",
                    letterSpacing: "0.02em",
                  }}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: 2.2, duration: 1.2, ease }}
                >
                  есть момент, который меняет всё…
                </motion.p>

                {/* Divider */}
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "24px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.8, duration: 1 }}
                >
                  <span style={{ color: "var(--gold)", fontSize: "8px" }}>✦</span>
                  <span style={{ color: "var(--gold)", fontSize: "16px" }}>❧</span>
                  <span style={{ color: "var(--gold)", fontSize: "8px" }}>✦</span>
                </motion.div>

                {/* Sub text */}
                <motion.p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(92,74,50,0.5)",
                    marginBottom: "6px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2, duration: 1.2 }}
                >
                  Мы хотим разделить этот день
                </motion.p>
                <motion.p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(92,74,50,0.5)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 1.2 }}
                >
                  вместе с вами
                </motion.p>

                {/* Names */}
                <motion.div
                  style={{ marginTop: "30px" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.9, duration: 1.2, ease }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                      color: "#5c4a32",
                      letterSpacing: "0.08em",
                      lineHeight: 1.1,
                    }}
                  >
                    Аэлита{" "}
                    <span style={{ color: "var(--gold)" }}>&</span>{" "}
                    Тузагаш
                  </p>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(184,152,90,0.7)",
                      marginTop: "10px",
                    }}
                  >
                    18 · 08 · 2026
                  </p>
                </motion.div>
              </div>

              {/* Gold bottom border */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "12%",
                  right: "12%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(184,152,90,0.6), transparent)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Final fade-out to site ── */}
      <AnimatePresence>
        {stage === "zoom" && (
          <motion.div
            key="fadeout"
            className="absolute inset-0 z-50"
            style={{ background: "#f5f0e8", pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
