import { Box } from "@chakra-ui/react";
import React from "react";

type colorBadgeProps = {
  text: string;
  color: string;
  top: string;
  left: string;
  bottom: string;
  right: string;
};
export default function ColorBadge({
  text,
  color,
  top,
  left,
  bottom,
  right,
}: colorBadgeProps) {
  function hexToRgba(hex: string, alpha = 0.2) {
    let c = hex.replace("#", "");
    if (c.length === 3) {
      c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <Box
      fontSize={"md"}
      border={"1px solid"}
      borderColor={color}
      //   bg={hexToRgba(color, 0.2)}
      bg={`${color}` + "30"}
      //   textShadow={`0px 0px px ${color}`}
      px={6}
      fontWeight={"medium"}
      py={1}
      color={color}
      rounded={"full"}
    >
      {text}
    </Box>
  );
}
