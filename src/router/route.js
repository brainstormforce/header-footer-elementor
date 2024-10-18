import { RouterContext } from "./context";
const { useContext } = wp.element;
import { match } from "path-to-regexp";
let prev = "";

export function Route({ path, onRoute, children }) {
  // Extract route from RouterContext
  const { route } = useContext(RouterContext);

  const checkMatch = match(`${path}`);
  const matched = checkMatch(`${route.hash.substr(1)}`);

  if (!matched) {
    return null;
  }

  if (onRoute) {
    if (prev !== matched.path) {
      onRoute();
    }
    prev = matched.path;
  }

  return <div>{wp.element.cloneElement(children, { route: matched })}</div>;
}
