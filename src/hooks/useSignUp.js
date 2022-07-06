import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";

export default function useSignUp() {
    async function register(email, pass) {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                pass
            );
            console.log(response.user);
            await sendEmailVerification(response.user, {
                url: "http://localhost:3000/",
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    async function registerWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            console.log(res);
        } catch (error) {}
    }
    return { register, registerWithGoogle };
}
