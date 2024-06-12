import { Box, Typography } from '@mui/material';
import { noticeSlugServices } from '../[id]/services';

export default function ReviewInfo({ urlSearchParams, notice }: any) {
    console.log('notice', notice);
    const { transformObject } = noticeSlugServices;
    console.log('aaaaaaaaa', transformObject(urlSearchParams, notice.id));

    return (
        <Box>
            <Typography>
                Para finalizar a sua inscrição envie os arquivos abaixo:
            </Typography>
            {notice
                ? notice.uploads.map((upload: string, index: number) => {
                      return <Typography key={index}>{upload}</Typography>;
                  })
                : null}
        </Box>
    );
}
