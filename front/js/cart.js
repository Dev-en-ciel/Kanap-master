// Récuperer les données du  Localstorage
let products = JSON.parse(localStorage.getItem("products"));
    // console.log('produit stocké dans le storage', products);

// Fonction qui récupère les données de l'api pour les élements manquants
// et qui ajoute les élements au dom
function displayItem() {
  // Si le panier est vide : afficher 'le panier est vide'
  if (localStorage === null || localStorage.length === 0) {
    document.querySelector("#cart__items").innerHTML = `
    <p>Votre panier est vide !</p>`;
    console.log("je suis vide");
  } else {

  products.forEach(product => {
    productInApi = product;
    // console.log('produits du storage', productInApi);

  const apiUrl = 'http://localhost:3000/api/products/';
  fetch(apiUrl + productInApi.id)
    .then(res => res.json())
    .then(productApi => {
    // console.log('données de  l api', productApi);

    // Enplacemment des elements injectés  dans le dom
    let displayProduct = document.querySelector("#cart__items");
    // console.log(displayProduct);

        // Afficher les details du produit du panier
        // Creation et insertion de la balise "article"
        let article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.className = "cart__item";
        article.setAttribute("data-id", product.id);
        // console.log(productInApi.id);

        //Creation et insertion de "div" pour l'image du produit
        let divImg = document.createElement("div");
        article.appendChild(divImg);
        divImg.className = "cart__item__img";

        //Creation et Insertion de l'image
        let img = document.createElement("img");
        divImg.appendChild(img);
        img.src = productApi.imageUrl;
        img.alt = productApi.imageAlt;
        // console.log(productApi.imageUrl);

        //creation et insertion de l'élément "div" description produit
        let itemContent = document.createElement("div");
        article.appendChild(itemContent);
        itemContent.className = "cart__item__content";

        //Creation et insertion de l'élément "div" pour le nom, la couleur, et le prix du produit
        let itemContentTitlePrice = document.createElement("div");
        itemContent.appendChild(itemContentTitlePrice);
        itemContentTitlePrice.className = "cart__item__content__titlePrice";

        //Creation et insertion de la balise h2
        let title = document.createElement("h2");
        itemContentTitlePrice.appendChild(title);
        title.innerHTML = productApi.name;
        // console.log(productApi.name);

        //Creation et insertion de la couleur
        let color = document.createElement("p");
        title.appendChild(color);
        color.innerHTML = product.color;

        //Creation et insertion du prix
        let price = document.createElement("p");
        itemContentTitlePrice.appendChild(price);
        price.innerHTML = productApi.price + " €";
        // console.log(product.price);

        //Creation et insertion de l'élément "div" pour l'élèment div qui contiendra la quantité
        let itemContentSettings = document.createElement("div");
        itemContent.appendChild(itemContentSettings);
        itemContentSettings.className = "cart__item__content__settings";

        //creation et insertion de l'élément "div" pour la quantité
        let itemContentSettingsQuantity = document.createElement("div");
        itemContentSettings.appendChild(itemContentSettingsQuantity);
        itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

        //creation et insertion de l'élèment "Qté :"
        let Qty = document.createElement("p");
        itemContentSettingsQuantity.appendChild(Qty);
        Qty.innerHTML = "Qté : ";
        // console.log('quantité du produit', product.quantity)

        //creation et insertion de l'input pour la quantité
        let quantity = document.createElement("input");
        itemContentSettingsQuantity.appendChild(quantity);
        quantity.value = productInApi.quantity;
        quantity.className = "itemQuantity";
        quantity.setAttribute("type", "number");
        quantity.setAttribute("min", "0");
        quantity.setAttribute("max", "100");
        quantity.setAttribute("name", "itemQuantity");

        // Creation et insertion de la "div" pour l'élèment supprimer
        let itemContentSettingsDelete = document.createElement("div");
        itemContentSettings.appendChild(itemContentSettingsDelete);
        itemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Creation et insertion de l'élement supprimer
        let supprimer = document.createElement("p");
        itemContentSettingsDelete.appendChild(supprimer);
        supprimer.className = "deleteItem";
        supprimer.innerHTML = "Supprimer la commande";
      })
    }) 
  }
}
//Calcule la quantité totale des produits du panier


// Calcul du nombres de produit et total du prix du panier


// Mise en place de la suppression de produit(s)


// Gestion du formulaire
function validFormulaire() {
  // Variable contenant le formulaire
  let form = document.querySelector(".cart__order__form");

  //Variable contenant les RegExp : (Expression Reguliére)
  let infoRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç°0-9 -]{2,30}$`);
  let emailRegExp = new RegExp(`^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$`, `g`);

  //   Ecouter la modification du Prenom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  //Validation du Prénom
  const validFirstName = function (inputFirstName) {
    //Récuperation de la balise'p' message d'erreur
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    // Test de l'expression Reguliere (RegExp)
    if (infoRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "Prénom valide";
    } else {
      firstNameErrorMsg.innerHTML = "Champ invalide";
    }
  };

  //   Ecouter la modification du Nom
  form.lastName.addEventListener("change", function () {
    validlastName(this);
  });

  //Validation du Nom
  const validlastName = function (inputLastName) {
    //Récuperation de la balise'p' message d'erreur
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    // Test de l'expression Reguliere (RegExp)
    if (infoRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "Nom valide";
    } else {
      lastNameErrorMsg.innerHTML = "Champ invalide";
    }
  };
  //   Ecouter la modification de l'Adresse
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  //Validation de l'Adresse
  const validAddress = function (inputAddress) {
    //Récuperation de la balise'p' message d'erreur
    let addressErrorMsg = inputAddress.nextElementSibling;

    // Test de l'expression Reguliere (RegExp)
    if (infoRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "Adresse valide";
    } else {
      addressErrorMsg.innerHTML = "Champ invalide";
    }
  };
  //   Ecouter la modification de la ville
  form.city.addEventListener("change", function () {
    validCity(this);
  });
  //Validation de la Ville
  const validCity = function (inputCity) {
    //Récuperation de la balise'p' message d'erreur
    let cityErrorMsg = inputCity.nextElementSibling;

    // Test de l'expression Reguliere (RegExp)
    if (infoRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "Ville valide";
    } else {
      cityErrorMsg.innerHTML = "Champ invalide";
    }
  };

  //   Ecouter la modification de l'Email'
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //Validation de la Ville
  const validEmail = function (inputEmail) {
    //Récuperation de la balise'p' message d'erreur
    let emailErrorMsg = inputEmail.nextElementSibling;

    // Test de l'expression Reguliere (RegExp)
    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "Email valide";
    } else {
      emailErrorMsg.innerHTML = "Champ invalide";
    }
  };
}
//Envoi des informations client au localstorage

window.onload = () => {
  // Appel de la fonction afficher les produits
  displayItem();

  // Appel de la fonction de modification de la quantité d'un produit

  // Appel de la fonction de suppression d'un produit

  // Appel de la fonction de calcul de la quantité et du prix

  //Appel de la fonction pour la validation du formulaire
  validFormulaire();

  }


