import Bin from "./Bin";
import { useCallback, useEffect, useRef } from "react";

const BinShelf = ({
  onBinPositionChange,
  binTotals,
  binMaxes,
  bin01,
  bin02,
  bin03,
  bin04,
  bin05,
}) => {
  const rootElRef = useRef(null);
  const binRef01 = useRef(null);
  const binRef02 = useRef(null);
  const binRef03 = useRef(null);
  const binRef04 = useRef(null);
  const binRef05 = useRef(null);

  const handleResize = useCallback(() => {
    const binRect01 = binRef01.current.getBoundingClientRect();
    const binRect02 = binRef02.current.getBoundingClientRect();
    const binRect03 = binRef03.current.getBoundingClientRect();
    const binRect04 = binRef04.current.getBoundingClientRect();
    const binRect05 = binRef05.current.getBoundingClientRect();
    onBinPositionChange([
      binRect01.x + binRect01.width / 2,
      binRect02.x + binRect02.width / 2,
      binRect03.x + binRect03.width / 2,
      binRect04.x + binRect04.width / 2,
      binRect05.x + binRect05.width / 2,
    ]);
  }, [onBinPositionChange]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    handleResize();
  }, []); // Don't include handleResize. Causes infinite calls.

  return (
    <div
      ref={rootElRef}
      style={{
        flex: "0 0 11vh",
        display: "flex",
        padding: "0.4rem 5vw",
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Bin
        ref={binRef01}
        label="01"
        max={binMaxes[0]}
        {...binTotals[0]}
        active={bin01}
      />
      <Bin
        ref={binRef02}
        label="02"
        max={binMaxes[1]}
        {...binTotals[1]}
        active={bin02}
      />
      <Bin
        ref={binRef03}
        label="03"
        max={binMaxes[2]}
        {...binTotals[2]}
        active={bin03}
      />
      <Bin
        ref={binRef04}
        label="04"
        max={binMaxes[3]}
        {...binTotals[3]}
        active={bin04}
      />
      <Bin
        ref={binRef05}
        label="05"
        max={binMaxes[4]}
        {...binTotals[4]}
        active={bin05}
      />
    </div>
  );
};

export default BinShelf;
