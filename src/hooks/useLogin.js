import {
    getAdditionalUserInfo,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/config";

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
            //await signInWithPopup(auth, provider);
            const res = await signInWithPopup(auth, provider);
            console.log(res);
            const details = getAdditionalUserInfo(res);
            if (details.isNewUser) {
                console.log(details);
                const userRef = doc(db, "users", res.user.uid);
                await setDoc(
                    userRef,
                    {
                        email: res.user.email,
                        displayName: res.user.displayName,
                        photoURL: res.user.photoURL,
                        postsCount: 0,
                    },
                    { merge: true }
                );
            }
        } catch (error) {
            setError(error.message);
            //console.log(error.message);
        }
        setIsPending(false);
    }
    return { login, registerWithGoogle, isPending, error };
}

export default useLogin;
