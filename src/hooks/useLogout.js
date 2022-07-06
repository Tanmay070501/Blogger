import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function useLogout() {
    async function logout() {
        await signOut(auth);
    }
    return { logout };
}
