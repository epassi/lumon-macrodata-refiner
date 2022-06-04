const Divider = ({ weight }) => {
  return (
    <div
      style={{
        flex: "0 0 0.3rem",
        borderTop: "1px solid #fff",
        borderBottom: weight === "double" ? "1px solid #fff" : 0,
      }}
    ></div>
  );
};

export default Divider;
