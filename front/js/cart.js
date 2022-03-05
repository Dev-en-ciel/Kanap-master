// Fonction qui récupère les données de l'api pour les élements manquants
function displayItem(basket) {

  // Si le panier est vide : afficher 'le panier est vide'
  if (localStorage === null || localStorage.length === 0) {
    document.querySelector("#cart__items").innerHTML = `
    <p>Votre panier est vide !</p>`;
  } else {

    //Variable utile pour le calcul quantité & prix Total 
    let totalItems = 0;
    let totalPrice = 0;

    // Afficher les details du produit du panier-è
    const apiUrl = 'http://localhost:3000/api/products/';
    basket.forEach(product => {
      fetch(apiUrl + product.id)
        .then(res => res.json())
        .then(productApi => {

          // Calcul de la quantité total des articles
          totalItems += product.quantity;

          // Calcul du prix totals du panier
          totalPrice += productApi.price * product.quantity;

          // Affichage des élements dans le DOM
          showITem(product, productApi);

          // Affichage de la quantité
          let totalQuantity = document.getElementById("totalQuantity");
          totalQuantity.textContent = totalItems;

          // Affichage du prix total
          let priceTotal = document.getElementById("totalPrice");
          priceTotal.textContent = totalPrice;
          // deleteproduct(basket);
        })
        .catch(function (err) {
          let alertServer = document.querySelector("#cart__items");
          let pServer = document.createElement("p");
          alertServer.appendChild(pServer);
          pServer.textContent = "Erreur serveur indisponible, veuillez réessayer plus tard !";
          pServer.style.fontSize = "20px";
          pServer.style.textAlign = "center"
        });
    });
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

  //creation et insertion de l'input pour la quantité
  let quantity = document.createElement("input");
  itemContentSettingsQuantity.appendChild(quantity);
  quantity.value = product.quantity;
  quantity.className = "itemQuantity";
  quantity.setAttribute("type", "number");
  quantity.setAttribute("min", "1");
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
  if (changeQuantity.length == 0 && changeQuantity <= 1 && changeQuantity >= 100) {
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
  location.reload();
}

//Mise en place de la suppression de l'article
function deleteProduct(event) {
  //récuperation du panier
  let basket = JSON.parse(localStorage.getItem("basket"));

  //élement cibler pour la suppression de produit(s)
  let deleteProduct = document.querySelectorAll(".deleteItem")

  //récuperation des attributs id et color pour la suppression 
  let productId = event.target.closest("article").dataset.id;
  let productColor = event.target.closest("article").dataset.color;

  // boucle qui parcourt l élement deleteItem
  for (let i = 0; i < deleteProduct.length; i++) {
    basket = basket.filter((del) => del.id !== productId || del.color !== productColor);

    // envoie au localstorage
    localStorage.setItem("basket", JSON.stringify(basket));

    // condition si le panier et vide alors le panier et supprimé 
    if (basket.length === 0) {
      localStorage.clear();
    }

  }
  // Condition pour que l'utilisateur confirme la suppression du produit
  let delProduct = confirm("Voulez-vous supprimer ce produit ?");
  if (delProduct == true) {
    // rafraichissement de la page 
    location.reload();
  } else {
    return
  }
}
//////////////////////////////////////FORMULAIRE////////////////////////////////////

//Gestion du formulaire
function validForm() {
  // Variable contenant le formulaire
  let form = document.querySelector(".cart__order__form");

  //Variable contenant les RegExp : (Expression Reguliére)
  let infoRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç°0-9 -]{1,}$`);
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
    } else {
      emailErrorMsg.innerHTML = "Champ invalide";

    }
  };
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
    let alertBasket = document.querySelector("#limitedWidthBlock");
    let pBasket = document.createElement("p");
    alertBasket.appendChild(pBasket);
    pBasket.textContent = "Votre panier est vide !";
    pBasket.style.fontSize = "22px";
    pBasket.style.textAlign = "center";
    setTimeout(function () {
      pBasket.remove();
    }, 1500);
    return
  } else if (
    contact.firstName == false ||
    contact.lastName == false ||
    contact.address == false ||
    contact.city == false ||
    contact.email == false
  ) {
    let alertForm = document.querySelector("#limitedWidthBlock");
    let pForm = document.createElement("p");
    alertForm.appendChild(pForm);
    pForm.textContent = "Veuillez remplir le formulaire pour passer votre commande !";
    pForm.style.fontSize = "22px";
    pForm.style.textAlign = "center";
    setTimeout(function () {
      pForm.remove();
    }, 1500);
    return
  }

  // Création d'un tableau qui contiendra les Ids des produits choisis
  products = [];

  //récuperation de l'id du produit 
  for (let i = 0; i < basket.length; i++) {
    products.push(basket[i].id);
  }

  // tableau contenant les infos de l'utilisatuer et les id des produits choisis
  let recapOrder = {
    contact,
    products
  }
  // envoi des données au localstorage
  localStorage.setItem("recapOrder", JSON.stringify(recapOrder));
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
    .catch((err) => {
      let alertServer = document.querySelector('#items');
      let pServer = document.createElement("p");
      alertServer.appendChild(pServer);
      pServer.textContent = "Erreur serveur indisponible, veuillez réessayer plus tard !";
      pServer.style.fontSize = "20px";
    });
}

window.onload = () => {
  // Récuperer les données du  Localstorage
  let basket = JSON.parse(localStorage.getItem("basket"));

  //Appel de la fonction parcourir l'api
  displayItem(basket);

  //Récuperation du bouton envoyer et evenement au click
  document.querySelector('#order').addEventListener("click", (event) => {
    event.preventDefault();
    //Appel de la fonction sendForm si validForm est ok
    if (validForm()); {
      sendForm();
    }
  });
}

