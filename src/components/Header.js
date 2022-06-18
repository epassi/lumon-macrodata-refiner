import { useState, useEffect } from "react";
import { color } from "../util";
import lumonLogo from "../assets/images/lumon-logo.svg";

const Header = ({ filename, progress }) => {
  return (
    <header
      style={{
        flex: "0 0 16vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TitleBlock filename={filename} progress={progress} />
      <LogoCompletionLockup progress={progress} />
    </header>
  );
};

const TitleBlock = ({ filename, progress }) => {
  return (
    <div
      style={{
        // flexGrow: 1,
        position: "relative",
        width: "calc(85vw)",
        height: "7vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 5vw",
        padding: "0 0.5vw",
        borderTop: `0.3vh solid ${color.on}`,
        borderBottom: `0.3vh solid ${color.on}`,
        borderLeft: `0.3vh solid ${color.on}`,
      }}
    >
      <h1 style={{ fontFamily: "Poppins", fontSize: "5.5vh" }}>{filename}</h1>
      <Gradient steps={60} maxWeight={24} progress={progress} />
    </div>
  );
};

const Gradient = ({ steps, maxWeight, progress }) => {
  const [pathIndexes, setPathIndexes] = useState([]);

  useEffect(() => {
    setPathIndexes(Array.from(Array(steps).keys()));
  }, [steps]);

  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "95%" }}
      width="95%" // Make it a little narrower so that 100% is optically where the logo starts
      height="100%"
      viewBox="0 0 1180 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none" // Allow svg to stretch to absolute position
    >
      {pathIndexes.map((i) => (
        <path
          d={`M${i * 20 + 1} 0V100`}
          stroke-width={(i / 60) * maxWeight}
          stroke={color.on}
          stroke-opacity={i < progress * steps ? i / 30 : 0}
        />
      ))}
    </svg>
  );
};

const LogoCompletionLockup = ({ progress }) => {
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
      shadow += `${shadowOffset(Math.PI * i, radius, "rem")} ${color.on},`;
    }

    // Remove trailing comma.
    setTextShadow(shadow.slice(0, -1));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 100,
        right: "5vw",
        height: "12.25vh",
        transform: "translateY(0.15vh)",

        display: "flex",
        alignItems: "center",
      }}
    >
      <p
        style={{
          right: "6vh",
          marginRight: "2vw",
          marginBottom: "0.5vh",
          fontFamily: `"Helvetica", "Arial", sans-serif`,
          fontSize: "5.5vh",
          fontWeight: 600,
          color: color.off,
          textShadow,
        }}
      >
        {Math.floor(progress * 100)}% Complete
      </p>
      <img src={lumonLogo} alt="Lumon logo" style={{ height: "100%" }} />
    </div>
  );
};

export default Header;
