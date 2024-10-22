import React, { createContext, useContext, useState } from 'react';

const WidgetContext = createContext();

export const WidgetProvider = ({ children }) => {
    const [allWidgetsData, setAllWidgetsData] = useState([]); //

    const updateWidgetState = (id, isActive) => {

        setAllWidgetsData(prevWidgets => 
            prevWidgets.map(widget => 
                widget.id === id ? { ...widget, is_active: isActive } : widget
            )
        );
    };

    return (
        <WidgetContext.Provider value={{ allWidgetsData, setAllWidgetsData, updateWidgetState }}>
            {children}
        </WidgetContext.Provider>
    );
};

export const useWidgetContext = () => {
    return useContext(WidgetContext);
};