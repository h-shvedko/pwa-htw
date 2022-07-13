// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('Service worker registration succeeded:', registration);
            console.log('Scope ist ' + registration.scope);
        }).catch((error) => {
            console.log('Service worker registration failed:', error);
        });

        if (navigator.serviceWorker.controller) {
            console.log('This page is currently controlled by:', navigator.serviceWorker.controller);
        }

        navigator.serviceWorker.oncontrollerchange = function () {
            console.log('This page is now controlled by:', navigator.serviceWorker.controller);
        };
    });
} else {
    console.log('Service workers are not supported.');
}
