const Footer = () => {
  return (
    <footer
      style={{
        flex: "0 0 4vh",
        fontSize: "1.5vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5vw",
      }}
    >
      <span style={style.value}>0x000000</span>{" "}
      <span style={style.colon}>:</span>{" "}
      <span style={style.value}>0x000000</span>
    </footer>
  );
};

const style = {
  value: {
    transform: "translateY(-0.2rem)",
  },
  colon: {
    transform: "translateY(-0.3rem)",
  },
};

export default Footer;
