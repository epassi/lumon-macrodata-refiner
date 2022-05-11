import Digit from "./Digit";
import { matrixDeepCopy, randomInt } from "../util";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useSize from "@react-hook/size";
import { mapping } from "../origamish";

const DigitMatrix = ({ squareRoot, pan, zoom }) => {
  const zoomPortElRef = useRef(null);
  const matrixElRef = useRef(null);
  const [matrixValues, setMatrixValues] = useState([]);
  const [transformOriginY, setTransformOriginY] = useState(0);
  const [zoomPortWidth, zoomPortHeight] = useSize(zoomPortElRef);
  const [matrixWidth, matrixHeight] = useSize(matrixElRef);

  const handleHoverProgress = ({
    column,
    row,
    progressX,
    progressY,
    progressDiagonal,
  }) => {
    const matrixValuesCopy = matrixDeepCopy(matrixValues);

    matrixValuesCopy[row][column].enlargement = 1;

    if (progressX < 0 && column > 0) {
      matrixValuesCopy[row][column - 1].enlargement = Math.abs(progressX);
    } else if (progressX >= 0 && column < squareRoot - 1) {
      matrixValuesCopy[row][column + 1].enlargement = progressX;
    }

    if (progressY < 0 && row > 0) {
      matrixValuesCopy[row - 1][column].enlargement = Math.abs(progressY);
    } else if (progressY >= 0 && row < squareRoot - 1) {
      matrixValuesCopy[row + 1][column].enlargement = progressY;
    }

    console.log(progressDiagonal);

    if (progressX < 0 && progressY < 0) {
      matrixValuesCopy[row - 1][column - 1].enlargement = progressDiagonal;
    } else if (progressX > 0 && progressY < 0) {
      matrixValuesCopy[row - 1][column + 1].enlargement = progressDiagonal;
    } else if (progressX > 0 && progressY > 0) {
      matrixValuesCopy[row + 1][column + 1].enlargement = progressDiagonal;
    } else if (progressX < 0 && progressY > 0) {
      matrixValuesCopy[row + 1][column - 1].enlargement = progressDiagonal;
    }

    setMatrixValues(matrixValuesCopy);
  };

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
        // marginTop: 100,
        // marginLeft: 100,
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
          <DigitRow
            key={i}
            row={i}
            values={rowValues}
            onHoverProgress={handleHoverProgress}
          />
        ))}
      </motion.div>
    </div>
  );
};

const DigitRow = ({ row, values, onHoverProgress }) => {
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
          column={i}
          row={row}
          columnPortion={1 / values.length}
          axis={randomInt(0, 1) === 0 ? "x" : "y"}
          enlargement={valueItem.enlargement}
          onHoverProgress={onHoverProgress}
        />
      ))}
    </div>
  );
};

export default DigitMatrix;
