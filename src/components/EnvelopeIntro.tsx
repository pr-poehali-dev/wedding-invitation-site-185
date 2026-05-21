import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage =
  | "ambient"
  | "envelope"
  | "seal-click"
  | "opening"
  | "letter"
  | "continue"
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
    const t = setTimeout(() => setStage("envelope"), 2000);
    return () => clearTimeout(t);
  }, []);

  // After letter appears — show continue prompt after text finishes
  useEffect(() => {
    if (stage === "letter") {
      const t = setTimeout(() => setStage("continue"), 4000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const handleSealClick = () => {
    if (stage !== "envelope") return;
    setStage("seal-click");
    setTimeout(() => setSealCracked(true), 450);
    setTimeout(() => setStage("opening"), 950);
    setTimeout(() => setStage("letter"), 2700);
  };

  const handleContinue = () => {
    if (stage !== "continue") return;
    setStage("zoom");
    setTimeout(() => onComplete(), 2800);
  };

  const skipAll = () => {
    setStage("done");
    setTimeout(() => onComplete(), 500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden select-none"
      style={{ background: "#1a1208" }}
      animate={stage === "zoom" ? { scale: 1.14 } : { scale: 1 }}
      transition={{ duration: 2.6, ease }}
    >
      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(184,152,90,0.18) 0%, rgba(92,58,22,0.22) 40%, transparent 75%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.8, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 45% at 30% 75%, rgba(212,184,120,0.07) 0%, transparent 65%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3.5, delay: 0.6 }}
      />

      {/* Sound button */}
      <motion.button
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-3 py-2"
        style={{
          border: "1px solid rgba(212,184,120,0.22)",
          background: "rgba(245,240,232,0.05)",
          color: "rgba(212,184,120,0.65)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={() => setMuted((m) => !m)}
      >
        <span style={{ fontSize: "13px" }}>{muted ? "🔇" : "🔈"}</span>
        {muted ? "Включить атмосферу" : "Выключить"}
      </motion.button>

      {/* Skip */}
      <motion.button
        className="absolute bottom-6 right-6 z-50"
        style={{
          color: "rgba(212,184,120,0.32)",
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
        transition={{ delay: 3.5, duration: 1 }}
        onClick={skipAll}
      >
        Пропустить
      </motion.button>

      {/* ══ ENVELOPE ══ */}
      <AnimatePresence>
        {(stage === "envelope" || stage === "seal-click" || stage === "opening") && (
          <motion.div
            key="envelope-wrap"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 50, scale: 0.93, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.5 } }}
            transition={{ duration: 2.2, ease }}
          >
            <div
              style={{ width: "min(340px, 82vw)", cursor: stage === "envelope" ? "pointer" : "default", position: "relative" }}
              onClick={handleSealClick}
            >
              <div
                style={{
                  width: "100%",
                  paddingBottom: "68%",
                  position: "relative",
                  background: "linear-gradient(170deg, #f0e6d2 0%, #e8d9be 55%, #dccfa8 100%)",
                  boxShadow: "0 32px 90px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.22)",
                }}
              >
                <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(184,152,90,0.05) 28px, rgba(184,152,90,0.05) 29px)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(180deg, transparent 0%, rgba(184,152,90,0.08) 100%)", clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 45%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(225deg, rgba(0,0,0,0.08) 0%, transparent 45%)" }} />

                {/* Top flap */}
                <motion.div
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "52%",
                    transformOrigin: "top center",
                    background: "linear-gradient(180deg, #e8d9be 0%, #ddd0b0 100%)",
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.16)",
                  }}
                  animate={stage === "opening" ? { rotateX: -148 } : { rotateX: 0 }}
                  transition={{ duration: 1.7, ease }}
                />

                {/* Wax seal */}
                <motion.div
                  style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}
                  animate={stage === "seal-click" ? { scale: [1, 1.07, 0.96, 1.03, 1], rotate: [0, -1.5, 1.5, -0.5, 0] } : { scale: 1 }}
                  transition={{ duration: 0.55 }}
                >
                  <motion.div
                    style={{
                      width: "72px", height: "72px", borderRadius: "50%",
                      background: "radial-gradient(circle at 38% 35%, #d4b878 0%, #b8985a 40%, #8b6e3a 100%)",
                      boxShadow: "0 4px 18px rgba(92,58,22,0.55), 0 1px 4px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative", overflow: "hidden",
                    }}
                    animate={sealCracked ? { opacity: 0, scale: 1.18 } : {}}
                    transition={{ duration: 0.42 }}
                  >
                    <div style={{ position: "absolute", inset: "5px", borderRadius: "50%", border: "1px solid rgba(245,230,200,0.33)" }} />
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.1rem", color: "rgba(245,235,210,0.92)", letterSpacing: "0.05em", userSelect: "none", zIndex: 1 }}>
                      А&Т
                    </span>
                  </motion.div>

                  <AnimatePresence>
                    {sealCracked && (
                      <motion.div
                        style={{ position: "absolute", inset: "-6px", borderRadius: "50%", pointerEvents: "none" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {[30, 100, 175, 255].map((angle, i) => (
                          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: "52px", height: "1px", background: "linear-gradient(90deg, rgba(245,235,210,0.75), transparent)", transformOrigin: "0 50%", transform: `rotate(${angle}deg)` }} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(184,152,90,0.28)", pointerEvents: "none" }} />
            </div>

            <motion.p
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: "0.88rem", color: "rgba(212,184,120,0.48)",
                letterSpacing: "0.07em", marginTop: "28px", textAlign: "center",
              }}
              animate={stage === "seal-click" || stage === "opening" ? { opacity: 0 } : { opacity: [0, 1] }}
              transition={{ duration: 1.4, delay: 0.6 }}
            >
              Нажмите на печать, чтобы открыть
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ LETTER ══ */}
      <AnimatePresence>
        {(stage === "opening" || stage === "letter" || stage === "continue" || stage === "zoom") && (
          <motion.div
            key="letter"
            className="absolute flex items-center justify-center"
            style={{ inset: 0, pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: stage === "opening" ? 0.9 : 0, duration: 0.8 }}
          >
            <motion.div
              style={{
                width: "min(380px, 88vw)",
                background: "linear-gradient(175deg, #faf7f0 0%, #f5ede0 60%, #ede3d0 100%)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.52), 0 10px 32px rgba(0,0,0,0.28)",
                padding: "clamp(36px, 8vw, 56px)",
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ y: 130, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.9, ease }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 26px, rgba(184,152,90,0.055) 26px, rgba(184,152,90,0.055) 27px)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, left: "12%", right: "12%", height: "1.5px", background: "linear-gradient(90deg, transparent, rgba(184,152,90,0.55), transparent)" }} />

              {[
                { top: "13px", left: "13px" },
                { top: "13px", right: "13px" },
                { bottom: "13px", left: "13px" },
                { bottom: "13px", right: "13px" },
              ].map((pos, i) => (
                <div key={i} style={{ position: "absolute", ...pos, width: "13px", height: "13px", borderTop: i < 2 ? "1px solid rgba(184,152,90,0.38)" : "none", borderBottom: i >= 2 ? "1px solid rgba(184,152,90,0.38)" : "none", borderLeft: i % 2 === 0 ? "1px solid rgba(184,152,90,0.38)" : "none", borderRight: i % 2 === 1 ? "1px solid rgba(184,152,90,0.38)" : "none" }} />
              ))}

              <div className="relative z-10 text-center">
                <motion.div
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "0.95rem", color: "var(--gold)", letterSpacing: "0.26em", marginBottom: "22px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.68 }}
                  transition={{ delay: 1.4, duration: 1.2 }}
                >
                  А &amp; Т
                </motion.div>

                <motion.div
                  style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,152,90,0.42), transparent)", marginBottom: "32px" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.6, duration: 1.2, ease }}
                />

                <motion.p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300,
                    fontSize: "clamp(1.25rem, 4.5vw, 1.7rem)", color: "#5c4a32",
                    lineHeight: 1.65, marginBottom: "6px", letterSpacing: "0.02em",
                  }}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: 2.1, duration: 1.5, ease }}
                >
                  В каждой истории любви
                </motion.p>

                <motion.p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300,
                    fontSize: "clamp(1.25rem, 4.5vw, 1.7rem)", color: "#5c4a32",
                    lineHeight: 1.65, letterSpacing: "0.02em",
                  }}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: 2.8, duration: 1.5, ease }}
                >
                  есть момент, который меняет всё…
                </motion.p>

                <motion.div
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "28px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.4, duration: 1 }}
                >
                  <span style={{ color: "var(--gold)", fontSize: "7px" }}>✦</span>
                  <span style={{ color: "var(--gold)", fontSize: "15px" }}>❧</span>
                  <span style={{ color: "var(--gold)", fontSize: "7px" }}>✦</span>
                </motion.div>
              </div>

              <div style={{ position: "absolute", bottom: 0, left: "12%", right: "12%", height: "1.5px", background: "linear-gradient(90deg, transparent, rgba(184,152,90,0.55), transparent)" }} />
            </motion.div>

            {/* Continue prompt */}
            <AnimatePresence>
              {stage === "continue" && (
                <motion.button
                  key="continue-btn"
                  onClick={handleContinue}
                  style={{
                    position: "absolute",
                    bottom: "clamp(24px, 5vw, 52px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    pointerEvents: "auto",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.3, ease }}
                >
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,184,120,0.58)" }}>
                    Нажмите, чтобы продолжить
                  </span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 3v12M9 15l-4-4M9 15l4-4" stroke="rgba(212,184,120,0.52)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final fade-out */}
      <AnimatePresence>
        {stage === "zoom" && (
          <motion.div
            key="fadeout"
            className="absolute inset-0 z-50"
            style={{ background: "#f5f0e8", pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
