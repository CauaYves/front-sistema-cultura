import React, { createContext, useMemo, useState, useContext } from 'react';
import { Contact } from '@/types';

export interface ContactsContextType {
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactsContext = createContext<ContactsContextType>({
    contacts: [],
    setContacts: () => {},
});

export function useContacts() {
    return useContext(ContactsContext);
}

export function ContactsProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const contextData = useMemo(
        () => ({ contacts, setContacts }),
        [contacts, setContacts],
    );

    return (
        <ContactsContext.Provider value={contextData}>
            {children}
        </ContactsContext.Provider>
    );
}

export default ContactsContext;
