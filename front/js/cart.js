// variable utiles


// récuperation des données du localStorage
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

console.log(productInLocalStorage)

// creation et insertion des élèments du panier

// si le panier est vide on affiche 'votre panier est vide'
if (productInLocalStorage <=0){
document.querySelector("#cart__items").innerHTML = 
`<p>Votre panier est vide</p>`
}
// sinon on affiche les produits du panier
else {
document.getElementById('cart__items');
// obtenir tout les articles du panier
for( let i = 0; i < productInLocalStorage; i++){
}

// affichage des produits

document.querySelector('#cart__items').innerHTML +=
`<article class="cart__item" data-id="${productInLocalStorage.Id}" data-color="${productInLocalStorage.color}">
                <div class="cart__item__img">
                  <img src="${productInLocalStorage.imageUrl}" alt="${productInLocalStorage.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInLocalStorage.name}</h2>
                    <p>${productInLocalStorage.color}</p>
                    <p>${productInLocalStorage.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
};