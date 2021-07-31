import { useFormContext } from 'react-hook-form';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const inputStyles = {
    backgroundColor: 'white'
};

const TextBox = ({ parentFormId, inputObject, setFormData, formData }) => {
    const { register, errors } = useFormContext();
    const label = inputObject?.label ? inputObject?.label : '';

    const textReg = register(`text-field-${parentFormId}-${inputObject.id}`)


    return (
        <TextField
            id={`text-field-${parentFormId}-${inputObject.id}`}
            name={`text-field-${parentFormId}-${inputObject.id}`}
            ref={textReg.ref}
            label={label}
            onChange={e => {
                setFormData({[`text-field-${parentFormId}-${inputObject.id}`]: e.target.value})
                textReg.onChange(e)
            }}
            margin="normal"
            variant="filled"
            type={'number'}
            value={formData && formData[`text-field-${parentFormId}-${inputObject.id}`]}
            error={!!errors?.[inputObject.id]}
            helperText={errors?.[inputObject.id]?.message}
            InputLabelProps={{
                shrink: true,
                'data-qa': `${parentFormId}-${inputObject.id}-user-label`
            }}
            inputProps={{
                'data-qa': `${parentFormId}-${inputObject.id}-user-input`,
                style: { ...inputStyles }
            }}
        />
    );
};

export default TextBox;
