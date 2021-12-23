var scoreTemplate = "SKATE";
var letter = 0;

function isE() {
 return letter === scoreTemplate.length; 
}

function drawScore(score, fontOverride) {
  g.clear();
  g.setFontAlign(0,0); // center font
  g.setColor(g.theme.dark ? "#fff" : '#000');
  g.setFont("Vector", fontOverride || 40);
  g.drawString(score, g.getWidth()/2, g.getHeight()/2);
  if (isE()) {
    g.setFont("Vector", 14);
    g.drawString("Tap if you landed it", g.getWidth()/2, g.getHeight()/2+40);
  }
}

function drawMenu() {
 drawScore('Click when bail -> ', 16); 
}

function reset() {
  g.clear();
  letter = 0;
  drawMenu();
}

Bangle.on('touch', function() {
  if (isE()) {
   letter--;
  var score = letter > 0 ? scoreTemplate.slice(0, letter) : '';
  drawScore(score);
  }
});

setWatch(function() {
  if (letter === scoreTemplate.length) {
    letter++;
    drawScore(':(');
  } else if (letter > scoreTemplate.length) {
    reset();
  } else {
    letter++;
    var score = letter > 0 ? scoreTemplate.slice(0, letter) : '';
    drawScore(score);
  }
  Bangle.setLCDPower(1);
}, BTN, {edge:"rising", debounce:50, repeat:true});

reset();
