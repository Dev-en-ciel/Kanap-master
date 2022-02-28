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
      let image = document.getElementsByClassName('item__img')
      image[0].innerHTML = `<img src="${product.imageUrl}" alt=${product.altTxt}">`;
      imageUrl = product.imageUrl;
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

//  Ajout du produit au panier
function addCart() {
  let basket= [];
  let updated = false;
  let color = document.querySelector("#colors").value;
  let quantity = document.querySelector('#quantity').value;

  // détail du produit
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
        return true;
      }
    });
  }
  if (!updated) {
    basket.push(detailProduct);
    localStorage.setItem('basket', JSON.stringify(basket))
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