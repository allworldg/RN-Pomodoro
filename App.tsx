import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Pressable, Text, TextInput, View } from "react-native";
import InputItem from "@/components/InputItem";

const STATUSBARHEIGHT = Constants.statusBarHeight;

export default function App() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [tomatoes, setTomatoes] = useState<string>("0");
  const [times, setTimes] = useState<string>("0");
  const [rests, setRests] = useState<string>("0");
  const formatTime = (time: number): string => {
    return time >= 10 ? "" + time : "0" + time;
  };
  return (
    <View style={{ marginTop: STATUSBARHEIGHT }} className="flex flex-1">
      <View className="flex  flex-1 justify-center items-center">
        <Text className="text-8xl">
          {formatTime(minutes) + ":" + formatTime(seconds)}
        </Text>
      </View>
      <View className="flex flex-1">
        <View className="flex flex-1 justify-center">
          <InputItem
            leftTitle="番茄"
            inputText={tomatoes}
            updateText={setTomatoes}
            rightTitle="分钟"
          ></InputItem>
          <InputItem
            leftTitle="循环"
            inputText={times}
            updateText={setTimes}
            rightTitle="次数"
          ></InputItem>
          <InputItem
            leftTitle="休息"
            inputText={rests}
            updateText={setRests}
            rightTitle="分钟"
          ></InputItem>
        </View>
        <View className="flex flex-1 flex-row items-center">
          <View className="flex-1"></View>
          <View className="flex-1">
            <Pressable onPress={() => {}}>
              <Text className="text-center">start/stop</Text>
            </Pressable>
          </View>
          <View className="flex-1">
            <Text className="text-center">选择bgm</Text>
          </View>
        </View>
      </View>
      <StatusBar />
    </View>
  );
}
