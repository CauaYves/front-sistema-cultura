import enrollmentService from '@/app/api/enrollment';
import uploadService from '@/app/api/upload';
import { WebFile } from '@/components/molecules/fileUpload';
import { SnackbarState } from '@/context/snackbar-context';
import { filterErrors } from '@/utils/filterErrorMessages';
import { FormEvent } from 'react';
import { IdentificationModulesKey } from './types';

export const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    file: WebFile[] | undefined,
    proponent: IdentificationModulesKey,
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const testeArquivo: WebFile[] = [
        {
            name: 'teste',
            lastModified: 21312312,
            lastModifiedDate: 3243243,
            type: 'application/pdf',
            webkitRelativePath: 'relativePath',
            length: 231123123,
        },
    ];
    event.preventDefault();
    handleStartLoading(setLoading)();
    const storedData = localStorage.getItem('session') || '';
    const { session } = JSON.parse(storedData);

    if (!testeArquivo) {
        return setSnackbar({
            message: 'Anexe o comprovante de residência',
            open: true,
            severity: 'warning',
        });
    }

    const formData = createFormData(event, testeArquivo, proponent);
    formData.cpf = session.user.cpf;
    formData.name = session.user.name;

    const createEnrollment =
        proponent !== 'PF'
            ? enrollmentService.createPj
            : enrollmentService.createPf;

    try {
        const res = await createEnrollment(formData, session.token);
        uploadFileAndShowSnackbar(
            testeArquivo,
            res.data.signedUrl,
            setSnackbar,
        );
    } catch (error) {
        handleError(setSnackbar, error);
    } finally {
        handleStopLoading(setLoading)();
    }
};

const createFormData = (
    event: FormEvent<HTMLFormElement>,
    file: WebFile[],
    proponent: IdentificationModulesKey,
) => {
    const data = new FormData(event.currentTarget);
    const formData: any = {};
    for (const [key, value] of data.entries()) {
        formData[key] = value as string;
    }
    delete formData.cultura;
    formData.proponent = proponent;
    formData.public = formData.public === 'on';
    formData.programs = [formData.cultura === 'on ' ? 'cultura' : ''];
    formData.upload = {
        name: file[0].name,
        contentType: file[0].type,
    };
    return formData;
};

const uploadFileAndShowSnackbar = async (
    file: WebFile[],
    signedUrl: string,
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>,
) => {
    uploadService.upload(file, signedUrl, file[0].type);
    setSnackbar({
        message: 'cadastro criado com sucesso!',
        open: true,
        severity: 'success',
    });
};

export const handleStartLoading =
    (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => () => {
        setLoading(true);
    };

export const handleStopLoading =
    (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => () => {
        setLoading(false);
    };

export const handleError = (
    setSnackbar: React.Dispatch<React.SetStateAction<any>>,
    error: any,
) => {
    let message = '';
    if (error.response.status === 400) {
        message = filterErrors(error.response.data.details);
    } else {
        message = error.response.data;
    }
    return setSnackbar({
        open: true,
        severity: 'warning',
        message: message,
    });
};
