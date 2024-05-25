import Typography from '@mui/material/Typography';
import CustomDivider from '../divider';

type FormSectionTitleProps = {
    title: string;
};

function FormTitleSection({ title }: Readonly<FormSectionTitleProps>) {
    return (
        <>
            <Typography
                variant="caption"
                display="block"
                gutterBottom
                marginTop="10px"
            >
                {title}
            </Typography>
            <CustomDivider color="#9c9c9c" margin="10px 0px" />
        </>
    );
}

export { FormTitleSection };
