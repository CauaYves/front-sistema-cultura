import uploadService from '@/app/api/upload';

type SignedUrlArray = {
    signedUrl: string;
};

async function uploadFiles(
    signedUrlArray: SignedUrlArray[],
    files: File[] | undefined,
) {
    if (!files) return;
    const responseList = signedUrlArray.map(async (url, index) => {
        const response = await uploadService.upload(
            files[index],
            url.signedUrl,
        );
        console.log('response', response);
        return response;
    });
    const results = await Promise.all(responseList);
    return results;
}

export const cloudflareService = {
    uploadFiles,
};
