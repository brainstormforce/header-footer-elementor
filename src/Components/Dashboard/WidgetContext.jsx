import React, { createContext, useContext, useState } from 'react';

// Create a context for widgets
const WidgetContext = createContext([]);

// Export a hook for accessing the widget context
export const useWidgetContext = () => {
    return useContext(WidgetContext);
};

// Create a provider component
export const WidgetProvider = ({ children }) => {
    const [allWidgetsData, setAllWidgetsData] = useState([]);

    return (
        <WidgetContext.Provider value={[allWidgetsData, setAllWidgetsData]}>
            {children}
        </WidgetContext.Provider>
    );
};
