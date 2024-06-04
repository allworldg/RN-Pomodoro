import { View, Text } from "react-native";
export default function ClockView({
  remainSeconds,
}: {
  remainSeconds: number;
}) {
  const formatTime = (time: number): string => {
    time = Math.trunc(time);
    return time >= 10 ? time + "" : "0" + time;
  };
  const minutes = remainSeconds / 60;
  const seconds = remainSeconds % 60;
  return (
    <View
      style={{
        display: "flex",
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
  );
}
