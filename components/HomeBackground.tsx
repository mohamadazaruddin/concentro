import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export default function HomeBackground({
  children,
  WrapperProps,
  containerProps,
}: Readonly<{
  children: React.ReactNode;
  WrapperProps?: BoxProps;
  containerProps?: BoxProps;
}>) {
  return (
    <Box
      w="full"
      bgImage="url('/homeBg.png')"
      bgSize="cover"
      bgPos="center"
      h="100vh"
      overflowY={"hidden"}
      {...containerProps}
    >
      <Box
        // backgroundColor="rgba(98, 98, 98, 0.09)"
        // borderRadius="40px"
        border="1px solid rgba(255, 255, 255, 0.125)"
        borderRight={"none"}
        borderLeft={"none"}
        backdropFilter={"blur(8px) saturate(200%)"}
        w="full"
        px="5"
        fontSize={"24px"}
        py="4"
        textAlign={"center"}
        mx="auto"
      >
        Concentro
      </Box>
      <Box
        px="40"
        bgImage="url('/homeBg.png')"
        bgSize="cover"
        bgPos="center"
        h={"full"}
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pos="relative"
        overflow={"auto"}
        {...WrapperProps}
      >
        {children}
      </Box>
    </Box>
  );
}
