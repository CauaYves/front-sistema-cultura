import { Box, TextField, TextFieldProps, styled } from '@mui/material';

function TextInput(props: TextFieldProps) {
    const { ...otherProps } = props;
    return (
        <TextFieldWrapper>
            <TextField fullWidth {...otherProps} required />
        </TextFieldWrapper>
    );
}

const TextFieldWrapper = styled(Box)(({ theme }) => ({
    margin: `${theme.spacing(1)} 0px`,
}));

export { TextInput };
