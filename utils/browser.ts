export function isMacOSChromium(): boolean {
  if (typeof window === 'undefined') return false;

  const isMacOS = /Mac/.test(window.navigator.platform);
  const isChromium = /Chrome/.test(window.navigator.userAgent) ||
    /Chromium/.test(window.navigator.userAgent) ||
    /Edge/.test(window.navigator.userAgent);

  return isMacOS && isChromium;
}
