"use client";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect, useCallback } from "react";
import { LuArrowLeft } from "react-icons/lu";
type Brick = {
  x: number;
  y: number;
  w: number;
  h: number;
  padding: number;
  offsetX: number;
  offsetY: number;
  visible: boolean;
};
export default function Breakoutgame() {
  const canvasRef = useRef<any>(null);

  // Game state refs
  const scoreRef = useRef(0);
  const ballRef = useRef({
    x: 400,
    y: 300,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
  });
  const paddleRef = useRef({
    x: 400 - 40,
    y: 600 - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
  });

  const brickRowCount = 9;
  const brickColumnCount = 5;
  const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
  };

  // Bricks as a ref to persist between renders
  const bricksRef = useRef<Brick[][]>([]);

  // Helper to initialize bricks
  const createBricks = useCallback(() => {
    const bricks: Brick[][] = [];
    for (let i = 0; i < brickRowCount; i++) {
      bricks[i] = [];
      for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
      }
    }
    return bricks;
  }, [brickRowCount, brickColumnCount, brickInfo]);

  // Initialize bricks on mount
  useEffect(() => {
    bricksRef.current = createBricks();
  }, [createBricks]);

  // Draw and game logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive canvas
    canvas.width = 800;
    canvas.height = 800 * 0.75;

    // Get CSS colors
    const color =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--button-color"
      ) || "#0095dd";
    const secondaryColor =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--sidebar-color"
      ) || "#f00";

    // Drawing functions
    function drawBall() {
      ctx.beginPath();
      ctx.arc(
        ballRef.current.x,
        ballRef.current.y,
        ballRef.current.size,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = secondaryColor;
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleRef.current.x,
        paddleRef.current.y,
        paddleRef.current.w,
        paddleRef.current.h
      );
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }

    function drawScore() {
      ctx.font = '20px "Balsamiq Sans"';
      ctx.fillStyle = "#fff";
      ctx.fillText(`Score: ${scoreRef.current}`, canvas.width - 100, 30);
    }

    function drawBricks() {
      bricksRef.current.forEach((column) => {
        column.forEach((brick) => {
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.w, brick.h);
          ctx.fillStyle = brick.visible ? color : "transparent";
          ctx.fill();
          ctx.closePath();
        });
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      drawScore();
      drawBricks();
    }

    // Movement and collision
    function movePaddle() {
      paddleRef.current.x += paddleRef.current.dx;
      if (paddleRef.current.x + paddleRef.current.w > canvas.width)
        paddleRef.current.x = canvas.width - paddleRef.current.w;
      if (paddleRef.current.x < 0) paddleRef.current.x = 0;
    }

    function moveBall() {
      const ball = ballRef.current;
      const paddle = paddleRef.current;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision
      if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0)
        ball.dx *= -1;
      if (ball.y - ball.size < 0) ball.dy *= -1;

      // Paddle collision
      if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
      ) {
        ball.dy = -ball.speed;
      }

      // Brick collision
      bricksRef.current.forEach((column) => {
        column.forEach((brick) => {
          if (brick.visible) {
            if (
              ball.x - ball.size > brick.x &&
              ball.x + ball.size < brick.x + brick.w &&
              ball.y + ball.size > brick.y &&
              ball.y - ball.size < brick.y + brick.h
            ) {
              ball.dy *= -1;
              brick.visible = false;
              increaseScore();
            }
          }
        });
      });

      // Game over
      if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        scoreRef.current = 0;
      }
    }

    function increaseScore() {
      scoreRef.current++;
      if (scoreRef.current % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
      }
    }

    function showAllBricks() {
      bricksRef.current.forEach((column) => {
        column.forEach((brick) => (brick.visible = true));
      });
    }

    // Animation loop
    let animationId: number;
    function update() {
      movePaddle();
      moveBall();
      draw();
      animationId = requestAnimationFrame(update);
    }
    update();

    // Keyboard events
    function keyDown(e: KeyboardEvent) {
      if (e.key === "Right" || e.key === "ArrowRight")
        paddleRef.current.dx = paddleRef.current.speed;
      else if (e.key === "Left" || e.key === "ArrowLeft")
        paddleRef.current.dx = -paddleRef.current.speed;
    }
    function keyUp(e: KeyboardEvent) {
      if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft"
      ) {
        paddleRef.current.dx = 0;
      }
    }
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [brickRowCount, brickColumnCount]);
  // const [score, setScore] = useState(3);
  const router = useRouter();

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
              Breakout 🚀
            </Heading>

            <Text fontSize={"xl"} fontWeight={"semibold"} mt="10">
              How To Play (Like a Pro):
            </Text>

            <Box fontSize={"lg"}>
              <Text mt="3" mb="5">
                {" "}
                Smash those blocks! 🧱
              </Text>
              <Box fontSize="lg" mb={2}>
                Use your{" "}
                <Text
                  color={"#5cdc7aff"}
                  mr="2"
                  fontWeight={"bold"}
                  display={"inline"}
                >
                  left
                </Text>
                and{" "}
                <Text
                  color={"#5cdc7aff"}
                  mr="2"
                  fontWeight={"bold"}
                  display={"inline"}
                >
                  right
                </Text>
                arrow keys to zoom your paddle across the screen.
              </Box>
              <Text fontSize="lg" mb={2}>
                Keep the ball bouncing — don’t let it escape !
              </Text>
              <Text fontSize="lg" mb={2}>
                The more bricks you break, the cooler you look. 😎
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={4} color="#ffa200ff">
                Ready, Set, BREAKOUT!
              </Text>
            </Box>
          </Box>
        </Box>
        <canvas
          ref={canvasRef}
          id="canvas"
          style={{
            border: "2px solid #ffffff20",
            borderRadius: "8px",
            overflowY: "hidden",
          }}
        ></canvas>
      </Flex>
    </Box>
  );
}
