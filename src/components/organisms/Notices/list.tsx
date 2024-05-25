import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper, styled, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import NoticesListItem from './listItem';
import notices from './notices';

export default function NoticesList() {
    return (
        <Box sx={{ width: '95%', bgcolor: 'background.paper' }}>
            <StyledPaper sx={{ padding: '10px' }}>
                <Box>
                    <StrongTypo>Título</StrongTypo>
                    <StrongTypo>Data de abertura</StrongTypo>
                    <StrongTypo>Data de encerramento</StrongTypo>
                </Box>
                <Divider sx={{ margin: '10px 0px' }} />
                {notices.map(({ closing, id, opening, title }) => {
                    return (
                        <NoticesListItem
                            key={id}
                            title={title}
                            ending={closing}
                            opening={opening}
                        />
                    );
                })}
            </StyledPaper>
        </Box>
    );
}

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    div {
        display: grid;
        grid-template-columns: 1.3fr 1fr 1fr 0.7fr;
        margin: 5px 0px;
    }
`;

const StrongTypo = styled(Typography)`
    font-weight: 600;
`;
