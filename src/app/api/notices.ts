import { TransformedObject } from '../home/notices/types';
import instance from './api';

async function getOneById(id: string | number, token: string) {
    try {
        const response = await instance.get(`/noticePreview/unique/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        console.error(`Erro durante a busca por edital número ${id}`);
    }
}

async function createNotice(token: string, body: TransformedObject) {
    try {
        console.log(token);
        const response = await instance.post('/notice', body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const noticeService = {
    getOneById,
    createNotice,
};
