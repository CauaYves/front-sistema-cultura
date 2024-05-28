import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import NoticesListItem from './listItem';
import { StyledPaper, StrongTypo } from './styles';
import { NoticePreviewList } from '.';

type NoticesListProps = {
    notices: NoticePreviewList[];
};
export default function NoticesList({ notices }: NoticesListProps) {
    return (
        <Box sx={{ width: '95%', bgcolor: 'background.paper' }}>
            <StyledPaper sx={{ padding: '10px' }}>
                <Box>
                    <StrongTypo>Título</StrongTypo>
                    <StrongTypo>Data de abertura</StrongTypo>
                    <StrongTypo>Data de encerramento</StrongTypo>
                </Box>
                <Divider sx={{ margin: '10px 0px' }} />
                {notices.map(
                    ({
                        id,
                        name,
                        observations,
                        openingDate,
                        endDate,
                        city,
                        createdAt,
                        updatedAt,
                    }) => {
                        return (
                            <NoticesListItem
                                key={id}
                                id={id}
                                name={name}
                                observations={observations}
                                openingDate={openingDate}
                                endDate={endDate}
                                city={city}
                                createdAt={createdAt}
                                updatedAt={updatedAt}
                            />
                        );
                    },
                )}
            </StyledPaper>
        </Box>
    );
}
