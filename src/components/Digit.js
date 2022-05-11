import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { mapping } from "../origamish";

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

    const progressX = mapping({
      sourceValue: pointer.x,
      sourceRange: [0, digitWidth],
      mappedRange: [-1, 1],
    });

    const progressY = mapping({
      sourceValue: pointer.y,
      sourceRange: [0, digitHeight],
      mappedRange: [-1, 1],
    });

    const progressDiagonal = mapping({
      sourceValue: Math.sqrt(progressX ** 2 + progressY ** 2),
      sourceRange: [0, Math.sqrt(2)],
      mappedRange: [0, 1],
    });

    // const progressDiagonal = mapping({
    //   sourceValue: Math.sqrt(pointer.x ** 2 + pointer.y ** 2),
    //   sourceRange: [
    //     0,
    //     Math.sqrt((digitWidth / 2) ** 2 + (digitHeight / 2) ** 2),
    //   ],
    //   mappedRange: [0, 1],
    // });

    onHoverProgress({
      column,
      row,
      progressX,
      progressY,
      progressDiagonal,
    });
  };

  const handleMouseLeave = () => {
    setScale(1);
  };

  useEffect(() => {
    setScale(1 + enlargement);
  }, [enlargement]);

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
      }}
      whileHover={{ outline: "1px solid #fff" }}
      onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseLeave}
      drag
    >
      <motion.span
        style={{
          fontSize: "1.2vw",
          // lineHeight: `${columnPortion * 100}vw`,
          // textAlign: "center",
        }}
        animate={{
          scale,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
};

export default Digit;
