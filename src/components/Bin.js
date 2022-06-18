import { useState, forwardRef, useEffect, useCallback, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { color } from "../util";
import useSize from "@react-hook/size";

const Bin = forwardRef(({ label, wo, fc, dr, ma, max, active }, rootElRef) => {
  const [open, setOpen] = useState(false);
  const [width] = useSize(rootElRef);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(wo + fc + dr + ma);
  }, [wo, fc, dr, ma]);

  useEffect(() => {
    // Hack: using timer to automatically close the bin after a few seconds.
    // Choreogrpahed to immediately follow the category sheet closure.
    // Should be callback-based but couldn't get it to work right.
    if (active) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 6000);
    }
  }, [active]);

  return (
    <div
      ref={rootElRef}
      style={{
        width: "16vw",
        display: "flex",
        flexDirection: "column",
        fontSize: "1.8vw",
        gap: "0.4rem",
      }}
    >
      <BoxRect
        width={width}
        label={label}
        wo={wo}
        fc={fc}
        dr={dr}
        ma={ma}
        max={max}
        open={open}
      />
      <ProgressBar total={total} max={max.wo + max.fc + max.dr + max.ma} />
    </div>
  );
});

const BoxRect = ({ width, label, wo, fc, dr, ma, max, open }) => {
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
      <BoxSheet
        label={label}
        wo={wo}
        fc={fc}
        dr={dr}
        ma={ma}
        max={max}
        open={open}
      />
    </div>
  );
};

const BoxLabel = ({ label }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        zIndex: 400,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `1.5px solid ${color.on}`,
        backgroundColor: color.off,
        fontWeight: 600,
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
        border: `1.5px solid ${color.on}`,
        backgroundColor: color.off,
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
        zIndex: 200,
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
      <path d={path} stroke={color.on} fill={color.off} strokeWidth={2} />
    </svg>
  );
};

const BoxSheet = ({ label, wo, fc, dr, ma, max, open }) => {
  const y = useMotionValue(0);
  const height = useMotionValue(0);

  const CategoryMeter = ({ label, color, progress }) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "1.5vw",
            width: "25%",
            color,
          }}
        >
          {label}
        </span>
        <div
          style={{
            position: "relative",
            width: "75%",
            height: "3.2vh",
            border: `1.5px solid ${color}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${progress * 100}%`,
              height: "100%",
              background: color,
            }}
          ></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (open) {
      animate(height, "32vh", { delay: 2.5, duration: 0.5 });
      animate(y, "-32vh", {
        delay: 2.5,
        duration: 0.5,
        onComplete: () => {
          setTimeout(() => {
            animate(height, 0, { delay: 0, duration: 0.3 });
            animate(y, 0, { delay: 0, duration: 0.3 });
          }, 2500);
        },
      });
    }
  }, [open, height, y]);

  return (
    <motion.div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        zIndex: 100,
        top: 0,
        left: 0,
        width: "100%",
        height,
        y,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "32vh",
          borderTop: `1.5px solid ${color.on}`,
          borderLeft: `1.5px solid ${color.on}`,
          borderRight: `1.5px solid ${color.on}`,
          padding: "0.5rem",
          background: color.off,
        }}
      >
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1vh",
            fontWeight: 600,
            border: `1.5px solid ${color.on}`,
          }}
        >
          {label}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5vh",
            margin: "1rem 0",
          }}
        >
          <CategoryMeter label="WO" color={color.wo} progress={wo / max.wo} />
          <CategoryMeter label="FC" color={color.fc} progress={fc / max.fc} />
          <CategoryMeter label="DR" color={color.dr} progress={dr / max.dr} />
          <CategoryMeter label="MA" color={color.ma} progress={ma / max.ma} />
        </div>
      </div>
    </motion.div>
  );
};

const ProgressBar = ({ total, max }) => {
  const progress = useMotionValue(0);
  const darkLabelRef = useRef(null);
  const lightLabelRef = useRef(null);

  useEffect(() => {
    // Animate the number labels.
    animate(progress, total / max, {
      duration: 0.5,
      ease: "linear",
      onUpdate: () => {
        lightLabelRef.current.textContent = `${Math.floor(
          progress.get() * 100
        )}%`;
        darkLabelRef.current.textContent = `${Math.floor(
          progress.get() * 100
        )}%`;
      },
    });
  }, [progress, total, max]);

  return (
    <div
      style={{
        position: "relative",
        flex: "1 0 auto",
        border: `1.5px solid ${color.on}`,
        overflow: "hidden",
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
          color: color.off,
          background: color.on,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${(total / max) * 100}%` }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
        <span ref={darkLabelRef} style={{ display: "block", margin: "0.2rem" }}>
          0%
        </span>
      </motion.div>

      <span ref={lightLabelRef} style={{ display: "block", margin: "0.2rem" }}>
        0%
      </span>
    </div>
  );
};

export default Bin;
