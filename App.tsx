import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Pressable, Text, TextInput, View } from "react-native";
import InputItem from "@/components/InputItem";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    <View style={{ marginTop: STATUSBARHEIGHT, display: "flex", flex: 1 }}>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 70,
          }}
        >
          {formatTime(minutes) + ":" + formatTime(seconds)}
        </Text>
      </View>
      <View style={{ display: "flex", flex: 1 }}>
        <View style={{ display: "flex", flex: 1, justifyContent: "center" }}>
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
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}></View>
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={() => {
                console.log("clicked");
              }}
            >
              <AntDesign name="play" size={50} color="black" />
            </Pressable>
          </View>
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="music-circle"
              size={60}
              color="black"
            />
          </View>
        </View>
      </View>
      <StatusBar />
    </View>
  );
}
