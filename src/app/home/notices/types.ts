import { CulturalAgentPf, CulturalAgentPj } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
};

export type NoticesInfoProps = {
    notice: Notice | undefined;
    urlSearchParams: UrlsearchParamsProps;
    router: AppRouterInstance;
    userPF: CulturalAgentPf | undefined;
    userPJ: CulturalAgentPj | undefined;
    isloading: boolean;
};

export interface NoticeDetailsProps {
    params: { id: string };
    searchParams: {
        activeStep: string;
        personType?: string;
        culturalAgentId: string;
    };
}
