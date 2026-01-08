export function resetData() {
    if (confirm('Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('firmou_store');
        location.reload();
    }
}
