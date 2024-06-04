import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VALUE } from "@/constants";
export const asyncStoreInputValue = async (value: {
  tomatoes: string;
  rests: string;
  times: string;
}): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_VALUE, jsonValue);
  } catch (e) {
    console.log("storeInputException: " + e);
  }
};

export const asyncGetInputValue = async (): Promise<{
  tomatoes: string;
  rests: string;
  times: string;
} | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_VALUE);
    return JSON.parse(jsonValue as string);
  } catch (e) {
    console.log("getinputValue exception: " + e);
  }
  return null;
};
