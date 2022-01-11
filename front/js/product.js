const recupUrl = window.location.search;
const urlSearchParams = new URLSearchParams(recupUrl);
const id =urlSearchParams.get('id');
           console.log("ok")





// récuperation des ressources de L'API
// fetch("http://localhost:3000/api/products/"+id)
//     .then(res => res.json())
