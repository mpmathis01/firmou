import { clearAddr } from './clearAddr.js';
import { fetchCep } from './fetchCep.js';

export function maskCep(el) {
    el.value = el.value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
    if (el.value.length === 9) {
        const t = el.id.startsWith('my') ? 'my' : 'cl';
        clearAddr(t);
        fetchCep(el.value, t);
    }
}
