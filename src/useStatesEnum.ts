import ClockContext from "@/ClockContext";
import { STATES } from "./constants";
import { useContext } from "react";

interface countDown {
  countDown: (targetTime: number) => STATES;
  notification: () => void;
}
export default function useStatesEnum() {
  const { cycles, times, hasRest, isPlaying } = useContext(ClockContext);

  const statesEnum: { [index: string]: countDown } = {
    TOMATOE: {
      countDown(targetTime: number): STATES {
        const now = Date.now();
        if (targetTime - now > 0) {
          return STATES.TOMATOE;
        }
        if (hasRest.current === false) {
          if (cycles.current == times.current) {
            this.notification();
            return STATES.STOP;
          } else {
            cycles.current++;
            return STATES.TOMATOE;
          }
        } else {
          return STATES.REST;
        }
      },
      notification() {},
    },
    REST: {
      countDown(targetTime: number): STATES {
        const now = Date.now();
        if (targetTime - now > 0) {
          return STATES.REST;
        }
        if (cycles.current === times.current) {
          this.notification();
          return STATES.STOP;
        } else {
          this.notification();
          cycles.current++;
          return STATES.TOMATOE;
        }
      },
      notification() {},
    },
  };

  return statesEnum;
}
