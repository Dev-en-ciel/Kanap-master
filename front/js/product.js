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
      alertApiOut();
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
        addConfirm();
        timeOut();
        return true;
      }
    });
  }
  if (!updated) {
    basket.push(detailProduct);
    localStorage.setItem('basket', JSON.stringify(basket))
    addConfirm();
    timeOut();
  }
}

// Verification de la selection de la quantité et de la couleur 
function optionSelect() {

  let choiceColor = document.getElementById('colors');
  let quantity = (document.getElementById('quantity'));
  if (choiceColor.value === '') {
    errColor();
    timeOut();
    return false;
  }
  if (quantity.value <= 0 || quantity.value > 100) {
    errQuantity();
    timeOut();
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

let errColor = () => {
  let alertColor = document.querySelector(".item__content__settings");
  alertColor.insertAdjacentHTML("afterend",
    `<span id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 20px; color: red;">Veuillez séléctionner une couleur !</span>`
  )
}
let errQuantity = () => {
  let alertQuantity = document.querySelector(".item__content__settings");
  alertQuantity.insertAdjacentHTML("afterend",
    `<span id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 20px; color: red;">Veuillez séléctionner une quantité !</span>`
  )
}
let addConfirm = () => {
  let alertQuantity = document.querySelector(".item__content__settings");
  alertQuantity.insertAdjacentHTML("afterend",
    `<span id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 20px; color: #28B148;">Votre produit à bien été ajouté au panier!</span>`
  )
}
function alertApiOut() {
  let alertServer = document.querySelector(".items");
  alertServer.insertAdjacentHTML("afterbegin",
    `<span id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 20px; color: #28B148;">Erreur serveur indisponible, veuillez réessayer plus tard !</span>`
  )
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