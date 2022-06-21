import sevy from "../assets/images/sevy.svg";
import { color } from "../util";

const MessageScreen = ({ title, message }) => {
  return (
    <Scrim>
      <Window title={title} message={message} />
    </Scrim>
  );
};

const Window = ({ title, message }) => {
  return (
    <div
      style={{
        width: "40vw",
        // height: "50vh",
        padding: "0.3rem",
        background: color.off,
        border: `1.5px solid ${color.on}`,
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "3vw",
          border: `1.5px solid ${color.on}`,

          padding: "4vw",
        }}
      >
        <img
          style={{ height: "35vh" }}
          src={sevy}
          alt="Sevy, the Lumon mascot"
        />
        <div
          style={{
            fontSize: "1.5vw",
          }}
        >
          <h1 style={{ fontWeight: 600, marginBottom: "2vh" }}>{title}</h1>
          <p style={{ fontWeight: 300, lineHeight: "1.25em" }}>{message}</p>
        </div>
      </div>
    </div>
  );
};

const Scrim = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 800,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
      // onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MessageScreen;
