import React, { createContext, useContext, useMemo, useState } from 'react';

export type SnackbarState = {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
};

export type SetSnackbar = React.Dispatch<React.SetStateAction<SnackbarState>>;

type SnackbarContextType = SnackbarState & {
    setSnackbar: SetSnackbar;
};

const SnackbarContext = createContext<SnackbarContextType>({
    message: '',
    severity: 'info',
    open: false,
    setSnackbar: () => {},
});

export function useSnackbar() {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return useContext(SnackbarContext);
}

export function SnackbarProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: '',
        severity: 'info',
        open: false,
    });

    const { message, severity, open } = snackbar;

    const contextData = useMemo(
        () => ({ message, severity, open, setSnackbar }),
        [message, severity, open, setSnackbar],
    );

    return (
        <SnackbarContext.Provider value={contextData}>
            {children}
        </SnackbarContext.Provider>
    );
}

export default SnackbarContext;
