"use client";
import Circles from "@/components/Circles";
import HomeBackground from "@/components/HomeBackground";
import Lines from "@/components/Lines";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <HomeBackground>
      <Flex
        borderRight={"1px solid"}
        borderLeft={"1px solid"}
        h="full"
        w={"full"}
        borderColor={"rgba(255, 255, 255, 0.125)"}
        flexDir="column"
        // justifyContent="center"
        alignItems={"center"}
        pt="40"
        pos={"relative"}
      >
        <Circles top="100px" left="-6px" />
        <Lines top="105px" />
        <Circles top="250px" right="-6px" />
        <Lines top="255px" />
        <Circles top="400px" left="-6px" />
        <Lines top="405px" />
        <Circles top="550px" right="-6px" />
        <Lines top="555px" />
        <Heading
          fontSize={"72px"}
          fontWeight={"bold"}
          color={"#fff"}
          lineHeight={1}
          textAlign={"center"}
          textShadow="0px 0px 8px #ffffff6e"
        >
          Enhance Your Concentration
          <br /> Power
        </Heading>
        <Text
          textAlign={"center"}
          mt="5"
          fontSize={"18px"}
          color={"#fff"}
          fontWeight={"medium"}
          maxW={"80%"}
          textShadow="0px 0px 8px #ffffff6e"
        >
          Experience the ultimate collection of brain games, all in one place.
          Play engaging challenges designed to boost your concentration and
          sharpen your mind.
        </Text>
        <Button
          px="20"
          py="2"
          fontSize={"16px"}
          fontWeight={"semibold"}
          mt="10"
          rounded="full"
          w={"fit-content"}
          mx="auto"
          onClick={() => router.push("/games")}
        >
          Get Started
        </Button>
      </Flex>
    </HomeBackground>
  );
}
