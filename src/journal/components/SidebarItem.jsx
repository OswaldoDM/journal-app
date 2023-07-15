import { useMemo } from "react";

import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";


export function SideBarItem( { id, title = '', body, date, imageUrls = [] } ) {

    
    const newTitle = useMemo( () => {
        
        return title.length > 17
        ? title.substring(0,17) + '...'
        : title
        
    }, [title])
    
    const dispatch = useDispatch()

    function onClickNote( ) {

        dispatch( setActiveNote({id, title, body, date, imageUrls}) )
        
    }

  return (
  <>
  <ListItem disablePadding onClick={ onClickNote }>

    <ListItemButton>
        
        <ListItemIcon>
            <TurnedInNot />
        </ListItemIcon>

        <Grid container>
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={ body } />
        </Grid>

    </ListItemButton>

</ListItem>
  </>
  )

}