import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import NoticesListItem from './listItem';
import { StyledPaper, StrongTypo } from '../styles';
import { NoticesListProps } from '../types';

export default function NoticesList({
    notices,
    router,
    isLoading,
    setSelectedModule,
    userPJ,
    userPF,
}: NoticesListProps) {
    return (
        <Box sx={{ width: '95%', bgcolor: 'background.paper' }}>
            <StyledPaper sx={{ padding: '10px' }}>
                <Box>
                    <StrongTypo>Título</StrongTypo>
                    <StrongTypo>Data de abertura</StrongTypo>
                    <StrongTypo>Data de encerramento</StrongTypo>
                </Box>
                <Divider sx={{ margin: '10px 0px' }} />

                {!isLoading && notices.length === 0 ? (
                    <Typography>
                        Não há editais publicados nessa região
                    </Typography>
                ) : (
                    notices.map(
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
                                    router={router}
                                    setSelectedModule={setSelectedModule}
                                    userPJ={userPJ}
                                    userPF={userPF}
                                />
                            );
                        },
                    )
                )}
            </StyledPaper>
        </Box>
    );
}
