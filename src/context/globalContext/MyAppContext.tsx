import React from 'react';

interface IContext {
setSelectedBookID?: (value: string) => void;
selectedBookID: string;
}

export const GlobalAppContext = React.createContext<IContext>({
    selectedBookID: "",
});