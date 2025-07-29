"use client";
import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

const xImg = (
  <img src="/X-Player.png" alt="X" style={{ width: 40, height: 40 }} />
);
const oImg = (
  <img src="/O-Player.png" alt="O" style={{ width: 40, height: 40 }} />
);

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type Player = "X" | "O";
type Option = "" | Player;

interface WinResult {
  winner: Player | null;
  winLine: number[] | null;
  draw: boolean;
}

const checkWinner = (options: Option[]): WinResult => {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      return { winner: options[a] as Player, winLine: condition, draw: false };
    }
  }
  if (!options.includes("")) {
    return { winner: null, winLine: null, draw: true };
  }
  return { winner: null, winLine: null, draw: false };
};

const TicTacToe: React.FC = () => {
  const [options, setOptions] = useState<Option[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [running, setRunning] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('Now "X" Turn');
  const [winLine, setWinLine] = useState<number[] | null>(null);
  const router = useRouter();
  const handleBoxClick = (index: number) => {
    if (!running || options[index] !== "") return;

    const newOptions = [...options];
    newOptions[index] = currentPlayer;
    setOptions(newOptions);

    const result = checkWinner(newOptions);

    if (result.winner) {
      setStatus(`Hurrah...! "${result.winner}" Won the game🕺`);
      setRunning(false);
      setWinLine(result.winLine);
    } else if (result.draw) {
      setStatus("Oops..! Game Draw..!");
      setRunning(false);
      setWinLine(null);
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setStatus(`Now "${nextPlayer}" Turn`);
      setWinLine(null);
    }
  };

  const handleRestart = () => {
    setOptions(Array(9).fill(""));
    setCurrentPlayer("X");
    setRunning(true);
    setStatus('Now "X" Turn');
    setWinLine(null);
  };

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
              Tic Tac Toe ✖️⭕️
            </Heading>

            <Text fontSize={"xl"} fontWeight={"semibold"} mt="10">
              How To Play (Like a Pro):
            </Text>

            <Box fontSize={"lg"}>
              <Text mt="3" mb="5">
                {" "}
                Take turns marking your spot! ✍️
              </Text>
              <Box fontSize="lg" mb={2}>
                Click any empty square to place your X or O.
              </Box>
              <Text color={"#5cdc7aff"} mr="2" fontWeight={"bold"} mb={2}>
                Three in a row — up, down, across, or diagonally — wins the
                game! 🏆
              </Text>
              <Text fontSize="lg" mb={2}>
                If all squares are filled and no one’s won, it’s a draw. 🤝
              </Text>
              <Text fontSize="lg" mb={2}>
                The faster you win, the cooler you look. 😎
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={4} color="#ffa200ff">
                Ready, Set, TIC TAC TOE!
              </Text>
            </Box>
          </Box>
        </Box>
        <Box maxW="400px" mx="auto" textAlign="center">
          <Text
            className="status"
            mb={4}
            fontSize={"3xl"}
            fontWeight="bold"
            color={running ? "black" : winLine ? "green.500" : "red.500"}
          >
            {status}
          </Text>

          <SimpleGrid columns={3} gap={10} mt="10" mb={4}>
            {options.map((option, idx) => (
              <Button
                key={idx}
                className={`box${
                  winLine && winLine.includes(idx) ? " win" : ""
                }`}
                data-index={idx}
                onClick={() => handleBoxClick(idx)}
                w="100px"
                h="100px"
                fontSize="2xl"
                bg={winLine && winLine.includes(idx) ? "#e4811eff" : "#161616"}
                border="2px solid"
                borderColor="gray.700"
                borderRadius="md"
                cursor={running && option === "" ? "pointer" : "default"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={0}
                disabled={!running || option !== ""}
                _disabled={{ opacity: 1 }}
              >
                {option === "X" ? xImg : option === "O" ? oImg : ""}
              </Button>
            ))}
          </SimpleGrid>

          <Button
            className="restartBtn"
            onClick={handleRestart}
            px={6}
            py={2}
            fontSize="md"
            borderRadius="md"
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            mt={2}
          >
            {running ? "Restart" : "Play Again 😉"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default TicTacToe;
