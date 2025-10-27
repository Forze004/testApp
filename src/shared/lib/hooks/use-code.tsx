import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { getElapsedTime, recordStartTime } from "../date";

export const useCode = () => { 
    let time: number;
    const appState = useRef(AppState.currentState);
    const currentSecond = 59;
    const [timer, setTimer] = useState<number>(currentSecond);

    useEffect(() => { 
        const subscription = AppState.addEventListener(
        "change",
        async (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                const elapsed = await getElapsedTime(currentSecond);
                if (elapsed) {
                    setTimer(!elapsed ? elapsed : currentSecond - elapsed);
                }
            }
            appState.current = nextAppState;
        }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        recordStartTime();
    }, []);

    useEffect(() => {
        if (timer) {
            time = setInterval(() => setTimer((prevState) => prevState - 1), 1000);
        }
        return () => clearInterval(time);
    }, [timer]);
    
    return {
        timer,
        resend: () => setTimer(currentSecond)
    }
}