import { Box } from "@chakra-ui/react";

export default function Circles({ top, right, left, bottom }: any) {
  return (
    <Box
      w={"10px"}
      h={"10px"}
      zIndex={9}
      bg="rgba(255, 255, 255, 0.5)"
      rounded={"full"}
      pos={"absolute"}
      top={top || ""}
      left={left || ""}
      bottom={bottom || ""}
      right={right || ""}
    ></Box>
  );
}
