import Index from "@/Index";
import ClockContext from "@/ClockContext";

export default function App() {
  const value = {
    cycles: { current: 0 },
    times: { current: 0 },
    isPlaying: { current: false },
    hasRest: { current: false },
  };
  return (
    <ClockContext.Provider value={value}>
      <Index></Index>
    </ClockContext.Provider>
  );
}
