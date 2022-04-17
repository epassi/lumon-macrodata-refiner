import { useCallback, useEffect, useState } from "react";

export const randomInt = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

export const matrixDeepCopy = (matrixValues) => {
  const matrixCopy = [...matrixValues];
  matrixCopy.forEach((rowValues, y) => {
    matrixCopy[y] = [...rowValues];
  });
  return matrixCopy;
};

export const useBoundingClientRect = (ref) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowChange = useCallback(() => {
    const rect = ref.current.getBoundingClientRect();
    setX(rect.x);
    setY(rect.y);
    setWidth(rect.width);
    setHeight(rect.height);
  }, [ref]);

  useEffect(() => {
    handleWindowChange();
    // WIP. Use ResizeObserver instead.
    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange);
    };
  }, [handleWindowChange]);

  return { x, y, width, height };
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
