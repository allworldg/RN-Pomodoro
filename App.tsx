import React, { RefObject, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  Pressable,
  Text,
  View,
} from "react-native";
import InputItem from "@/components/InputItem";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { STATUS } from "@/constants";
const STATUSBARHEIGHT = Constants.statusBarHeight;

export default function App() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [tomatoes, setTomatoes] = useState<string>("0");
  const [rests, setRests] = useState<string>("0");
  const [times, setTimes] = useState<string>("0");

  const timeId = useRef<any>(0);
  const [status, setStatus] = useState<Number>(STATUS.STOP);
  const formatTime = (time: number): string => {
    time = Math.trunc(time);
    return time >= 10 ? time + "" : "0" + time;
  };

  const start = (): void => {
    setStatus(STATUS.WORKING);
    const now = new Date();
    const targetTime = now.getTime() + 60 * Number(tomatoes) * 1000;
    timeId.current = setTimeout(() => {
      const remainTime = (targetTime - Date.now()) / 1000;
      setMinutes(remainTime / 60);
      setSeconds(remainTime % 60);
      countDown(targetTime);
    }, 10);
  };
  const countDown = (targetTime: number): void => {
    const remainTime = (targetTime - Date.now()) / 1000;
    if (remainTime <= 0) {
      stop();
      return;
    }
    setMinutes(remainTime / 60);
    setSeconds(remainTime % 60);
    timeId.current = setTimeout(() => {
      countDown(targetTime);
    }, 100);
  };
  const stop = (): void => {
    clearTimeout(timeId.current);
    timeId.current = 0;
    setStatus(STATUS.STOP);
    setMinutes(0);
    setSeconds(0);
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
            rightTitle="分钟"
            value={tomatoes}
            valueUpdate={(text) => setTomatoes(text)}
            validateAndStore={(e) => {}}
          ></InputItem>
          <InputItem
            leftTitle="循环"
            rightTitle="次数"
            value={times}
            valueUpdate={(text) => setTimes(text)}
            validateAndStore={(e) => {}}
          ></InputItem>
          <InputItem
            leftTitle="休息"
            rightTitle="分钟"
            value={rests}
            valueUpdate={(text) => setRests(text)}
            validateAndStore={(e) => {}}
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
            {status === STATUS.STOP ? (
              <Pressable onPress={() => start()}>
                <AntDesign name="play" size={50} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => stop()}>
                <FontAwesome name="stop-circle" size={50} color="black" />
              </Pressable>
            )}
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
