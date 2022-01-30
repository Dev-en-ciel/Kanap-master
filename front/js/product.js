// Récupération de l'id du produit dans l'URL
function getProductId() {
  let params = new URL(window.location.href).searchParams;
  return params.get('id');
}

//Affiche les details d'un produit
function showProductDetails(productId) {
  fetch("http://localhost:3000/api/products/" + productId)
    .then(res => res.json())
    .then(product => {

      let image = document.getElementsByClassName('item__img')
      image[0].innerHTML = `<img src="${product.imageUrl}" alt=${product.altTxt}">`;
      imageURL = product.imageUrl;
      imageAlt = product.altTxt;
      document.getElementById('title').innerHTML = `<h1>${product.name}</h1>`;
      document.getElementById('price').innerHTML = `${product.price}`;
      document.getElementById('description').innerHTML = `${product.description}`;

      // Mise en place du choix des couleurs 
      for (number in product.colors) {
        colors.options[colors.options.length] = new Option(product.colors[number]);
      }
    })
}


//Ajout des produits choisis dans le localstorage
//Ajout des produits au panier
function addCart() {
  // mise en place des variables utiles pour ma fonction
  let choiceQuantity = document.getElementById('quantity');
  let choiceColors = document.getElementById('colors');
  // let imageURL = "";

  let details = {
    id: getProductId(),
    image: imageURL,
    name: title.textContent,
    color: choiceColors.value,
    quantity: choiceQuantity.value,
  }
// Mise en place du localStorage
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

let addInLocalStorage = () => {

  //je récupère le choix du client et les données du localstorage
  productInLocalStorage.push(details);
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
}


  let update = false;
  //Verification qu'il n'y a pas les mêmes produits avec une boucle
  if (productInLocalStorage) {
    productInLocalStorage.forEach(function (productconfirmation, key) {

          if (productconfirmation.id === getProductId && productconfirmation.color === choiceColors.value) {
            productInLocalStorage[key].quantity = parseInt(productconfirmation.quantity) + parseInt(choiceQuantity.value++);
            localStorage.setItem('product', JSON.stringify(productInLocalStorage));
            update = true;
            addConfirm();
      }
    });

    if (!update) {
    productInLocalStorage.quantity ++
      addInLocalStorage();
      addConfirm();
    }
  }

  else {
    productInLocalStorage = [];
    addInLocalStorage();
    addConfirm();
  }

}
// Verification de la selection de la quantité et de la couleur 
function optionSelect() {

  let choiceColor = document.getElementById('colors');
  let quantity = document.getElementById('quantity');

  if (choiceColor.value === '') {
    window.alert('veuillez sélectionner une couleur')
    return false;
  }

  if (quantity.value == 0) {
    window.alert('Veuillez sélectionner une quantité du produit')
    return false;
  }

  return true;
}
  let addConfirm = () => {
    alert('Votre produit a bien été ajouté');
  }
// 

window.onload = () => {

  // Appel de la fonction de récuperation de l'id du produit
  let productId = getProductId();

  // Appel de la fonction qui répete la fonction çi-dessus pour ne pas ré-écrire le code
  showProductDetails(productId);

  // Evenement au clic pour l'ajout au panier
  document.querySelector('#addToCart').addEventListener('click', (event) => {
    event.preventDefault();

    // Appel de la fonction validation de la selction couleur et quantité  
    if (optionSelect()) {
      // Appel de la fonction pour l'ajout au panier
      addCart();
    }
  });



}