import React, { createContext, useContext, useMemo, useState } from 'react';

export type UserDataType = {
    cpf: string;
    email: string;
    name: string;
};

type UserContextType = {
    userData: UserDataType;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserData() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
}

export function UserDataProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [userData, setUserData] = useState<UserDataType>({
        cpf: '',
        email: '',
        name: '',
    });

    const contextValue = useMemo(
        () => ({ userData, setUserData }),
        [userData, setUserData],
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
