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
    margin: `${theme.spacing(1)}`,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        width: '100%',
        maxWidth: 'none',
    },
}));

export { TextInput };
