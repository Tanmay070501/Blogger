import {
    createUserWithEmailAndPassword,
    getAdditionalUserInfo,
    GoogleAuthProvider,
    sendEmailVerification,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { auth, db, storage } from "../firebase/config";
import useAuthCtx from "./useAuthCtx";

export default function useSignUp() {
    const [error, setError] = useState("");
    const { dispatch } = useAuthCtx();
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
                    postsCount: 0,
                },
                { merge: true }
            );
            dispatch({
                type: "SIGN_UP",
                payload: {
                    user: {
                        uid: auth.currentUser.uid,
                        username: auth.currentUser.displayName,
                        email: auth.currentUser.email,
                        userPhoto: auth.currentUser.photoURL,
                        emailIsVerified: auth.currentUser.emailVerified,
                    },
                },
            });
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
            //console.log(error.message);
            setError(error.message);
        }
        setIsPending(false);
    }
    return { register, registerWithGoogle, isPending, error };
}
