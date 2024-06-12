import {
    AccordionSummary,
    Box,
    Button,
    ButtonGroup,
    styled,
} from '@mui/material';

export const Info = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    height: '100%',
}));

export const RightInfo = styled(Box)(({ theme }) => ({
    padding: `0px ${theme.spacing(2)}`,
}));

export const FlexibleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    background: '#ffffff',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));
export const NoticesForm = styled('form')(({ theme }) => ({
    background: '#ffffff',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
    margin: `${theme.spacing(2)} 0px`,
}));

export const ButtonGroupStld = styled(ButtonGroup)(({ theme }) => ({
    width: '150px',
    height: '100%',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexDirection: 'initial',
        marginBottom: theme.spacing(2),
    },
}));

export const ButtonStld = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: '7px',
    },
}));

export const AccordionSummaryStld = styled(AccordionSummary)(({ theme }) => ({
    color: theme.palette.primary.dark,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    margin: `${theme.spacing(2)} 0px`,
}));
