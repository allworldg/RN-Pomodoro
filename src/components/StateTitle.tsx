import { RESTING, STATES_STR, WORKING } from "@/constants";
import { Text, View } from "react-native";

export default function StateTitle({ state }: { state: STATES_STR }) {
  const title = () => {
    if (state === STATES_STR.TOMATOE) {
      return <Text style={{ fontSize: 35 }}>{WORKING}</Text>;
    } else if (state === STATES_STR.REST) {
      return <Text style={{ fontSize: 35 }}>{RESTING}</Text>;
    }
  };
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {title()}
    </View>
  );
}
