import { useEffect, useMemo, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';



export const NoteView = () => {    

    const { active:note, messageSaved } = useSelector( state => state.journal )
    const dispatch = useDispatch()

    const { title, body, date, onInputChange, formState } = useForm( note )

    const dateString = useMemo( () => {

        const newDate = new Date( date )

        return newDate.toUTCString()

    }, [date])

    const fileInputRef = useRef()


    useEffect( () => {
        dispatch( setActiveNote( formState ) )
    }, [formState])

    useEffect( () => {

        if ( messageSaved.length > 0 ) {
            Swal.fire( 'Nota Actualizada', messageSaved, 'success' )
        }
        Swal
    }, [messageSaved])
    


    function onSaveNote() {

        dispatch( startSaveNote() )        
    }
    
    const onFileInputChange = ( event ) => {

        if ( event.target.files === 0) return;
        
        dispatch( startUploadingFiles( event.target.files ) )
    }

    function onDelete() {
        
        dispatch( startDeletingNote() )
    }

  return (

    <Grid 
    container 
    direction='row' 
    justifyContent='space-between' 
    alignItems='center' 
    sx={{ mb: 1 }}
    className='animate__animated animate__fadeIn animate__faster'
    >

        <Grid item>

            <Typography 
            fontSize={ 39 } 
            fontWeight='light' >
                { dateString }
            </Typography>                        
        </Grid>


        <Grid item>

            <input
                ref={ fileInputRef } 
                type='file'
                multiple
                onChange={ onFileInputChange }
                style={ { display: 'none'} }
            />

            <IconButton
                color='primary'
                onClick= { () => fileInputRef.current.click() }
                // disabled={ isSaving }                 
            >
                <UploadOutlined />
            </IconButton>

            <Button
                // disabled={ isSaving } 
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>

            <TextField
                name= 'title'
                value = { title }
                onChange= {onInputChange } 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField
                name= 'body'
                value = { body }
                onChange= {onInputChange } 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
            />
        </Grid>

        <Grid container 
        justifyContent='end'
        >            
        
            <Button            
            onClick={ onDelete }
            sx={{mt:2}}
            color='error'
            >
                <DeleteOutline />
                Borrar
            </Button>

        </Grid>
        
        <ImageGallery images={ note.imageUrls } />

    </Grid>
  )
}
