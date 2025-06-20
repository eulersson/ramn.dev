export function isMacOSChromium(): boolean {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent;

  const isMacOS = /Mac/.test(window.navigator.platform);
  const isChromium =
    /Chrome/.test(userAgent) ||
    /Chromium/.test(userAgent) ||
    /Edge/.test(userAgent);

  return isMacOS && isChromium;
}
export function isSafari(): boolean {
  if (typeof window === "undefined") return false;

  const vendor = window.navigator.vendor;
  const userAgent = window.navigator.userAgent;

  return !!(
    /^((?!chrome|android).)*safari/i.test(userAgent) ||
    // For iOS Safari (on iPhones/iPads, where userAgent includes "Safari" but not "Chrome")
    (vendor &&
      vendor.includes("Apple") &&
      !userAgent.includes("CriOS") &&
      !userAgent.includes("FxiOS"))
  );
}
