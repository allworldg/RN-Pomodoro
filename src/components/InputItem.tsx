import React from "react";
import { View, Text, TextInput } from "react-native";

export default function InputItem({
  leftTitle,
  inputText,
  updateText,
  rightTitle,
}: {
  leftTitle: string;
  inputText: string;
  updateText: Function;
  rightTitle: string;
}) {
  return (
    <View
      style={{
        marginVertical: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 30, marginHorizontal: 2 }}>{leftTitle}</Text>
      <TextInput
        style={{
          borderStyle: "solid",
          textAlign: "center",
          fontSize: 25,
          width: 70,
          borderWidth: 1,
          marginHorizontal: 20,
        }}
        maxLength={4}
        defaultValue="0"
        value={inputText}
        onChangeText={(text) => updateText(text)}
      ></TextInput>
      <Text
        style={{
          fontSize: 30,
        }}
      >
        {rightTitle}
      </Text>
    </View>
  );
}
