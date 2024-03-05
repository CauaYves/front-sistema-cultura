import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import People from "@mui/icons-material/People";
import AttachMoney from "@mui/icons-material/AttachMoney";
import TrendingUp from "@mui/icons-material/TrendingUp";
import ListAlt from "@mui/icons-material/ListAlt";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ContactPhone from "@mui/icons-material/ContactPhone";
import ContactMail from "@mui/icons-material/ContactMail";
import Business from "@mui/icons-material/Business";
import Link from "@mui/icons-material/Link";
import Description from "@mui/icons-material/Description";
import LockOpen from "@mui/icons-material/LockOpen";
import LocalAtm from "@mui/icons-material/LocalAtm";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { SubModule } from "@/components/atoms";
import { ModulesKey } from "@/app/home/page";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
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
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: 0,
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    marginLeft: `${open ? "40px" : "13px"}`,
  }));
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {open ? (
            <>
              <AccountCircleRoundedIcon
                sx={{
                  mr: "10px",
                  color: "#999",
                }}
              />{" "}
              <Typography>Meus Dados</Typography>
            </>
          ) : (
            <AccountCircleRoundedIcon
              sx={{
                color: "#999",
              }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <SubModule
            tag="Identificação"
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            name="identification"
          >
            <FingerprintRoundedIcon />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Localização"
            name="location"
          >
            <LocationOnRoundedIcon />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Contatos"
            name="contacts"
          >
            <ContactPhone />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Dados profissio..."
            name="professionalData"
          >
            <ContactMail />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Coletivo cultural"
            name="culturalColective"
          >
            <Business />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Imagens e links"
            name="imagesAndLinks"
          >
            <Link />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Documentos"
            name="documents"
          >
            <Description />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Autorizados"
            name="authorizedUsers"
          >
            <LockOpen />
          </SubModule>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {open ? (
            <>
              <FolderIcon
                sx={{
                  mr: "10px",
                  color: "#999",
                }}
              />
              <Typography>Meus projetos</Typography>
            </>
          ) : (
            <FolderIcon
              sx={{
                color: "#999",
              }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Editais"
            name="notices"
          >
            <ListAlt />
          </SubModule>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Prestação de co..."
            name="billings"
          >
            <LocalAtm />
          </SubModule>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {open ? (
            <>
              <TrendingUp
                sx={{
                  mr: "10px",
                  color: "#999",
                }}
              />
              <Typography>Incentivar Projeto</Typography>
            </>
          ) : (
            <TrendingUp
              sx={{
                color: "#999",
              }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Já Incentivados"
            name="alreadyIncentived"
          >
            <AttachMoney />
          </SubModule>

          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Buscar Projeto"
            name="searchProject"
          >
            <SearchIcon />
          </SubModule>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {open ? (
            <>
              <People
                sx={{
                  mr: "10px",
                  color: "#999",
                }}
              />{" "}
              <Typography>Edital de chamada</Typography>
            </>
          ) : (
            <People
              sx={{
                color: "#999",
              }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <SubModule
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            tag="Fila"
            name="queue"
          >
            <People />
          </SubModule>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
