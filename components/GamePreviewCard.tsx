"use client";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
type CardPropsType = {
  name: string;
  slug: string;
  description: string;
  image: string;
};
export default function GamePreviewCard({
  name,
  slug,
  description,
  image,
}: CardPropsType) {
  const router = useRouter();
  return (
    <Box
      border="1px solid rgba(44, 43, 43, 0.13)"
      rounded={"xl"}
      backdropFilter={"blur(8px) saturate(200%)"}
      transition={"0.2s ease-out"}
      _hover={{
        transform: "scale(1.2) translate(0px,-50px)",
        zIndex: 999,
      }}
      pb="10"
      bgColor={"rgba(98, 98, 98, 0.23)"}
      cursor={"pointer"}
      pos={"relative"}
      onClick={() => router.push(`/playground/${slug}`)}
    >
      <Image
        alt="Game Preview"
        height="180px"
        pos={"relative"}
        zIndex={6}
        rounded={"xl"}
        mx="4"
        src={`/${image}`}
      />
      <Box
        pos={"absolute"}
        style={{
          background: "linear-gradient(180deg,#00000085 60%, #4a49492c 100%)",
        }}
        h={"full"}
        rounded={"xl"}
        w={"full"}
        backdropFilter={"blur(16px) saturate(200%)"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={5}
      ></Box>
      <Box
        pos={"absolute"}
        style={{
          background: "linear-gradient(90deg,#00000085 80%, #4a494954 100%)",
        }}
        h={"full"}
        rounded={"xl"}
        w={"full"}
        backdropFilter={"blur(16px) saturate(200%)"}
        top={0}
        left={0}
        zIndex={2}
        right={0}
        bottom={0}
      ></Box>
      <Box
        pos={"absolute"}
        style={{
          background: "linear-gradient(-90deg,#00000085 80%, #4a494954 100%)",
        }}
        h={"full"}
        rounded={"xl"}
        w={"full"}
        backdropFilter={"blur(16px) saturate(200%)"}
        top={0}
        left={0}
        zIndex={3}
        right={0}
        bottom={0}
      ></Box>

      <Box
        pos={"absolute"}
        bottom={0}
        left={0}
        right={0}
        zIndex={10}
        // backdropFilter={"blur(8px) saturate(200%)"}
        rounded={"lg"}
        w="full"
        px="5"
        py="3"
      >
        <Text
          color={"#abacadff"}
          fontSize={"sm"}
          fontWeight={"medium"}
          pos={"relative"}
          zIndex={20}
        >
          {" "}
          {description}
        </Text>
        <Heading
          pos={"relative"}
          zIndex={20}
          color={"#ffffff"}
          textShadow="0px 0px 2px #ffffff"
          fontSize={"2xl"}
          fontWeight={"semibold"}
        >
          {name}
        </Heading>
      </Box>
    </Box>
  );
}
