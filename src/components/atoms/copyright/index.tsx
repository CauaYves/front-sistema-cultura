import { Link, Typography } from '@mui/material';

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="#">
                Culturalize
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export { Copyright };
