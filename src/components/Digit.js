import { useEffect, useRef, useState, useCallback } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import "./Digit.css";
import { randomInt, useKeyPress } from "../util";

const Digit = ({
  column,
  row,
  value,
  columnPortion,
  enlargement,
  selected,
  binPositions,
  matrixFoldPosition,
  zoom,
  onHoverProgress,
  onMouseDown,
  onMouseUp,
  onBin,
}) => {
  const rootElRef = useRef(null);
  const wiggleElRef = useRef(null);
  const [scale, setScale] = useState(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(1);
  const bin01 = useKeyPress("1");
  const bin02 = useKeyPress("2");
  const bin03 = useKeyPress("3");
  const bin04 = useKeyPress("4");
  const bin05 = useKeyPress("5");

  const moveToBin = useCallback(
    (binIndex) => {
      const digitRect = rootElRef.current.getBoundingClientRect();
      // const restoreRect = { x: digitRect.x, y: digitRect.y };
      // console.log(restoreRect);
      const binTarget = {
        x: (binPositions[binIndex] - digitRect.x - digitRect.width / 2) / zoom,
        y: (matrixFoldPosition - digitRect.y) / zoom,
      };
      const duration = 1.5;
      animate(x, binTarget.x, { duration: 0.75 * duration });
      animate(y, binTarget.y, {
        duration,
        onComplete: () => {
          onBin({ column, row });
          x.set(0);
          y.set(0);
          opacity.set(0);
        },
      });
    },
    [binPositions, matrixFoldPosition, onBin, column, row, x, y, opacity, zoom]
  );

  useEffect(() => {
    animate(opacity, 1, { duration: 1.5, delay: Math.random() });
  }, [value, opacity]);

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
    wiggleElRef.current.style.setProperty(
      "--wiggle-range",
      `${Math.random() * 16}px`
    );
    wiggleElRef.current.style.setProperty(
      "--wiggle-duration",
      `${Math.random() * 4 + 1}s`
    );
    wiggleElRef.current.style.setProperty(
      "--wiggle-axis",
      Math.round(Math.random()) ? "wiggle-x" : "wiggle-y"
    );
  }, []);

  return (
    <motion.div
      ref={rootElRef}
      style={{
        width: `${columnPortion * 100}vw`,
        height: `${columnPortion * 100}vw`,
        cursor: "default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        x,
        y,
        opacity,
      }}
      // whileHover={{ outline: "1px solid #fff" }}
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
