import { useTheme } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';
import { ModulesKey } from '@/app/home/types';

interface SubModuleProps {
    children: ReactNode;
    tag: string;
    selectedModule: string;
    setSelectedModule: React.Dispatch<React.SetStateAction<ModulesKey>>;
    name: ModulesKey;
}

function SubModule({
    children,
    tag,
    selectedModule,
    setSelectedModule,
    name,
}: Readonly<SubModuleProps>) {
    const theme = useTheme();
    const backgroundColor =
        selectedModule === name ? theme.palette.success.light : 'inherit';

    return (
        <ListItemButton
            sx={{
                borderLeft: `5px solid ${backgroundColor}`,
                '&:hover': {
                    background: 'none',
                },
            }}
            onClick={() => {
                setSelectedModule(name);
            }}
        >
            <ListItemIcon
                sx={{
                    minWidth: '40px',
                }}
            >
                {children}
            </ListItemIcon>
            <ListItemText primary={tag} />
        </ListItemButton>
    );
}

export { SubModule };
