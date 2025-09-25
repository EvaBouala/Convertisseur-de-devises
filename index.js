
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

function json_export_history(filename = "historique.json") {
    let historique_recup = document.getElementById('historyList');
    if (historique_recup.children.length === 0) {
        throw new Error("L'historique est vide, rien à exporter.");
    }else{
        let historyTableau = [];
        historyTableau.push(historique_recup.children);
        const json = JSON.stringify(historyTableau, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}


function convert() {

}