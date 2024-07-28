import axios from 'axios';

export type uploadResponseData = {
    signedUrl: string;
    fileId: string;
};

async function upload(file: any, url: string) {
    try {
        const response = await axios.put(url, file, {
            headers: {
                'Content-Type': file.type,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

const uploadService = {
    upload,
};
export default uploadService;
