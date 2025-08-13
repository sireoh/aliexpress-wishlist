import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

export type StorageArea = "sync" | "local";
type SetValue<T> = Dispatch<SetStateAction<T>>;

// Choose browser API if available, otherwise chrome API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storageAPI: any =
  typeof browser !== "undefined"
    ? browser
    : typeof chrome !== "undefined"
    ? {
        ...chrome,
        storage: {
          ...chrome.storage,
          get: (keys: string | string[]) =>
            new Promise<{ [key: string]: any }>((resolve) =>
              chrome.storage.local.get(keys, (result) => resolve(result))
            ),
          set: (items: object) =>
            new Promise<void>((resolve) =>
              chrome.storage.local.set(items, () => resolve())
            ),
        },
      }
    : {
        storage: {
          onChanged: { addListener: () => {}, removeListener: () => {} },
          local: {
            get: (keys: string | string[]) => Promise.resolve({}),
            set: () => Promise.resolve(),
          },
          sync: {
            get: (keys: string | string[]) => Promise.resolve({}),
            set: () => Promise.resolve(),
          },
        },
      };

export function useStorage<T>(
  key: string,
  initialValue: T,
  area: StorageArea = "local"
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const setValueRef = useRef<SetValue<T> | null>(null);

  useEffect(() => {
    readStorage<T>(key, area).then((res) => {
      if (res !== undefined) setStoredValue(res);
    });

    const listener = (
      changes: Record<string, { newValue?: T }>,
      namespace: string
    ) => {
      if (namespace === area && changes.hasOwnProperty(key)) {
        if (changes[key].newValue !== undefined) {
          setStoredValue(changes[key].newValue);
        }
      }
    };

    storageAPI.storage.onChanged.addListener(listener);
    return () => {
      storageAPI.storage.onChanged.removeListener(listener);
    };
  }, [key, area]);

  setValueRef.current = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value;

    setStoredValue((prevState) => {
      setStorage<T>(key, newValue, area).then((success) => {
        if (!success) setStoredValue(prevState);
      });
      return newValue;
    });
  };

  const setValue: SetValue<T> = useCallback(
    (value) => setValueRef.current?.(value),
    []
  );

  return [storedValue, setValue];
}

export async function readStorage<T>(
  key: string,
  area: StorageArea = "local"
): Promise<T | undefined> {
  try {
    const result = await storageAPI.storage[area].get(key);
    return result?.[key];
  } catch (error) {
    console.warn(`Error reading ${area} storage key "${key}":`, error);
    return undefined;
  }
}

export async function setStorage<T>(
  key: string,
  value: T,
  area: StorageArea = "local"
): Promise<boolean> {
  try {
    await storageAPI.storage[area].set({ [key]: value });
    return true;
  } catch (error) {
    console.warn(`Error setting ${area} storage key "${key}":`, error);
    return false;
  }
}
