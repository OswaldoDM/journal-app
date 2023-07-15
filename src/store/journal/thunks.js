import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote, deleteNoteByID  } from "./journalSlice"
import { loadNotes } from "../../journal/helpers/loadNotes"
import { fileUpload } from "../../journal/helpers/fileUpload"


export function startNewNote() {    

    return async( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth        

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()

        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) )
        await setDoc( newDoc, newNote )
        
        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )

    }
    
};


export function startLoadingNotes() {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        if (!uid) throw new Error('El UID del usuario no existe')
        
        const notes = await loadNotes( uid )        
        
        dispatch( setNotes( notes ) )
       
    }
    
};

export function startSaveNote() {

    return async( dispatch, getState ) => {

        dispatch( setSaving() )

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const noteToFirestore = {...note}
        delete noteToFirestore.id

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)

        await setDoc( docRef, noteToFirestore, { merge: true })

        dispatch( updateNote( note ) )        
        
    }
    
};

export function startUploadingFiles( files = [] ) {

    return async( dispatch ) => {

        dispatch( setSaving() )        

        const fileUploadPromises = []

        for (const file of files) {
            
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photoUrls = await Promise.all( fileUploadPromises )
        
        dispatch( setPhotosToActiveNote( photoUrls ) )
    }
    
}

export function startDeletingNote() {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)

        await deleteDoc( docRef )

        dispatch( deleteNoteByID( note.id ) )

    }
    
}