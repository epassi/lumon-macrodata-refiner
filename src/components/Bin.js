import { useState, forwardRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useSize from "@react-hook/size";
import { randomInt } from "../util";

const Bin = forwardRef(({ label, wo, fc, dr, ma, active }, rootElRef) => {
  const [open, setOpen] = useState(false);
  const [width] = useSize(rootElRef);
  const [total, setTotal] = useState(0);
  const [max] = useState(randomInt(80, 200));

  useEffect(() => {
    setTotal(wo + fc + dr + ma);
  }, [wo, fc, dr, ma]);

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
      ref={rootElRef}
      style={{
        width: "16vw",
        display: "flex",
        flexDirection: "column",
        fontSize: "1.5vw",
        gap: "0.4rem",
      }}
    >
      <BoxRect width={width} label={label} open={open} />
      <ProgressBar total={total} max={max} />
    </div>
  );
});

const BoxRect = ({ width, label, open }) => {
  return (
    <div
      style={{
        height: "100%",
        flex: "2 1 auto",
        position: "relative",
      }}
    >
      <BoxLabel label={label} />
      <BoxOpening open={open} />
      <BoxFlap side="left" width={width} open={open} />
      <BoxFlap side="right" width={width} open={open} />
    </div>
  );
};

const BoxLabel = ({ label }) => {
  return (
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
        border: "1.5px solid #D1F4ED",
        backgroundColor: "#060D29",
        fontWeight: 500,
      }}
    >
      {label}
    </div>
  );
};

const BoxOpening = ({ open }) => {
  return (
    <motion.div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100%",
        height: "0.9rem",
        border: "1.5px solid #D1F4ED",
        backgroundColor: "#060D29",
      }}
      animate={{
        y: open ? "-0.85rem" : 0,
      }}
      transition={{
        duration: 0.3,
      }}
    ></motion.div>
  );
};

const BoxFlap = ({ side, width, open }) => {
  const height = 16 * 0.9; // 0.9rem to match BoxOpening height
  const [path, setPath] = useState("M0 0 L10 0 L10 14.4 L0 14.4 L0 0");
  const [radius, setRadius] = useState(200);
  const [viewBox, setViewBox] = useState("0 0 10 14.4");

  const setFlap = useCallback(
    (open) => {
      let angle = open ? 0 : Math.PI * 0.75;
      const increment = (Math.PI * 0.75) / 20;

      const callback = () => {
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const progress = angle / (Math.PI * 0.75);

        setPath(
          `M0 ${(1 - progress) * height}` + // top left
            `L${x} ${-y + (1 - progress) * height}` + // top right
            `L${x} ${-y + height}` + // bottom right
            `L0 ${height}` + // bottom left
            `L0 ${(1 - progress) * height}` // top left
        );

        angle += open ? increment : -increment;

        if (open && angle <= Math.PI * 0.75) {
          requestAnimationFrame(callback);
        } else if (!open && angle >= 0) {
          requestAnimationFrame(callback);
        }
      };

      requestAnimationFrame(callback);
    },
    [height, radius]
  );

  useEffect(() => {
    setViewBox(`0 0 ${width} ${height}`);
    setRadius(width / 2);
  }, [width, height]);

  useEffect(() => {
    setFlap(open);
  }, [open, setFlap]);

  return (
    <svg
      style={{
        position: "absolute",
        overflow: "visible",
        transform:
          side === "left"
            ? `translateY(-${height}px)`
            : `translateY(-${height}px) scaleX(-1)`,
      }}
      width={width}
      height={height} // 0.9rem to match BoxOpening height
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} stroke="#D1F4ED" fill="#060D29" strokeWidth={1.5} />
    </svg>
  );
};

const ProgressBar = ({ total, max }) => {
  return (
    <div
      style={{
        position: "relative",
        flex: "1 0 auto",
        padding: "0.2rem",
        border: "1.5px solid #D1F4ED",
      }}
    >
      <motion.div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          zIndex: 100,
          top: 0,
          left: 0,
          height: "100%",
          overflow: "hidden",
          color: "#060D29",
          background: "#D1F4ED",
        }}
        animate={{ width: `${(total / max) * 100}%` }}
      >
        <div style={{ margin: "0.2rem 0 0 0.2rem" }}>
          {Math.round((total / max) * 100)}%
        </div>
      </motion.div>
      {Math.round((total / max) * 100)}%
    </div>
  );
};

export default Bin;
