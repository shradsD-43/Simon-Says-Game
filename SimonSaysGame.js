let gameSeq = [];
let userSeq = [];
let btnsColors = ['yellow', 'red', 'green', 'blue'];

let started = false;
let level = 0;

let heading = document.querySelector('h3');

//Computer turn
document.addEventListener("keypress", function() {
    if(started == false){
        started = true;
        console.log('game started!');

        levelUp();
    }
})

function levelUp() {
    userSeq = [];
    level++;
    heading.innerText = `Level ${level}`;

    //random btn choose
    let rndIdx = Math.floor(Math.random() *3);
    let rndColour = btnsColors[rndIdx];
    gameSeq.push(rndColour);
    console.log(gameSeq);
    let rndBtn = document.querySelector(`.${rndColour}`);

    btnFlash(rndBtn);
}

function btnFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 250);
}

//User Turn
let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener('click', btnPress);
}

function btnPress() {
    let btn = this; //calling obj is btn
    btnFlash(btn);

    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(gameSeq[idx] == userSeq[idx]){
        if(gameSeq.length == userSeq.length){ //last value in sequence
            setTimeout(levelUp, 800);
        }
    } else {
        heading.innerHTML = `Game Over! Your score was <b>${level}</b>. <br>Press any key to start over.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        }, 250);
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}