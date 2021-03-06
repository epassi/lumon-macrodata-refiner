import { useEffect, useRef, useState, useCallback } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { useKeyPress, color } from "../util";
import binningSound from "../assets/sounds/binning__navigation_transition-right.wav";
import "./Digit.css";
import { delay } from "../util";

const Digit = ({
  column,
  row,
  value,
  type,
  columnPortion,
  enlargement,
  selected,
  binPositions,
  bin01,
  bin02,
  bin03,
  bin04,
  bin05,
  matrixFoldPosition,
  zoom,
  onHoverProgress,
  onMouseDown,
  onMouseUp,
  onBinEnd,
}) => {
  const rootElRef = useRef(null);
  const wiggleElRef = useRef(null);
  const [scale, setScale] = useState(1);
  const binningSoundRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const revealType = useKeyPress("c");

  const moveToBin = useCallback(
    async (binIndex) => {
      const digitRect = rootElRef.current.getBoundingClientRect();
      const binTarget = {
        x: (binPositions[binIndex] - digitRect.x - digitRect.width / 2) / zoom,
        y: (matrixFoldPosition - digitRect.y) / zoom,
      };
      const duration = 1.5;
      animate(x, binTarget.x, {
        delay: 1,
        duration: 0.75 * duration, // Slow X rate to create curved motion path
      });
      animate(y, binTarget.y, {
        delay: 1,
        duration,
        onComplete: () => {
          onBinEnd({ binIndex, column, row });
          x.set(0);
          y.set(0);
          opacity.set(0);
        },
      });
      await delay(1100); // Play just a little after animation starts
      binningSoundRef.current.play();
    },
    [
      binPositions,
      matrixFoldPosition,
      onBinEnd,
      column,
      row,
      x,
      y,
      opacity,
      zoom,
    ]
  );

  // Respawn animation
  useEffect(() => {
    // Hack: adding 3s delay so that fade-in occurs after bin closes.
    // Should be callback-driven but couldn't get it to work right.
    animate(opacity, 1, { duration: 2, delay: 3 + Math.random() });
  }, [value, opacity]);

  // Startup animation
  useEffect(() => {
    animate(opacity, 1, { duration: 2, delay: Math.random() });
  }, [opacity]);

  useEffect(() => {
    if (bin01 && selected) {
      moveToBin(0);
    } else if (bin02 && selected) {
      moveToBin(1);
    } else if (bin03 && selected) {
      moveToBin(2);
    } else if (bin04 && selected) {
      moveToBin(3);
    } else if (bin05 && selected) {
      moveToBin(4);
    }
  }, [bin01, bin02, bin03, bin04, bin05, selected, moveToBin]);

  const handleMouseMove = ({ pageX, pageY }) => {
    const {
      x: digitX,
      y: digitY,
      width: digitWidth,
      height: digitHeight,
    } = rootElRef.current.getBoundingClientRect();
    const pointer = {
      x: Math.round(pageX - digitX + 1), // +1 is a hack. Not sure why pageX is off by 1.
      y: Math.round(pageY - digitY + 1), // +1 is a hack. Not sure why pageX is off by 1.
    };

    const coverage = {
      left: Math.abs(pointer.x - digitWidth) / digitWidth,
      right: pointer.x / digitWidth,
      top: Math.abs(pointer.y - digitHeight) / digitHeight,
      bottom: pointer.y / digitHeight,
      topLeft:
        ((pointer.x - digitWidth) * (pointer.y - digitHeight)) /
        (digitWidth * digitHeight),
      topRight:
        (Math.abs(pointer.y - digitHeight) * pointer.x) /
        (digitWidth * digitHeight),
      bottomLeft:
        (pointer.y * Math.abs(pointer.x - digitWidth)) /
        (digitWidth * digitHeight),
      bottomRight: (pointer.y * pointer.x) / (digitWidth * digitHeight),
    };

    onHoverProgress({
      column,
      row,
      ...coverage,
    });
  };

  useEffect(() => {
    setScale(1 + enlargement * 1.1);
  }, [enlargement]);

  useEffect(() => {
    // Set wiggle ranges.
    wiggleElRef.current.style.setProperty(
      "--wiggle-range",
      `${Math.random()}vw`
    );
    wiggleElRef.current.style.setProperty(
      "--wiggle-duration",
      `${Math.random() * 4 + 1}s`
    );
    wiggleElRef.current.style.setProperty(
      "--wiggle-axis",
      Math.round(Math.random()) ? "wiggle-x" : "wiggle-y"
    );

    // Init sound.
    binningSoundRef.current = new Audio(binningSound);
    binningSoundRef.current.volume = 0.5;
  }, []);

  return (
    <motion.div
      ref={rootElRef}
      style={{
        width: `${columnPortion * 100}vw`,
        height: `${columnPortion * 100}vw`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        x,
        y,
        opacity,
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div
        ref={wiggleElRef}
        className="wiggle-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.span
          style={{
            fontSize: "1.5vw",
            color: revealType ? color[type] : "inherit",
          }}
          animate={{
            scale: selected ? 2.6 : scale,
          }}
          transition={{
            duration: 0.2,
            ease: "linear",
          }}
        >
          {value}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Digit;
