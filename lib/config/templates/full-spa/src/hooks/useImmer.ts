import { Draft, freeze, produce } from "immer";
import { useCallback, useState } from "react";

export type DraftFunction<T> = (draft: Draft<T>) => void;
export type Updater<T> = (arg: T | DraftFunction<T>) => void;
export type ImmerHook<T> = [T, Updater<T>];

export function useImmer<T = unknown>(
  initialState: T | (() => T)
): ImmerHook<T>;

export function useImmer<T>(initialState: T): ImmerHook<T> {
  const [state, setState] = useState(
    freeze(typeof initialState === "function" ? initialState() : initialState)
  );

  return [
    state,
    useCallback((updater: T | DraftFunction<T>) => {
      if (typeof updater === "function") {
        setState(produce(state, updater as DraftFunction<T>));
      } else {
        setState(freeze(updater as T));
      }
    }, [state]),
  ];
} 