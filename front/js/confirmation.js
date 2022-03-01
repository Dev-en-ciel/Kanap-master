function numberOrder(){
    let recupUrlOrder = window.location.search;
    let urlOrder = new URLSearchParams(recupUrlOrder);
    let orderId = urlOrder.get("orderId");
    document.getElementById("orderId").textContent = orderId;
}
    localStorage.clear();
    // Appel de la fonction 
    numberOrder();