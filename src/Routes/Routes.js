import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Connections } from '@screens/Connections/index.js';
import { Onboarding } from '@screens/Onboarding/index.js';
import { Logs } from '@screens/Logs/index.js';
import { Dashboard } from '@screens/Dashboard/index.js';
import { Notifications } from '@screens/Notifications';
import { Settings } from '@screens/Settings/index.js';

const ContentArea = () => {
	return (
		<div>
			<Routes>
				<Route path="/connections" element={<Connections />} />
				<Route path="/logs" element={<Logs />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/onboarding" element={<Onboarding />} />
				<Route path="/notifications" element={<Notifications />} />
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</div>
	);
};

export default ContentArea;
