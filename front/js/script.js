
window.onload = () => {
// récuperation des ressources de L'API
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((productsItems) => {

    //ajouts des Objets sur la page d'accueil 
    // Utlisation d'une boucle for each pour itérer les données du tableau (répeter la tâche jusqu'au dernier produit) 
        productsItems.forEach((product) => {
        // suppr innertHtml
            document.querySelector("#items").innerHTML += ` 
                <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
                </a>`;
        })
    })
    .catch(function (err) {
        alertApiOut();
    });
}
////////////Gestion de l'alerte///////////
function alertApiOut() {
  let alertServer = document.querySelector(".items");
  alertServer.insertAdjacentHTML("afterbegin",
    `<span id ="messalert" style="text-align: center; background: white; border-radius: 2px; font-size: 20px; color: #28B148;">Erreur serveur indisponible, veuillez réessayer plus tard !</span>`
  )
}