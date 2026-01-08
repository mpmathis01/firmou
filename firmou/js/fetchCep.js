import { upd } from './upd.js';
import { loadCities } from './loadCities.js';
import { setLoading } from './setLoading.js';

export async function fetchCep(cep, t) {
    const elId = t === 'my' ? 'myCep' : 'clCep';
    setLoading(elId, true);
    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
        const data = await res.json();
        if (!data.erro) {
            // Preencher campos
            if (document.getElementById(t + 'Street')) document.getElementById(t + 'Street').value = data.logradouro;
            if (document.getElementById(t + 'Neigh')) document.getElementById(t + 'Neigh').value = data.bairro;
            if (document.getElementById(t + 'Comp')) document.getElementById(t + 'Comp').value = data.complemento;

            // Setar UF
            const selUF = document.getElementById(t + 'UF');
            if (selUF) {
                selUF.value = data.uf;
                // Carregar cidades e setar ciade
                await loadCities(data.uf, t + 'City', data.localidade);
            }

            upd();
        } else {
            alert("CEP não encontrado!");
        }
    } catch (e) { } finally { setLoading(elId, false); }
}
