import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

const AuthCtx = createContext();
const AUTH_IS_READY = "AUTH_IS_READY";

function authReducer(state, action) {
    if (action.type === AUTH_IS_READY) {
        return {
            ...state,
            isAuthReady: action.payload.isAuthReady,
            user: action.payload.user,
        };
    }
    return state;
}

export function AuthCtxProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false,
    });
    const value = {
        ...state,
    };

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            let appUser = user;
            if (user) {
                appUser = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    userPhoto: user.photoURL,
                    emailIsVerified: user.emailVerified,
                };
            }
            dispatch({
                type: AUTH_IS_READY,
                payload: {
                    user: appUser,
                    isAuthReady: true,
                },
            });
        });
        return unsub;
    }, []);
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export default AuthCtx;
