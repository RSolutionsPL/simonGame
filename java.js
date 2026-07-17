//sounds:
const beep_1 = new Audio("audio/beep1.wav");
const beep_2 = new Audio("audio/beep2.wav");
const beep_3 = new Audio("audio/beep3.wav");
const beep_4 = new Audio("audio/beep4.wav");
const game_over = new Audio("audio/game_over.wav");
let topScore = 0;
let score;
//flags:
var flag = true;
var playerTurn = false;
let canClickF2 = false;
//function sounds
function sound(el){
    switch (el){
        case "#1":
        beep_1.play();
        break;

        case "#2":
        beep_2.play();
        break;

        case "#3":
        beep_3.play();
        break;

        case "#4":
        beep_4.play();
        break;
    }
}

//FANFARA//
function playFanfare() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  let time = audioCtx.currentTime;

  notes.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      time + (index === 3 ? 0.5 : 0.2)
    );

    osc.start(time);
    osc.stop(time + (index === 3 ? 0.5 : 0.2));

    time += index === 3 ? 0.5 : 0.2;
  });
}
///////////////////////////
// function highlight title
function highlight(number) {
el = "#" + number;
sound(el);

return new Promise(resolve => {
$(el).addClass("selected");
    setTimeout(function () {
    $(el).addClass("whiteb");}
    , 150); 
    
    setTimeout(function () {
    $(el).removeClass("whiteb");
    }, 350);

        setTimeout(function () {
    $(el).removeClass("selected");
    $(el).addClass("pressed");
    }, 800);
    }, 800);
return true;
} // e-Highligh_f



//funkcja turaGracza:
// - zbuduj od nowa z handlerem

async function playerTurnFun(arr){
return new Promise(resolve => {
canClickF2 = true;    
console.log("Tura gracza:");
$("h1").text("Your turn!");
$("body").css("background-color", "#444");

var newArrC = [...arr].reverse(); //kopia odwrócej tablicy


 
    //plaer turn musi przyjać długość sekwencji
    var clicks = newArrC.length;
    let canClick = true;
    
    $(".box").on("click", async  function () {

    if (!canClick || !canClickF2) {
    return;
    }
    canClick = false;
    setTimeout(function () {
        canClick = true;
    }, 1500);

    let id = $(this).attr("id");
    console.log("Kliknięto: " + id);
    
    if (highlight(id)){
        clicks--;
        console.log("Klik --");
        
        if(id == newArrC[clicks]){
            console.log("You win");
            await youWin();
        }
        else {
            console.log("You lose");
            await youLose();
            return;

        }

    }
    
    if ( clicks <= 0){
        $("body").css("background-color", "black");
        canClickF2 = false;   
        $(".box").off("click");
        return resolve();
 
    }
    });

    });
}//end_playerTurnFun

//funkcja sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//funkcja you lose
async function youLose() {
    $(".box").off("click");
    game_over.play();
    for (let i = 0; i < 3; i++) {
        $("body").css("background-color", "red");
        await sleep(120);
        $("body").css("background-color", "black");
        await sleep(120);
    }
    condit = false;
    flag = true;
    $("h1").text("Game Over!");
    $("button").text("Press Start");
    await sleep(300);
    $("#1").removeClass("pressed");
    $("#2").removeClass("pressed");
    $("#3").removeClass("pressed");
    $("#4").removeClass("pressed");
    await sleep(700);
    $("button").text("START");
    $("h1").text("Square Game");
    $("button").click(gameLoop);
    $("button").show();
    
    if ( topScore < score){
    playFanfare();    
    new confetti({
    particleCount: 200,
    spread: 120});   
    topScore = score;
    $("#top").text("top score: " + topScore);
    $("#top").css({"font-size": "200%"});
    await sleep(800);
    $("#top").css({"font-size": "100%"});
    new confetti({
    particleCount: 200,
    spread: 120});
    }
}


async function youWin(){
    $("body").css("background-color", "green");
        await sleep(250);
        $("body").css("background-color", "black");
        await sleep(250);
        $("body").css("background-color", "#444");
        score++;
        $("H2").text("score: " + score)
}

// czekaj na zakończenie -> kończy jak kliknie tyle razy ile potrzeba
// nasłuchuj 4 kwadraty
// po kliknięciu animacja klik + dzw,
// sprawdz czy kliknięto prawidłowe -> jak tak to animacja jak nie to skuśka i czerwone tło i restart;
// dodaj top score
// jak kliknieto to dodaj score;

 
// ==========  GAME ============== ////

async function gameLoop(){
var arr = []; // tablica[tablic] układów
var condit = true; // flaga gameloop
var a = 0;
score = 0;
$("H2").text("score: 0");
//FUNKCJE:
// function showSequence:
async function showSequence(){
$("h1").text("Remember this sequence...");
var newArr = [...arr].reverse(); //kopia odwrócej tablicy
while( newArr.length >= 1) {
    await sleep(1500);
    var pop = newArr.pop();
    console.log("Teraz wyświetle nr:" + pop );   //TEST wyświetlania elementu
    highlight(pop);
}
await sleep(1000);
}

//funkcja generateTiles:
//== Losowanie i dodanie  elmentu do tablicy;
function generateTiles(){ 
var random = Math.floor(Math.random() * 4 ) + 1 ; //losuj od 1 do 4
//console.log("wylosowałem " + random);
arr.push(random);

//test_tablicy
console.log("TEST: org.tablica ->:");
arr.forEach(function(elem){
console.log(elem);  
});
////////////
console.log("end_TEST ->"); 
}

//funkcja konieczna do wait
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



//pressed elementów po start:
$("#1").addClass("pressed");
$("#2").addClass("pressed");
$("#3").addClass("pressed");
$("#4").addClass("pressed");
$("button").hide();
//Flaga aby nie właczać wiele razy 
if ( flag == true ){
flag = false;
//===============GAMELOOOP===============//

// PĘTLA 
while (condit == true){


await generateTiles();
await showSequence();
//tura gracza
await playerTurnFun(arr);
await sleep(300);


//WARUNEK TESTOWY NA ZAKOŃCZENIE PĘTLI PO 2 OKRĄŻENIACH

}
}/* closing flag tag - gameloop*/ 
} /* closing tag gameFunction*/

$("button").click(gameLoop);
 
//po przejściu fanfara + top score + score + x
// i top score
//  function generate(){
    
//     losuj element
//     dodaj element do tablicy
//     jak się skończy -> tablice zwróć
// }

// function youLose(){
//     animacja przegrania
// }

// function game(){
//     gdy wciśniesz start:
//     1) zmień start na restart
//     2) rozpocznij gameloop
    
//     generuj 1 -> czekaj na powtórkę 
//     generuj 2 -> generuj 3 i tak dalej...
//     czekaj na powtórkę ...

//     gdy kuśka -> zapisz wynik + youLose() +

/* 
        RSolutions: 
        Thanks for digging through this code.

                                        */