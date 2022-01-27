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


  // FAIRE UNE INDENTATION NIKEL
  //FAIRE LE ADDCART
  // recuperer le localstorage
  // verifier si le produit et deja dans la panier 
  // si oui 
  // modifier la quantitée
  // sinon
  // ajouter le produit dans le panier

// "";
// '';
// );
// nomdevariable;
// ];

  // Verification si la quantité et la couleur sont sélectionner
function validSelect() {
  let choiceColor = document.getElementById('colors');
  let quantity = document.getElementById('quantity') ;
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
  //ajoutez les produits au panier
  function addCart() {
    // mise en place des variables
    let addToCart = document.getElementById('addToCart');
    let choiceQuantity = document.getElementById('quantity');
    let choiceColors = document.getElementById('colors');
    let imageURL = "";

    let details = {
      id: getProductId(),
      image: imageURL,
      name: title.textContent,
      color: choiceColors.value,
      quantity: choiceQuantity.value,

    };


    // if (colors === ''){
    // }

    // je met clés+valeurs dans le localStorage
    let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

    //j'ajoute les produits choisis dans le localstorage
    let addInLocalStorage = () => {

      //je récupère le choix du client et les données du localstorage
      productInLocalStorage.push(details);
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    }

    let addConfirm = () => {
      alert('Votre produit a bien été ajouté');
    }
    // alert('veuillez sélectionnez une quantité ou/et une couleur ')

    let update = false;
    //Verification qu'il n'y a pas les mêmes produits avec une boucle
    if (productInLocalStorage) {
      productInLocalStorage.forEach(function (productconfirmation, key) {

        if (productconfirmation.id === getProductId && productconfirmation.color === choiceColors.value) {
          productInLocalStorage[key].quantity = parseInt(productconfirmation.quantity) + parseInt(choiceQuantity.value);
          localStorage.setItem('product', JSON.stringify(productInLocalStorage));
          update = true;
          addConfirm();
        }
      });

      if (!update) {
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



window.onload = () => {
  
  // Appel de la fonction de récuperation de l'id du produit
  let productId = getProductId();
 
  // Appel de la fonction qui répete la fonction çi-dessus pour ne pas ré-écrire le code
  showProductDetails(productId);
  
  // Evenement au clic pour l'ajout au panier
  document.querySelector('#addToCart').addEventListener('click', (event) => {
    event.preventDefault();

    // Appel de la fonction validation de la selction couleur et quantité  
    if(validSelect()){
      // Appel de la fonction pour l'ajout au panier
      addCart();
    }
  });
    
  
  
}