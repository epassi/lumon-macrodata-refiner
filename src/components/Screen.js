import backgroundTile from "../assets/images/background-tile.png";

const Screen = () => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        backgroundImage: `url(${backgroundTile})`,
      }}
    ></div>
  );
};

export default Screen;
