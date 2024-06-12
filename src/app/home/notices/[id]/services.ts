import { noticeService } from '@/app/api';
import enrollmentService from '@/app/api/enrollment';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SearchParams } from '../types';

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
    searchParams: SearchParams,
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
function transformObject(urlSearchParams: any, noticeId: string) {
    return {
        proposal: {
            name: urlSearchParams.name,
            description: urlSearchParams.description,
            justification: urlSearchParams.justification,
            accessibility: urlSearchParams.accessibility,
            accessDemocratization: urlSearchParams.accessDemocratization,
            executionPlace: urlSearchParams.executionPlace,
            publicServed: urlSearchParams.publicServed,
        },
        connections: {
            noticePreviewId: noticeId,
        },
        responsible: {
            name: urlSearchParams['res.name'],
            cpf: urlSearchParams['res.cpf'],
            rg: urlSearchParams['res.rg'],
            issuingBody: urlSearchParams['res.issuingBody'],
            email: urlSearchParams['res.email'],
            tel: urlSearchParams['res.tel'],
            cep: urlSearchParams['res.cep'],
            address: urlSearchParams['res.address'],
            number: urlSearchParams['res.number'],
            complement: urlSearchParams['res.complement'],
            neighboorHood: urlSearchParams['res.neighboorHood'],
            county: urlSearchParams['res.county'],
            uf: urlSearchParams['res.uf'],
            activiesOnLastTwoYears: urlSearchParams.activiesOnLastTwoYears,
        },
        coordinator: {
            name: urlSearchParams['cord.name'],
            cpf: urlSearchParams['cord.cpf'],
            rg: urlSearchParams['cord.rg'],
            issuingBody: urlSearchParams['cord.issuingBody'],
            email: urlSearchParams['cord.email'],
            tel: urlSearchParams['cord.tel'],
            cep: urlSearchParams['cord.cep'],
            address: urlSearchParams['cord.address'],
            number: urlSearchParams['cord.number'],
            complement: urlSearchParams['cord.complement'],
            neighboorHood: urlSearchParams['cord.neighboorHood'],
            county: urlSearchParams['cord.county'],
            uf: urlSearchParams['cord.uf'],
            activiesOnLastTwoYears: urlSearchParams.activiesOnLastTwoYears,
        },
    };
}

export const noticeSlugServices = {
    getNoticeDetails,
    incrementAtualStep,
    getUserPFandPJ,
    transformObject,
};
