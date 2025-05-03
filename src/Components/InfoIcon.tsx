import * as React from "react";

// By: lucide
// See: https://v0.app/icon/lucide/info
// Example: <IconLucideInfo width="24px" height="24px" style={{color: "#000000"}} />

export const InfoIcon = ({
  height = "1em",
  strokeWidth = "3",
  fill = "none",
  focusable = "false",
  stroke = "currentColor",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <g
      fill={fill}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4m0-4h.01" />
    </g>
  </svg>
);
