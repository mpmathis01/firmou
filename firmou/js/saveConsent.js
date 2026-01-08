export function saveConsent(v) {
    localStorage.setItem('firmou_consent', v ? 'yes' : 'no');
    document.getElementById('cookie-bar').classList.add('hidden');
}
