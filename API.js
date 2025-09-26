const apiKey = "be2315b040c6b484d5b095cd"; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const deviseOrigine = document.getElementById("Devise_Origine");
const deviseSouhaitee = document.getElementById("Devise_Souhaitee");
async function chargerDevises() {
  try {
    const response = await fetch(apiUrl);    
    const data = await response.json();         
    if (data.result !== "success") {
      throw new Error("Erreur API : " + data["error-type"]);
    }
    const devises = Object.keys(data.conversion_rates);
    devises.forEach(devise => {
      let option1 = new Option(devise, devise);
      let option2 = new Option(devise, devise);
      deviseOrigine.add(option1);
      deviseSouhaitee.add(option2);
    });
    deviseOrigine.value = "USD";
    deviseSouhaitee.value = "EUR";
  } catch (error) {
    console.error("Impossible de charger les devises :", error);
  }
}
const api_Key = "be2315b040c6b484d5b095cd"; 
const devise_Origine = document.getElementById("Devise_Origine");
const devise_Souhaitee = document.getElementById("Devise_Souhaitee");
const montantInput = document.getElementById("Montant");
const montantConverti = document.getElementById("Montant_converti");
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault(); 
  const montant = parseFloat(montantInput.value);
  const origine = deviseOrigine.value;
  const cible = deviseSouhaitee.value;
  if (isNaN(montant) || !origine || !cible) {
    alert("Veuillez entrer un montant et choisir deux devises.");
    return;
  }
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${origine}`);
    const data = await response.json();
    if (data.result !== "success") {
      throw new Error("Erreur API : " + data["error-type"]);
    }
    const taux = data.conversion_rates[cible];
    const resultat = (montant * taux).toFixed(2);
    montantConverti.value = resultat;
  } catch (error) {
    console.error("Erreur de conversion :", error);
    alert("Impossible d'effectuer la conversion.");
  }
});
chargerDevises();
