let isSubscribed = false;
let swRegistration = null;
const applicationServerPublicKey =
    'BCzYr8APw3wUCSj-CoyCV1hlc4s4Ge-AgyNFisUwI86UAaHrqdjBMt1rNauYRkwaznGYC2Zrq290lv4_gwfdibk';


window.hypertiesStarted = 0;
window.hypertiesLoaded= 0;
window.componentsLoaded= 0;

window.loadedComponent = function () {
    window.componentsLoaded++;
    console.log('Loaded component');

}
window.hypertyWasStarted = function () {
    window.hypertiesStarted++;
    console.log('Started: ' + window.hypertiesStarted);
}
window.hypertyWasLoaded = function () {
    window.hypertiesLoaded++;
    console.log('Loaded: ' + window.hypertiesLoaded);
}


window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.installPromptEvent = event;
    // Show the modal add to home screen dialog
    window.installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    window.installPromptEvent.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        // Clear the saved prompt since it can't be used again
        window.installPromptEvent = null;
    });
});

window.addEventListener('appinstalled', (evt) => {
    // app.logEvent('a2hs', 'installed');
    console.log('app installed');
    window.installed = true;
    
});

if ('serviceWorker' in navigator && 'PushManager' in window) {

    window.addEventListener('load', function () {
        
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            swRegistration = registration;
            // subscribeUser();
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
            console.log(err)
        });
        
    });
} else {
    console.log('service worker is not supported');
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function updateSubscriptionOnServer(subscription) {
    console.log(subscription);

    if (subscription) {
        // subscriptionJson.textContent = JSON.stringify(subscription);
        // subscriptionDetails.classList.remove('is-invisible');
    } else {
        // subscriptionDetails.classList.add('is-invisible');
    }
}

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log('User is subscribed.');

            updateSubscriptionOnServer(subscription);

            isSubscribed = true;
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
        });
}