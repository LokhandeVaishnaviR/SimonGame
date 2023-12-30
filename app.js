let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let max = 0;

let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
});


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`

    let randIdx = Math.floor(Math.random()*3);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`)

    gameSeq.push(randCol);
    console.log(gameSeq);
    btnFlash(randBtn);
}


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash")
    }, 250);
}


function checkAns(idx){
    // console.log("curr level", level);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000)
            // levelUp();
        }
        // console.log("same value");
    }else{
        max = Math.max(max, level);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Your highes Score is <b>${max}</b> <br>Press any key to start:)`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor)

    checkAns(userSeq.length-1);    
}

let allBtns = document.querySelectorAll(".btn")

for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function reset(){

    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}