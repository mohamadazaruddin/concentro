import { Box, BoxProps, Image } from "@chakra-ui/react";
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
        border="1px solid rgba(255, 255, 255, 0.125)"
        borderRight={"none"}
        borderLeft={"none"}
        backdropFilter={"blur(8px) saturate(200%)"}
        w="full"
        px="5"
        py="4"
        mx="auto"
      >
        <Image mx="auto" w="180px" src="/appLogo2.png" />
      </Box>
      <Box
        px="40"
        bgImage="url('/homeBg.png')"
        bgSize="cover"
        bgPos="center"
        h={"full"}
        backdropFilter={"blur(24px) saturate(200%)"}
        w="full"
        display="flex"
        // alignItems="center"
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
