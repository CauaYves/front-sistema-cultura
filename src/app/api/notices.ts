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
        console.error(`Erro durante a busca por edital número ${id}`);
    }
}

function createNotice(token: string, body: TransformedObject) {
    const promise = instance.post('/notice', body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return promise;
}

export const noticeService = {
    getOneById,
    createNotice,
};
