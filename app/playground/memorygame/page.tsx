"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CssKeyframes,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

type CardType = {
  id: number;
  img: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const CARD_IMAGES = [
  "/memorygameImages/img-1.png",
  "/memorygameImages/img-2.png",
  "/memorygameImages/img-3.png",
  "/memorygameImages/img-4.png",
  "/memorygameImages/img-5.png",
  "/memorygameImages/img-6.png",
  "/memorygameImages/img-7.png",
  "/memorygameImages/img-8.png",
];

function generateShuffledCards(): CardType[] {
  const images = [...CARD_IMAGES, ...CARD_IMAGES];
  images.sort(() => Math.random() - 0.5);
  return images.map((img, idx) => ({
    id: idx,
    img,
    isFlipped: false,
    isMatched: false,
  }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCardIdx, setFirstCardIdx] = useState<number | null>(null);
  const [secondCardIdx, setSecondCardIdx] = useState<number | null>(null);
  const [disableDeck, setDisableDeck] = useState(false);
  const [matched, setMatched] = useState(0);

  // Only shuffle on client to avoid hydration mismatch
  useEffect(() => {
    setCards(generateShuffledCards());
  }, []);

  const handleRestart = () => {
    setCards(generateShuffledCards());
    setMatched(0);
    setFirstCardIdx(null);
    setSecondCardIdx(null);
    setDisableDeck(false);
  };

  const handleCardClick = (idx: number) => {
    if (disableDeck) return;
    if (cards[idx].isFlipped || cards[idx].isMatched) return;
    let updatedCards = [...cards];
    updatedCards[idx].isFlipped = true;
    setCards(updatedCards);

    if (firstCardIdx === null) {
      setFirstCardIdx(idx);
    } else if (secondCardIdx === null && idx !== firstCardIdx) {
      setSecondCardIdx(idx);
      setDisableDeck(true);
    }
  };

  useEffect(() => {
    if (firstCardIdx !== null && secondCardIdx !== null) {
      const firstCard = cards[firstCardIdx];
      const secondCard = cards[secondCardIdx];
      if (firstCard.img === secondCard.img) {
        setTimeout(() => {
          let updatedCards = [...cards];
          updatedCards[firstCardIdx].isMatched = true;
          updatedCards[secondCardIdx].isMatched = true;
          setCards(updatedCards);
          setFirstCardIdx(null);
          setSecondCardIdx(null);
          setDisableDeck(false);
          setMatched((m) => m + 1);
        }, 400);
      } else {
        setTimeout(() => {
          let updatedCards = [...cards];
          updatedCards[firstCardIdx].isFlipped = false;
          updatedCards[secondCardIdx].isFlipped = false;
          setCards(updatedCards);
          setFirstCardIdx(null);
          setSecondCardIdx(null);
          setDisableDeck(false);
        }, 1200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCardIdx]);

  useEffect(() => {
    if (matched === 8) {
      setTimeout(() => {
        handleRestart();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched]);
  const router = useRouter();

  //   const shake = CssKeyframes`
  //   0%, 100% { transform: translateX(0); }
  //   20% { transform: translateX(-13px); }
  //   40% { transform: translateX(13px); }
  //   60% { transform: translateX(-8px); }
  //   80% { transform: translateX(8px); }
  // `;
  return (
    <Box p="2" overflowY={"hidden"}>
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
              Memory Card Game 🧠🃏
            </Heading>

            <Text fontSize={"xl"} fontWeight={"semibold"} mt="10">
              How To Play (Like a Pro):
            </Text>

            <Box fontSize={"lg"}>
              <Text mt="3" mb="5">
                {" "}
                Flip cards to find matching pairs! 🔄
              </Text>
              <Box fontSize="lg" mb={2}>
                Click any card to reveal what’s underneath.
              </Box>
              <Box fontSize="lg" mb={2}>
                Remember where each picture is — your memory is your superpower!
                💡
              </Box>
              <Text color={"#5cdc7aff"} mr="2" fontWeight={"bold"} mb={2}>
                Match two cards with the same image to score a pair. 🎯
              </Text>
              <Text fontSize="lg" mb={2}>
                Find all the pairs to win the game! 🏆
              </Text>
              <Text fontSize="lg" mb={2}>
                If you match them all in fewer moves, you look even cooler. 😎
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={4} color="#ffa200ff">
                Ready, Set, MATCH!
              </Text>
            </Box>
          </Box>
        </Box>
        <Box maxW="400px" mx="auto" textAlign="center">
          <Box
            mt="12"
            className="wrapper"
            borderRadius="10px"
            boxShadow="0 10px 30px rgba(0,0,0,0.1)"
          >
            <Flex
              className="cards"
              h="400px"
              w="400px"
              flexWrap="wrap"
              justify="space-between"
              align="center"
              mx="auto"
            >
              {cards.map((card, idx) => (
                <Box
                  key={card.id}
                  className={`card${card.isFlipped ? " flip" : ""}`}
                  cursor="pointer"
                  userSelect="none"
                  position="relative"
                  perspective="1000px"
                  transformStyle="preserve-3d"
                  h="calc(25% - 10px)"
                  w="calc(25% - 10px)"
                  listStyleType="none"
                  onClick={() => handleCardClick(idx)}
                  // sx={{
                  //   "&.flip .back-view": {
                  //     transform: "rotateY(0)",
                  //   },
                  //   "&.flip .front-view": {
                  //     transform: "rotateY(180deg)",
                  //   },
                  // }}
                >
                  {/* Front View */}
                  <Flex
                    className="view front-view"
                    w="100%"
                    h="100%"
                    position="absolute"
                    borderRadius="7px"
                    bg="#fff"
                    pointerEvents="none"
                    backfaceVisibility="hidden"
                    boxShadow="0 3px 10px rgba(0,0,0,0.1)"
                    transition="transform 0.25s linear"
                    align="center"
                    justify="center"
                    // sx={{
                    //   img: { w: "19px" },
                    // }}
                  >
                    <Image
                      src="/memorygameImages/que_icon.svg"
                      alt="front"
                      w="19px"
                    />
                  </Flex>
                  {/* Back View */}
                  <Flex
                    className="view back-view"
                    w="100%"
                    h="100%"
                    position="absolute"
                    borderRadius="7px"
                    bg="#fff"
                    pointerEvents="none"
                    backfaceVisibility="hidden"
                    boxShadow="0 3px 10px rgba(0,0,0,0.1)"
                    transition="transform 0.25s linear"
                    align="center"
                    justify="center"
                    transform="rotateY(-180deg)"
                    // sx={{
                    //   img: { maxW: "45px" },
                    // }}
                  >
                    <Image src={card.img} alt="back" maxW="45px" />
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>
          <Button
            onClick={handleRestart}
            px={6}
            py={2}
            fontSize="md"
            borderRadius="md"
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            mt={8}
            mb={4}
          >
            Restart
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
