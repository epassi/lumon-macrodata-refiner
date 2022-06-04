import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BinShelf from "./components/BinShelf";
import DigitMatrix from "./components/DigitMatrix";
import Divider from "./components/Divider";
import { useViewControls } from "./util";

const Refiner = () => {
  const { pan, zoom } = useViewControls();
  const [binPositions, setBinPositions] = useState([0, 0, 0, 0, 0]);

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
      />
      <Divider weight="double" />
      <BinShelf onBinPositionChange={handleBinPositionChange} />
      <Divider weight="single" />
      <Footer />
    </div>
  );
};

export default Refiner;
