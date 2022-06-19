import { useCallback, useEffect, useState } from "react";

export const color = Object.freeze({
  on: "#BEEEFF",
  off: "#051021",
  wo: "#77DB70",
  fc: "#F1EB5A",
  dr: "#FE7BD9",
  ma: "#1A3DF5",
});

export const delay = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });

export const randomInt = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

export const uniqueRandomInt = ({ dontRepeat, min, max }) => {
  const value = randomInt(min, max);
  if (value === dontRepeat) {
    return uniqueRandomInt({ dontRepeat, min, max });
  } else {
    return value;
  }
};

export const matrixDeepCopy = (matrixValues) => {
  const matrixCopy = [...matrixValues];
  matrixCopy.forEach((rowValues, y) => {
    matrixCopy[y] = [...rowValues];
  });
  return matrixCopy;
};

export const useViewControls = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoomMin, zoomMax] = [1, 5.0625];

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "-":
          setZoom(zoom > zoomMin ? zoom / 1.5 : zoomMin);
          break;
        case "=":
          setZoom(zoom < zoomMax ? zoom * 1.5 : zoomMax);
          break;
        case "0":
          setZoom(zoomMin);
          setPan({ x: 0, y: 0 });
          break;
        case "ArrowUp":
          setPan({ x: pan.x, y: pan.y + 10 });
          break;
        case "ArrowDown":
          setPan({ x: pan.x, y: pan.y - 10 });
          break;
        case "ArrowLeft":
          setPan({ x: pan.x + 10, y: pan.y });
          break;
        case "ArrowRight":
          setPan({ x: pan.x - 10, y: pan.y });
          break;
        default:
          setZoom(zoom);
      }
    },
    [zoom, zoomMin, zoomMax, pan]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return { pan, zoom };
};

export const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === targetKey) setKeyPressed(true);
    };

    const handleKeyUp = ({ key }) => {
      if (key === targetKey) setKeyPressed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey]);

  return keyPressed;
};
