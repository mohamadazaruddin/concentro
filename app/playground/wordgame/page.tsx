import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

export default function WordGame() {
  return (
    <Flex flexDirection="column" h={"full"}>
      <Box flex={1}>game</Box>
      <Box
        p="4"
        rounded={"md"}
        bg={"#161616"}
        w="fit-content"
        mx="auto"
        border="1px solid rgba(255, 255, 255, 0.125)"
        backdropFilter={"blur(16px) saturate(200%)"}
      >
        <Button
          px="5"
          py="2"
          fontSize={"16px"}
          fontWeight={"semibold"}
          rounded="sm"
          //   onClick={() => router.push("/games")}
        >
          Go Back
        </Button>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate,
        nam nesciunt tenetur ullam error possimus laboriosam ad voluptates
        tempora dolorem! Magnam, porro et quae harum ex reiciendis eaque nam
        provident.
      </Box>
    </Flex>
  );
}
