export interface StorageInterface {
  set: (key: string, value: object | string | undefined) => void;
  get: (key: string) => object | string;
  remove: (key: string) => void;
}
