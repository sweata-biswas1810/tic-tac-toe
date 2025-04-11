// Tic Tac Toe Game
//selector------>

const boxes = document.querySelectorAll(".box");
const msg = document.querySelector("#msg");
const restartBtn = document.querySelector("#restartbtn");
const display = document.querySelector(".display");
const newbtn = document.querySelector("#newbtn");

//winning combinations------->
const winnerscope = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//global variables------->

let turnx = true;
let count = 0;
let gameOver = false;
// This function is called to disable all boxes----->

function disableBoxes() {
  boxes.forEach(box => box.disabled = true);
}
// This function is called to enable all boxes----->

function enableBoxes() {
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("bgcolour");
  });
}

// This function is called when a player wins----->

function showWin(winner, winCombo) {
  winCombo.forEach(index => {
    boxes[index].classList.add("bgcolour");
  });
  msg.innerText =` ${winner} is the winner`;
  display.classList.remove("hide");
  gameOver = true;
  disableBoxes();
}

// This function is called when the game is a draw---->

function gamedraw() {
  msg.innerText = "Game was a Draw";
  display.classList.remove("hide");
  gameOver = true;
}
// This function checks if there is a winning combination---->

function checkWin() {
  for (let scope of winnerscope) {
    const [i1, i2, i3] = scope;
    const val1 = boxes[i1].innerText;
    const val2 = boxes[i2].innerText;
    const val3 = boxes[i3].innerText;
    if (val1 && val1 === val2 && val2 === val3) {
      showWin(val1, [i1, i2, i3]);
      return true;
    }
  }
  return false;
}
// This function is called when the game starts----->

function startgame() {
  turnx = true;
  count = 0;
  gameOver = false;
  display.classList.add("hide");
  enableBoxes();
}

// This function is called when a box is clicked----->

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (gameOver || box.innerText !== "") return;
    box.innerText = turnx ? "X" : "O";
    box.disabled = true;
    turnx = !turnx;
    count++;
    if (!checkWin() && count === 9) gamedraw();
  });
});

newbtn.addEventListener("click", startgame);
restartBtn.addEventListener("click", startgame);