import { useCallback, useState } from "react";

/**
 * useForceUpdate
 * Returns a callback that, when called, forces the component to re-render.
 * Implementation uses a state counter that increments.
 */
export default function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((t) => t + 1);
  }, []);
  return update;
}
