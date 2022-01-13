// Récupération de l'adresse de la page index.html avec window.location.href
const recupUrl = window.location.href;
console.log(recupUrl)
// Récupération de l'ID avec urlSearchParams
const recupId = window.location.search;
const urlSearchParams = new URLSearchParams(recupId);
const id = urlSearchParams.get('id')
console.log(id);
// récuperation des ressources de l'api avec l'id du produit
fetch('http://localhost:3000/api/products/' + id)
  .then((res) => {

  const response = res.json();
  response.then(product =>{

        let addToCart = document.getElementById("addToCart");
        let colors = document.getElementById("colors");
        let img = document.createElement("img");
        let quantity = document.querySelector("#quantity");
        let price = document.getElementById("price").innerHTML = product.price;
        let name = document.getElementById("title").innerHTML = product.name;
        
        // Afficher les élèments sur la page produits
        document.querySelector(".item__img").appendChild(img);
        document.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map(color => `<option id= "valueColor" value="${color}">${color}</option>`));
        document.getElementById("description").innerHTML = product.description;
        img.src = product.imageUrl;
        img.alt= product.altTxt;
        let image = img.src ;
        let imageAlt= img.alt;
});
  });