import Index from "@/Index";
import ClockContext from "@/hooks/ClockContext";
import { DEFAULT_CYCLES, DEFAULT_TIMES } from "@/constants";

export default function App() {
  const value = {
    cycles: { current: DEFAULT_CYCLES },
    times: { current: parseInt(DEFAULT_TIMES) },
    isPlaying: { current: false },
    hasRest: { current: false },
  };
  return (
    <ClockContext.Provider value={value}>
      <Index></Index>
    </ClockContext.Provider>
  );
}
