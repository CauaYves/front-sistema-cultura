import uploadService from '@/app/api/upload';
import { WebFile } from '@/components';

type SignedUrlArray = {
    signedUrl: string;
};

async function uploadFiles(
    signedUrlArray: SignedUrlArray[],
    files: WebFile[] | undefined,
) {
    if (!files) return;
    const responseList = signedUrlArray.map(async (url, index) => {
        const response = await uploadService.upload(
            files[index],
            url.signedUrl,
            files[index].type,
        );
        return response;
    });
    const results = await Promise.all(responseList);
    return results;
}

export const cloudflareService = {
    uploadFiles,
};
