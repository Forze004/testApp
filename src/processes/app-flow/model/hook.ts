import { useContext } from "react";
import { AppFlowContext } from "./context";

export const useAppFlow = () => {
    const context = useContext(AppFlowContext);
    if (!context) {
        throw new Error("useAuthFlow must be used within an AuthFlowProvider");
    }
    return context;
};