import { motion } from "framer-motion";

const Digit = ({ value, axis, columnPortion, enlargement }) => {
  return (
    <motion.div
      drag
      style={{
        width: `${columnPortion * 100}vw`,
        height: `${columnPortion * 100}vw`,
        cursor: "default",
        justifySelf: "center",
        alignSelf: "center",
      }}
    >
      <motion.div
        style={{
          fontSize: "1.2vw",
          lineHeight: `${columnPortion * 100}vw`,
          textAlign: "center",
        }}
      >
        {value}
      </motion.div>
    </motion.div>
  );
};

export default Digit;
