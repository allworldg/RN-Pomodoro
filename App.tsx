import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Pressable, View } from "react-native";
import InputItem from "@/components/InputItem";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import {
  DEFAULT_RESTS,
  DEFAULT_TIMES,
  DEFAULT_TOMATOES,
  STATUS,
} from "@/constants";
import ClockView from "@/components/ClockView";
import { asyncGetInputValue, asyncStoreInputValue } from "@/utils";
const STATUSBARHEIGHT = Constants.statusBarHeight;

export default function App() {
  const [remainSeconds, setRemainSeconds] = useState<number>(0);
  const [tomatoes, setTomatoes] = useState<string>(DEFAULT_TOMATOES);
  const [rests, setRests] = useState<string>(DEFAULT_RESTS);
  const [times, setTimes] = useState<string>(DEFAULT_TIMES);

  const initialValue = () => {
    asyncGetInputValue().then((res) => {
      if (res === null) {
        asyncStoreInputValue({
          tomatoes: DEFAULT_TOMATOES,
          rests: DEFAULT_RESTS,
          times: DEFAULT_TIMES,
        });
      } else {
        setTomatoes(res.tomatoes);
        setRests(res.rests);
        setTimes(res.times);
      }
    });
  };
  useEffect(() => {
    initialValue();
    return () => {};
  }, []);

  const timeId = useRef<any>(0);
  const [status, setStatus] = useState<Number>(STATUS.STOP);
  const start = (): void => {
    validateAndStore();
    setStatus(STATUS.WORKING);
    const now = new Date();
    const targetTime = now.getTime() + 60 * Number(tomatoes) * 1000;
    timeId.current = setTimeout(() => {
      setRemainSeconds((targetTime - Date.now()) / 1000);
      countDown(targetTime);
    }, 10);
  };
  const countDown = (targetTime: number): void => {
    const remainTime = targetTime - Date.now();
    if (remainTime <= 0) {
      stop();
      return;
    }
    setRemainSeconds(remainTime / 1000);
    timeId.current = setTimeout(() => {
      countDown(targetTime);
    }, 100);
  };
  const stop = (): void => {
    clearTimeout(timeId.current);
    timeId.current = 0;
    setRemainSeconds(0);
    setStatus(STATUS.STOP);
  };

  const isInRange = (value: string, min: number, max: number): boolean => {
    if (
      typeof value !== "string" ||
      value.trim() === "" ||
      isNaN(value as any) // escape check
    ) {
      return false;
    }
    const number = parseInt(value);
    if (number >= min && number <= max) {
      return true;
    } else {
      return false;
    }
  };

  const validateAndStore = (): void => {
    if (
      isInRange(tomatoes, 1, 9999) &&
      isInRange(rests, 0, 9999) &&
      isInRange(times, 0, 9999)
    ) {
      const tomatoesStr = parseInt(tomatoes).toString();
      const restsStr = parseInt(rests).toString();
      const timesStr = parseInt(times).toString();
      setTomatoes(tomatoesStr);
      setRests(restsStr);
      setTimes(timesStr);
      asyncStoreInputValue({
        tomatoes: tomatoesStr,
        rests: restsStr,
        times: timesStr,
      });
    } else {
      initialValue();
    }
  };

  return (
    <View style={{ marginTop: STATUSBARHEIGHT, display: "flex", flex: 1 }}>
      <ClockView remainSeconds={remainSeconds} />
      <View style={{ display: "flex", flex: 1 }}>
        <View style={{ display: "flex", flex: 1, justifyContent: "center" }}>
          <InputItem
            leftTitle="番茄"
            rightTitle="分钟"
            value={tomatoes}
            valueUpdate={(text) => setTomatoes(text)}
            validateAndStore={validateAndStore}
          ></InputItem>
          <InputItem
            leftTitle="循环"
            rightTitle="次数"
            value={times}
            valueUpdate={(text) => setTimes(text)}
            validateAndStore={validateAndStore}
          ></InputItem>
          <InputItem
            leftTitle="休息"
            rightTitle="分钟"
            value={rests}
            valueUpdate={(text) => setRests(text)}
            validateAndStore={validateAndStore}
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
