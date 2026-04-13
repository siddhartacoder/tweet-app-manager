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
  
  listaTweets.addEventListener("click", (e)=> {
    if(e.target.classList.contains("borrar-tweet")) {
      const id = Number(e.target.parentElement.dataset.tweetId);
      borrarTweet(id);
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    crearHTML();
  });
}

// ============================================
// FUNCTIONS
// ============================================

// Handles tweet submission: validates input, creates tweet object,
// updates state and re-renders the tweet list

function agregarTweet(e) {
  e.preventDefault();
  const tweet = tweetInput.value.trim();

  if (tweet === "") {
    mostrarError("El mensaje no puede estar vacio");
    return;
  }
  const tweetObj = {
    id: Date.now(),
    texto: tweet,
  };

  // Create a new tweets array using the spread operator to keep state immutable
  tweets = [...tweets, tweetObj];

  crearHTML();

  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";



      const li = document.createElement("li");
      li.textContent = tweet.texto;
      li.dataset.tweetId = tweet.id;
      listaTweets.appendChild(li);
      li.appendChild(btnEliminar);
    });
  }
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}
