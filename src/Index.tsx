import { useContext, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import ClockContext from "@/hooks/ClockContext";
import { Platform, Pressable, View, Text } from "react-native";
import InputItem from "@/components/InputItem";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import {
  DEFAULT_CYCLES,
  DEFAULT_RESTS,
  DEFAULT_TIMES,
  DEFAULT_TOMATOES,
  MINUTE,
  STARTED,
  STATES_STR,
} from "@/constants";
import ClockView from "@/components/ClockView";
import { asyncGetInputValue, asyncStoreInputValue } from "@/utils/localStore";
import useStatesEnum from "@/hooks/useStatesEnum";
import StateTitle from "./components/StateTitle";
import useNotification from "./hooks/useNotification";

const STATESBARHEIGHT = Constants.statusBarHeight;
export default function Index() {
  const [remainSeconds, setRemainSeconds] = useState<number>(0);
  const [tomatoes, setTomatoes] = useState<string>(DEFAULT_TOMATOES);
  const [rests, setRests] = useState<string>(DEFAULT_RESTS);
  const [times, setTimes] = useState<string>(DEFAULT_TIMES);
  const [state, setState] = useState<STATES_STR>(STATES_STR.STOP);
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
    setState(STATES_STR.TOMATOE);
    const now = new Date();
    const targetTime = now.getTime() + Number(tomatoes) * MINUTE;
    timeId.current = setTimeout(() => {
      setRemainSeconds((targetTime - Date.now()) / 1000);
      countDown(targetTime, STATES_STR.TOMATOE);
    }, 10);
  };
  const countDown = (targetTime: number, countState: STATES_STR): void => {
    setRemainSeconds((targetTime - Date.now()) / 1000);
    const localState = statesEnum[countState].countDown(targetTime);
    if (localState === STATES_STR.STOP) {
      stop();
      return;
    }
    if (countState !== localState) {
      if (localState === STATES_STR.TOMATOE) {
        targetTime = Date.now() + Number(tomatoes) * MINUTE;
      } else {
        targetTime = Date.now() + Number(rests) * MINUTE;
      }
      countState = localState;
      setState(localState);
    }
    timeId.current = setTimeout(() => {
      countDown(targetTime, countState);
    }, 100);
  };
  const stop = (): void => {
    clearTimeout(timeId.current);
    timeId.current = 0;
    cycles.current = DEFAULT_CYCLES;
    setRemainSeconds(0);
    setState(STATES_STR.STOP);
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
  const schedulePushNotification = useNotification();

  return (
    <View style={{ marginTop: STATESBARHEIGHT, display: "flex", flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ClockView remainSeconds={remainSeconds} />
        <StateTitle state={state} />
      </View>

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
            {state === STATES_STR.STOP ? (
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
