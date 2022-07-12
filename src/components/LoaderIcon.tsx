import { rotate } from "../util";
import { IconProps } from "../types";

export const Loader = (props: IconProps) => {
  const animation = `${rotate} 0.75s linear infinite`;
  return (
    <svg
      style={{ overflow: "visible" }}
      viewBox="0 0 32 32"
      width="2rem"
      height="2rem"
    >
      <path
        fill="none"
        stroke={props.primary || "#E5E7EB"}
        stroke-width="4"
        stroke-miterlimit="10"
        d="M16,6c3,0,5.7,1.3,7.5,3.4c1.5,1.8,2.5,4,2.5,6.6c0,5.5-4.5,10-10,10S6,21.6,6,16S10.5,6,16,6z"
      />
      <path
        style={{ animation, "transform-origin": "50% 50%" }}
        fill="none"
        stroke={props.secondary || "#4b5563"}
        stroke-width="4"
        stroke-linecap="round"
        stroke-miterlimit="10"
        d="M16,6c3,0,5.7,1.3,7.5,3.4c0.6,0.7,1.1,1.4,1.5,2.2"
      />
    </svg>
  );
};
