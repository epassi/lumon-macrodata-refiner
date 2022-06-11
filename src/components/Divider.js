const Divider = ({ weight }) => {
  return (
    <div
      style={{
        flex: "0 0 0.3rem",
        borderTop: "1.5px solid #D1F4ED",
        borderBottom: weight === "double" ? "1.5px solid #D1F4ED" : 0,
      }}
    ></div>
  );
};

export default Divider;
