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

// Appeler la fonction au chargement
chargerDevises();
