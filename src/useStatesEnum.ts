import ClockContext from "@/ClockContext";
import { STATES_STR } from "./constants";
import { useContext } from "react";

interface countDown {
  countDown: (targetTime: number) => STATES_STR;
  notification: () => void;
}
export default function useStatesEnum() {
  const { cycles, times, hasRest, isPlaying } = useContext(ClockContext);

  const statesEnum: { [index: string]: countDown } = {
    TOMATOE: {
      countDown(targetTime: number): STATES_STR {
        const now = Date.now();
        if (targetTime - now > 0) {
          return STATES_STR.TOMATOE;
        }
        if (hasRest.current === false) {
          if (cycles.current === times.current) {
            this.notification();
            return STATES_STR.STOP;
          } else {
            cycles.current++;
            return STATES_STR.TOMATOE;
          }
        } else {
          return STATES_STR.REST;
        }
      },
      notification() {},
    },
    REST: {
      countDown(targetTime: number): STATES_STR {
        const now = Date.now();
        if (targetTime - now > 0) {
          return STATES_STR.REST;
        }
        if (cycles.current === times.current) {
          this.notification();
          return STATES_STR.STOP;
        } else {
          this.notification();
          cycles.current++;
          return STATES_STR.TOMATOE;
        }
      },
      notification() {},
    },
  };

  return statesEnum;
}
