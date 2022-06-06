/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_ENTER = 13;

var startScore = 0;
var score = 0;

var startSpelerX = 400;
var startSpelerY = 400;
var spelerX = 400; // x-positie van speler
var spelerY = 400; // y-positie van speler

var startVijandX = 900;
var startVijandY = 400;
//var vijandX = 900; // x-positie van vijand
//var vijandY = 400; // y-positie van vijand
var vijandBeweegt = true;
var SnelheidVijand = 0.5;

var startKogelX = -10;
var startKogelY = 0;
var kogelX = -10; // x-positie van kogel
var kogelY = 0; // y-positie van kogel
var kogelVliegt = false;

var doelwitX = 0;
var doelwitY = 0;
var plaatsAfvurenX = 0;
var plaatsAfvurenY = 0;

var kogelSnelheid = 1;

var aantalVijand = 3;
var vijandX = [];
var vijandY = [];
var richtingVijandY = [];
var richtingVijandX = [];
var correctieSnelheidVijand = [];
var snelheidVijandY = [];
var snelheidVijandX = [];

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * functies voor in de tekenAlles functie
 */
for (var i = 0; i < aantalVijand; i ++) {
  var vijandKijktRechts = function() {
    //torso
    fill(3, 6, 84);
    rect(vijandX[i], vijandY[i], 30, 50); 
    
    //benen
    //linker been
    fill(255, 255, 255);
    rect(vijandX[i], vijandY[i]+50, 10, 50); //broek links(voor kijker)
    fill(0, 0, 0);
    rect(vijandX[i], vijandY[i]+80, 10, 20); //schoen links(voor kijker)
    
    //rechter been
    fill(252, 252, 255);
    rect(vijandX[i]+20, vijandY[i]+50, 10, 50); //broek rechts(voor kijker)
    fill(0, 0, 0);
    rect(vijandX[i]+20, vijandY[i]+80, 10, 20); //schoen rechts(voor kijker)
    
    //rechter arm (schouder achter geweer)
    fill(3, 6, 84);
    rect(vijandX[i]+30, vijandY[i], 10, 20); //mouw boven stuk (bluaw)
    
    //geweer
    fill(117, 54, 54);
    rect(vijandX[i], vijandY[i]+10, 85, 8); //houten stuk
    
    fill(105, 101, 101);
    rect(vijandX[i]+25, vijandY[i]+8, 75, 5); //loop
    
    fill(148, 138, 138);
    rect(vijandX[i]+95, vijandY[i]+5, 30, 3);
    
    //arm
    //linker arm (van kijker perspecftief)
    fill(3, 6, 84);
    rect(vijandX[i]-10, vijandY[i], 10, 25); //mouw boven stuk (bluaw)
    
    fill(3, 6, 84);
    rect(vijandX[i]-10, vijandY[i]+15, 40, 10); //mouw boven stuk onderarm(bluaw)
    
    fill(145, 16, 16);
    rect(vijandX[i]+20, vijandY[i]+15, 10, 10); //mouw onderstuk (rood)
    
    fill(230, 200, 185);
    rect(vijandX[i]+30, vijandY[i]+15, 10, 10); //hand
    
    //hoofd 
    fill(230, 200, 185);
    rect(vijandX[i] +5, vijandY[i]-20, 20, 20); //head
    
    //kraag rood
    fill(145, 16, 16); 
    rect(vijandX[i]+4, vijandY[i]-2, 22, 5); 
    
    //hoed
    fill(0, 0, 0);
    rect(vijandX[i]+3, vijandY[i]-50, 25, 30); //hoed
    fill(201, 168, 0);
    rect(vijandX[i]+10, vijandY[i]-27, 10, 7);// plaat op hoed
    fill(145, 16, 16);
    rect(vijandX[i]+25, vijandY[i]-60, 6, 15); //veer op hoed
  }
  
  
  var vijandKijktLinks = function() {
    //torso
    fill(3, 6, 84);
    rect(vijandX[i], vijandY[i], 30, 50); 
    
    //benen
    //linker been
    fill(255, 255, 255);
    rect(vijandX[i], vijandY[i]+50, 10, 50); //broek links(voor kijker)
    fill(0, 0, 0);
    rect(vijandX[i], vijandY[i]+80, 10, 20); //schoen links(voor kijker)
    
    //rechter been
    fill(252, 252, 255);
    rect(vijandX[i]+20, vijandY[i]+50, 10, 50); //broek rechts(voor kijker)
    fill(0, 0, 0);
    rect(vijandX[i]+20, vijandY[i]+80, 10, 20); //schoen rechts(voor kijker)
    
    //rechter arm (schouder achter geweer)
    fill(3, 6, 84);
    rect(vijandX[i]-10, vijandY[i], 10, 20); //mouw boven stuk (bluaw)
    
    //geweer
    fill(117, 54, 54);
    rect(vijandX[i]+30, vijandY[i]+10, -85, 8); //houten stuk
    
    fill(105, 101, 101);
    rect(vijandX[i], vijandY[i]+8, -75, 5); //loop
    
    fill(148, 138, 138);
    rect(vijandX[i]-70, vijandY[i]+5, -30, 3);
    
    //arm
    //linker arm (van kijker perspecftief)
    fill(3, 6, 84);
    rect(vijandX[i]+30, vijandY[i], 10, 25); //mouw boven stuk (bluaw)
    
    fill(3, 6, 84);
    rect(vijandX[i]+30, vijandY[i]+15, -20, 10); //mouw boven stuk onderarm(bluaw)
    
    fill(145, 16, 16);
    rect(vijandX[i], vijandY[i]+15, 10, 10); //mouw onderstuk (rood)
    
    fill(230, 200, 185);
    rect(vijandX[i]-10, vijandY[i]+15, 10, 10); //hand
    
    //hoofd 
    fill(230, 200, 185);
    rect(vijandX[i] +5, vijandY[i]-20, 20, 20); //head
    
    //kraag rood
    fill(145, 16, 16); 
    rect(vijandX[i]+4, vijandY[i]-2, 22, 5); 
    
    //hoed
    fill(0, 0, 0);
    rect(vijandX[i]+3, vijandY[i]-50, 25, 30); //hoed
    fill(201, 168, 0);
    rect(vijandX[i]+10, vijandY[i]-27, 10, 7);// plaat op hoed
    fill(145, 16, 16);
    rect(vijandX[i]+25, vijandY[i]-60, 6, 15); //veer op hoed
  }
}


var spelerKijktRechts = function() {
  //torso
  fill(181, 9, 9);
  rect(spelerX, spelerY, 30, 50); //vest of torso
  
  //riem
  fill(255, 255, 255);
  rect(spelerX, spelerY+35, 30, 5 );
  fill(201, 168, 0);
  rect(spelerX+13, spelerY+35, 5, 5); //gesp
  
  //benen
  //linker been
  fill(12, 15, 138);
  rect(spelerX, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX, spelerY+90, 10, 10); //schoen
  
  //rechter been
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX+20, spelerY+90, 10, 10); //schoen
  
  //rechter arm (schouder achter geweer)
  fill(181, 9, 9);
  rect(spelerX+30, spelerY, 10, 20); //mouw boven stuk (rood)
  
  //geweer
  fill(117, 54, 54);
  rect(spelerX, spelerY+10, 85, 8); //houten stuk
  
  fill(105, 101, 101);
  rect(spelerX+25, spelerY+8, 75, 5); //loop
  
  fill(148, 138, 138);
  rect(spelerX+95, spelerY+5, 30, 3);
  
  //arm
  //linker arm (van user perspecftief)
  fill(181, 9, 9);
  rect(spelerX-10, spelerY, 10, 25); //mouw boven stuk (rood)
  
  fill(181, 9, 9);
  rect(spelerX-10, spelerY+15, 40, 10); //mouw boven stuk onderarm(rood)
  
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+15, 10, 10); //mouw onderstuk (blauw)
  
  fill(230, 200, 185);
  rect(spelerX+30, spelerY+15, 10, 10); //hand
  
  //hoofd
  fill(230, 200, 185);
  rect(spelerX +5, spelerY-20, 20, 20); //head
  
  //kraag blauw
  fill(12, 15, 138);
  rect(spelerX+4, spelerY-2, 22, 5);
  
  //hoed
  fill(0, 0, 0);
  rect(spelerX+3, spelerY-50, 25, 30); //hoed
  fill(192, 192, 192);
  rect(spelerX+10, spelerY-27, 10, 7);// plaat op hoed
}


var spelerKijktLinks = function() {
  //torso
  fill(181, 9, 9);
  rect(spelerX, spelerY, 30, 50); //vest of torso
  
  //riem
  fill(255, 255, 255);
  rect(spelerX, spelerY+35, 30, 5 );
  fill(201, 168, 0);
  rect(spelerX+13, spelerY+35, 5, 5); //gesp
  
  //benen
  //linker been
  fill(12, 15, 138);
  rect(spelerX, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX, spelerY+90, 10, 10); //schoen
  
  //rechter been
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX+20, spelerY+90, 10, 10); //schoen
  
  //rechter arm (schouder achter geweer)
  fill(181, 9, 9);
  rect(spelerX-10, spelerY, 10, 20); //mouw boven stuk (rood)
  
  //geweer
  fill(117, 54, 54);
  rect(spelerX+30, spelerY+10, -85, 8); //houten stuk
  
  fill(105, 101, 101);
  rect(spelerX, spelerY+8, -75, 5); //loop
  
  fill(148, 138, 138);
  rect(spelerX-70, spelerY+5, -30, 3);
  
  //arm
  //linker arm (van user perspecftief)
  fill(181, 9, 9);
  rect(spelerX+30, spelerY, 10, 25); //mouw boven stuk (rood)
  
  fill(181, 9, 9);
  rect(spelerX+30, spelerY+15, -20, 10); //mouw boven stuk onderarm(rood)
  
  fill(12, 15, 138);
  rect(spelerX, spelerY+15, 10, 10); //mouw onderstuk (blauw)
  
  fill(230, 200, 185);
  rect(spelerX-10, spelerY+15, 10, 10); //hand
  
  //hoofd
  fill(230, 200, 185);
  rect(spelerX +5, spelerY-20, 20, 20); //head
  
  //kraag blauw
  fill(12, 15, 138);
  rect(spelerX+4, spelerY-2, 22, 5);
  
  //hoed
  fill(0, 0, 0);
  rect(spelerX+3, spelerY-50, 25, 30); //hoed
  fill(192, 192, 192);
  rect(spelerX+10, spelerY-27, 10, 7);// plaat op hoed
}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(KEY_W) && spelerY - 50 > 0) {
    spelerY = spelerY - 1;
  }

  if (keyIsDown(KEY_S) && spelerY + 100 < 720) {
    spelerY = spelerY + 1;
  }

  if (keyIsDown(KEY_A) && spelerX - 10 > 0) {
    spelerX = spelerX - 1;
  }

  if (keyIsDown(KEY_D) && spelerX + 45 < 1280) {
    spelerX = spelerX + 1;
  }

  // vijand
  SnelheidVijand = 0.5 + (score / 50)
  for (var i = 0; i < aantalVijand; i ++) {
    richtingVijandY[i] = spelerY - vijandY[i];
    richtingVijandX[i] = spelerX - vijandX[i];
  
    correctieSnelheidVijand[i] = Math.sqrt(((richtingVijandX[i] * richtingVijandX[i]) + (richtingVijandY[i] * richtingVijandY[i]))) / 1.4142
    
    snelheidVijandY[i] = richtingVijandY[i] / correctieSnelheidVijand[i];
    snelheidVijandX[i] = richtingVijandX[i] / correctieSnelheidVijand[i];
    
    if (vijandBeweegt === true) { // vijand beweegt
      vijandY[i] = vijandY[i] + SnelheidVijand * snelheidVijandY[i];
    }
  
    if (vijandBeweegt === true) { // vijand beweegt
      vijandX[i] = vijandX[i] + SnelheidVijand * snelheidVijandX[i];
    }
  }
  
  // kogel
  if (mouseIsPressed && kogelVliegt === false) {
    doelwitX = mouseX;
    doelwitY = mouseY;
    plaatsAfvurenX = spelerX;
    plaatsAfvurenY = spelerY;
  }
  
  if (kogelVliegt === false && mouseIsPressed) {//schiet
    kogelVliegt = true;
    kogelX = plaatsAfvurenX;
    kogelY = plaatsAfvurenY;
  }

  var richtingY = doelwitY - plaatsAfvurenY;
  var richtingX = doelwitX - plaatsAfvurenX;

  var correctieSnelheid = Math.sqrt(((richtingX * richtingX) + (richtingY * richtingY))) / 1.4142
  
  var snelheidY = richtingY / correctieSnelheid;
  var snelheidX = richtingX / correctieSnelheid;
  
  if (kogelVliegt === true) { // kogel vliegt
    kogelY = kogelY + kogelSnelheid * snelheidY;
  }

  if (kogelVliegt === true) { // kogel vliegt
    kogelX = kogelX + kogelSnelheid * snelheidX;
  }

  if (kogelVliegt === true && kogelY < 0 || 
      kogelVliegt === true && kogelY > 720 ||
      kogelVliegt === true && kogelX < 0 ||
      kogelVliegt === true && kogelX > 1280) { // kogel verdwijnt
    kogelVliegt = false;
  }
    
};

/** 
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  for (var i = 0; i < aantalVijand; i ++) {
    // botsing speler tegen vijand
    if (spelerX - vijandX[i] < 50 &&
        spelerX - vijandX[i] > -50 &&
        spelerY - vijandY[i] < 130 &&
        spelerY - vijandY[i] > -120) {
        console.log("Botsing");
        spelStatus = GAMEOVER;
       }
    
    // botsing kogel tegen vijand
    if (kogelX - vijandX[i] < 50 &&
        kogelX - vijandX[i] > -50 &&
        kogelY - vijandY[i] < 130 &&
        kogelY - vijandY[i] > -120) {
        console.log("kogel raak");
        vijandY[i] = startVijandY;
        vijandX[i] = startVijandX + 450;
        kogelVliegt = false;
        kogelX = startKogelX;
        kogelY = startKogelY;
    }
  }
  // update punten en health
  score = score + (1 / 60);
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  fill("brown");
  rect(0,0, 1280,720);
  
  // vijand
  for (var i = 0; i < aantalVijand; i ++) {
    if (spelerX < vijandX[i]) {
      vijandKijktLinks();
    }
    else {
      vijandKijktRechts();
    }
  }
    
  // kogel
  fill("silver");
  ellipse(kogelX, kogelY, 20, 20);
  
  // speler
  if (mouseX < spelerX) {
    spelerKijktLinks();
  }
  else {
    spelerKijktRechts();
  }
  
  // punten en health
  textSize(25);
  text(Math.trunc(score), 10, 30);
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  for (i = 0; i < aantalVijand; i ++) {
    vijandX.push(900, 900);
    vijandY.push(400, 900);
  }
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    fill(0, 0, 0);// game-over scherm
    rect(0, 0, 1280, 720)
    textSize(100);
    fill("white");
    text("GAME OVER", 300, 200);
    text("Your score is" ,300, 300);
    text(Math.trunc(score), 550, 400);
    text("Press Enter for new game", 100, 500);
  }

  if (keyIsDown(KEY_ENTER)) {
    spelStatus = SPELEN;
    spelerX = startSpelerX;
    spelerY = startSpelerY;
    vijandX[i] = startVijandX;
    vijandY[i] = startVijandY;
    score = startScore;
  }
}
