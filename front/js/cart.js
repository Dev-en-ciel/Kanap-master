
// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let product = JSON.parse(localStorage.getItem('product'));

// AFFICHER LES PRODUITS DU PANIER

// je sélectionne la partie html concernée
let cartItem = document.getElementById('cartAndFormContainer');

// si le panier est vide : afficher 'le panier est vide'
if (localStorage === null || localStorage.length <= 0) {
  document.querySelector("#cart__items").innerHTML = `
    <p>Votre panier est vide !</p>
    `;
console.log('coucou');
}
// sinon afficher les produits dans le localStorage
else {

  const itemCart = document.getElementById('cart__items');

  // expression initiale
  function displayItem() {
    for (i = 0; i < localStorage.length; i++) {
        products.push(localStorage[i].id);

      if (itemCart) {

      // mise en place du code html
      itemCart.innerHTML += `
        <article class="cart__item" data-id="${localStorage[i].id}" data-color="${localStorage.color}">
          <div class="cart__item__img">
            <img src="${localStorage[i].image}" alt="${localStorage[i].alt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${localStorage[i].name}</h2>
              <p>${localStorage[i].color}</p>
              <p>${localStorage[i].price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage[i].quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
      }
    }
  }
 displayItem();
console.log('coucou toi');
}







window.onload = () => {

}