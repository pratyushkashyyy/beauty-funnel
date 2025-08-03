export interface BrowserFingerprint {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  colorDepth: number;
  pixelRatio: number;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  hash: string;
}

export function generateFingerprint(): BrowserFingerprint {
  if (typeof window === 'undefined') {
    return {
      userAgent: '',
      language: '',
      platform: '',
      screenResolution: '',
      timezone: '',
      colorDepth: 0,
      pixelRatio: 0,
      cookieEnabled: false,
      doNotTrack: null,
      hash: ''
    };
  }

  const fingerprint: BrowserFingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hash: ''
  };

  // Generate hash from fingerprint data
  const fingerprintString = JSON.stringify(fingerprint);
  fingerprint.hash = generateHash(fingerprintString);

  return fingerprint;
}

function generateHash(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}

export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Try to get existing session ID from localStorage
  let sessionId = localStorage.getItem('sessionId');
  
  if (!sessionId) {
    // Generate new session ID based on fingerprint
    const fingerprint = generateFingerprint();
    sessionId = `session_${fingerprint.hash}_${Date.now()}`;
    localStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
}

export function getDeviceInfo() {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      browser: 'unknown',
      os: 'unknown'
    };
  }

  const userAgent = navigator.userAgent.toLowerCase();
  
  // Detect device type
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
  const isTablet = /tablet|ipad/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  // Detect browser
  let browser = 'unknown';
  if (userAgent.includes('chrome')) browser = 'chrome';
  else if (userAgent.includes('firefox')) browser = 'firefox';
  else if (userAgent.includes('safari')) browser = 'safari';
  else if (userAgent.includes('edge')) browser = 'edge';
  else if (userAgent.includes('opera')) browser = 'opera';

  // Detect OS
  let os = 'unknown';
  if (userAgent.includes('windows')) os = 'windows';
  else if (userAgent.includes('mac')) os = 'mac';
  else if (userAgent.includes('linux')) os = 'linux';
  else if (userAgent.includes('android')) os = 'android';
  else if (userAgent.includes('ios')) os = 'ios';

  return {
    isMobile,
    isTablet,
    isDesktop,
    browser,
    os
  };
} 