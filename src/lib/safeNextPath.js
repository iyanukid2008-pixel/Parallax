const APP_ORIGIN = 'https://parallax.invalid';

/** Return only same-origin path destinations; reject URL-parser slash/backslash tricks. */
export function safeNextPath(next) {
  if (
    typeof next !== 'string' ||
    !next.startsWith('/') ||
    next.startsWith('//') ||
    next.includes('\\')
  ) {
    return '/explore';
  }

  try {
    const destination = new URL(next, APP_ORIGIN);
    if (destination.origin !== APP_ORIGIN || destination.pathname === '/login') {
      return '/explore';
    }
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return '/explore';
  }
}
