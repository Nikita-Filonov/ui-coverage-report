import '@testing-library/jest-dom/vitest';
import { deserialize, serialize } from 'node:v8';

if (!globalThis.structuredClone) {
  globalThis.structuredClone = <T>(value: T): T => deserialize(serialize(value));
}
