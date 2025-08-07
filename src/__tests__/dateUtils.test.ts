import { formatDate, formatTime, formatDisplayDate } from '../utils/dateUtils';

describe('Date Utils', () => {
  const testDate = '2024-01-15T14:30:00.000Z';

  it('should format date to YYYY-MM-DD format', () => {
    const result = formatDate(testDate);
    expect(result).toBe('2024-01-15');
  });

  it('should format time to 12-hour format with AM/PM', () => {
    const result = formatTime(testDate);
    expect(result).toMatch(/\d{2}:\d{2} [AP]M/);
  });

  it('should format display date to DD MMM YYYY format', () => {
    const result = formatDisplayDate(testDate);
    expect(result).toBe('15 Jan 2024');
  });

  it('should handle Date objects', () => {
    const dateObj = new Date(testDate);
    const result = formatDate(dateObj);
    expect(result).toBe('2024-01-15');
  });
});
