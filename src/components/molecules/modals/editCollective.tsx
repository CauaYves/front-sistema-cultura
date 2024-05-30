import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSnackbar } from '@/context/snackbar-context';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Collective, inputProps, UserData } from '@/types';
import collectiveService from '@/app/api/collective';
import { useCollective } from '@/context/collective-context';
import { CulturalizeApiError } from '@/protocols';
import { filterErrors } from '@/utils/filterErrorMessages';
import MaskedInput from 'react-text-mask';
import { cepMask, phoneMask } from '@/components/atoms';
import dayjs from 'dayjs';
import { appLocalStore } from '@/hooks';

interface EditModalProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    row: any;
}

export default function EditCollectiveModal({
    close,
    row,
}: Readonly<EditModalProps>) {
    const { collective, setCollective } = useCollective();
    const { setSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        token: '',
        user: {
            id: '',
            cpf: '',
            email: '',
            emailConfirmed: '',
            name: '',
        },
    });
    const token = userData.token;
    const formattedDate = dayjs(row.opening, 'DD/MM/YYYY').format('YYYY/MM/DD');
    useEffect(() => {
        async function fetchData() {
            const sessionData = appLocalStore.get('session');
            setUserData(sessionData.session);
        }
        fetchData();
    }, []);

    const handleStartLoading = () => setLoading(true);
    const handleStopLoading = () => setLoading(false);
    const handleError = (error: CulturalizeApiError) => {
        console.error(error);
        let message = '';
        if (error.response.status === 400) {
            message = filterErrors(error);
        } else {
            message = error.response.data.message;
        }
        return setSnackbar({
            open: true,
            severity: 'error',
            message: message,
        });
    };
    const getFormData = async (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const body: Omit<Collective, 'id'> = {
            name: data.get('name') as unknown as string,
            area: data.get('area') as unknown as string,
            opening: data.get('opening') as unknown as string,
            phone: data.get('phone') as unknown as string,
            email: data.get('email') as unknown as string,
            address: data.get('address') as unknown as string,
            neighboorhood: data.get('neighboorhood') as unknown as string,
            cep: data.get('cep') as unknown as string,
            complement: data.get('complement') as unknown as string,
            county: data.get('county') as unknown as string,
            responsible: userData.user.name,
            userId: userData.user.id as unknown as number,
        };
        return body;
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleStartLoading();

        const body = await getFormData(event);
        if (body.cep.includes('_') || body.phone.includes('_')) {
            handleStopLoading();
            return setSnackbar({
                message: 'CEP ou Telefone incompletos! ',
                severity: 'warning',
                open: true,
            });
        }

        const promise = collectiveService.update(body, token, row.id);
        promise
            .then(() => {
                const index = collective.findIndex(
                    (coll) => coll.id === row.id,
                );

                const newCollectiveList = [...collective];
                newCollectiveList.splice(index, 1);
                const newRegister = {
                    ...body,
                    id: row.id,
                    createdAt: row.createdAt,
                    updatedAt: new Date().toISOString(),
                };
                newCollectiveList.push(newRegister);

                setCollective(newCollectiveList);
                setLoading(false);
                close(false);
                setSnackbar({
                    message: 'Coletivo Cultural editado com sucesso! ',
                    severity: 'success',
                    open: true,
                });
            })
            .catch((error) => handleError(error))
            .finally(() => handleStopLoading());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <Box
                sx={{
                    padding: '50px 50px 20px 50px',
                }}
            >
                <Typography component="h2" variant="h6">
                    Edição de Coletivo Cultural
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="name"
                        {...inputProps}
                        defaultValue={row.name}
                    />
                    <FormControl {...inputProps}>
                        <InputLabel id="area-label">
                            Principal Área Cultural
                        </InputLabel>
                        <Select
                            id="area-label"
                            labelId="area-label"
                            label="Principal Área Cultural"
                            name="area"
                            defaultValue={row.area}
                        >
                            <MenuItem value="Artes Visuais">
                                Artes Visuais
                            </MenuItem>
                            <MenuItem value="Audiovisual/Cinema">
                                Audiovisual/Cinema
                            </MenuItem>
                            <MenuItem value="Circo">Circo</MenuItem>
                            <MenuItem value="Manifestações Populares">
                                Manifestações Populares
                            </MenuItem>
                            <MenuItem value="Ópera">Ópera</MenuItem>
                            <MenuItem value="Patrimonio Cultural">
                                Patrimonio Cultural
                            </MenuItem>
                            <MenuItem value="Teatro">Teatro</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl {...inputProps}>
                        <DatePicker
                            label="Data de abertura"
                            name="opening"
                            disableFuture
                            defaultValue={dayjs(formattedDate)}
                        />
                    </FormControl>
                    <MaskedInput
                        mask={phoneMask}
                        render={(ref, props) => (
                            <TextField
                                {...props}
                                inputRef={ref}
                                defaultValue={row.phone}
                                name="phone"
                                {...inputProps}
                                label="Telefone"
                                autoComplete="postal-code"
                            />
                        )}
                    />
                    <TextField
                        label="E-mail"
                        name="email"
                        {...inputProps}
                        type="email"
                        defaultValue={row.email}
                    />
                    <TextField
                        label="Endereço"
                        name="address"
                        {...inputProps}
                        defaultValue={row.address}
                    />
                    <TextField
                        label="Bairro"
                        name="neighboorhood"
                        {...inputProps}
                        defaultValue={row.neighboorhood}
                    />
                    <TextField
                        label="Complemento"
                        name="complement"
                        {...inputProps}
                        required={false}
                        defaultValue={row.complement}
                    />
                    <MaskedInput
                        mask={cepMask}
                        render={(ref, props) => (
                            <TextField
                                {...props}
                                inputRef={ref}
                                name="cep"
                                {...inputProps}
                                label="CEP"
                                autoComplete="postal-code"
                                defaultValue={row.cep}
                            />
                        )}
                    />
                    <TextField
                        label="Município"
                        name="county"
                        {...inputProps}
                        defaultValue={row.county}
                    />

                    <Box
                        sx={{
                            mt: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button onClick={() => close(false)}>cancelar</Button>
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={loading}
                        >
                            Salvar
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}
