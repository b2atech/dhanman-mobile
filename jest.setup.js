/* eslint-env jest */

// Mock react-native-config for testing
jest.mock('react-native-config', () => ({
  API_BASE_URL: 'https://qa.common.dhanman.com/api/',
  SALES_API_BASE_URL: 'https://qa.sales.dhanman.com/api/',
  PURCHASE_API_BASE_URL: 'https://qa.purchase.dhanman.com/api/',
  MYHOME_API_BASE_URL: 'https://qa.myhome.dhanman.com/api/',
  SENTRY_DSN: 'test-sentry-dsn',
  APP_ENV: 'test',
  DEBUG_MODE: 'true',
  API_TIMEOUT: '10000',
  ENABLE_LOGGING: 'true',
  ENABLE_CRASH_REPORTING: 'false',
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock Sentry
jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  addBreadcrumb: jest.fn(),
}));
