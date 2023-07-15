import { deleteDoc, doc } from "firebase/firestore/lite"
import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout, deleteNoteByID } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"
import { FirebaseDB } from "../../firebase/config"

export function CheckingAuthentication( email, password ) {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )
    }
    
};

export function startGoogleSignIn() {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await signInWithGoogle()

        if ( !result.ok ) return dispatch( logout( result.errorMessage ) )      

        dispatch( login( result ) ) 

    }
    
};


export function startCreatingUserWithEmailPassword( {email, password, displayName} ) {

    return async( dispatch) => {

        dispatch( checkingCredentials() )

        const resp = await registerWithEmailPassword( { email, password, displayName } )
        
        const { ok, uid, photoURL, errorMessage } = resp

        if ( !ok ) return dispatch( logout( {errorMessage} ) )

        dispatch( login( {uid, photoURL, email, displayName} ) )

    }
    
};

export function startLoginWithEmailPassword( {email, password} ) {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const resp = await loginWithEmailPassword( {email, password} )

        const { ok, uid, photoURL, errorMessage, displayName } = resp

        if ( !ok ) return dispatch( logout( {errorMessage} ) )

        dispatch( login( {uid, photoURL, email, displayName} ) )

    }
    
};

export function startLogout() {

    return async(dispatch) => {

        await logoutFirebase()

        dispatch( clearNotesLogout() )

        dispatch( logout() )
    }
    
};

