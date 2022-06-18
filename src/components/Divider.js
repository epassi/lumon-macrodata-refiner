import { color } from "../util";

const Divider = ({ weight }) => {
  return (
    <div
      style={{
        flex: "0 0 0.3rem",
        borderTop: `1.5px solid ${color.on}`,
        borderBottom: weight === "double" ? `1.5px solid ${color.on}` : 0,
      }}
    ></div>
  );
};

export default Divider;
