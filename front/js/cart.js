
// Récuperer les données du  Localstorage 
let product = [];
product = JSON.parse(localStorage.getItem('product'));
console.table(product)
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
            article.setAttribute("data-id", product.id);
            console.log(product[0].id)

            //Creation et insertion de "div" pour l'image du produit
            let divImg = document.createElement("div");
            article.appendChild(divImg);
            divImg.className = "cart__item__img";

            //Creation et Insertion de l'image
            let img = document.createElement("img");
            divImg.appendChild(img);
            img.src = product[i].imageUrl;
            img.alt = product[i].image.altTxt;
            // console.log(products[i].image)

            //creation et insertion de l'élément "div" description produit
            let itemContent = document.createElement("div");
            article.appendChild(itemContent);
            itemContent.className = "cart__item__content";
            console.log(product[0].imageUrl)

            //Creation et insertion de l'élément "div" pour le nom, la couleur, et le prix du produit
            let itemContentTitlePrice = document.createElement("div");
            itemContent.appendChild(itemContentTitlePrice);
            itemContentTitlePrice.className = "cart__item__content__titlePrice";

            //Creation et insertion de la balise h2
            let title = document.createElement("h2");
            itemContentTitlePrice.appendChild(title);
            title.innerHTML = product[i].name;
            console.log(product[i].name)

            //Creation et insertion de la couleur
            let color = document.createElement("p");
            title.appendChild(color);
            color.innerHTML = product[i].color;
            console.log(product[i].color)

            //Creation et insertion du prix
            let price = document.createElement("p");
            itemContentTitlePrice.appendChild(price);
            price.innerHTML = product[i].price + " €";
            console.log(product[i].price)

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
            quantity.setAttribute("min", "1");
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
            supprimer.innerHTML = "Supprimer";
        }
    }
}
displayItem();

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

totalPrice();