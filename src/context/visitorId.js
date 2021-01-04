import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const fingerprintjs = async () => {
    // We recommend to call `load` at application startup.
    const fp = await FingerprintJS.load();

    // The FingerprintJS agent is ready.
    // Get a visitor identifier when you'd like to.
    const result = await fp.get();
    return result.visitorId
}