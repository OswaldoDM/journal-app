import { useEffect, useState, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidators()
    }, [formState])
    
    useEffect(() => {
     setFormState( initialForm )
    }, [initialForm])
    

    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {

            if ( formValidation[formValue] !== null ) return false;            
        }

        return true;

    }, [formValidation])


    function onInputChange( event ) {

        const { name, value } = event.target

        setFormState({
            ...formState,
            [ name ]: value
        })
    };

    function onResetForm() {
        setFormState( initialForm );
    }; 

    function createValidators() {
        
        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )) {

            const [ fn, errorMessage ] = formValidations[formField]


            // Se le crea una propiedad computada al objeto formCheckedValues
            // Basicamente es esto: formCheckedValues {
                // `${formField} Valid`
            //}

            // Todo esto va a ser igual a la ejecucion de la funcion que tiene el formField
            // El argumento de la fn es el value que tenga el formField
            // Si la funcion se cumple, no habra error y sera null
            // Si la funcion no se cumple, nos da el errorMessage que tiene el formField

            formCheckedValues[ `${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage
        }

        setFormValidation( formCheckedValues )
        
    };    

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}