// Récupération de order id dans l'URL
function getProductId() {
  let params = new URL(window.location.href).searchParams;
  return params.get('orderId');
}
window.onload = () => {
  document.getElementById("orderId").textContent = getProductId();
}

