import { Box, Image } from "@chakra-ui/react";
import React from "react";

export default function Playgroundlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      px="4"
      pb="10"
      bgImage="url('/homeBg.png')"
      bgSize="cover"
      bgPos="center"
      h={"100vh"}
      overflowY={"auto"}
      display="flex"
      flexDirection="column"
      w="full"
    >
      <Image my="2" mx="auto" w="180px" src="/appLogo2.png" />
      <Box
        flex="1"
        minH="0" // ensures proper shrinking if needed
        // overflow="auto"
        // display="flex"
        // flexDirection="column"
        // justifyContent="center"
        // h="400px"
        w={"full"}
        bg="#000"
        p="4"
        bgImage={"url('/image.png')"}
        bgSize={"cover"}
        bgPos={"center"}
        border="1px solid rgba(255, 255, 255, 0.125)"
        rounded={"xl"}
      >
        {children}
      </Box>
    </Box>
  );
}
