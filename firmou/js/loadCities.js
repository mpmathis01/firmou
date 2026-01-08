import { esc } from './esc.js';

export async function loadCities(uf, targetId, selectedCity = null) {
    if (!uf || !targetId) return;
    try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const cities = await res.json();
        cities.sort((a, b) => a.nome.localeCompare(b.nome));
        const opts = cities.map(c => `<option value="${esc(c.nome)}"></option>`).join('');

        const list = document.getElementById(targetId + 'List');
        if (list) list.innerHTML = opts;

        if (selectedCity) {
            const el = document.getElementById(targetId);
            if (el) el.value = selectedCity;
        }
    } catch (e) { }
}

