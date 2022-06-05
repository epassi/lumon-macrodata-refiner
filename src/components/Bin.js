import { useState, forwardRef, useEffect } from "react";
import { motion } from "framer-motion";

const Bin = forwardRef(({ label, active }, ref) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Hack: using timer to automatically close the bin after a few seconds.
    // Should be callback-based but couldn't get it to work right.
    if (active) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [active]);

  return (
    <div
      ref={ref}
      style={{
        width: "16vw",
        display: "flex",
        flexDirection: "column",
        fontSize: "1.5vw",
        gap: "0.4rem",
      }}
    >
      <Box label={label} open={open} />
      <ProgressBar />
    </div>
  );
});

const Box = ({ label, open }) => {
  return (
    <div
      style={{
        height: "100%",
        flex: "2 1 auto",
        position: "relative",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #fff",
          background: "#000",
        }}
      >
        {label}
      </div>
      <motion.div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "0.9rem",
          border: "1px solid #fff",
          background: "#000",
        }}
        animate={{
          y: open ? "-0.85rem" : 0,
        }}
        transition={{
          duration: 0.3,
        }}
      ></motion.div>
    </div>
  );
};

const ProgressBar = () => {
  return (
    <div
      style={{
        flex: "1 0 auto",
        padding: "0.2rem",
        border: "1px solid #fff",
      }}
    >
      0%
    </div>
  );
};

export default Bin;
