import Header from "./components/Header";
import Footer from "./components/Footer";
import BinShelf from "./components/BinShelf";
import DigitMatrix from "./components/DigitMatrix";
import Divider from "./components/Divider";
import { useViewControls } from "./util";

const Refiner = () => {
  const { pan, zoom } = useViewControls();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Divider weight="double" />
      <DigitMatrix squareRoot={20} pan={pan} zoom={zoom} />
      <Divider weight="double" />
      <BinShelf />
      <Divider weight="single" />
      <Footer />
    </div>
  );
};

export default Refiner;
