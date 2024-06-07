import ClockContext from "@/hooks/ClockContext";
import {
  NOTIFICATION_BODY_END,
  NOTIFICATION_BODY_START_REST,
  NOTIFICATION_BODY_START_WORK,
  STATES_STR,
} from "../constants";
import { useContext } from "react";
import useNotification from "./useNotification";

interface countDown {
  countDown: (targetTime: number) => STATES_STR;
}
export default function useStatesEnum() {
  const { cycles, times, hasRest, isPlaying } = useContext(ClockContext);
  const notification = useNotification();
  const statesEnum: { [index: string]: countDown } = {
    TOMATOE: {
      countDown(targetTime: number): STATES_STR {
        const now = Date.now();
        if (targetTime - now > 0) {
          return STATES_STR.TOMATOE;
        }
        if (hasRest.current === false) {
          if (cycles.current === times.current) {
            notification(NOTIFICATION_BODY_END);
            return STATES_STR.STOP;
          } else {
            cycles.current++;
            notification(NOTIFICATION_BODY_START_WORK);
            return STATES_STR.TOMATOE;
          }
        } else {
          notification(NOTIFICATION_BODY_START_REST);
          return STATES_STR.REST;
        }
      },
    },
    REST: {
      countDown(targetTime: number): STATES_STR {
        const now = Date.now();
        if (targetTime - now > 0) {
          return STATES_STR.REST;
        }
        if (cycles.current === times.current) {
          notification(NOTIFICATION_BODY_END);
          return STATES_STR.STOP;
        } else {
          cycles.current++;
          notification(NOTIFICATION_BODY_START_WORK);
          return STATES_STR.TOMATOE;
        }
      },
    },
  };

  return statesEnum;
}
