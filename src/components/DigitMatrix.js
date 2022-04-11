import Digit from "./Digit";
import { randomInt } from "../util";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useSize from "@react-hook/size";

const DigitMatrix = ({ squareRoot, pan, zoom }) => {
  const zoomPortElRef = useRef(null);
  const matrixElRef = useRef(null);
  const [matrixValues, setMatrixValues] = useState([]);
  const [transformOriginY, setTransformOriginY] = useState(0);
  const [zoomPortWidth, zoomPortHeight] = useSize(zoomPortElRef);
  const [matrixWidth, matrixHeight] = useSize(matrixElRef);

  useEffect(() => {
    setTransformOriginY((100 * 0.5 * zoomPortHeight) / matrixHeight);
  }, [zoomPortWidth, zoomPortHeight, matrixWidth, matrixHeight]);

  useEffect(() => {
    const randomValues = new Array(squareRoot);
    for (let y = 0; y < squareRoot; y++) {
      randomValues[y] = new Array(squareRoot);
      for (let x = 0; x < squareRoot; x++) {
        randomValues[y][x] = {
          value: randomInt(0, 9),
          enlargement: 0,
        };
      }
    }
    setMatrixValues(randomValues);
  }, [squareRoot]);

  return (
    <div
      ref={zoomPortElRef}
      style={{
        height: "80vh",
        borderTop: "1px double #fff",
        borderBottom: "1px double #fff",
        overflow: "hidden",
      }}
    >
      <motion.div
        ref={matrixElRef}
        style={{
          display: "flex",
          flexDirection: "column",
          transformOrigin: `${50 - pan.x}% ${transformOriginY - pan.y}%`,
        }}
        animate={{
          scale: zoom,
          x: `${pan.x}%`,
          y: `${pan.y}%`,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {matrixValues.map((rowValues, i) => (
          <DigitRow key={i} y={i} values={rowValues} />
        ))}
      </motion.div>
    </div>
  );
};

const DigitRow = ({ y, values, onHoverStart, onHoverEnd }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {values.map((valueItem, i) => (
        <Digit
          key={i}
          value={valueItem.value}
          x={i}
          y={y}
          columnPortion={1 / values.length}
          axis={randomInt(0, 1) === 0 ? "x" : "y"}
          // enlargementProgress={valueItem.enlargementProgress}
          adjacentHover={valueItem.adjacentHover}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      ))}
    </div>
  );
};

export default DigitMatrix;
