import { Box } from "@chakra-ui/react";

type postionsType = {
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
};

export default function Circles({ top, right, left, bottom }: postionsType) {
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
