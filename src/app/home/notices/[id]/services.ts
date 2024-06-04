import { noticeService } from '@/app/api';
import enrollmentService from '@/app/api/enrollment';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

async function getNoticeDetails(
    id: string,
    token: string,
    setDetails: any,
    handleLoading: any,
) {
    handleLoading(true);
    const response = await noticeService.getOneById(id, token);
    setDetails(response);
    handleLoading(false);
}

function incrementAtualStep(
    atualStep: string,
    searchParams: URLSearchParams,
    router: AppRouterInstance,
    paramsToAdd: { [key: string]: string },
) {
    const nextStep = (Number(atualStep) + 1).toString();
    const currentParams = new URLSearchParams(searchParams);

    Object.entries(paramsToAdd).forEach(([key, value]) => {
        currentParams.set(key, value);
    });

    currentParams.set('activeStep', nextStep);

    router.push(`${window.location.pathname}?${currentParams.toString()}`);
}
async function getUserPFandPJ(token: string) {
    const userPF = await enrollmentService.getPFNoPromise(token);
    const userPJ = await enrollmentService.getPJNoPromise(token);
    return [userPF, userPJ];
}

export const noticeSlugServices = {
    getNoticeDetails,
    incrementAtualStep,
    getUserPFandPJ,
};
