//Challenge 1: Your Age in Days
function ageInDays() {
  var birthYear = prompt("What year were you born.. Good friend?");
  var ageInDayss = (2021 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + " days old."
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

// Challange 2: Generate Cat
function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  image.style.width = "250px";
  image.style.height = "auto";
  div.appendChild(image);
}

// Challange 3: Rock, Paper, & Scissors
function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  results = decideWinner(humanChoice, botChoice); //returns  [ourscore, computerscore] eg: [0,1] :humuan lost | bot won
  message = finalMessage(results); // 'final result of who won i.e {'message': 'You won!', 'color':'green'}...
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabse = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabse[yourChoice][computerChoice];
  var computerScore = rpsDatabse[yourChoice][computerChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You tied!", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(humanImgChoice, botImgChoice, finalMessage) {
  var imgDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  // removing all rps image from the frontend

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imgDatabase[humanImgChoice] +
    "' height= 150 width= 150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);' >";
  botDiv.innerHTML =
    "<img src='" +
    imgDatabase[botImgChoice] +
    "' height= 150 width= 150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);' >";
  messageDiv.innerHTML =
    "<h1 style='color:" +
    finalMessage["color"] +
    "; font-size:60px; padding:30px;'>" +
    finalMessage["message"] +
    "<h1>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

//challenge 4: change color of all button.

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for(let i =0; i< all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonsRed();
    } else if(buttonThingy.value === 'green'){
        buttonsGreen();
    } else if(buttonThingy.value === 'reset'){
        buttonsReset();
    } else if(buttonThingy.value === 'random'){
        buttonsRandom();
    }
}

function buttonsRed(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonsRandom(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(buttonrandomColorSelector());
    }
}

function buttonrandomColorSelector(){
    var colors = [ 'btn-danger', 'btn-success', 'btn-warning', 'btn-primary', 'btn-secondary', 'btn-info', 'btn-light', 'btn-dark'];
    return colors[Math.floor(Math.random() * 8)];
}

function buttonsReset(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}



//Challange 5: Blackjack

let blackjackGame={
  'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0 },
  'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score':0 },
  'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  'cardMaps': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10, 'A':[10,1]},
  'wins':0,
  'losses':0,
  'draws':0,
  'isStand': 'false',
  'turnOver': 'false'
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

//ours hit funtion
function blackjackHit(){
  if(blackjackGame['isStand'] === 'false'){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard(){
  let randomIndex= Math.floor(Math.random() *13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
  if(activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal(){
  if(blackjackGame['turnOver'] === 'true'){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(i=0; i< yourImages.length; i++){
      yourImages[i].remove();
    }

    for(i=0; i< dealerImages.length; i++){
      dealerImages[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color= '#ffffff';

    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').style.color= '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = '#000000';
    
    blackjackGame['isStand'] = 'false';
    blackjackGame['turnOver'] = 'false';
  }
}

function updateScore(card, activePlayer){
  //If adding 11 keeps me below 21 then add 11 else add 1.
  if(card === 'A'){
    if(activePlayer['score'] + blackjackGame['cardMaps'][card][0] <= 21){
        activePlayer['score']+= blackjackGame['cardMaps'][card][0];
    }else{
      activePlayer['score'] += blackjackGame['cardMaps'][card][1];
    }
  }
  else{
    activePlayer['score'] += blackjackGame['cardMaps'][card];
  }
}

function showScore(activePlayer){
  if(activePlayer['score'] > 21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color= 'red';

  }else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];

  }
}

// dealer side:
function sleep(ms){
  return new Promise(resolve =>setTimeout(resolve, ms));
}

async function dealerLogic(){
  blackjackGame['isStand'] = 'true';
  if(blackjackGame['turnOver'] === 'false'){
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === 'true'){
      let card = randomCard();
      showCard(card,DEALER);
      updateScore(card,DEALER);
      showScore(DEALER);
      await sleep(800);
    }
    blackjackGame['turnOver'] = 'true';
    let winner = computeWinner();
    showResult(winner);
  }
}

//compute Winner and return who won
//update the wins, loss, draws
function computeWinner(){
  let winner;

  if (YOU['score']<= 21){
    //condition : higher score than dealer or when dealer busts but you're or under
    if((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)){
      blackjackGame['wins']++;
      winner = YOU;

    }else if(YOU['score']< DEALER['score']){
      blackjackGame['losses']++;
      winner = DEALER;

    }else if( YOU['score'] === DEALER['score']){
      blackjackGame['draws']++;
    }

  // codition: when user busts but dealer doesn't
  } else if(YOU['score']> 21 && DEALER['score']<= 21){
    blackjackGame['losses']++;
    winner= DEALER;

  } else if(YOU['score'] >21 && DEALER['score']>21){
    blackjackGame['draws']++;
  }
  return winner;
}

// show result in the front-end.
// upadate the win, loss, and draws in front-end.
function showResult(winner){

  let message, messageColor;

  if(blackjackGame['turnOver'] === 'true'){

    if(winner == YOU){
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You won!';
      messageColor = 'green';
      winSound.play();

    }else if(winner === DEALER){
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost!';
      messageColor = 'red';
      lossSound.play();

    }else{
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You drew!';
      messageColor = 'black';

    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}