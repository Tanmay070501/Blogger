import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { auth, db, storage } from "../firebase/config";

export default function useSignUp() {
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    async function register(email, pass, username, profileImg) {
        setError("");
        setIsPending(true);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                pass
            );
            console.log(response.user);
            const imgUploadPath = `userImg/${response.user.uid}/${profileImg.name}`;
            const imgUploadRef = ref(storage, imgUploadPath);
            await uploadBytes(imgUploadRef, profileImg);
            const imgURL = await getDownloadURL(imgUploadRef);
            await updateProfile(response.user, {
                displayName: username,
                photoURL: imgURL,
            });
            const userRef = doc(db, "users", response.user.uid);
            await setDoc(
                userRef,
                {
                    email: response.user.email,
                    displayName: username,
                    photoURL: imgURL,
                },
                { merge: true }
            );
            await sendEmailVerification(response.user);
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        }
        setIsPending(false);
    }

    async function registerWithGoogle() {
        setError("");
        setIsPending(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            setError(error.message);
        }
        setIsPending(false);
    }
    return { register, registerWithGoogle, isPending, error };
}
