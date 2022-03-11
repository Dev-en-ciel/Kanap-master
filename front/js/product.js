// Récupération de l'id du produit dans l'URL
function getProductId() {
  let params = new URL(window.location.href).searchParams;
  return params.get('id');
}

//Affiche les details d'un produit par son Id
function showProductDetails(productId) {
  fetch("http://localhost:3000/api/products/" + productId)
    .then(res => res.json())
    .then(product => {
      let image = document.querySelector('.item__img')
      image.innerHTML = `<img src="${product.imageUrl}" alt=${product.altTxt}">`;
      document.getElementById('title').innerHTML = `<h1>${product.name}</h1>`;
      document.getElementById('price').innerHTML = `${product.price}`;
      document.getElementById('description').innerHTML = `${product.description}`;
      let colors = document.querySelector('#colors');

      // Mise en place du choix des couleurs 
      for (number in product.colors) {
        colors[colors.options.length] = new Option(product.colors[number]);
      }
    })
    .catch(function (err) {
      notif("error", "Erreur serveur indisponible, veuillez réessayer plus tard!", document.querySelector(".item"));
    });
}
//  Ajout du produit au panier
function addCart() {
  let basket = [];
  let updated = false;
  let color = document.querySelector("#colors").value;
  let quantity = document.querySelector('#quantity').value;

  // détail du produit0
  let detailProduct = {
    id: getProductId(),
    color: color,
    quantity: parseInt(quantity),
  };

  // Vérifier que le panier ne contient pas de produit de la meme couleur & de meme quantité
  if (localStorage.getItem('basket')) {
    basket = JSON.parse(localStorage.getItem('basket'));
    basket.forEach((product, i) => {
      if (product.id === detailProduct.id && product.color === detailProduct.color) {
        product.quantity += detailProduct.quantity;
        basket[i] = product;
        localStorage.setItem('basket', JSON.stringify(basket));
        updated = true;
        notif("success", "Votre produit à bien été ajouté au panier!", document.querySelector(".item__content__settings"));

        return true;
      }
    });
  }
  if (!updated) {
    basket.push(detailProduct);
    localStorage.setItem('basket', JSON.stringify(basket))
    notif("success", "Votre produit à bien été ajouté au panier!", document.querySelector(".item__content__settings"));
  }
}

// Verification de la selection de la quantité et de la couleur 
function optionSelect() {

  let choiceColor = document.getElementById('colors');
  let quantity = (document.getElementById('quantity'));
  if (choiceColor.value === '') {

    notif("error", "Veuillez séléctionner une couleur", document.querySelector(".item__content__settings"));

    return false;
  }
  if (quantity.value <= 0 || quantity.value > 100) {

    notif("error", "Veuillez séléctionner une quantité entre 1 & 100", document.querySelector(".item__content__settings"));

    return false;
  }
  return true;
}
///////////////// gestion des alertes//////////////// 
function timeOut() {
  let deletAlert = document.querySelector("#messalert")
  setTimeout(function () {
    deletAlert.remove()
  }, 2000);
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

  // Appel de la fonction de récuperation de l'id du produit
  let productId = getProductId();

  // Appel de la fonction qui répete la fonction çi-dessus pour ne pas ré-écrire le code
  showProductDetails(productId);

  // Evenement au clic pour l'ajout au panier
  document.querySelector('#addToCart').addEventListener('click', (event) => {
    event.preventDefault();

    // Appel de la fonction validation de la selection couleur et quantité  
    if (optionSelect()) {
      // Appel de la fonction pour l'ajout au panier
      addCart();
    }
  });
}