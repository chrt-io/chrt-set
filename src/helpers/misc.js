export function isNull(value) {
  return value === null || value == null || typeof value === 'undefined';
}
export function uuid() {
  return (
    'c' +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
