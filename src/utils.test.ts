import { validateEmail, createUser } from './test';

describe('validateEmail', () => {
  test('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('should return false for invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});

describe('createUser', () => {
  test('should create a user with id, name, email', () => {
    const user = createUser('Test User', 'test@example.com');
    expect(user).toHaveProperty('id');
    expect(typeof user.id).toBe('number');
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
  });
});
