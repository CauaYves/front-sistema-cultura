import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
};

export type NoticesListProps = {
    notices: NoticePreviewList[];
    router: AppRouterInstance;
};

export interface NoticesProps {
    router: AppRouterInstance;
}
