import { Component } from "@wordpress/element";
import { locationToRoute } from "./utils";
import { history, RouterContext } from "./context";
import { Route } from "./route";
import { Link } from "./link";
import { match } from "path-to-regexp";

class Router extends Component {
  constructor(props) {
    super(props);

    // Convert our routes into an array for easy 404 checking
    this.routes = Object.keys(props.routes).map(
      (key) => props.routes[key].path
    );

    // Listen for path changes from the history API
    this.unlisten = history.listen(this.handleRouteChange);

    const route = locationToRoute(history.location);
    const { search } = history.location;

    // Define the initial RouterContext value
    this.state = {
      route,
      defaultRoute: props?.defaultRoute
        ? `${search}#${props?.defaultRoute}`
        : `${search}#/`,
    };
  }

  componentWillUnmount() {
    // Stop listening for changes if the Router component unmounts
    this.unlisten();
  }

  handleRouteChange = (location) => {
    const route = locationToRoute(location?.location);
    this.setState({ route: route });
  };

  render() {
    // Define our variables
    const { children, NotFound } = this.props;
    const { route, defaultRoute } = this.state;

    if (!route.hash) {
      history.push(defaultRoute);
      return <div></div>;
    }

    let matched = false;
    // match route
    (this.routes || []).forEach((name) => {
      const checkMatch = match(route.hash.substr(1));
      const isMatched = checkMatch(`${route.hash.substr(1)}`);
      if (!isMatched) {
        return;
      }
      matched = {
        name,
        data: isMatched,
      };
    });

    const routerContextValue = { route, matched };

    // Check if 404 if no route matched
    const is404 = !matched;

    return (
      <RouterContext.Provider value={routerContextValue}>
        {is404 ? <div>Not found</div> : children}
      </RouterContext.Provider>
    );
  }
}
export { history, RouterContext, Router, Route, Link };
