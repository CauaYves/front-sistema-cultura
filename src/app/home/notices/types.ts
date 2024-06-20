import { SnackbarState } from '@/context/snackbar-context';
import { CulturalAgentPf, CulturalAgentPj } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';

export interface SubscriptionProps {
    router: AppRouterInstance;
    userPF: CulturalAgentPf | undefined;
    userPJ: CulturalAgentPj | undefined;
    searchParams: any;
}

export type Notice = {
    city: string;
    createdAt: string;
    updatedAt: string;
    endDate: string;
    id: number;
    name: string;
    observations: string;
    openingDate: string;
};

export type UrlsearchParamsProps = {
    activeStep: string;
    personType?: string;
    culturalAgentId?: string;
};

export type NoticesInfoProps = {
    notice: Notice | undefined;
    router: AppRouterInstance;
    userPF: CulturalAgentPf | undefined;
    userPJ: CulturalAgentPj | undefined;
    isloading: boolean;
};

export interface NoticeDetailsProps {
    params: { id: string };
    searchParams: SearchParams;
}

export type SearchParams = {
    activeStep: string;
    personType?: string;
    culturalAgentId: string;
};

export type ProposalInfoProps = {
    router: AppRouterInstance;
    urlSearchParams: UrlsearchParamsProps;
};

interface Proposal {
    name: string;
    description: string;
    justification: string;
    accessibility: string;
    accessDemocratization: string;
    executionPlace: string;
    publicServed: string;
    attachments: any[];
}

interface Connections {
    noticePreviewId: string;
    [key: string]: number | string;
}

interface Person {
    name: string;
    cpf: string;
    rg: string;
    issuingBody: string;
    email: string;
    tel: string;
    cep: string;
    address: string;
    number: string;
    complement: string;
    neighboorHood: string;
    county: string;
    uf: string;
    activiesOnLastTwoYears: string;
}

export interface TransformedObject {
    proposal: Proposal;
    connections: Connections;
    responsible: Person;
    coordinator: Person;
}

export interface ReviewInfoProps {
    setSnackbar: Dispatch<SetStateAction<SnackbarState>>;
    urlSearchParams: any;
    notice: any;
}
