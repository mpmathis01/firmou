// Google Analytics 4
export const initGA = (measurementId) => {
    if (!measurementId) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', measurementId);
};

// PostHog
export const initPostHog = (apiKey, apiHost = 'https://app.posthog.com') => {
    if (!apiKey) return;

    import('posthog-js').then(({ default: posthog }) => {
        posthog.init(apiKey, {
            api_host: apiHost,
            autocapture: true, // Captura cliques e eventos automaticamente
            capture_pageview: true,
            persistence: 'localStorage'
        });
    });
};
