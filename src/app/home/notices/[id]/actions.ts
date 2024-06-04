'use server';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { noticeSlugServices } from '../[id]/services';

const { incrementAtualStep } = noticeSlugServices;

async function submitForm(
    urlSearchParams: URLSearchParams,
    router: AppRouterInstance,
) {
    incrementAtualStep('2', urlSearchParams, router, []);
}

const useNoticeActions = {
    submitForm,
};

export { useNoticeActions };
