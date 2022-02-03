
// Récuperer les données du  Localstorage 
let product = [];
products = JSON.parse(localStorage.getItem('products'));
console.table(products)
// Enplacemment des elements injectés  dans le dom
let displayProduct = document.querySelector('#cart__items')

function displayItem() {
    // Si le panier est vide : afficher 'le panier est vide'
    if (localStorage === null || localStorage.length <= 0) {
        document.querySelector("#cart__items").innerHTML = `
      <p>Votre panier est vide !</p>`;
        console.log('je suis vide');
    }
    else {
        // Afficher les details du produit du panier
        for (let i in product) {

            // Creation et insertion de la balise "article"
            let article = document.createElement("article");
            document.querySelector("#cart__items").appendChild(article);
            article.className = "cart__item";
            article.setAttribute("data-id", product[i].id);
            console.log(product[i].id)

            //Creation et insertion de "div" pour l'image du produit
            let divImg = document.createElement("div");
            article.appendChild(divImg);
            divImg.className = "cart__item__img";

            //Creation et Insertion de l'image
            let img = document.createElement("img");
            divImg.appendChild(img);
            img.src = product[i].imageUrl;
            img.alt = product[i].altTxt;
            console.log(product[i].imageUrl);
            console.log(product[i].altTxt);
            //creation et insertion de l'élément "div" description produit
            let itemContent = document.createElement("div");
            article.appendChild(itemContent);
            itemContent.className = "cart__item__content";

            //Creation et insertion de l'élément "div" pour le nom, la couleur, et le prix du produit
            let itemContentTitlePrice = document.createElement("div");
            itemContent.appendChild(itemContentTitlePrice);
            itemContentTitlePrice.className = "cart__item__content__titlePrice";

            //Creation et insertion de la balise h2
            let title = document.createElement("h2");
            itemContentTitlePrice.appendChild(title);
            title.innerHTML = product[i].name;
            console.log(product[i].name);

            //Creation et insertion de la couleur
            let color = document.createElement("p");
            title.appendChild(color);
            color.innerHTML = product[i].color;
            console.log(product[i].color);

            //Creation et insertion du prix
            let price = document.createElement("p");
            itemContentTitlePrice.appendChild(price);
            price.innerHTML = product[i].price + " €";
            console.log(product[i].price);

            //Creation et insertion de l'élément "div" pour l'élèment div qui contiendra la quantité
            let itemContentSettings = document.createElement("div");
            itemContent.appendChild(itemContentSettings);
            itemContentSettings.className = "cart__item__content__settings";

            //creation et insertion de l'élément "div" pour la quantité
            let itemContentSettingsQuantity = document.createElement("div");
            itemContentSettings.appendChild(itemContentSettingsQuantity);
            itemContentSettingsQuantity.className =
                "cart__item__content__settings__quantity";

            //creation et insertion de l'élèment "Qté :"
            let Qty = document.createElement("p");
            itemContentSettingsQuantity.appendChild(Qty);
            Qty.innerHTML = "Qté : ";

            //creation et insertion de l'input pour la quantité
            let quantity = document.createElement("input");
            itemContentSettingsQuantity.appendChild(quantity);
            quantity.value = product[i].quantity;
            quantity.className = "itemQuantity";
            quantity.setAttribute("type", "number");
            quantity.setAttribute("min", "0");
            quantity.setAttribute("max", "100");
            quantity.setAttribute("name", "itemQuantity");
            console.log(product[i].quantity)

            // Creation et insertion de la "div" pour l'élèment supprimer
            let itemContentSettingsDelete = document.createElement("div");
            itemContentSettings.appendChild(itemContentSettingsDelete);
            itemContentSettingsDelete.className =
                "cart__item__content__settings__delete";

            // Creation et insertion de l'élement supprimer
            let supprimer = document.createElement("p");
            itemContentSettingsDelete.appendChild(supprimer);
            supprimer.className = "deleteItem";
            supprimer.innerHTML = "Supprimer la commande";
        }
    }
}
// displayItem();

// Modification de la quantité d'un produit
function modifyquantityproduct() {
    // élement ciblé pour la modification 
    let changeQuantity = document.querySelectorAll(".itemQuantity");

    // boucle pour le changement de la quantité
    for (let q = 0; q < changeQuantity.length; q++) {
        changeQuantity[q].addEventListener('change', (event) => {
            event.preventDefault();

            //Sélection des élèments de même ID et de même Couleur à modifier  
            let modifyQuantity = product[q].quantity;
            let modifyNumberValue = changeQuantity[q].valueAsNumber;
            const resultFind = product.find((el) => el.modifynumberProduct !== modifyQuantity);

            resultFind.quantity = modifyNumberValue;
            product[q].quantity = resultFind.quantity;

            localStorage.setItem('product', JSON.stringify(product));
            location.reload();
        })
    }
}
// modifyquantityproduct();

// Mise en place de la suppression de produit(s)
function deleteproduct() {
    let deleteItem = document.querySelectorAll('.deleteItem');

    // boucle pour la suppression d'un ou des produit(s)
    for (let d = 0; d < deleteItem.length; d++) {
        deleteItem[d].addEventListener('click', (event) => {
            event.preventDefault();

            // Sélection de l'élement de même ID et de même couleur à supprimer
            let deleteId = product[d].id;
            let deleteColor = product[d].color;

            product = product.filter(el => el.id !== deleteId || el.color !== deleteColor);

            localStorage.setItem('product', JSON.stringify(product));
            // Mise en place d'une alert pour validr la suppression du/des produit(s)
            alert('le produit à bien été supprimer');
            location.reload();
        })
    }
}
// deleteproduct();

// Calcul du nombres de produit et total du prix du panier
function totalPrice() {

    // Récuperation des quantités total
    let quantityProduct = document.getElementsByClassName('itemQuantity');
    let totalPoduct = quantityProduct.length,
        quantityTotal = 0;

    for (let t = 0; t < totalPoduct; t++) {
        quantityTotal += quantityProduct[t].valueAsNumber;
    }

    let totalProductQuantity = document.getElementById('totalQuantity');
    totalProductQuantity.innerHTML = quantityTotal;
    console.log(quantityTotal);

    // Récuperation du prix total
    priceTotal = 0;

    for (let t = 0; t < totalPoduct; t++) {
        priceTotal += (quantityProduct[t].valueAsNumber * product[t].price);
    }

    let totalProductPrice = document.getElementById('totalPrice');
    totalProductPrice.innerHTML = priceTotal;
    console.log(priceTotal);
}
// totalPrice();

// Gestion du formulaire
function validFormulaire() {
    // Variable contenant le formulaire
    let form = document.querySelector('.cart__order__form');

    //Variable contenant les RegExp : (Expression Reguliére) 
    let identityRegExp = new RegExp(`/^[0-9]{1,5}\s[a-zA-Z.-_']+\s[a-zA-Z.,-_']+\s[a-zA-Z'-_,]+\s[a-zA-Z]+\s[0-9]+$`, `g`);
    let addressRegExp = new RegExp('^[a-zA-Z0-9.-_]+[a-zA-Z0-9.-_]+[a-zA-Z0-9.-_]{2,99}$', 'g');
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    //   Ecouter la modification du Prenom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });
   
    //Validation du Prénom  
    const validFirstName = function (inputFirstName) {

        //Récuperation de la balise'p' message d'erreur 
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        
        // Test de l'expression Reguliere (RegExp)
        if (identityRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = 'Prénom valide';

        } else {
            firstNameErrorMsg.innerHTML = 'Champ invalide';

        }
    };
    
    //   Ecouter la modification du Nom
    form.lastName.addEventListener('change', function () {
        validlastName(this);
    });
   
    //Validation du Nom  
    const validlastName = function (inputLastName) {

        //Récuperation de la balise'p' message d'erreur 
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        
        // Test de l'expression Reguliere (RegExp)
        if (identityRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = 'Nom valide';

        } else {
            lastNameErrorMsg.innerHTML = 'Champ invalide';

        }
    };
    //   Ecouter la modification de l'Adresse
    form.address.addEventListener('change', function () {
        validAddress(this);
    });
    
    //Validation de l'Adresse  
    const validAddress = function (inputAddress) {

        //Récuperation de la balise'p' message d'erreur 
        let addressErrorMsg = inputAddress.nextElementSibling;
        
        // Test de l'expression Reguliere (RegExp)
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = 'Adresse valide';

        } else {
            addressErrorMsg.innerHTML = 'Champ invalide';

        }
    };
    //   Ecouter la modification de la ville
    form.city.addEventListener('change', function () {
        validCity(this);

    });
    //Validation de la Ville  
    const validCity = function (inputCity) {

        //Récuperation de la balise'p' message d'erreur 
        let cityErrorMsg = inputCity.nextElementSibling;

        // Test de l'expression Reguliere (RegExp)
        if (identityRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = 'Ville valide';

        } else {
            cityErrorMsg.innerHTML = 'Champ invalide';
        }
    };

    //   Ecouter la modification de l'Email'
    form.email.addEventListener('change', function () {
        validEmail(this);
    });
   
    //Validation de la Ville  
    const validEmail = function (inputEmail) {

        //Récuperation de la balise'p' message d'erreur 
        let emailErrorMsg = inputEmail.nextElementSibling;

        // Test de l'expression Reguliere (RegExp)
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = 'Email valide';

        } else {
            emailErrorMsg.innerHTML = 'Champ invalide';
        }
    };
}

window.onload = () => {

    // Appel de la fonction afficher les produits
    displayItem();

    // Appel de la fonction de modification de la quantité d'un produit
    modifyquantityproduct();

    // Appel de la fonction de suppression d'un produit
    deleteproduct();
    // Appel de la fonction de calcul de la quantité et du prix
    totalPrice();

    //Appel de la fonction pour la validation du formulaire
    validFormulaire();

}