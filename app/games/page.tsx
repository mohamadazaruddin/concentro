import GamePreviewCard from "@/components/GamePreviewCard";
import HomeBackground from "@/components/HomeBackground";
import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
type CardPropsType = {
  name: string;
  slug: string;
  description: string;
  image: string;
};
export default function Games() {
  const games = [
    {
      name: "Word vs Color",
      description: "Say the Color",
      slug: "wordgame",
      image: "wordvscolor.png",
    },
    // {
    //   name: "Azar",
    //   description: "reday to go",
    //   slug: "numbergame",
    //   image: "numbergamePreview.png",
    // },
    {
      name: "Breakout",
      description: "Smash those blocks",
      slug: "breakoutgame",
      image: "breakoutgamePreview.png",
    },
    {
      name: "Tower Blocks",
      description: "Smash those blocks",
      slug: "tiktactoe",
      image: "tiktaktoePreview.png",
    },
    {
      name: "Memory Card",
      description: "find matching pairs",
      slug: "memorygame",
      image: "memorygamePreview.png",
    },
  ];
  return (
    <HomeBackground
      WrapperProps={{ py: "4", px: "10", alignItems: "flex-start" }}
      // containerProps={{ overflowY: "auto" }}
    >
      <Box>
        <Heading
          textAlign={"center"}
          my="10"
          color="#ffffff"
          textShadow="0px 0px 2px #ffffff"
          fontSize={"4xl"}
        >
          Select Game
        </Heading>
        <Flex
          mt="20"
          alignItems={"center"}
          justifyContent={"center"}
          gap="10"
          flexWrap={"wrap"}
        >
          {games.map((item: CardPropsType, i: number) => (
            <GamePreviewCard
              key={i}
              name={item.name}
              description={item.description}
              slug={item.slug}
              image={item.image}
            />
          ))}
        </Flex>
      </Box>
    </HomeBackground>
  );
}
