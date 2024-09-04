import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Common nav menu */
import NavMenu from '@Admin/common/NavMenu';

/* Component */
import EditorRoute from '@Editor/EditorRoute';

function EditFlow() {
	return (
		<Router>
			<NavMenu />
			<div className="wcf-app-content-wrapper wcf-app-wrapper--editor-app p-8">
				<Switch>
					<Route path="/">
						<EditorRoute />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default EditFlow;
