import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    updateProfile } from "firebase/auth";

import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider()


export async function signInWithGoogle() {

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        const user = result.user
        const { uid, displayName, email, photoURL} = user

        return {
            ok: true,
            uid, displayName, email, photoURL 
        }

    } catch (error) {

        const errorCode = error.code
        const errorMessage = error.message

        return {
            ok: false,
            errorMessage,

        }
    }
    
};


export async function registerWithEmailPassword( {email, password, displayName} ) {

    try {

        console.log( {email, password, displayName } );

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } =  resp.user
        console.log(resp);

        await updateProfile( FirebaseAuth.currentUser, {displayName} )

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        // console.log(error);

        return {
            ok: false,
            errorMessage: error.message
        }
    }
    
};


export async function loginWithEmailPassword( { email, password } ) {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL, displayName } =  resp.user

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        return {
            ok: false,
            errorMessage: error.message
        }
        
    }
    
};


export const logoutFirebase = async() => await FirebaseAuth.signOut()
    
