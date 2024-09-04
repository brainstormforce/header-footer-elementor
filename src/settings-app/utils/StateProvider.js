import React, { createContext, useContext, useReducer } from 'react';

// Prepare a dataLayer
export const StateContextn = createContext();

// Wrap our app and provide the Data layer
export const SettingsStateProvider = ( {
	reducer,
	initialState,
	children,
} ) => (
	<StateContextn.Provider value={ useReducer( reducer, initialState ) }>
		{ children }
	</StateContextn.Provider>
);

// Get information from the data layer
export const useSettingsStateValue = () => useContext( StateContextn );
