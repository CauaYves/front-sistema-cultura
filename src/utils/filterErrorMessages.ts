import { CulturalizeApiError } from '@/protocols';

function filterErrors(error: CulturalizeApiError) {
    let message = '';
    const errorDetails = error.response?.data.details;
    errorDetails.forEach((detail: string) => {
        message += detail;
    });
    return message;
}

export { filterErrors };
