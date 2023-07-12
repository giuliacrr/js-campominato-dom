"use strict"
//Div container
const boxContainer = document.getElementById("divs-container");
//btn
const btnGenerate = document.querySelector(".btn-gen");
//Select quantity of divs 
const quantity = document.getElementById("select-quantity")


btnGenerate.addEventListener("click", function () {
  boxContainer.innerHTML = "";
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
  let divs = [];
  let points = [];//Points array
  const bombe = bombz(x);//Declaring this const, It will return the array containing the bombs
  for (let i = 0; i < x; i++) {
    let div = document.createElement("div"); //Virtual Div
    boxContainer.append(div);//append the div into the container
    div.classList.add("div-style", "d-flex", "justify-content-center", "align-items-center");//Add the class at each div
    div.innerHTML = i + 1; //Print the number inside the div
    div.style.flexBasis = `calc(100% / ${square})`;


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
        alert("Boom boom. You lost. Your score:" + " " + points.length);
        console.log("You lost");
        return //The return makes the if go back to the beginning, not adding the score points if we click a bomb
      }
      //Each cell clicked, adds a point ( if it's not a bomb) and prints in console the
      points.push(1);
      console.log("Your score is:" + " " + points.length)
      //VICTORY CLICKING EVERY BLUE CELL
      if (points.length === (x - bombe.length)) {
        alert("You won the game! Total score possible:" + " " + (points.length - bombe.length));
      }
      console.log(bombe.length)
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