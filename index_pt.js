//! index.js -> index.html
const buttons = [];
for (let i = 1; i <= 9; i++) {
    buttons.push(document.getElementById(`btn${i}`)); //*Pushes the buttons to the array
}

//!let曬所有要用嘅variables
let turn = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let win = ""
let resetBtn = document.getElementById("resetBtn")
const OSfx = new Audio("sfx.wav");
const XSfx = new Audio("sfxHigh.wav");
const winSfx = new Audio("win.wav");
const TitleTurn = document.getElementById("myTurn");
//*buttons -> name of the array
//*.forEach -> applies logic to everything in the array
//*button -> name of the element
//* (button)=>"  is equal to function(button){}"  
//*ARRAY.forEach((name)=>{(codes)})
console.log(buttons)
resetBtn.onclick = function(){
    reset();
}

let currentLanguage = 'en'; // Default language







buttons.forEach((button) =>  {
    button.onclick = function() {
        //!如果user撳嘅掣已經寫咗X或者O，乜都唔做。
        if (button.textContent === "X" || button.textContent === "O") {
            return; 
        }

        
        //!如果已經有人贏咗，乜都唔做。
        if (win == "X" || win == "O"){
            return;
        }
        console.log(`${button.id} clicked`);

        //!將位置擺係board嘅list
        board[buttons.indexOf(document.getElementById(button.id))] = turn; //*Pushes the turn to the board (FINALLY)

        //!係嘅掣度寫嘢
        button.textContent = turn;

        //!call去寫到邊個嘅turn
        whoseTurn()

        //!call吓係咪有人贏咗
        checkWin()
        //!call如果有人贏咗，就顯示贏咗嘅人
        showWin()
        //!call吓係咪打和
        checkDraw()

        //!倒轉turn
        if (turn === "X") {
            XSfx.play();
            turn = "O";
        } else {
            OSfx.play();
            turn = "X";
        } //*Toggle Turn
        console.log(turn);


    };
});
function checkWin(){
    //!橫類
    if (board[0] == turn && 
        board[1] == turn && 
        board[2] == turn){
        win = turn;
        highlightWinningCells([0, 1, 2]); // 填色
    }
    else if 
        (board[3] == turn && 
        board[4] == turn && 
        board[5] == turn){
        win = turn;
        highlightWinningCells([3, 4, 5]); // 填色
    }
    else if 
        (board[6] == turn  && 
        board[7] == turn && 
        board[8] == turn){
        win = turn;
        highlightWinningCells([6, 7, 8]); // 填色
    }
    //!直類
    else if 
        (board[0] == turn  && 
        board[3] == turn && 
        board[6] == turn){
        win = turn;
        highlightWinningCells([0, 3, 6]); // 填色
    }
    else if 
        (board[1] == turn  && 
        board[4] == turn && 
        board[7] == turn){ 
        win = turn;
        highlightWinningCells([1, 4, 7]); // 填色
    }
    else if 
        (board[2] == turn  && 
        board[5] == turn && 
        board[8] == turn){ 
        win = turn;
        highlightWinningCells([2, 5, 8]); // 填色
    }
    //!斜類
    else if 
        (board[0] == turn  && 
        board[4] == turn && 
        board[8] == turn){
        win = turn;
        highlightWinningCells([0, 4, 8]); // 填色
    }
    else if 
        (board[2] == turn  && 
        board[4] == turn && 
        board[6] == turn){
        win = turn;
        highlightWinningCells([2, 4, 6]); // 填色
    }
}

//!如果有人贏咗，就顯示贏咗嘅人
function showWin(){
    //!係myTurn嘅内容寫邊個贏咗
    if (win == "X"){
        TitleTurn.textContent = "X ganhou!"
        winSfx.play();
    }
    else if (win == "O"){
        TitleTurn.textContent = "O ganhou!"
        winSfx.play();
    }
}


//!寫輪到邊個
function whoseTurn(){
    if (turn == "X"){
        TitleTurn.textContent = "Rodada do O!"
    }
    else if (turn == "O"){
        TitleTurn.textContent = "Rodada do X!"
    }

}

//!查下係咪打和
function checkDraw(){
    if (board[0] != "" && board[1] != "" && board[2] != "" && board[3] != "" && board[4] != "" && board[5] != "" && board[6] != "" && board[7] != "" && board[8] != "" && win == "" ){
        TitleTurn.textContent = "Empate!"
        highlightWinningCells([0,1,2,3,4,5,6,7,8])
    }
    
}



//!如果有人贏咗，就係個掣度填上深顏色

function highlightWinningCells(slots){
    slots.forEach(index => {
        buttons[index].style.color = "#48A6A7";
        buttons[index].style.backgroundColor = "#114b7e";

    })
}




//!重設游戲
function reset() {

    //!重設所有variables
    board = ["", "", "", "", "", "", "", "", ""];
    win = "";
    buttons.forEach(button => {
        button.textContent = "";
        button.style.color = "";               // Resets color with transition
        button.style.backgroundColor = "";     // Resets background color with transition
        button.style.borderColor = "";         // Resets border color with transition
        button.style.boxShadow = "";           // Resets box shadow with transition
    });

    //!令turn隨機變成X或O
    if (Math.random() > 0.5 ){
        turn = "X"
    }
    else{
        turn = "O"
    }

    //!call寫輪到邊個
    whoseTurn()
}

