import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";

function useLogin() {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    async function login(email, pass) {
        setIsPending(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (error) {
            setError(error.message);
            //console.log(error.message);
        }
        setIsPending(false);
    }

    async function registerWithGoogle() {
        setIsPending(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            /*console.log(res); /*
            await signInWithRedirect(auth, provider);
            await getRedirectResult(auth);*/
        } catch (error) {
            setError(error.message);
            //console.log(error.message);
        }
        setIsPending(false);
    }
    return { login, registerWithGoogle, isPending, error };
}

export default useLogin;
