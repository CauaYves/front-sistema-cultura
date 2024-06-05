import { noticePreviewService } from '@/app/api/noticePreview';
import { useEffect, useState } from 'react';
import NoticesList from './components/list';
import { NoticePreviewList, NoticesProps } from './types';
import useNoticesService from './services';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';

export default function Notices({ router, setSelectedModule }: NoticesProps) {
    const [noticeList, setNoticeList] = useState<NoticePreviewList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { handleSetIsLoading } = useNoticesService;

    useEffect(() => {
        handleSetIsLoading(setIsLoading, true);
        async function fetchNoticesPreviews() {
            const fetchedNoticePrevieList =
                await noticePreviewService.get('Volta Redonda');
            setNoticeList(fetchedNoticePrevieList);
            handleSetIsLoading(setIsLoading, false);
        }
        fetchNoticesPreviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {isLoading ? <LoadingScreen open /> : ''}{' '}
            <NoticesList
                notices={noticeList}
                router={router}
                isLoading={isLoading}
                setSelectedModule={setSelectedModule}
            />
        </>
    );
}
