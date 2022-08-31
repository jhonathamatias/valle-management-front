

import { useCallback, useState } from 'react';
import storage from '../utils/storage';

type StorageValueType = string | object | undefined;
type StorageHookType = [StorageValueType, (value: string) => void, () => void];

export default function useStorage(key: string): StorageHookType {
  const [state, setState] = useState<StorageValueType>(() => storage.get(key));

  const set = useCallback((newValue: StorageValueType) => {
    storage.set(key, newValue);
    setState(newValue);
  }, [key]);

  const remove = useCallback(() => {
    storage.remove(key);
    setState(undefined);
  }, [key]);

  return [state, set, remove];
}