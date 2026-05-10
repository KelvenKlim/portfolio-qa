/**
 * Mock for localStorage
 * Provides a clean localStorage implementation for tests
 */

import { vi } from 'vitest';

class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value.toString();
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

export const localStorageMock = new LocalStorageMock();

// Setup global localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

export default localStorageMock;
