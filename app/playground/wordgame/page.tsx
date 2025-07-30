"use client";
import ColorBadge from "@/components/ColorBadge";
import ColorBadgeList from "@/components/ColorBadgeList";
import { Box, Button, Flex, Text, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

export default function WordGame() {
  const router = useRouter();

  return (
    <Flex
      alignItems={"right"}
      gap={10}
      w={"full"}
      justifyContent={"space-between"}
    >
      <Box>
        <Button
          p="4"
          mb="4"
          rounded={"md"}
          bg={"#161616"}
          border="1px solid rgba(255, 255, 255, 0.125)"
          backdropFilter={"blur(16px) saturate(200%)"}
          color={"#fff"}
          onClick={() => router.back()}
        >
          <LuArrowLeft width={3} height={3} />
          Back
        </Button>
        <Box
          p="4"
          rounded={"md"}
          bg={"#161616"}
          h="fit-content"
          //   w={"350px"}
          flex={1}
          border="1px solid rgba(255, 255, 255, 0.125)"
          backdropFilter={"blur(16px) saturate(200%)"}
        >
          <Heading fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
            Color vs Word Game 🎨🗣️
          </Heading>

          <Text fontSize={"xl"} fontWeight={"semibold"} mt="10">
            How To Play (Like a Pro):
          </Text>

          <Box fontSize={"lg"}>
            <Text mt="3" mb="5">
              {" "}
              Each card shows a color name written in a different color.
            </Text>
            <Box fontSize="lg" mb={2}>
              First, pronounce the word you see — not the color it’s written in!
            </Box>
            <Box fontSize="lg" mb={2}>
              Next, pronounce the color of the text — not the word itself!
            </Box>
            <Text color={"#5cdc7aff"} mr="2" fontWeight={"bold"} mb={2}>
              Challenge your brain to separate what you read from what you see.
              🧠✨
            </Text>
            <Text fontSize="lg" mb={2}>
              Go through all the cards, switching between reading the word and
              naming the color.
            </Text>
            <Text fontSize="lg" mb={2}>
              The faster and more accurately you switch, the sharper your mind
              gets! ⚡
            </Text>
            <Text fontSize="lg" fontWeight="bold" mt={4} color="#ffa200ff">
              Ready, Set, SWITCH!
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex mt="10" flex={1}>
        <ColorBadgeList />
      </Flex>
    </Flex>
  );
}
