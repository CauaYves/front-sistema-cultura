import { ModulesKey } from '@/app/home/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';

export type NoticePreviewList = {
    id: string;
    name: string;
    observations: string;
    openingDate: string;
    endDate: string;
    city: string;
    createdAt: string;
    updatedAt: string;
    router: AppRouterInstance;
    setSelectedModule: Dispatch<SetStateAction<ModulesKey>>;
};

export type NoticesListProps = {
    notices: NoticePreviewList[];
    router: AppRouterInstance;
    isLoading: boolean;
    setSelectedModule: Dispatch<SetStateAction<ModulesKey>>;
};

export interface NoticesProps {
    router: AppRouterInstance;
    setSelectedModule: Dispatch<SetStateAction<ModulesKey>>;
}
