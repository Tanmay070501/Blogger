import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";

function useLogin() {
    async function login(email, pass) {
        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function registerWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            console.log(res); /*
            await signInWithRedirect(auth, provider);
            await getRedirectResult(auth);*/
        } catch (error) {}
    }
    return { login, registerWithGoogle };
}

export default useLogin;
