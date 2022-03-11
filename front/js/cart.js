// Fonction qui récupère les données de l'api pour les élements manquants
function displayItem(basket) {

  // Si le panier est vide : afficher 'le panier est vide'
  if (localStorage === null || localStorage.length === 0) {
    document.querySelector("#cart__items").innerHTML = `
    <p>Votre panier est vide !</p>`
  } else {

    // //Variable utile pour le calcul quantité & prix Total 
    let totalItems = 0;
    let totalPrice = 0;

    // Afficher les details du produit du panier
    const apiUrl = 'http://localhost:3000/api/products/';
    basket.forEach(product => {
      fetch(apiUrl + product.id)
        .then(res => res.json())
        .then(productApi => {

          // Affichage des élements dans le DOM
          showITem(product, productApi);

          // Calcul de la quantité total des articles
          totalItems += product.quantity;

          // Calcul du prix total du panier
          totalPrice += productApi.price * product.quantity;

          // Affichage de la quantité
          let totalQuantity = document.getElementById("totalQuantity");
          totalQuantity.textContent = totalItems;

          // Affichage du prix total
          let priceTotal = document.getElementById("totalPrice");
          priceTotal.textContent = totalPrice;

        })
        .catch(function (err) {
          alertApiOut();
        });
    })
  }
}
// Affichage des élements dans le DOM 
function showITem(product, productApi) {

  // Enplacemment des elements injectés  dans le dom
  let displayProduct = document.querySelector("#cart__items");

  // Creation et insertion de la balise "article"
  let article = document.createElement("article");
  displayProduct.appendChild(article);
  article.className = "cart__item";
  article.setAttribute("data-id", product.id);
  article.setAttribute("data-color", product.color);
  article.setAttribute("data-price", productApi.price);

  //Creation et insertion de "div" pour l'image du produit
  let divImg = document.createElement("div");
  article.appendChild(divImg);
  divImg.className = "cart__item__img";

  //Creation et Insertion de l'image
  let img = document.createElement("img");
  divImg.appendChild(img);
  img.src = productApi.imageUrl;
  img.alt = productApi.altTxt;
  
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
  price.innerHTML = productApi.price + " €";

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
  quantity.addEventListener("change", modifyQuantity);

  //Creation et insertion de la "div" pour l'élèment supprimer
  let itemContentSettingsDelete = document.createElement("div");
  itemContentSettings.appendChild(itemContentSettingsDelete);
  itemContentSettingsDelete.className = "cart__item__content__settings__delete";

  //Creation et insertion de l'élement supprimer
  let deleteItem = document.createElement("p");
  itemContentSettingsDelete.appendChild(deleteItem);
  deleteItem.className = "deleteItem";
  deleteItem.innerHTML = "Supprimer";
  deleteItem.addEventListener("click", deleteProduct);
}

//Mise en place du changement de la quantitée
function modifyQuantity(event) {
  let basket = JSON.parse(localStorage.getItem("basket")); // recuperation du localstorage
  //Valeur ciblé pour la modification "itemQuantity"
  let changeQuantity = parseInt(event.target.value);//entier

  // verifier que la quantite se situe entre 1 et 100  
  if (changeQuantity === 0) {
    deleteProduct(event);
    return false;
  }
  if (changeQuantity <= 0 || changeQuantity >= 101) {
    alertquantity();
    return false;
  }

  let productId = event.target.closest("article").dataset.id;
  let productColor = event.target.closest("article").dataset.color;
  for (i = 0; i < basket.length; i++) {
    if (basket[i].id === productId && basket[i].color === productColor) {
      basket[i].quantity = changeQuantity;
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }
  totalPriceAndQuantity(basket, event.target.closest("article").dataset.price);
}
function totalPriceAndQuantity(basket, unitPrice) {
console.log(unitPrice);
  //Variable utile pour le calcul quantité & prix Total 
  let totalItems = 0;
  let totalPrice = 0;

  basket.forEach(product => {

    // Calcul de la quantité total des articles
    totalItems += product.quantity;

    // Calcul du prix total du panier
    totalPrice += unitPrice * product.quantity;

  });
  // Affichage de la quantité
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = totalItems;

  // Affichage du prix total
  let priceTotal = document.getElementById("totalPrice");
  priceTotal.textContent = totalPrice;
}
//Mise en place de la suppression de l'article
function deleteProduct(event) {
  //récuperation du panier
  let basket = JSON.parse(localStorage.getItem("basket"));

  //récuperation des attributs id et color pour la suppression 
  let productId = event.target.closest("article").dataset.id;
  let productColor = event.target.closest("article").dataset.color;

  // Condition pour que l'utilisateur confirme la suppression du produit
  let delProduct = confirm("Voulez-vous supprimer ce produit ?");
  if (delProduct == true) {
    basket = basket.filter((del) => del.id !== productId || del.color !== productColor);
    // envoie au localstorage
    localStorage.setItem("basket", JSON.stringify(basket));
    // rafraichissement de la page 
    location.reload();
  }
  // condition si le panier et vide alors le panier et supprimé
  if (basket.length === 0) {
    localStorage.clear();
  }
}
//////////////////////////////////////FORMULAIRE////////////////////////////////////

//Gestion du formulaire
function validForm() {

  //Variable contenant les RegExp : (Expression Reguliére)
  let lastAndFirstNameRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`);
  let addressRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç°0-9 -]{1,}$`);
  let cityRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`);
  let emailRegExp = new RegExp(`^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$`, `g`);

  //champs 
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");

  let isValidForm = true;
  if (!lastAndFirstNameRegExp.test(firstName.value)) {
    firstNameErrorMsg.textContent = "Vérifier ce champ il ne doit pas contenir de chiffre !";
    isValidForm = false;
  }
  if (!lastAndFirstNameRegExp.test(lastName.value)) {
    lastNameErrorMsg.textContent = "Vérifier ce champ il ne doit pas contenir de chiffre !";
    ;
    isValidForm = false;
  }
  if (!addressRegExp.test(address.value)) {
    addressErrorMsg.textContent = "Vérifier ce champ il comporte des erreurs de saisis !";
    isValidForm = false;
  }
  if (!cityRegExp.test(city.value)) {
    cityErrorMsg.textContent = "Vérifier ce champ il comporte des erreurs de saisis !";
    isValidForm = false;
  }
  if (!emailRegExp.test(email.value)) {
    emailErrorMsg.textContent = "Vérifier ce champ l'adresse doit etre de type nom@fai.com !";
    isValidForm = false;
  }
  return isValidForm;
}

//Envoi les informations client au localstorage
function sendForm() {
  // récuperation des produits du localstorage 
  let basket = JSON.parse(localStorage.getItem("basket"));

  // Recuperation des données du formulaire dans un object
  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  };
  if (basket === null) {
    alertBasket();
  }
  // Création d'un tableau qui contiendra les Ids des produits choisis
  products = [];

  //récuperation de l'id du produit 
  for (let i = 0; i < basket.length; i++) {
    products.push(basket[i].id);
  }

  // objet contenant les infos de l'utilisateur et les id des produits choisis
  let recapOrder = {
    contact,
    products
  }

  // envois des données vers l'api avec la methode Post
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(recapOrder)
  })
    .then(res => res.json())
    .then(data => {
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
    })
    .catch(function (err) {
      alertApiOut();
    });
  localStorage.clear();
}
//////////////////////////Gestion des alertes////////////////////////
function timeOut() {
  let deletAlert = document.querySelector("#messalert")
  setTimeout(function () {
    deletAlert.remove()
  }, 2000)
}

function alertquantity() {
  let alertMessQuantity = document.querySelector(".cart__item__content__settings__delete");
  alertMessQuantity.insertAdjacentHTML("afterend",
    `<span id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 16px; color: red;">La quantité doit être en 1 et 100</span>`
  )
  timeOut();
}
// fonction pour le message si le panier est vide
function alertBasket() {
  let alertMessBasket = document.querySelector(".cart__order__form__submit");
  alertMessBasket.insertAdjacentHTML("afterend",
    `<p id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 16px; color: red;">Votre panier est vide!</p>`
  )
  timeOut();
}
// fonction pour message d'erreur si l'api est indisponible
function alertApiOut() {
  let alertServer = document.querySelector(".item__content__addButton");
  alertServer.insertAdjacentHTML("afterend",
    `<span id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 20px; color: red;">Erreur serveur indisponible, veuillez réessayer plus tard !</span>`
  )
}

window.onload = () => {
  // Récuperer les données du  Localstorage
  let basket = JSON.parse(localStorage.getItem("basket"));

  //Appel de la fonction parcourir l'api
  displayItem(basket);


  //Récuperation du bouton envoyer et evenement au click
  document.querySelector('#order').addEventListener("click", (event) => {
    event.preventDefault();

    //Appel de la fonction sendForm  
    if (validForm()) {
      sendForm();
    }
  });
}