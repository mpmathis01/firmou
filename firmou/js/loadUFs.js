export async function loadUFs() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const opts = '<option value="">UF</option>' + ufs.map(u => `<option value="${u}">${u}</option>`).join('');
    const myUf = document.getElementById('myUF');
    const clUf = document.getElementById('clUF');
    if (myUf && myUf.innerHTML === "") myUf.innerHTML = opts;
    if (clUf && clUf.innerHTML === "") clUf.innerHTML = opts;
}
