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
  let products = [];
  
  // détail du produit
  let detailProduct = {
    id: getProductId(),
    imageUrl: imageUrl,
    altTxt: imageAlt,
    name: document.querySelector("#title").textContent,
    color: document.querySelector("#colors").value,
    quantity: document.querySelector("#quantity").value,
    price: document.querySelector("#price").textContent
  };
  // Vérifier que le panier ne contient pas de produit de la meme couleur
  if (localStorage.getItem('product')) {
    products = JSON.parse(localStorage.getItem('product'));
    for (let product in products) {
      if (product.id == detailProduct.id && product.color == detailProduct.color) {
        (product.quantity = parseInt(product.quantity) + parseInt(detailProduct.quantity));
        localStorage.setItem('product', JSON.stringify(product));
        optionSelect();
        return
      }
    };
  };
  if (detailProduct.color != "" && detailProduct.quantity > 0 && detailProduct.quantity < 100) {
    products.push(detailProduct);
    localStorage.setItem('product', JSON.stringify(products))
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