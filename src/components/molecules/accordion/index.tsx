import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

type AccordionItem = {
    title: string;
    description: string;
};

function Acordion({ items }: { items: AccordionItem[] }) {
    return (
        <StyledBox>
            {items.map((item, index) => {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            {item.title}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2">
                                {item.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </StyledBox>
    );
}

const StyledBox = styled(Box)(({ theme }) => ({
    margin: `${theme.spacing(2)} 0px`,
}));

export { Acordion };
