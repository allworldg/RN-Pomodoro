import React, { createContext } from "react";
import { DEFAULT_CYCLES, DEFAULT_TIMES } from "./constants";

interface MyContextType {
  cycles: React.MutableRefObject<number>;
  times: React.MutableRefObject<number>;
  isPlaying: React.MutableRefObject<boolean>;
  hasRest: React.MutableRefObject<boolean>;
}

const context = createContext<MyContextType>({
  cycles: { current: DEFAULT_CYCLES },
  times: { current: parseInt(DEFAULT_TIMES) },
  isPlaying: { current: false },
  hasRest: { current: false },
});
export default context;
