import { state, setState, save } from './state.js';
import { renderAll } from './renderAll.js';

export function clearFakeData() {
    setState({
        ...state,
        items: [],
        cl: { name: '', doc: '', cep: '', addr: '' },
        pay: { pix: '', terms: '', notes: '', splits: [] }
    });
    document.getElementById('alert-fake').classList.add('hidden');
    renderAll();
    save();
}
