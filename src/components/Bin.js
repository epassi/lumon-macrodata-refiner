const Bin = ({ label }) => {
  return (
    <div
      style={{
        width: "16vw",
        display: "flex",
        flexDirection: "column",
        fontSize: "1.5vw",
        gap: "0.4rem",
      }}
    >
      <div
        style={{
          height: "100%",
          flex: "2 1 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #fff",
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: "1 0 auto",
          padding: "0.2rem",
          border: "1px solid #fff",
        }}
      >
        0%
      </div>
    </div>
  );
};

export default Bin;
