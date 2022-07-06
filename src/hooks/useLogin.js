import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function useLogin() {
    async function login(email, pass) {
        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (error) {
            console.log(error.message);
        }
    }
    return { login };
}

export default useLogin;
