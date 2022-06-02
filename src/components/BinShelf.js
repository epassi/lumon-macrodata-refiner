import Bin from "./Bin";

const BinShelf = () => {
  return (
    <div
      style={{
        flex: "0 0 11vh",
        display: "flex",
        padding: "0.4rem 5vw",
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Bin label="01" />
      <Bin label="02" />
      <Bin label="03" />
      <Bin label="04" />
      <Bin label="05" />
    </div>
  );
};

export default BinShelf;
