// Ta clé API
const apiKey = "be2315b040c6b484d5b095cd"; 

// URL de base (USD comme référence)
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// Sélecteurs des menus déroulants
const deviseOrigine = document.getElementById("Devise_Origine");
const deviseSouhaitee = document.getElementById("Devise_Souhaitee");

// Charger les devises depuis l’API
async function chargerDevises() {
  try {
    const response = await fetch(apiUrl);        // appel API
    const data = await response.json();          // conversion JSON
    
    if (data.result !== "success") {
      throw new Error("Erreur API : " + data["error-type"]);
    }

    // Récupérer toutes les devises disponibles
    const devises = Object.keys(data.conversion_rates);

    // Ajouter chaque devise comme <option> dans les deux menus
    devises.forEach(devise => {
      let option1 = new Option(devise, devise);
      let option2 = new Option(devise, devise);
      deviseOrigine.add(option1);
      deviseSouhaitee.add(option2);
    });

    // Valeurs par défaut
    deviseOrigine.value = "USD";
    deviseSouhaitee.value = "EUR";

  } catch (error) {
    console.error("Impossible de charger les devises :", error);
  }
}
// Ta clé API
const api_Key = "be2315b040c6b484d5b095cd"; 

// Sélecteurs HTML
const devise_Origine = document.getElementById("Devise_Origine");
const devise_Souhaitee = document.getElementById("Devise_Souhaitee");
const montantInput = document.getElementById("Montant");
const montantConverti = document.getElementById("Montant_converti");
const form = document.querySelector("form");

// Gestion du submit (conversion)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // empêche le rechargement de la page

  const montant = parseFloat(montantInput.value);
  const origine = deviseOrigine.value;
  const cible = deviseSouhaitee.value;

  if (isNaN(montant) || !origine || !cible) {
    alert("Veuillez entrer un montant et choisir deux devises.");
    return;
  }

  try {
    // Appel API pour récupérer les taux à partir de la devise d’origine
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${origine}`);
    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("Erreur API : " + data["error-type"]);
    }

    // Récupérer le taux et calculer
    const taux = data.conversion_rates[cible];
    const resultat = (montant * taux).toFixed(2);

    // Afficher dans le champ "Montant Converti"
    montantConverti.value = resultat;

  } catch (error) {
    console.error("Erreur de conversion :", error);
    alert("Impossible d'effectuer la conversion.");
  }
});


// Appeler la fonction au chargement
chargerDevises();
