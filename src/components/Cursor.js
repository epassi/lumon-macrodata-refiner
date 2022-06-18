const Cursor = ({ x, y }) => {
  return (
    <svg
      width="22"
      height="25"
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        zIndex: 900,
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        pointerEvents: "none",
      }}
    >
      <path
        d="M2.03839 0.372498L3.19968 0.399951L21.1998 13.8959L21.5489 15.0113L20.9508 16.8114L20.0036 17.496L12.5752 17.5092L9.49238 23.8721L8.49935 24.4317L6.63425 24.2573L5.76218 23.5233L0.0695801 2.5234L0.473344 1.43422L2.03839 0.372498Z"
        fill="#060D29"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.03467 2.26174L2.59972 1.20001L20.5999 14.6959L20.0017 16.496L11.9479 16.5103L8.59237 23.436L6.72726 23.2616L1.03467 2.26174ZM3.72546 4.54378L7.95815 20.1581L10.4208 15.0753L11.3189 14.5114L17.0063 14.5013L3.72546 4.54378Z"
        fill="#D1F4ED"
      />
    </svg>
  );
};

export default Cursor;
