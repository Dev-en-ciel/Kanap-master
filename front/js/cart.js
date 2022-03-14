// Fonction qui récupère les données de l'api pour les élements manquants
function displayItem(basket) {

  if (localStorage === null || localStorage.length === 0) {
    document.querySelector("#cart__items").innerHTML = `
    <p>Votre panier est vide !</p>`
  } else {

    let totalItems = 0;
    let totalPrice = 0;

    const apiUrl = 'http://localhost:3000/api/products/';
    basket.forEach(product => {
      fetch(apiUrl + product.id)
        .then(res => res.json())  
        .then(productApi => {

          showITem(product, productApi);

          totalItems += product.quantity;

          totalPrice += productApi.price * product.quantity;

          let totalQuantity = document.getElementById("totalQuantity");
          totalQuantity.textContent = totalItems;

          let priceTotal = document.getElementById("totalPrice");
          priceTotal.textContent = totalPrice;

        })
        .catch(function (err) {
          notif("error", "Erreur serveur indisponible, veuillez réessayer plus tard!", document.querySelector(".item"));
        });
    });
  }
}
// Affichage des élements dans le DOM 
function showITem(product, productApi) {

  let displayProduct = document.querySelector("#cart__items");

  let article = document.createElement("article");
  displayProduct.appendChild(article);
  article.className = "cart__item";
  article.setAttribute("data-id", product.id);
  article.setAttribute("data-color", product.color);
  article.setAttribute("data-price", productApi.price);

  let divImg = document.createElement("div");
  article.appendChild(divImg);
  divImg.className = "cart__item__img";

  let img = document.createElement("img");
  divImg.appendChild(img);
  img.src = productApi.imageUrl;
  img.alt = productApi.altTxt;

  let itemContent = document.createElement("div");
  article.appendChild(itemContent);
  itemContent.className = "cart__item__content";

  let itemContentTitlePrice = document.createElement("div");
  itemContent.appendChild(itemContentTitlePrice);
  itemContentTitlePrice.className = "cart__item__content__titlePrice";

  let title = document.createElement("h2");
  itemContentTitlePrice.appendChild(title);
  title.innerHTML = productApi.name;

  let color = document.createElement("p");
  title.appendChild(color);
  color.innerHTML = product.color;

  let price = document.createElement("p");
  itemContentTitlePrice.appendChild(price);
  price.innerHTML = productApi.price + " €";

  let itemContentSettings = document.createElement("div");
  itemContent.appendChild(itemContentSettings);
  itemContentSettings.className = "cart__item__content__settings";

  let itemContentSettingsQuantity = document.createElement("div");
  itemContentSettings.appendChild(itemContentSettingsQuantity);
  itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

  let Qty = document.createElement("p");
  itemContentSettingsQuantity.appendChild(Qty);
  Qty.innerHTML = "Qté : ";

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

  let itemContentSettingsDelete = document.createElement("div");
  itemContentSettings.appendChild(itemContentSettingsDelete);
  itemContentSettingsDelete.className = "cart__item__content__settings__delete";

  let deleteItem = document.createElement("p");
  itemContentSettingsDelete.appendChild(deleteItem);
  deleteItem.className = "deleteItem";
  deleteItem.innerHTML = "Supprimer";
  deleteItem.addEventListener("click", deleteProduct);
}

//Mise en place du changement de la quantitée
function modifyQuantity(event) {
  let basket = JSON.parse(localStorage.getItem("basket"));
  let changeQuantity = parseInt(event.target.value);

  if (changeQuantity === 0) {
    deleteProduct(event);
    return false;
  }
  if (changeQuantity <= 0 || changeQuantity >= 101) {
    notif("error", "La quantité doit être en 1 et 100", document.querySelector(".cart__item__content__settings__delete"));
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
function totalPriceAndQuantity(basket) {
  let totalItems = 0;
  let totalPrice = 0;

  basket.forEach(product => {

    let unitPrice = document.querySelector("[data-id='" + product.id + "']").dataset.price;

    totalItems += product.quantity;

    totalPrice += unitPrice * product.quantity;
  });

  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = totalItems;

  let priceTotal = document.getElementById("totalPrice");
  priceTotal.textContent = totalPrice;
}

//Mise en place de la suppression de l'article
function deleteProduct(event) {
  let basket = JSON.parse(localStorage.getItem("basket"));

  let productId = event.target.closest("article").dataset.id;
  let productColor = event.target.closest("article").dataset.color;

  let delProduct = confirm("Voulez-vous supprimer ce produit ?");
  if (delProduct == true) {
    basket = basket.filter((del) => del.id !== productId || del.color !== productColor);

    localStorage.setItem("basket", JSON.stringify(basket));
    location.reload();
  }
  if (basket.length === 0) {
    localStorage.clear();
  }
}
//////////////////////////////////////FORMULAIRE////////////////////////////////////

//Gestion du formulaire
function validForm() {

  let lastAndFirstNameRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`);
  let addressRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç°0-9 -]{1,}$`);
  let cityRegExp = new RegExp(`^[a-zA-Zàâäéèêëïîôöùûüç° -]{1,}$`);
  let emailRegExp = new RegExp(`^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$`, `g`);

  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");

  let isValidForm = true;

  if (!lastAndFirstNameRegExp.test(firstName.value.trim())) {
    firstNameErrorMsg.textContent = "Vérifier ce champ il ne doit pas contenir de chiffre !";
    isValidForm = false;
  }
  if (!lastAndFirstNameRegExp.test(lastName.value.trim())) {
    lastNameErrorMsg.textContent = "Vérifier ce champ il ne doit pas contenir de chiffre !";
    isValidForm = false;
  }
  if (!addressRegExp.test(address.value.trim())) {
    addressErrorMsg.textContent = "Vérifier ce champ il comporte des erreurs de saisis !";
    isValidForm = false;
  }
  if (!cityRegExp.test(city.value.trim())) {
    cityErrorMsg.textContent = "Vérifier ce champ il comporte des erreurs de saisis !";
    isValidForm = false;
  }
  if (!emailRegExp.test(email.value.trim())) {
    emailErrorMsg.textContent = "Vérifier ce champ l'adresse doit etre de type nom@fai.com !";
    isValidForm = false;
  }

  return isValidForm;
}

//Envoi les informations client au localstorage
function sendForm() {
  let basket = JSON.parse(localStorage.getItem("basket"));

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  };
  if (basket === null) {
    notif("error", "Votre panier est vide!", document.querySelector(".cart__order__form__submit"));
  }
  products = [];

  for (let i = 0; i < basket.length; i++) {
    products.push(basket[i].id);
  }

  let recapOrder = {
    contact,
    products
  }

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
      notif("error", "Erreur serveur indisponible, veuillez réessayer plus tard !", document.querySelector(".item__content__addButton"));
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
function notif(level, msg, target) {
  if (level === "success") {
    colorMsg = "#28B148";
  } else {
    colorMsg = 'red';
  }

  let alertMess = document.createElement('p');
  alertMess.setAttribute('id', 'messalert');
  alertMess.setAttribute('style', 'text-align: center; background: white; border-radius: 2px; font-size: 20px; color:' + colorMsg);
  alertMess.textContent = msg;

  target.insertAdjacentElement("afterend", alertMess);
  timeOut();
}

window.onload = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));

  displayItem(basket);

  document.querySelector('#order').addEventListener("click", (event) => {
    event.preventDefault();

    if (validForm()) {
      sendForm();
    }
  });
}