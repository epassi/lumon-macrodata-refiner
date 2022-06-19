import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { color, delay } from "../util";
import completionSound from "../assets/sounds/completion__hero_decorative-celebration-02.wav";

const CompletionScreen = ({ open }) => {
  return (
    <Scrim open={open}>
      <Window open={open} />
    </Scrim>
  );
};

const Window = ({ open }) => {
  const completionSoundRef = useRef(null);

  const handleClick = () => {
    window.location.reload(false);
  };

  const handleCompletion = async () => {
    await delay(4000);
    completionSoundRef.current.play();
  };

  useEffect(() => {
    if (open) {
      handleCompletion();
    }
  }, [open]);

  useEffect(() => {
    completionSoundRef.current = new Audio(completionSound);
  }, []);

  return (
    <motion.div
      style={{
        width: "40vw",
        height: "25vh",
        padding: "0.3rem",
        background: color.off,
        border: `1.5px solid ${color.on}`,
      }}
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: open ? 1 : 0.5,
        opacity: open ? 1 : 0,
      }}
      transition={{
        delay: 4,
        duration: 0.3,
        ease: "linear",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "13vh",
          border: `1.5px solid ${color.on}`,
        }}
      >
        100%
      </div>
    </motion.div>
  );
};

const Scrim = ({ children, open }) => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 800,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default CompletionScreen;
