const Footer = ({ hexMin, hexMax }) => {
  return (
    <footer
      style={{
        flex: "0 0 4.5vh",
        fontSize: "1.8vw",
        fontWeight: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5vw",
      }}
    >
      <span style={style.value}>{hexMin}</span>{" "}
      <span style={style.colon}>:</span>{" "}
      <span style={style.value}>{hexMax}</span>
    </footer>
  );
};

const style = {
  value: {
    letterSpacing: "0.05rem",
    transform: "translateY(-0.2rem)",
  },
  colon: {
    transform: "translateY(-0.3rem)",
  },
};

export default Footer;
