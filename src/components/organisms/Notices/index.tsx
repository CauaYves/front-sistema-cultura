import { noticePreviewService } from '@/app/api/noticePreview';
import { useEffect, useState } from 'react';
import NoticesList from './components/list';
import { NoticePreviewList, NoticesProps } from './types';

export default function Notices({ router }: NoticesProps) {
    const [noticeList, setNoticeList] = useState<NoticePreviewList[]>([]);

    useEffect(() => {
        async function fetchNoticesPreviews() {
            const fetchedNoticePrevieList =
                await noticePreviewService.get('Volta Redonda');
            setNoticeList(fetchedNoticePrevieList);
        }
        fetchNoticesPreviews();
    }, []);

    return <NoticesList notices={noticeList} router={router} />;
}
