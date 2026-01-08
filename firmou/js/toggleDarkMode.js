import { state, save } from './state.js';

export function toggleDarkMode() {
    state.cfg.dark = !state.cfg.dark;
    document.documentElement.classList.toggle('dark');
    save();
}
