import { useContext } from "react";
import AuthCtx from "../context/AuthCtx";
export default function useAuthCtx() {
    const ctx = useContext(AuthCtx);
    if (!ctx) {
        throw new Error("No context provided");
    }
    return ctx;
}
