import { state } from './state.js';
import { upd } from './upd.js';
import { clearAddr } from './clearAddr.js';
import { loadCities } from './loadCities.js';
import { setLoading } from './setLoading.js';

export async function checkAPISearch(t) {
    const elId = t + 'Doc';
    const val = document.getElementById(elId).value.replace(/\D/g, "");
    if (val.length === 14) {
        clearAddr(t);
        if (document.getElementById(t + 'Name')) document.getElementById(t + 'Name').value = '';

        setLoading(elId, true);
        try {
            const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${val}`);
            const data = await res.json();
            if (data.razao_social) {
                document.getElementById(t + 'Name').value = data.razao_social;

                // Endereço
                if (document.getElementById(t + 'Street')) document.getElementById(t + 'Street').value = data.logradouro;
                if (document.getElementById(t + 'Num')) document.getElementById(t + 'Num').value = data.numero;
                if (document.getElementById(t + 'Neigh')) document.getElementById(t + 'Neigh').value = data.bairro;
                if (document.getElementById(t + 'Comp')) document.getElementById(t + 'Comp').value = data.complemento;
                if (document.getElementById(t + 'Cep')) document.getElementById(t + 'Cep').value = data.cep.replace(/(\d{5})(\d)/, "$1-$2");

                const selUF = document.getElementById(t + 'UF');
                if (selUF) {
                    selUF.value = data.uf;
                    await loadCities(data.uf, t + 'City', data.municipio);
                }

                state[t].name = data.razao_social;
                upd();
            }
        } catch (e) { } finally { setLoading(elId, false); }
    }
    upd();
}
