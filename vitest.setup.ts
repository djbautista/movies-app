/// <reference types="vitest" />

import indexeddb from 'fake-indexeddb';
import '@testing-library/jest-dom/vitest';

globalThis.indexedDB = indexeddb;
