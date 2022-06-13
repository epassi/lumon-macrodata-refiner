import { useState, useEffect } from "react";
import lumonLogo from "../assets/images/lumon-logo.svg";

const Header = ({ progress }) => {
  return (
    <header
      style={{
        flex: "0 0 16vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TitleBlock progress={progress} />
      <LumonLogo />
    </header>
  );
};

const TitleBlock = ({ filename, progress }) => {
  const [textShadow, setTextShadow] = useState("");
  const shadowOffset = (angle, radius, unit) => {
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return `${x}${unit} ${y}${unit}`;
  };

  useEffect(() => {
    const radius = 0.22;

    let shadow = textShadow;
    for (let i = 0; i < 2; i += 0.125) {
      shadow += `${shadowOffset(Math.PI * i, radius, "rem")} #D1F4ED,`;
    }

    // Remove trailing comma.
    setTextShadow(shadow.slice(0, -1));
  }, []);

  return (
    <div
      style={{
        // flexGrow: 1,
        width: "calc(85vw)",
        height: "7vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 5vw",
        padding: "0 0.5vw",
        borderTop: "0.3vh solid #D1F4ED",
        borderBottom: "0.3vh solid #D1F4ED",
        borderLeft: "0.3vh solid #D1F4ED",
      }}
    >
      <h1 style={{ fontFamily: "Poppins", fontSize: "5.5vh" }}>Dranesville</h1>
      <p
        style={{
          marginRight: "12vw",
          fontFamily: `"Helvetica", "Arial", sans-serif`,
          fontSize: "5.5vh",
          fontWeight: 600,
          color: "#060D29",
          textShadow,
        }}
      >
        {Math.floor(progress * 100)}% Complete
      </p>
    </div>
  );
};

const LumonLogo = () => {
  return (
    <img
      src={lumonLogo}
      alt="Lumon logo"
      style={{
        position: "absolute",
        right: "5vw",
        height: "12vh",
        transform: "translateY(0.15vh)",
      }}
    />
  );
};

export default Header;
