import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { mapping } from "../origamish";
import "./Digit.css";

const Digit = ({
  column,
  row,
  value,
  axis,
  columnPortion,
  enlargement,
  onHoverProgress,
}) => {
  const rootElRef = useRef(null);
  const wiggleElRef = useRef(null);
  const [scale, setScale] = useState(1);

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

  const handleMouseLeave = () => {
    setScale(1);
  };

  useEffect(() => {
    setScale(1 + enlargement * 1.2);
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
    <div
      ref={rootElRef}
      style={{
        width: `${columnPortion * 100}vw`,
        height: `${columnPortion * 100}vw`,
        cursor: "default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      // whileHover={{ outline: "1px solid #fff" }}
      onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseLeave}
      // drag
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
            // scale,
          }}
          animate={{
            scale,
          }}
          transition={{
            duration: 0.2,
            ease: "linear",
          }}
        >
          {value}
        </motion.span>
      </div>
    </div>
  );
};

export default Digit;
