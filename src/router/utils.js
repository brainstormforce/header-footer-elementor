import qs from "querystringify";
export function locationToRoute(location) {
  // location comes from the history package
  return {
    path: location.pathname,
    hash: location.hash,
    query: qs.parse(location.search),
  };
}
