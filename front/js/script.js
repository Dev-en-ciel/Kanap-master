// récuperation des ressources de L'API
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
// ajouts des Objets sur la page d'accueil 
    .then((productsItems) => {
         productsItems.forEach((product) => {       // Utlisation d'une boucle for each pour itérer les données du tableau
            document.querySelector("#items").innerHTML += ` 
                <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">"${product.name}"</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
                </a>`;
        });
    })
    // retour message au cas ou la récuperation de l'api a échouée
    .catch (error => ("Erreur lors de la récuperation de l api"))