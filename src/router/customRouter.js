import { Router, Route, Link } from './index';
import Dashboard from '@components/Dashboard/Dashboard';
import Features from '@components/Widgets/Features';
import Templates from '@components/Templates/Templates';
import Settings from '@components/Settings/Settings';
import { routes } from 'admin/settings/routes';

const CustomRouter = () => (
  <Router routes={routes} defaultRoute={routes.dashboard.path}>
    <Route path={routes.dashboard.path}><Dashboard /></Route>
    <Route path={routes.widgets.path}><Features /></Route>
    <Route path={routes.templates.path}><Templates /></Route>
    <Route path={routes.settings.path}><Settings /></Route>
  </Router>
);

export default CustomRouter;