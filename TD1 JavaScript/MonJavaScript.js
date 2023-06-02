var A_tableau = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

for(let I_Number=0 ; I_Number < 20 ; I_Number++) {
    A_tableau.push(getRandomInt(-10,40))}
    
console.log(A_tableau);

let I_TableauIndex = 0;

/* 
* querySelector permet de sélectionner des éléments 
* en utilisant des sélecteurs CSS 
* (similaire à getElementById mais plus permissif)
*/
let S_OlalaIlFaitFroid = '<div id="message">Brrrrrrr, un peu froid ce matin, mets ta cagoule !</div>';
let S_OlalaIlFaitChaud = '<div id="message">Caliente ! Vamos a la playa, ho hoho hoho !!</div>';

setInterval(() => {
  if (document.querySelector("#message") != null){
    document.querySelector("#message").remove();
  }

  let value_container = document.querySelector("#value-container");
  value_container.innerHTML = A_tableau[I_TableauIndex] + " °C";

  let georges = document.querySelector("#georges");
  

  value_container.classList.remove("bordure-bleu", "bordure-verte", "bordure-orange", "bordure-rouge");

  if(A_tableau[I_TableauIndex] >=-10 && A_tableau[I_TableauIndex] < 0)
  {
    value_container.classList.add("bordure-bleu");
    georges.insertAdjacentHTML("afterbegin", S_OlalaIlFaitFroid);
  }
  else if (A_tableau[I_TableauIndex] >=0 && A_tableau[I_TableauIndex] < 20)
  { 
    value_container.classList.add("bordure-verte");
  }
  else if (A_tableau[I_TableauIndex] >=20 && A_tableau[I_TableauIndex] < 30)
  {
    value_container.classList.add("bordure-orange");
  }
  else if (A_tableau[I_TableauIndex] >=30 && A_tableau[I_TableauIndex] <= 40)
  {
    value_container.classList.add("bordure-rouge");
    georges.insertAdjacentHTML("afterbegin", S_OlalaIlFaitChaud);
  }

  I_TableauIndex += 1;

  if (I_TableauIndex > A_tableau.length - 1) 
  {
    I_TableauIndex = 0;
  }
}, 2000)


/* Autre version plus courte sans le if
setInterval(() => {
  document.querySelector("#value-container").innerHTML = A_tableau[I_TableauIndex];
  I_TableauIndex = (I_TableauIndex + 1) % A_tableau.length;
}, 2000)
*/