/*
 * Tweet Manager with LocalStorage
 * Description: Simple tweet CRUD using LocalStorage persistence
 */

// ============================================
// SELECTORS
// ============================================
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
const tweetInput = document.querySelector("#tweet");
const contenido = document.querySelector("#contenido");

// tweet list container in the DOM
let tweets = [];

// ============================================
// EVENT LISTENERS
// ============================================
eventListeners();

function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);
}

// ============================================
// FUNCTIONS
// ============================================

function agregarTweet(e) {
  e.preventDefault();
  const tweet = tweetInput.value;

  if (tweet === "") {
    mostrarError("El mensaje no puede estar vacio");
    return;
  }
  console.log("agregando tweet");
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //insertamos el mensaje en el contenido
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}
