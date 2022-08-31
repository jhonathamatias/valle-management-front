import { Cookies } from 'react-cookie';
import { StorageInterface } from "../interfaces/storage.interface";

const storage: StorageInterface = {} as StorageInterface;

const cookies = new Cookies;
const prefix = '@valle-app';
// Safari in incognito has local storage, but size 0
// This system falls back to cookies in that situation
try {
  if (!window.localStorage) {
    throw Error('no local storage');
  }

  // Setup simple local storage wrapper
  storage.set = (key, value) => {
    if (typeof value === 'object') {
      return localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value))
    }

    if (typeof value === 'string') {
      return localStorage.setItem(`${prefix}:${key}`, value);
    }

    throw Error(`value must be of type object or string, ${typeof value} passed`);
  };

  storage.get = (key) => {
    const item = localStorage.getItem(`${prefix}:${key}`);
    
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    return null;
  };

  storage.remove = key => localStorage.removeItem(`${prefix}:${key}`);
} catch (e) {
  storage.set = cookies.set;
  storage.get = cookies.get;
  storage.remove = cookies.remove;
}

export default storage;