import { useEffect, useRef, useState } from "react";
import { Text, View, Pressable } from "react-native";

export default function App() {
  const [screen, setScreen] = useState<boolean | null>(null);
  const [gameIsOver, setGameIsOver] = useState<boolean | null>(null);
  const [playAgain, setPlayAgain] = useState<boolean | null>(null);

  const [time, setTime] = useState<number>(0);
  const score = useRef<number>(0);
  useEffect(() => {
    setPlayAgain(false);
    setTime(0);
    setGameIsOver(false);
    setScreen(false);
    let timer: any = null;
    const timeout = setTimeout(() => {
      setScreen(true);
      timer = setInterval(() => {
        setTime((t) => t + 0.1);
      }, 100);
    }, Math.floor(Math.random() * 5 + 5) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [playAgain]);
  return (
    <View className="h-full">
      {gameIsOver ? (
        <Pressable className="h-full w-full flex flex-col justify-center items-center bg-blue-500" onPress={() => setPlayAgain(true)}>
          <Text className=" text-3xl text-white text-center">{score.current > 0 ? score.current.toFixed(1) : "Please wait for screen to be green"}</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setGameIsOver(true);
            score.current = time;
          }}
          className={`${screen ? "bg-green-500" : "bg-red-500"} h-full w-full flex flex-col justify-center items-center`}
        >
          <Text className="text-white text-3xl text-center">Click Screen When Screen Is Green</Text>
        </Pressable>
      )}
    </View>
  );
}
