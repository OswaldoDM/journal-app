import { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';


import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';

const formData = {
  email: '',   
  password: '',
  displayName: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), '*Tu direccion de email' ],
  password: [ (value) => value.length >= 6, '*El password debe tener al menos 6 caracteres' ],
  displayName: [ (value) => value.length >= 1, '*Tu nombre completo' ],
}

export const RegisterPage = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false )
  
  const selector = useSelector( state => state.auth)
  const { status, errorMessage } = selector
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const dispatch = useDispatch()

  const {
    formState, displayName, email, password, onInputChange,  
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData, formValidations )
  

  function onSubmit( event ) {
    event.preventDefault()

    setFormSubmitted( true )  

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword( formState ) )
    
  }

  return (
    <AuthLayout title="Crear cuenta">      

      <form 
      onSubmit={ onSubmit } 
      className='animate__animated animate__fadeIn animate__faster'>

          <Grid container>
           
              <Grid item xs={ 12 } sx={{ mt: 2 }}>

                <TextField
                  value={ displayName }
                  name='displayName' 
                  label="Nombre completo" 
                  type="text" 
                  placeholder='Nombre completo' 
                  fullWidth
                  onChange={ onInputChange }
                  error = { !!displayNameValid && formSubmitted }
                  helperText = { displayNameValid  }                                    
                />

              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }}>

                <TextField
                  name='email'
                  value={ email } 
                  label="Correo" 
                  type="email" 
                  placeholder='correo@google.com' 
                  fullWidth
                  onChange={ onInputChange }
                  error = { !!emailValid && formSubmitted }
                  helperText = { emailValid  }                  
                />

              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }}>

                <TextField
                  name='password'
                  value={ password } 
                  label="Contraseña" 
                  type="password" 
                  placeholder='Contraseña' 
                  fullWidth
                  onChange={ onInputChange }
                  error = { !!passwordValid && formSubmitted }
                  helperText = { passwordValid  }                  
                />

              </Grid>
              
              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid item
              display={ !!errorMessage ? '' : 'none'} 
              xs={ 12 }> 
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

                <Grid item xs={ 12 }>

                  <Button
                  disabled={ isCheckingAuthentication } 
                  type='submit'
                  variant='contained' 
                  fullWidth>
                    Crear cuenta
                  </Button>

                </Grid>

              </Grid>


              <Grid container direction='row' justifyContent='end'>

                <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>

                <Link component={ RouterLink } color='inherit' to="/auth/login">
                  ingresar
                </Link>

              </Grid>

          </Grid>

        </form>

    </AuthLayout>
  )
}

