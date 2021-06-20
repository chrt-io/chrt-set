import { uuid } from '~/helpers';

describe('Testing misc functions', () => {
  test('Test uuid returns a string', () => {
    expect(typeof uuid()).toBe('string');
  });
});
