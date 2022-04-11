import DigitMatrix from "./components/DigitMatrix";
import { useViewControls } from "./util";

const Refiner = () => {
  const { pan, zoom } = useViewControls();

  return <DigitMatrix squareRoot={20} pan={pan} zoom={zoom} />;
};

export default Refiner;
