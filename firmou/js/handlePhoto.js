import { state, save } from './state.js';
import { renderPreview } from './renderPreview.js';

export function handlePhoto(e, idx) {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
        state.photos[idx].src = ev.target.result;
        state.photos[idx].caption = document.getElementById(`photo-cap-${idx}`).value;
        document.getElementById(`photo-prev-${idx}`).src = ev.target.result;
        document.getElementById(`photo-prev-${idx}`).classList.remove('hidden');
        document.getElementById(`photo-icon-${idx}`).classList.add('hidden');
        save();
        renderPreview();
    };
    r.readAsDataURL(f);
}
