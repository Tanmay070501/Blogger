import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useReducer } from "react";
import { auth, db } from "../firebase/config";

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
    if (action.type === "SIGN_UP") {
        return {
            ...state,
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
        dispatch,
    };

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (user) => {
            let appUser = user;
            if (user) {
                appUser = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    userPhoto: user.photoURL,
                    emailIsVerified: user.emailVerified,
                };
                /*if (!user.username || !user.userPhoto) {
                    const docRef = doc(db, "users", user.uid);
                    const data = await getDoc(docRef);
                    if (data.data()) {
                        const userData = data.data();
                        appUser = {
                            ...appUser,
                            userPhoto: userData.photoURL,
                            username: userData.displayName,
                        };
                        dispatch({
                            type: AUTH_IS_READY,
                            payload: {
                                user: appUser,
                                isAuthReady: true,
                            },
                        });
                    }
                }*/
                /*const metadata = auth.currentUser.metadata;
                if (metadata.creationTime === metadata.lastSignInTime) {
                    console.log("new user");
                } else {
                    console.log("already a user");
                }*/
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
