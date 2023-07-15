import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';


export const JournalPage = () => {

  const selector = useSelector( state => state.journal )
  const { isSaving, active } = selector

  const dispatch = useDispatch()

  function onClickNewNote() {

    dispatch( startNewNote() )
    
  } 
  

  return (
    <JournalLayout>      

      {
        !!active 
        ? <NoteView />
        : <NothingSelectedView />
      }

      <IconButton
        disabled={ isSaving }
        onClick={ onClickNewNote }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
