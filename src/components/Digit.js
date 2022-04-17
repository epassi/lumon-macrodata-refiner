import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

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

  const handleMouseMove = useCallback(
    ({ pageX, pageY }) => {
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
      onHoverProgress({
        column,
        row,
        progressX: pointer.x / digitWidth,
        progressY: pointer.y / digitHeight,
      });
    },
    [onHoverProgress, column, row]
  );

  return (
    <motion.div
      ref={rootElRef}
      style={{
        width: `${columnPortion * 100}vw`,
        height: `${columnPortion * 100}vw`,
        cursor: "default",
        justifySelf: "center",
        alignSelf: "center",
        // outline: "1px solid #f00",
      }}
      // whileHover={{ backgroundColor: "#999" }}
      onMouseMove={handleMouseMove}
      drag
    >
      <motion.div
        style={{
          fontSize: "1.2vw",
          lineHeight: `${columnPortion * 100}vw`,
          textAlign: "center",
          scale: 1 + enlargement,
        }}
      >
        {value}
      </motion.div>
    </motion.div>
  );
};

export default Digit;
