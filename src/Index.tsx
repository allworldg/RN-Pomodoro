import { useContext, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import ClockContext from "@/ClockContext";
import { Pressable, View } from "react-native";
import InputItem from "@/components/InputItem";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import {
  DEFAULT_RESTS,
  DEFAULT_TIMES,
  DEFAULT_TOMATOES,
  STARTED,
  STATES,
} from "@/constants";
import ClockView from "@/components/ClockView";
import { asyncGetInputValue, asyncStoreInputValue } from "@/utils";
import useStatesEnum from "@/useStatesEnum";
const STATESBARHEIGHT = Constants.statusBarHeight;
export default function Index() {
  const [remainSeconds, setRemainSeconds] = useState<number>(0);
  const [tomatoes, setTomatoes] = useState<string>(DEFAULT_TOMATOES);
  const [rests, setRests] = useState<string>(DEFAULT_RESTS);
  const [times, setTimes] = useState<string>(DEFAULT_TIMES);
  const state = useRef<string>(STATES.STOP);
  const [isStarted, setIsStarted] = useState<boolean>(!STARTED);
  const {
    cycles,
    isPlaying,
    hasRest,
    times: contextTimes,
  } = useContext(ClockContext);
  const statesEnum = useStatesEnum();

  const initialValue = async () => {
    const obj = {
      tomatoes: DEFAULT_TOMATOES,
      rests: DEFAULT_RESTS,
      times: DEFAULT_TIMES,
    };
    return asyncGetInputValue().then((res) => {
      if (res === null) {
        asyncStoreInputValue(obj);
      } else {
        setTomatoes(res.tomatoes);
        setRests(res.rests);
        setTimes(res.times);
        obj.tomatoes = res.tomatoes;
        obj.rests = res.rests;
        obj.times = res.times;
      }
      return obj;
    });
  };
  useEffect(() => {
    initialValue();
    return () => {};
  }, []);

  const timeId = useRef<any>(0);
  const start = (): void => {
    validateAndStore();
    setIsStarted(STARTED);
    state.current = STATES.TOMATOE;
    const now = new Date();
    const targetTime = now.getTime() + 60 * Number(tomatoes) * 1000;
    timeId.current = setTimeout(() => {
      setRemainSeconds((targetTime - Date.now()) / 1000);
      countDown(targetTime);
    }, 10);
  };
  const countDown = (targetTime: number): void => {
    setRemainSeconds((targetTime - Date.now()) / 1000);
    const localState = statesEnum[state.current].countDown(targetTime);
    if (localState === STATES.STOP) {
      console.log("stop");
      stop();
      return;
    }
    if (state.current !== localState) {
      if (localState === STATES.TOMATOE) {
        targetTime = Date.now() + Number(tomatoes) * 60 * 1000;
      } else {
        targetTime = Date.now() + Number(rests) * 60 * 1000;
      }
      state.current = localState;
    }
    timeId.current = setTimeout(() => {
      countDown(targetTime);
    }, 100);
  };
  const stop = (): void => {
    clearTimeout(timeId.current);
    timeId.current = 0;
    setRemainSeconds(0);
    console.log("end");
    setIsStarted(!STARTED);
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
      isInRange(times, 1, 9999)
    ) {
      const tomatoesStr = parseInt(tomatoes).toString();
      const restsStr = parseInt(rests).toString();
      const timesStr = parseInt(times).toString();
      setTomatoes(tomatoesStr);
      setRests(restsStr);
      setTimes(timesStr);
      contextTimes.current = parseInt(times);
      hasRest.current = parseInt(rests) > 0;
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
    <View style={{ marginTop: STATESBARHEIGHT, display: "flex", flex: 1 }}>
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
            {isStarted !== STARTED ? (
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
