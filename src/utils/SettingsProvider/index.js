import React, { createContext, useContext, useReducer } from 'react';

// Prepare a dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const SettingsProvider = ( { reducer, initialState, children } ) => (
	<StateContext.Provider value={ useReducer( reducer, initialState ) }>
		{ children }
	</StateContext.Provider>
);

// Get information from the data layer
export const useSettingsValue = () => useContext( StateContext );
