//Sorry in advance for the mess. 
"use strict"
//Div container
const boxContainer = document.getElementById("divs-container");
//win or lose title
const winOrLose = document.getElementById("win-or-lose-title");
const plsReload = document.getElementById("pls-reload");
//btn
const btnGenerate = document.querySelector(".btn-gen");
//Select quantity of divs 
const quantity = document.getElementById("select-quantity")


btnGenerate.addEventListener("click", function () {
  boxContainer.innerHTML = "";
  boxContainer.style.zIndex = 1;
  document.getElementById("your-score-is").innerHTML = "Your current score is:";
  document.getElementById("score").innerHTML = 0;
  winOrLose.innerHTML = "";
  winOrLose.innerHTML = "";
  plsReload.innerHTML = "";
  //-------------QUANTITY OF DIVS
  //Divs quantity
  const quantityValue = parseInt(quantity.value) // 1 = 49, 2 = 81, 3 = 100
  let x = 0;
  let square = 0;
  if (quantityValue === 1) {
    square = Math.sqrt(49);
    x = 49;
  } else if (quantityValue === 2) {
    square = Math.sqrt(81);
    x = 81;
  } else if (quantityValue === 3) {
    square = Math.sqrt(100);
    x = 100;
  }
  //------------DIVS
  //Cycle that generates the same div x times
  let divs = [];//Divs array
  let points = [];//Points array
  const bombe = bombz(x);//Declaring this const, It will return the array containing the bombs
  //Cycle to stamp the divs
  for (let i = 0; i < x; i++) {
    let div = document.createElement("div"); //Virtual Div
    boxContainer.append(div);//append the div into the container
    div.classList.add("div-style");//Add the class at each div
    div.innerHTML = i + 1; //Print the number inside the div
    div.style.flexBasis = `calc(100% / ${square})`;
    //Attributo data-red="bomba" ai div 
    if (bombe.indexOf(i + 1) >= 0) {
      div.dataset.red = "bomba";
    }
    //addEventListner to make the div become blue on click + print in console of the div number
    div.addEventListener("click", function () {
      //Check if the div has already been clicked 
      if (div.dataset.click === "clicked") {
        return;
      }
      div.classList.add("bg-primary");
      console.log("Div number" + " " + (i + 1));
      div.dataset.click = "clicked";
      //Red cell -bomb + loss message
      if (bombe.indexOf(i + 1) >= 0) {
        div.classList.add("bg-danger");
        alert("Boom boom. 🧨🔥 You lost. Your score:" + " " + points.length);
        console.log("You lost");
        winOrLose.innerHTML = "You Lost!";
        winOrLose.classList.add("text-danger", "text-center");
        plsReload.innerHTML = "Press on Generate again to re-start the game.";
        boxContainer.style.zIndex = -1;
        //To make all the bombs red   BACKTICK alt+96 tastierino
        //Prende il data-red="bomba" dalla riga 50
        let dataBomb = document.querySelectorAll(`[data-red="bomba"]`);
        for (let j = 0; j < bombe.length; j++) {
          dataBomb[j].classList.add("bg-danger");
        }
        return //The return makes the if go back to the beginning, not adding the score points if we click a bomb
      }
      //Each cell clicked, adds a point ( if it's not a bomb) and prints in console the
      points.push(1);
      console.log("Your score is:" + " " + points.length)
      document.getElementById("score").innerHTML = parseInt(points.length);
      //VICTORY CLICKING EVERY BLUE CELL
      if (points.length === (x - bombe.length)) {
        alert("You won the game! 🎉✨ Total score possible:" + " " + (points.length - bombe.length));
        boxContainer.style.zIndex = -1;
        winOrLose.innerHTML = "You Won!";
        winOrLose.classList.add("text-success", "text-center");
        plsReload.innerHTML = "Press on Generate again to re-start the game.";
      }
    })
    //Push the divs in the divs array 
    divs.push(i + 1);
  }
})


//FUNCTION BOMBS
function bombz(b) {
  let bombs = [];
  for (let y = 0; y < 16; y++) {
    const randomBomb = Math.floor(Math.random() * b) + 1;
    if (bombs.indexOf(randomBomb) === -1) {
      bombs.push(randomBomb);
    } else {
      y--
    }
  }
  console.log("Those are the bombs:");
  console.log(bombs);
  return bombs;
}