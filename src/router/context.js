import { createBrowserHistory } from "history";
import { locationToRoute } from "./utils";

export const history = createBrowserHistory();
export const RouterContext = wp.element.createContext({
  route: locationToRoute(history.location),
});
