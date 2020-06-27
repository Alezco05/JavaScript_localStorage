// Variables
const listaTweets = document.getElementById("lista-tweets");

// Event Listeners

evenListerns();

function evenListerns() {
  // Cuando se envia el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  // Borrar Tweets
  listaTweets.addEventListener("click", borraTweet);

  // Cargar elementos del local Storage
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

//Funciones

function agregarTweet(e) {
  e.preventDefault();
  //leer el valor del textarea
  const tweet = document.querySelector("#tweet").value;
  //Crear boton de eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";
  //Crear elemento y añadir el contenido a la lista
  const li = document.createElement("li");
  li.innerText = tweet;
  //añade el boton de borrar al tweet
  li.appendChild(botonBorrar);
  //añade el tweet a la lista
  listaTweets.appendChild(li);

  //Añadir a Local Storage
  agregarTweetLocalStorage(tweet);
}

// Borrar el tweet

function borraTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
     e.target.parentElement.remove();
     borraTweetLocalStorage(e.target.parentElement.innerText);
  };
}

// 

function borraTweetLocalStorage(element){
     let tweets, tweetBorrar;
     //Elmina la X del tweet
     tweetBorrar = element.substring(0,element.length - 1);
     tweets = obtenerTweetsLocalStorage();
     tweets.forEach((tweet,index) => {
          if(tweetBorrar === tweet) tweets.splice(index,1)
     });
     localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Agregar Tweet al local Storage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  //Añadir el nuevo tweet
  tweets.push(tweet);
  // Convertir de string a JSON para local Storage
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
// Comprobar que haya elementos en el localStorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
  let tweets;
  //Revisamos los valores del local storage
  if (localStorage.getItem("tweets") === null) tweets = [];
  else tweets = JSON.parse(localStorage.getItem("tweets"));
  return tweets;
}
// Cargar La lista de los tweets
function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach((tweet) => {
    //Crear boton de eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";
    //Crear elemento y añadir el contenido a la lista
    const li = document.createElement("li");
    li.innerText = tweet;
    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);
  });
}
