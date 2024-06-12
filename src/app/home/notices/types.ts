import { CulturalAgentPf, CulturalAgentPj } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
