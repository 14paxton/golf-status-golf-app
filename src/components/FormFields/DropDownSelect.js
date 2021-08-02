import React, {useEffect, useState} from 'react';
import MuiTextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import {useFormContext, Controller} from 'react-hook-form';
import {createFilterOptions} from '@material-ui/lab/Autocomplete';


const Autocomplete = withStyles({
    root:      {
        width:           '100%',
        backgroundColor: 'transparent',
        '&$focused':     {
            backgroundColor: 'transparent'
        }
    },
    input:     {
        fontSize:  '12px',
        textAlign: 'left'
    },
    inputRoot: {
        backgroundColor: 'white !important',
        width:           '100%',
        textAlign:       'left'
    },
    option:    {
        fontSize: '13px'
    },
    focused:   {}
})(MuiAutocomplete);

const filterOptions = createFilterOptions({
    stringify: (option) => `${option.name}, ${option.displayOption}`
});

const TextField = withStyles({
    root: {
        backgroundColor: 'white',
        width:           '100%',
        textAlign:       'left'
    }
})(MuiTextField);

const DropDownSelect = ({parentFormId, inputObject, setFormData, formData}) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const {getValues, setValue, control, errors} = useFormContext();
    const loading = open && options?.length === 0;
    const label = inputObject.label;
    const selectOne = 'Select One';
    const placeHolderText = !!options?.length
                            ? (options.length > 1
                               ? selectOne
                               : inputObject?.choices[0]?.displayOption)
                            : '';

    useEffect(() => {
        setOptions(inputObject.choices);
        if (inputObject?.choices && formData &&formData[`combo-input-${parentFormId}-${inputObject.id}`]) {
            const selected = inputObject.choices.find((opt) => opt?.id === formData[`combo-input-${parentFormId}-${inputObject.id}`]);

            setSelectedValue(selected);
            setValue(`combo-input-${parentFormId}-${inputObject.id}`, selected?.id);
        }
    }, [formData, getValues, inputObject.choices, inputObject.id, parentFormId, setValue]);


    return (
        <Controller
            name={`combo-input-${parentFormId}-${inputObject.id}`}
            control={control}
            defaultValue={formData && formData[`combo-input-${parentFormId}-${inputObject.id}`]}

            //can add validation
            // rules={{
                // setValueAs: (value) => value.map((id) => parseFloat(id))
                // validate: oneUserSelected
            // }}

            render={({onChange, value, ref, ...props}) => (
                <Autocomplete
                    data-qa={`${parentFormId}-${inputObject.id}-combo-input`}
                    id={`combo-text-field-${parentFormId}-${inputObject.id}`}
                    open={open}
                    disabled={options?.length <= 1}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    freeSolo
                    filterOptions={filterOptions}
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.displayOption ?? ''}
                    renderOption={(option) => option?.displayOption ?? ''}
                    onChange={(e, data) => { onChange(data)}}
                    options={options}
                    loading={loading}
                    fullWidth
                    value={selectedValue ?? ''}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            fullWidth
                            margin='normal'
                            variant='filled'
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                                  <React.Fragment>
                                                      {loading
                                                       ? <CircularProgress color='inherit' size={20}/>
                                                       : null}
                                                      {params.InputProps.endAdornment}
                                                  </React.Fragment>
                                              )
                            }}
                            placeholder={placeHolderText}
                        />
                    )}
                    {...props}
                />
            )}
        />
    );
}

export default DropDownSelect;
