import { useMemo } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { useForm } from '../../hooks/useForm';

import { AuthLayout } from '../layout/AuthLayout';

import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',   
  password: '',
}

export const LoginPage = () => {

  const selector = useSelector( state => state.auth )
  const { status, errorMessage } = selector

  const dispatch = useDispatch()

  const { email, password, onInputChange, formState } = useForm( formData )

  const isAuthenticating = useMemo( () => status === 'checking', [status])

  function onSubmit( event ) {

    event.preventDefault()    
    
    dispatch( startLoginWithEmailPassword( formState ) )
    
  }

  function onGoogleSignIn() {

    dispatch( startGoogleSignIn() )
    
  }

  return (

    <AuthLayout title="Login">

      <form 
      onSubmit={ onSubmit }
      className='animate__animated animate__fadeIn animate__faster'
      >

          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>

              <TextField
                onChange={ onInputChange }
                value = { email }
                name = 'email' 
                type="email" 
                label="Correo" 
                placeholder='correo@google.com' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                onChange={ onInputChange }
                value = { password }
                name = 'password' 
                type="password" 
                label="Contraseña" 
                placeholder='Contraseña' 
                fullWidth
              />
            </Grid>            
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>            

              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                disabled= { isAuthenticating } 
                type='submit'
                variant='contained' 
                fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                disabled= { isAuthenticating } 
                onClick={ onGoogleSignIn } 
                variant='contained' 
                fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>

            </Grid>

            <Grid item
              display={ !!errorMessage ? '' : 'none'} 
              xs={ 12 }  
            > 
                <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>            


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>          

        </form>              

    </AuthLayout>
    
  )
}
