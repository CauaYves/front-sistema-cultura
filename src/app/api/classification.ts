import { Classification } from '@/types';
import instance from './api';

async function get(token: string) {
    try {
        const response = await instance.get('/notice-classification', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data[0];
    } catch (error) {
        console.error(
            'Erro durante a busca por classificação dentro do edital',
            error,
        );
    }
}
type CreateClassification = Omit<
    Classification,
    'classificationFilesId' | 'updatedAt' | 'userId' | 'createdAt' | 'id'
>;
async function post(token: string, body: CreateClassification) {
    try {
        const response = await instance.post('/notice-classification', body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro durante envio de classificação', error);
    }
}

async function getAllClassificationAndFiles(token: string) {
    try {
        const response = await instance.get('/notice-classification/files', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            'Erro durante a busca por classificações dentro do edital',
            error,
        );
    }
}

export const classificationService = {
    get,
    getAllClassificationAndFiles,
    post,
};
