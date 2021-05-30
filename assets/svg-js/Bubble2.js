import * as React from "react";

function Bubble2(props) {
  return (
    <svg
      width={419}
      height={322}
      viewBox="0 0 419 322"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M418.144 152.552c0 83.725-104.39 78.153-208.779 151.6C116.7 369.352.586 236.28.586 152.552S94.06.952 209.365.952c115.305 0 208.779 67.874 208.779 151.6z"
        fill={props.color}
      />
    </svg>
  );
}

export default Bubble2;
