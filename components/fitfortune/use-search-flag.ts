"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// useLayoutEffect warns when it runs during server rendering, but it is what
// keeps the corrected value from reaching the screen a frame late.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Reads a query-string flag on the client.
 *
 * A static export ships one HTML file per route with no query string attached,
 * so the prerendered markup always carries `initial`. Server builds pass the
 * real value straight through and this just confirms it.
 */
export function useSearchFlag(key: string, expected: string, initial: boolean) {
  const [value, setValue] = useState(initial);

  useIsomorphicLayoutEffect(() => {
    setValue(new URLSearchParams(window.location.search).get(key) === expected);
  }, [key, expected]);

  return value;
}
