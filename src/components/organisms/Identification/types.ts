import { ModulesKey } from '@/app/home/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';

export type IdentificationModulesKey = 'PF' | 'PJ' | 'MEI' | 'PJSFL';

export interface IdentificationProps {
    router: AppRouterInstance;
    setSelectedModule: Dispatch<SetStateAction<ModulesKey>>;
}

export interface ButtonsContainerCompProps {
    setSelectedModule: Dispatch<SetStateAction<ModulesKey>>;
    loading: boolean;
}

export interface ProponentFormProps {
    handleChange: () => void;
    proponent: string;
}
