import React, { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";

export default function InputItem({
  leftTitle,
  rightTitle,
  value,
  valueUpdate,
  validateAndStore,
}: {
  leftTitle: string;
  rightTitle: string;
  value: string;
  valueUpdate: (text: string) => void;
  validateAndStore: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
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
        value={value}
        onChangeText={valueUpdate}
        onEndEditing={validateAndStore}
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
