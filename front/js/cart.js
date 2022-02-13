// Fonction qui récupère les données de l'api pour les élements manquants
const displayItem = function(products) {
  // Si le panier est vide : afficher 'le panier est vide'
  if (localStorage === null || localStorage.length === 0) {
    document.querySelector("#cart__items").innerHTML = `
    <p>Votre panier est vide !</p>`;
    console.log("je suis vide");
  } else {

    //Variable utile pour le calcul quantité & prix Total 
    let totalItems = 0;
    let totalPrice = 0;
    
    // Afficher les details du produit du panier
    const apiUrl = 'http://localhost:3000/api/products/';
    products.forEach(product => {
      fetch(apiUrl + product.id)
        .then(res => res.json())
        .then(productApi => {
          
          // Calcul de la quantité total des articles
          totalItems += product.quantity;
         
         // Calcul du prix totals du panier
          totalPrice += productApi.price  * product.quantity;
         
          // Enplacemment des elements injectés  dans le dom
          let displayProduct = document.querySelector("#cart__items");
         
          // mise en place de la deuxieme fonction
//*************************ici la fonction a ajouter****************** */
  
          // Creation et insertion de la balise "article"
          let article = document.createElement("article");
          displayProduct.appendChild(article);
          article.className = "cart__item";
          article.setAttribute("data-id", product.id);
          article.setAttribute("data-color", product.color);

          //Creation et insertion de "div" pour l'image du produit
          let divImg = document.createElement("div");
          article.appendChild(divImg);
          divImg.className = "cart__item__img";

          //Creation et Insertion de l'image
          let img = document.createElement("img");
          divImg.appendChild(img);
          img.src = productApi.imageUrl;
          img.alt = productApi.imageAlt;

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

          //Creation et insertion de la couleur
          let color = document.createElement("p");
          title.appendChild(color);
          color.innerHTML = product.color;

          //Creation et insertion du prix
          let price = document.createElement("p");
          itemContentTitlePrice.appendChild(price);
          price.innerHTML = productApi.price * product.quantity + " €";

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
          quantity.value = product.quantity;
          quantity.className = "itemQuantity";
          quantity.setAttribute("type", "number");
          quantity.setAttribute("min", "0");
          quantity.setAttribute("max", "100");
          quantity.setAttribute("name", "itemQuantity");
          quantity.setAttribute("value", product.quantity)
          
          // Creation et insertion de la "div" pour l'élèment supprimer
          let itemContentSettingsDelete = document.createElement("div");
          itemContentSettings.appendChild(itemContentSettingsDelete);
          itemContentSettingsDelete.className = "cart__item__content__settings__delete";

          // Creation et insertion de l'élement supprimer
          let supprimer = document.createElement("p");
          itemContentSettingsDelete.appendChild(supprimer);
          supprimer.className = "deleteItem";
          supprimer.innerHTML = "Supprimer la commande";

          // Affichage de la quantité
          let totalQuantity = document.getElementById("totalQuantity");
          totalQuantity.textContent = totalItems;
          // Affichage du prix total
          let priceTotal = document.getElementById("totalPrice");
          priceTotal.textContent = totalPrice;
          
        })
    })
  }
}

// Mise en place du changement de la quantitée
function modifyQuantity(products) {
console.log(products)
  // Element ciblé pour la modification "itemQuantity"
    let changeQuantity = document.querySelectorAll("itemQuantity");
console.log("quanité à modifier",changeQuantity)
    //Boucle pour le changement de quantité.

}
// const deleteProduct = () => {
//   //Suppression de l'article 
//   let deleteItem = document.querySelectorAll("deleteItem");
//   for (let i = 0; i < deleteItem.length; i++){
// console.log(deleteItem.length);
  
//   // boucle pour la suppression d'un ou des produit(s)
//     deleteItem.addEventListener("click", (event) => {
//       event.preventdefault();
//     console.log("ok");
     
//       // Selection de l ID & de la couleur du produit qui va etre supprimer 
//       let deleteId = products.id;
//       let deleteColor = products.color;
//       console.log(products.color);
     
//       //Filtrer l'élément au click sur le bouton supprimé
//       products = products.filter(el => el.id !== deleteId || element.color !== deleteColor);

//       //Envois des nouvelles données dans le localStorage
//       localStorage.setItem('products', JSON.stringify(products));
//       console.log('ok')

//       // Alert pour valider la suppression du produit
//       alert("le produit vient d'être supprimer");
//       location.reload();
//     })
//   }
// }
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
  // Récuperer les données du  Localstorage
  let products = JSON.parse(localStorage.getItem("products"));

  // Appel de la fonction parcourir l'api
  displayItem(products);

  // Appel de la fonction pour afficher les produits
 

  // Appel de la fonction de modification de la quantité d'un produit
  modifyQuantity(products);

  // Appel de la fonction de suppression d'un produit
  // deleteProduct();
  //Appel de la fonction pour la validation du formulaire
  validFormulaire();

}


