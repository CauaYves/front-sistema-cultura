import instance from './api';

async function get(county: string) {
    try {
        const response = await instance.get(`noticePreview/${county}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getEnded(county: string) {
    try {
        const response = await instance.get(`noticePreview/ended/${county}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const noticePreviewService = {
    get,
    getEnded,
};
