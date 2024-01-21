export function truncate(str: string | undefined, { length = 25 } = {}) {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '…';
}
