import { noticeService } from '@/app/api';
import enrollmentService from '@/app/api/enrollment';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function calculateAtualStep(personType: string | undefined) {
    let atualStep = 0;
    if (!personType) {
        atualStep = 0;
    } else {
        atualStep = 1;
    }

    return atualStep;
}

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
    personType: string,
    culturalAgentId: number,
    searchParams: URLSearchParams,
    router: AppRouterInstance,
) {
    const nextStep = (Number(atualStep) + 1).toString();
    const currentParams = new URLSearchParams(searchParams);

    // Atualiza a URL com os novos parâmetros
    currentParams.set('personType', personType);
    currentParams.set('activeStep', nextStep);
    currentParams.set('culturalAgentId', culturalAgentId.toString());

    router.push(`${window.location.pathname}?${currentParams.toString()}`);
}

async function getUserPFandPJ(token: string) {
    const userPF = await enrollmentService.getPFNoPromise(token);
    const userPJ = await enrollmentService.getPJNoPromise(token);
    return [userPF, userPJ];
}

export const noticeSlugServices = {
    calculateAtualStep,
    getNoticeDetails,
    incrementAtualStep,
    getUserPFandPJ,
};
