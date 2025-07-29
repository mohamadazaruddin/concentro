import { Box } from "@chakra-ui/react";
import React from "react";

export default function Lines({ top, right, left, bottom }: any) {
  return (
    <Box
      w="full"
      h="1px"
      // bg="rgba(255, 255, 255, 0.05)"
      bgGradient="to-r"
      gradientFrom="rgba(255, 255, 255, 0.09)"
      gradientTo="rgba(255, 255, 255, 0.05)"
      top={top || ""}
      left={left || ""}
      bottom={bottom || ""}
      right={right || ""}
      pos={"absolute"}
    ></Box>
  );
}
