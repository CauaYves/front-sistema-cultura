import instance from './api';

async function get(county: string) {
    try {
        const response = await instance.get(`noticePreview/${county}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const noticePreviewService = {
    get,
};
