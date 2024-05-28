import React, { createContext, useMemo, useState, useContext } from 'react';
import { Collective } from '@/types';

export interface CollectiveContextType {
    collective: Collective[];
    setCollective: React.Dispatch<React.SetStateAction<Collective[]>>;
}

const CollectiveContext = createContext<CollectiveContextType>({
    collective: [],
    setCollective: () => {},
});

export function useCollective() {
    return useContext(CollectiveContext);
}

export function CollectiveProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [collective, setCollective] = useState<Collective[]>([]);

    const contextData = useMemo(
        () => ({ collective, setCollective }),
        [collective, setCollective],
    );

    return (
        <CollectiveContext.Provider value={contextData}>
            {children}
        </CollectiveContext.Provider>
    );
}

export default CollectiveContext;
