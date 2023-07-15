import { useEffect } from "react"

import { FirebaseAuth } from "../firebase/config"
import { onAuthStateChanged } from "firebase/auth"

import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../store/auth/authSlice"
import { startLoadingNotes } from "../store/journal/thunks"


export function useCheckAuth() {

  const selector = useSelector( state => state.auth )
  const { status } = selector

  const dispatch = useDispatch()

  useEffect(() => {

   onAuthStateChanged( FirebaseAuth, ( user ) => {
    
    if ( !user ) return dispatch( logout() )
    
    const { uid, photoURL, email, displayName } = user

    dispatch( login( {uid, photoURL, email, displayName} ) )
    dispatch( startLoadingNotes() )
    
   })
  }, [])

  return status;    
    
}