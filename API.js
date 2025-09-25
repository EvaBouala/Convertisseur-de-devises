// ===== Configuration API =====
const API_KEY = "be2315b040c6b484d5b095cd";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

// ===== Sélection des éléments HTML =====
const montantInput = document.getElementById("Montant");
const deviseOrigine = document.getElementById("Devise_Origine");
const deviseSouhaitee = document.getElementById("Devise_Souhaitee");
const montantConverti = document.getElementById("Montant_converti");
const form = document.querySelector("form");

// ===== Fonction pour convertir =====
async function convertirDevise() {
  const montant = parseFloat(montantInput.value);
  const fromCurrency = deviseOrigine.value.toUpperCase();
  const toCurrency = deviseSouhaitee.value.toUpperCase();

  if (isNaN(montant) || !fromCurrency || !toCurrency) {
    montantConverti.value = "Erreur";
    return;
  }

  try {
    // On récupère les taux de la devise d'origine
    const response = await fetch(`${API_URL}${fromCurrency}`);
    const data = await response.json();

    if (data.result !== "success") {
      montantConverti.value = "Erreur API";
      return;
    }

    // Récupération du taux de la devise souhaitée
    const rate = data.conversion_rates[toCurrency];
    if (!rate) {
      montantConverti.value = "Devise inconnue";
      return;
    }

    // Calcul
    const resultat = montant * rate;
    montantConverti.value = `${resultat.toFixed(2)} ${toCurrency}`;

  } catch (error) {
    console.error("Erreur API :", error);
    montantConverti.value = "Erreur réseau";
  }
}

// ===== Gestion du formulaire =====
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page
  convertirDevise();
});
