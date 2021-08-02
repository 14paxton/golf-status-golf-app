import React, { useEffect, useState } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import withStyles from '@material-ui/core/styles/withStyles';
import { useFormContext } from 'react-hook-form';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {Chip} from "@material-ui/core";


const AutoComplete = withStyles({
    root: {
        width: '100%',
        backgroundColor: 'transparent',
        '&$focused': {
            backgroundColor: 'transparent'
        }
    },
    input: {
        fontSize: '12px',
        textAlign: 'left'
    },
    inputRoot: {
        backgroundColor: 'white !important',
        width: '100%',
        textAlign: 'left'
    },
    option: {
        fontSize: '13px'
    },
    focused: {}
})(MuiAutocomplete);

//can create custom filter options
// const filterOptions = createFilterOptions({
//     stringify: (option) => `${option.name},${option.code}`
// });

const TextField = withStyles({
    root: {
        backgroundColor: 'white',
        width: '100%',
        textAlign: 'left'
    }
})(MuiTextField);

export default function MultiSelectAutoComplete({ parentFormId, inputObject, setFormData, formData  }) {
    const [options, setOptions] = useState([]);
    const { control} = useFormContext();
    const [loading, setLoading] = useState(options.length === 0);
    const label = inputObject.label;
    const selectOne = 'Select One';
    const placeHolderText = !!options.length ? (options.length > 1 ? selectOne : inputObject?.choices[0]?.name) : '';

    useEffect(() => {
        setOptions(!!inputObject?.choices?.length ? inputObject?.choices : []);
        setLoading(false)
    }, [inputObject]);

    return (
    <Controller
        name={`multi-select-${parentFormId}-${inputObject.id}`}
        control={control}
        defaultValue={formData && formData[`multi-select-${parentFormId}-${inputObject.id}`]}


        // rules={{
            // setValueAs: (value) => value.map((id) => parseFloat(id))
            //can add validation
            // validate: oneUserSelected
        // }}

        render={({ onChange, value, ref, ...props }) => (
            <AutoComplete
                loading={loading}
                multiple
                disabled={options?.length <= 1}
                data-qa={`${parentFormId}-${inputObject.id}-combo-input`}
                id={`multi-select-${parentFormId}-${inputObject.id}`}
                options={options}
                noOptionsText={'No Users Available'}
                onChange={(e, data) => { onChange(data)}}

                //can create custom filter options
                // filterOptions={filterOptions}

                getOptionLabel={(option) => `${option?.selectOption ?? ''}`}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            color='primary'
                            label={`${option?.displayOption }`}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        data-qa={`${parentFormId}-${inputObject.id}-combo-input-text-field`}
                        variant='outlined'
                        label={label}
                        placeholder={placeHolderText}
                        InputLabelProps={{
                            shrink: true,
                            'data-qa': `${parentFormId}-${inputObject.id}-combo-input-input-label`,
                            style: {
                                fontSize: '20px',
                                color: 'black',
                                display: 'block',
                                fontFamily: 'Open Sans, sans-serif',
                                fontWeight: 700
                            }
                        }}
                        // error={!!errors[`combo-text-field-${parentFormId}-${inputObject.id}`]}
                        helperText={
                            <p style={{ textAlign: 'center' }}>
                                {/*{errors[`combo-text-field-${parentFormId}-${inputObject.id}`]?.message }*/}
                            </p>
                        }
                    />
                )}
                {...props}
            />
        )}
    />
    );
}
