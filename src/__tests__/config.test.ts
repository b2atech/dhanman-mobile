import config from '../app/config';

describe('App Configuration', () => {
  it('should have valid configuration values', () => {
    expect(config.apiBaseUrl).toBeDefined();
    expect(config.apiTimeout).toBeGreaterThan(0);
    expect(config.appEnv).toBeDefined();
  });

  it('should use default values when environment variables are not set', () => {
    expect(config.apiBaseUrl).toContain('dhanman.com');
    expect(config.apiTimeout).toBe(10000);
  });
});
