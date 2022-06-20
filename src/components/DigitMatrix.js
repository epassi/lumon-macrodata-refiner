import Digit from "./Digit";
import { matrixDeepCopy, randomInt, uniqueRandomInt } from "../util";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import startupSound from "../assets/sounds/startup__notification_ambient.wav";
import useSize from "@react-hook/size";

const DigitMatrix = ({
  squareRoot,
  pan,
  zoom,
  binPositions,
  onMatrixFoldChange,
  onBin,
  bin01,
  bin02,
  bin03,
  bin04,
  bin05,
}) => {
  const startupSoundRef = useRef(null);
  const zoomPortElRef = useRef(null);
  const matrixElRef = useRef(null);
  const [matrixValues, setMatrixValues] = useState([]);
  const [transformOriginY, setTransformOriginY] = useState(0);
  const [zoomPortWidth, zoomPortHeight] = useSize(zoomPortElRef);
  const [matrixWidth, matrixHeight] = useSize(matrixElRef);
  const [selectionEnabled, setSelectionEnabled] = useState(false);
  const [matrixFoldPosition, setMatrixFoldPosition] = useState(0);

  const handleBinEnd = ({ binIndex, column, row }) => {
    onBin({ binIndex, type: matrixValues[row][column].type });

    const matrixValuesCopy = matrixDeepCopy(matrixValues);
    matrixValuesCopy[row][column].selected = false;

    // Respawn binned digit. New type and value.
    // Value must be unique to trigger animation hook in Digit.
    const currentDigitValue = matrixValuesCopy[row][column].value;
    matrixValuesCopy[row][column].type = ["wo", "fc", "dr", "ma"].at(
      randomInt(0, 3)
    );
    matrixValuesCopy[row][column].value = uniqueRandomInt({
      dontRepeat: currentDigitValue,
      min: 0,
      max: 9,
    });
    setMatrixValues(matrixValuesCopy);
  };

  const handleMouseDown = () => {
    // Deselect all digits.
    const matrixValuesCopy = matrixDeepCopy(matrixValues);
    matrixValuesCopy.forEach((row) => {
      row.forEach((digit) => {
        digit.selected = false;
      });
    });
    setMatrixValues(matrixValuesCopy);

    setSelectionEnabled(true);
  };

  const handleMouseUp = () => {
    setSelectionEnabled(false);
  };

  const handleHoverProgress = ({
    column,
    row,
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  }) => {
    const matrixValuesCopy = matrixDeepCopy(matrixValues);

    // Reset all enlargements to 0.
    matrixValuesCopy.forEach((row) => {
      row.forEach((digit) => {
        digit.enlargement = 0;
      });
    });

    matrixValuesCopy[row][column].enlargement = 1;
    if (!matrixValuesCopy[row][column].selected) {
      matrixValuesCopy[row][column].selected = selectionEnabled;
    }

    if (column > 0) {
      matrixValuesCopy[row][column - 1].enlargement = left;
    }

    if (column < squareRoot - 1) {
      matrixValuesCopy[row][column + 1].enlargement = right;
    }

    if (row > 0) {
      matrixValuesCopy[row - 1][column].enlargement = top;
    }

    if (row < squareRoot - 1) {
      matrixValuesCopy[row + 1][column].enlargement = bottom;
    }

    if (column > 0 && row > 0) {
      matrixValuesCopy[row - 1][column - 1].enlargement = topLeft;
    }

    if (column < squareRoot - 1 && row > 0) {
      matrixValuesCopy[row - 1][column + 1].enlargement = topRight;
    }

    if (column > 0 && row < squareRoot - 1) {
      matrixValuesCopy[row + 1][column - 1].enlargement = bottomLeft;
    }

    if (column < squareRoot - 1 && row < squareRoot - 1) {
      matrixValuesCopy[row + 1][column + 1].enlargement = bottomRight;
    }

    setMatrixValues(matrixValuesCopy);
  };

  useEffect(() => {
    setTransformOriginY((100 * 0.5 * zoomPortHeight) / matrixHeight);
    const zoomPortRect = zoomPortElRef.current.getBoundingClientRect();
    setMatrixFoldPosition(zoomPortRect.y + zoomPortRect.height);
  }, [
    zoomPortWidth,
    zoomPortHeight,
    matrixWidth,
    matrixHeight,
    onMatrixFoldChange,
  ]);

  // Generate the initial set of digits
  useEffect(() => {
    const randomValues = new Array(squareRoot);
    for (let y = 0; y < squareRoot; y++) {
      randomValues[y] = new Array(squareRoot);
      for (let x = 0; x < squareRoot; x++) {
        randomValues[y][x] = {
          value: randomInt(0, 9),
          type: ["wo", "fc", "dr", "ma"].at(randomInt(0, 3)),
          enlargement: 0,
          selected: false,
        };
      }
    }
    setMatrixValues(randomValues);

    // Play sound
    startupSoundRef.current = new Audio(startupSound);
    startupSoundRef.current.play();
  }, [squareRoot, startupSoundRef]);

  return (
    <div
      ref={zoomPortElRef}
      style={{
        flex: "1 0 10vh",
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
          <DigitRow
            key={i}
            row={i}
            values={rowValues}
            binPositions={binPositions}
            matrixFoldPosition={matrixFoldPosition}
            zoom={zoom}
            bin01={bin01}
            bin02={bin02}
            bin03={bin03}
            bin04={bin04}
            bin05={bin05}
            onHoverProgress={handleHoverProgress}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onBinEnd={handleBinEnd}
          />
        ))}
      </motion.div>
    </div>
  );
};

const DigitRow = ({
  row,
  values,
  binPositions,
  matrixFoldPosition,
  zoom,
  bin01,
  bin02,
  bin03,
  bin04,
  bin05,
  onHoverProgress,
  onMouseDown,
  onMouseUp,
  onBinEnd,
}) => {
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
          type={valueItem.type}
          column={i}
          row={row}
          columnPortion={1 / values.length}
          axis={randomInt(0, 1) === 0 ? "x" : "y"}
          enlargement={valueItem.enlargement}
          selected={valueItem.selected}
          binPositions={binPositions}
          bin01={bin01}
          bin02={bin02}
          bin03={bin03}
          bin04={bin04}
          bin05={bin05}
          matrixFoldPosition={matrixFoldPosition}
          zoom={zoom}
          onHoverProgress={onHoverProgress}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onBinEnd={onBinEnd}
        />
      ))}
    </div>
  );
};

export default DigitMatrix;
