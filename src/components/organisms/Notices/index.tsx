import { noticePreviewService } from '@/app/api/noticePreview';
import { useEffect, useState } from 'react';
import NoticesList from './list';

export type NoticePreviewList = {
    id: number;
    name: string;
    observations: string;
    openingDate: string;
    endDate: string;
    city: string;
    createdAt: string;
    updatedAt: string;
};

export default function Notices() {
    const [noticeList, setNoticeList] = useState<NoticePreviewList[]>([]);

    useEffect(() => {
        async function fetchNoticesPreviews() {
            const fetchedNoticePrevieList =
                await noticePreviewService.get('Volta Redonda');
            setNoticeList(fetchedNoticePrevieList);
        }
        fetchNoticesPreviews();
    }, []);

    return <NoticesList notices={noticeList} />;
}
