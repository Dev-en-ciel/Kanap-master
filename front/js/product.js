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
    .catch(function (err) {
        let alertServer = document.querySelector('#items');
        let pServer = document.createElement("p");
        alertServer.appendChild(pServer);
        pServer.textContent = "Erreur serveur indisponible, veuillez réessayer plus tard !";
        pServer.style.backgroundColor = "white";
        pServer.style.fontSize = "20px";
        pServer.style.borderRadius = "5px";
    });
}

//  Ajout du produit au panier
function addCart() {
  let basket= [];
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

  if (choiceColor.value === '' || quantity.value == 0) {
    errChamp();
    return false;
  }
  return true;
}
///////////////// gestion des alertes//////////////// 
let addConfirm = () => {
  let alertAdd = document.querySelector(".item__content");
  let divAdd = document.createElement("Div");
  alertAdd.appendChild(divAdd);  
  divAdd.setAttribute ("class", "alertAdd");

  let pAdd = document.createElement('p');    
  divAdd.appendChild(pAdd);
  pAdd.style.fontSize = "25px";
  pAdd.style.textAlign= 'center';
  pAdd.style.backgroundColor ="white";
  pAdd.style.color = "#28B148";
  pAdd.textContent = "Votre produit a bien été ajouté au panier !" ;
  setTimeout(function(){
    pAdd.remove()
  }, 2000)
}
let errChamp = () => {
  let alertColor = document.querySelector(".item__content__settings");
  let pcolor = document.createElement('p');
  alertColor.appendChild(pcolor);
  pcolor.style.textAlign = 'center';
  pcolor.style.fontSize = '20px';
  pcolor.style.backgroundColor ="white";
  pcolor.style.color = "#28B148";
  pcolor.textContent = "Veuillez séléctionner une couleur et une quantité !"
  setTimeout(function(){
    pcolor.remove()
  }, 2000)
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