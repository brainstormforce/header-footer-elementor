import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Connections } from '@screens/Connections';
import { Onboarding } from '@screens/Onboarding';
import { Logs } from '@screens/Logs';

import { Notifications } from '@screens/Notifications';
import { Settings } from '@screens/Settings';
import Features from '@components/Widgets/Features';
import Templates from '@components/Templates/Templates';
import Dashboard from '@components/Dashboard/Dashboard';

const ContentArea = () => {
	return (
		<Routes>
			<Route path="/connections" element={<Connections />} />
			<Route path="/logs" element={<Logs />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/features" element={<Features />} />
			<Route path="/templates" element={<Templates />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/onboarding" element={<Onboarding />} />
			<Route path="/notifications" element={<Notifications />} />
			<Route path="/" element={<Dashboard />} />
			{/* Fallback for unknown routes */}
			<Route path="*" element={<div>404 - Page Not Found</div>} />
		</Routes>
	);
};

export default ContentArea;
