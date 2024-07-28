import { SingleFileInput } from '@/components/molecules/fileUpload/singleFileInput';
import { useSnackbar } from '@/context/snackbar-context';
import { appLocalStore } from '@/hooks';
import PersonIcon from '@mui/icons-material/Person';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import IdentificationForm from './components/Identification';
import AddressForm from './components/address';
import ButtonsContainerComp from './components/buttonsContainer';
import CompanyData from './components/companyData';
import ContactFormPF from './components/contactFormPF';
import ContactFormPJ from './components/contactFormPJ';
import FisicPersonData from './components/fisicPersonData';
import InterestAreaForm from './components/interestArea';
import ProponentForm from './components/proponentType';
import { handleSubmit } from './services';
import { PapersContainer, StyledPaper } from './styles';
import { IdentificationModulesKey, IdentificationProps } from './types';

export default function Indentification({
    setSelectedModule,
}: Readonly<IdentificationProps>) {
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const { setSnackbar } = useSnackbar();
    const [proponent, setProponent] = useState<IdentificationModulesKey>('PF');
    const handleSubmitWrapper = async (event: FormEvent<HTMLFormElement>) => {
        await handleSubmit(event, file, proponent, setSnackbar, setLoading);
    };

    const sessionData = appLocalStore.get('session');
    const handleChange = (event: SelectChangeEvent) => {
        setProponent(event.target.value as IdentificationModulesKey);
    };

    const proponentModule = {
        PF: <FisicPersonData />,
        PJ: <CompanyData />,
        PJSFL: <CompanyData />,
        MEI: <CompanyData />,
    };

    const contactModule = {
        PF: <ContactFormPF />,
        PJ: <ContactFormPJ />,
        PJSFL: <ContactFormPJ />,
        MEI: <ContactFormPJ />,
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <Box
                component="form"
                onSubmit={handleSubmitWrapper}
                sx={{ padding: '10px', background: '#eeeeee' }}
            >
                <Box sx={{ display: 'flex' }}>
                    <PersonIcon color="info" />
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ marginRight: '10px' }}
                    >
                        Alterar meu perfil
                    </Typography>
                </Box>
                <PapersContainer>
                    <IdentificationForm
                        email={sessionData.session.user.email}
                    />
                    <ProponentForm
                        handleChange={handleChange}
                        proponent={proponent}
                    />
                    {proponentModule[proponent]}
                    {contactModule[proponent]}
                    <AddressForm />
                    <InterestAreaForm />
                    <StyledPaper>
                        <SingleFileInput
                            file={file}
                            setFile={setFile}
                            caption="Envie o comprovante de residência"
                        />
                    </StyledPaper>
                </PapersContainer>
                <ButtonsContainerComp
                    loading={loading}
                    setSelectedModule={setSelectedModule}
                />
                <Link href="/home/about">Política de privacidade</Link>
            </Box>
        </LocalizationProvider>
    );
}
