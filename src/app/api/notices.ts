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

export const noticeService = {
    getOneById,
};
