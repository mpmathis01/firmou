export function checkCookieBar() {
    if (!localStorage.getItem('firmou_consent')) document.getElementById('cookie-bar').classList.remove('hidden');
}
