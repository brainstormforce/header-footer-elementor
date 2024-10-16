const { useContext } = wp.element;
import { RouterContext, history } from "./context";
import classNames from "classnames";
import { match } from "path-to-regexp";

export function Link(props) {
  const { to, onClick, children, activeClassName } = props;
  const { route } = useContext(RouterContext);

  let state = { ...props };
  delete state.activeClassName;

  const isActive = () => {
    const checkMatch = match(`${to}`);
    return checkMatch(`${route.hash.substr(1)}`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Dont' navigate if current path
    if (route.path === to) {
      return;
    }
    // Trigger onClick prop manually
    if (onClick) {
      onClick(e);
    }
    const { search } = history.location;

    // Use history API to navigate page
    history.push(`${search}#${to}`);
  };

  return (
    <a
      {...state}
      className={classNames({ [activeClassName]: isActive() }, props.className)}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
