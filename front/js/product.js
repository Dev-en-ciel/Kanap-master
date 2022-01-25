// récupération de l'id du produit dans l'URL
function recupProductId() {
  let params = new URL(window.location.href).searchParams;
  return params.get('id');
}

//récuperation des détails du produits sélèctionné 
function productDetail(productId) {
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

      // choix des couleurs

      for (number in product.colors) {
        colors.options[colors.options.length] = new Option(product.colors[number]);
      }
    })
    .catch((error) => {
      console.error({ "error": error })
    })
}
 


  //  ajout au panier
  function addCart() {
  // mise en place des variables
  const choiceQuantity = document.getElementById('quantity');
  const choiceColors = document.getElementById('colors');
  const addToCart = document.getElementById('addToCart');
  let imageURL = "";
  let altTxt = "";
    addToCart.addEventListener('click', (event) => {
      event.preventDefault();

      const details = {
        id: productId,
        image: imageURL,
        name: title.textContent,
        color: choiceColors.value,
        quantity: choiceQuantity.value,

      };

      // je met clés+valeurs dans le localStorage
      let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

      //j'ajoute les produits choisis dans le localstorage
      const addInLocalStorage = () => {

        //je récupère le choix du client et les données du localstorage
        productInLocalStorage.push(details);
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      }

      const addConfirm = () => {
        alert('Votre produit a bien été ajouté');
      }
          // alert('veuillez sélectionnez une quantité ou/et une couleur ')

      let update = false;

      //Verification qu'il n'y a pas les mêmes produits avec une boucle
      if (productInLocalStorage) {
        productInLocalStorage.forEach(function (productconfirmation, key) {
          if (productconfirmation.id === productId && productconfirmation.color === choiceColors.value) {
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
    });
  }



window.onload = () => {
  recupProductId();
  let bidon = recupProductId();_
   // fonction qui répete la fonction çi-dessus pour ne pas ré-écrire le code
  productDetail(bidon);
  addCart();
}