import { STORAGE_APP_KEY } from "../constants/service";

export default class AuthStorage {
    protected storageTokenKey: string;

    constructor() {
        this.storageTokenKey = `${STORAGE_APP_KEY}:token`;
    }
    /**
     * Get token key at localStorage
     * 
     * @returns string token
     */
    getStorageTokenKey(): string {
        return this.storageTokenKey;
    }

    getToken(): string | null {
        return localStorage.getItem(this.storageTokenKey);
    }

    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    authenticate(token: string): void {
        localStorage.setItem(this.storageTokenKey, token);
    }

    forbid(): void {
        localStorage.removeItem(this.storageTokenKey);
    }
}