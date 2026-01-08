import { state } from './state.js';
import { PixPayload } from './PixPayload.js';

export function genQR(total) {
    if (!state.pay.pix) return;
    const myCity = state.my.addr ? state.my.addr.split('-').pop().split('/')[0].trim() : 'FIRMOU';

    // 1. SPLITS
    if (state.pay.splits) {
        state.pay.splits.forEach((s, idx) => {
            const el = document.getElementById(`pix-qr-split-${idx}`);
            const txtEl = document.getElementById(`pix-copypaste-split-${idx}`);
            if (el && s.m === 'PIX' && s.q) {
                el.innerHTML = '';
                const val = total * (s.p / 100);
                const pp = new PixPayload(state.pay.pix, state.my.name, myCity, val, state.doc.num + '-P' + (idx + 1));
                const code = pp.generate();
                const qr = qrcode(0, 'L');
                qr.addData(code);
                qr.make();
                el.innerHTML = qr.createImgTag(3, 0);
                if (el.querySelector('img')) el.querySelector('img').className = "w-full h-full";
                if (txtEl) txtEl.innerText = code;
            }
        });
    }

    // 2. MAIN
    const elP = document.getElementById('pix-qr');
    const txtP = document.getElementById('pix-copypaste-main');
    if (elP) {
        elP.innerHTML = '';
        const pp = new PixPayload(state.pay.pix, state.my.name, myCity, total, state.doc.num);
        const code = pp.generate();
        const qr = qrcode(0, 'L');
        qr.addData(code);
        qr.make();
        elP.innerHTML = qr.createImgTag(3, 0);
        if (elP.querySelector('img')) elP.querySelector('img').className = "w-full h-full";
        if (txtP) txtP.innerText = code;
    }
}
