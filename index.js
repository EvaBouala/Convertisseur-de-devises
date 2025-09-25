
function save() {
    let montant = document.getElementById('Montant_convertI').value;
    let historique = document.getElementById('historyList');
    let entry = document.createElement('div');
    entry.textContent = "Montant converti : " + montant;
    historique.appendChild(entry);
}

function clear_historique() {
    let historique_recup = document.getElementById('historyList');
    historique_recup.innerHTML = '';
}

function json_export() {

}