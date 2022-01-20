window.onload = () => {

  // Récupération de l'adresse de la page index.html avec window.location.href
  const recupUrl = window.location.href;

  // Récupération de l'ID avec urlSearchParams
  const recupId = window.location.search;
  const urlSearchParams = new URLSearchParams(recupId);
  const id = urlSearchParams.get('id')

  // Récupération des ressources de l'api avec l'id du produit
  const productsId = fetch('http://localhost:3000/api/products/' + id)
  productsId.then(async (responseData) => {

    const product = await responseData.json();

    // Affichage des détails du produit sélectionné
    document.getElementById("addToCart");
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("description").innerHTML = product.description;
    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    document.querySelector(".item__img").appendChild(img);

    // Gestion des couleurs. je creer une boucle pour l'affichage des couleurs 
    for (color in product.colors) {
      colors.options[colors.options.length] = new Option(product.colors[color]);
    }
    // panier.
    // //Je créer des constantes pour le choix de l'utilisateur
    let productColors = document.getElementById("color");
    let imageURL = "imageURL";
    let altTxt = "altTxt";
    let quantities = Number(quantity.value);

    console.log(color)

    // évenement pour le bouton ajouter au panier
   let addToCart = document.getElementById('addToCart').addEventListener("click", (event) => {
      event.preventDefault();
      // Valeurs du produit récupérées à stockées dans un tabeau.
      const productInfo = {
        id,
        name,
        imageURL,
        altTxt,
        colors,
        quantities,
      };

      // tableau pour récuperer les données 
      let saveProducts = [];

      // condition pour vérifier que le tableau n'a pas de produit enregistrer
      if (localStorage.getItem("product")) {
        // si le tableau contient des donnés, elle sont transferées dans le tableau
        saveProducts = JSON.parse(localStorage.getItem("product"));

        // vérification qu'il n y as pas de produit avec le meme id et la meme couleur
        let kanap = saveProducts.findIndex((object => object.id === productInfo.id && productInfo.color === object.color));

        // si il y as déjà un produit identique alors la quantité est modifiée
        if (kanap !== 0) {
          saveProducts[kanap].quantities += quantities;
        }
        // si ce n'est pas le cas alors le produit est ajouté au tableau
        else if (kanap === 0) {
        }
        // les produits du tableau du localStorage et sont convertis en chaine de caractères
        localStorage.setItem("product", JSON.stringify(saveProducts));
      }

      // sinon si le localStorage est vide, les données son envoyées avec un tableau et les convertis 
      else {
        saveProducts.push(productInfo);
        localStorage.setItem("product", JSON.stringify(saveProducts));
      }
    });
  });
}