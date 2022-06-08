import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BinShelf from "./components/BinShelf";
import DigitMatrix from "./components/DigitMatrix";
import Divider from "./components/Divider";
import { useViewControls, useKeyPress } from "./util";

const Refiner = () => {
  const { pan, zoom } = useViewControls();
  const [binPositions, setBinPositions] = useState([0, 0, 0, 0, 0]);
  const bin01 = useKeyPress("1");
  const bin02 = useKeyPress("2");
  const bin03 = useKeyPress("3");
  const bin04 = useKeyPress("4");
  const bin05 = useKeyPress("5");

  const handleBinPositionChange = (positions) => {
    setBinPositions(positions);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Divider weight="double" />
      <DigitMatrix
        squareRoot={20}
        pan={pan}
        zoom={zoom}
        binPositions={binPositions}
        bin01={bin01}
        bin02={bin02}
        bin03={bin03}
        bin04={bin04}
        bin05={bin05}
      />
      <Divider weight="double" />
      <BinShelf
        onBinPositionChange={handleBinPositionChange}
        bin01={bin01}
        bin02={bin02}
        bin03={bin03}
        bin04={bin04}
        bin05={bin05}
      />
      <Divider weight="single" />
      <Footer />
    </div>
  );
};

export default Refiner;
