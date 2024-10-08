import { ModulesKey } from '@/app/home/types';
import { SubModule } from '@/components/atoms';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Business from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import FolderIcon from '@mui/icons-material/Folder';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalAtm from '@mui/icons-material/LocalAtm';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import People from '@mui/icons-material/People';
import StraightenIcon from '@mui/icons-material/Straighten';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));
const Icolors = {
    color: '#0084f0',
};
const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

interface CustomizedAccordionsProps {
    open: boolean;
    selectedModule: string;
    setSelectedModule: React.Dispatch<React.SetStateAction<ModulesKey>>;
}

export default function SidebarModules({
    open,
    selectedModule,
    setSelectedModule,
}: Readonly<CustomizedAccordionsProps>) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const AccordionDetails = styled(MuiAccordionDetails)(() => ({
        padding: 0,
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        marginLeft: `${open ? '40px' : '13px'}`,
    }));
    const handleChange =
        (panel: string) =>
        (_event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    {open ? (
                        <>
                            <AccountCircleRoundedIcon
                                sx={{
                                    mr: '10px',
                                    ...Icolors,
                                }}
                            />
                            <Typography>Meus Dados</Typography>
                        </>
                    ) : (
                        <AccountCircleRoundedIcon sx={Icolors} />
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <SubModule
                        tag="Identificação"
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        name="identification"
                    >
                        <FingerprintRoundedIcon sx={Icolors} />
                    </SubModule>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Coletivo cultural"
                        name="culturalColective"
                    >
                        <Business sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    {open ? (
                        <>
                            <FolderIcon
                                sx={{
                                    mr: '10px',
                                    ...Icolors,
                                }}
                            />
                            <Typography>Editais</Typography>
                        </>
                    ) : (
                        <FolderIcon sx={Icolors} />
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Inscrições Abertas"
                        name="notices"
                    >
                        <AssignmentIcon sx={Icolors} />
                    </SubModule>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Meus Projetos"
                        name="myProjects"
                    >
                        <FolderCopyIcon sx={Icolors} />
                    </SubModule>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Inscrições Encerradas"
                        name="noticesClosed"
                    >
                        <EventBusyIcon sx={Icolors} />
                    </SubModule>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Contrapartida"
                        name="billings"
                    >
                        <LocalAtm sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel5'}
                onChange={handleChange('panel5')}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    {open ? (
                        <>
                            <AssessmentIcon
                                sx={{
                                    mr: '10px',
                                    color: '#0084f0',
                                }}
                            />
                            <Typography>Informações e Indicadores</Typography>
                        </>
                    ) : (
                        <AssessmentIcon
                            sx={{
                                color: '#0084f0',
                            }}
                        />
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Legislação PMC"
                        name="legislation"
                    >
                        <LibraryBooksIcon sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
                <AccordionDetails>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Conselho Municipal"
                        name="advice"
                    >
                        <AccountBalanceIcon sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
                <AccordionDetails>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Metômetro PMC"
                        name="metometer"
                    >
                        <StraightenIcon sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
                <AccordionDetails>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Unidades Culturais"
                        name="cultUnitys"
                    >
                        <LocalLibraryIcon sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
                <AccordionDetails>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Calendário Cultural"
                        name="cultCalendar"
                    >
                        <CalendarMonthIcon sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    {open ? (
                        <>
                            <People
                                sx={{
                                    mr: '10px',
                                    ...Icolors,
                                }}
                            />{' '}
                            <Typography>Edital de chamada</Typography>
                        </>
                    ) : (
                        <People sx={Icolors} />
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <SubModule
                        selectedModule={selectedModule}
                        setSelectedModule={setSelectedModule}
                        tag="Fila"
                        name="queue"
                    >
                        <People sx={Icolors} />
                    </SubModule>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
