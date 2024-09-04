import React from 'react';
import CompleteSetupBlock from '@SettingsApp/components/setup-page/CompleteSetupBlock';
import RecommendedPluginsBlock from '@SettingsApp/components/setup-page/RecommendedPluginsBlock';

function SetupPage() {
	return (
		<div className="wcf-setup-page-wrapper flex flex-col space-y-8">
			<CompleteSetupBlock />
			<RecommendedPluginsBlock />
		</div>
	);
}

export default SetupPage;
