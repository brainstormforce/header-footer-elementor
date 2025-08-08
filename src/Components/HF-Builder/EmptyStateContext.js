import React from 'react';

// Create context for empty state management
export const EmptyStateContext = React.createContext();

export const useEmptyState = () => {
	const context = React.useContext(EmptyStateContext);
	if (!context) {
		throw new Error('useEmptyState must be used within EmptyStateProvider');
	}
	return context;
};
