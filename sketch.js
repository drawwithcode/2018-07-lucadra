var mic;
var video;
var vid;
var unit;

function preload(){
  mask    = loadImage('assets/mask.png');
  font    = loadFont('assets/font.ttf');
  fontExt = loadFont('assets/font-ext.ttf');
 }

function setup() {
  //AS THE WEBCAM IMAGE GETS DISTORTED IN A WAY I FIND HARD TO CONTROL,
  //I HAD TO SET THE ASPECT RATIO TO THAT OF THE ORIGINAL IMAGE
  createCanvas(1.5*windowHeight, windowHeight);

  //RODCHENKO USED A 20x20 GRID, I USED A 10x10 GRID WITH SOME "HALF-STEPS"
  unit = {x:width/10, y:height/10};

  video = createCapture(VIDEO);
  mic   = new p5.AudioIn();

  mic.start();
  video.size(1280, 960);
  video.hide();
  filter(GRAY);

  colorMode(HSB,255);
  background(0,255,150);
  noStroke();
}

function windowResized() {
  createCanvas(1.5*windowHeight, windowHeight);
  unit = {x:width/10, y:height/10};
}

function draw() {
  //I TRIED SHOUTING IN THE MIC AND 0.2 WAS THE HIGHEST LEVEL I REACHED SO I CALIBRATED THE CODE ACCORDINGLY
  var vol = floor(map(mic.getLevel(), 0, 0.2, 0, 100));
  var vid = video.loadPixels();
  background(0,255,150);
  //HERE I MIRROR THE WEBCAM IMAGE FOR A BETTER "USER EXPERIENCE"
  push()
  translate(unit.x*5,0);
  scale(-1,1);
  imageMode(CENTER);
  vid.mask(mask);
  image(vid, unit.x*2.5, unit.y*5,  unit.y*8*1.3, unit.y*8);
  pop();

  //THIS BLOCK OF CODE CONTROLS HOW BRIGHT THE LETTERS ARE
  var cColor, oColor, dColor, iColor, nColor, gColor;
  cColor = map(vol, 0, 16.6, 0, 255);
  oColor = map(vol, 0, 33.3, 0, 255);
  dColor = map(vol, 0, 49.8, 0, 255);
  iColor = map(vol, 0, 66.4, 0, 255);
  nColor = map(vol, 0, 83.0, 0, 255);
  gColor = map(vol, 0,  100, 0, 255);


  //FROM HERE ON THE CODE DRAWS RODCHENKO'S COMPOSITION
    fill(0);

    //HORIZONTAL BLACK STRIPE TOP
    rect(unit.x*2.5, 0, 7.5*unit.x, unit.y);

    //HORIZONTAL BLACK STRIPE BOTTOM
    rect(unit.x*2.5, unit.y*9, 7.5*unit.x, unit.y);

    //IMAGE FRAME OUTLINE
    noFill();
    stroke(0,0,255);
    strokeWeight(2*unit.y/10);
      ellipse(unit.x*2.5, unit.y*5, unit.y*8, unit.y*8);
    noStroke();

    //VOICE CONE
    fill(0, 255, 150);
    beginShape();
      vertex(3.5*unit.x, 4.5*unit.y);
      vertex(3.5*unit.x, 5.5*unit.y);
      vertex(  9*unit.x,   9*unit.y);
      vertex(  9*unit.x,     unit.y);
    endShape();

    //BLACK TRAPEZOID
    fill(0, 0, 0)
    beginShape();
      vertex( 8*unit.x, 1.64*unit.y);
      vertex( 9*unit.x,      unit.y);
      vertex(10*unit.x,    0*unit.y);
      vertex(10*unit.x,   10*unit.y);
      vertex( 9*unit.x,    9*unit.y);
      vertex( 8*unit.x, 8.37*unit.y);
    endShape();

    //TRAPEZOID SEGMENTS - RED
    fill(0, 255, 150)
    beginShape();
      vertex(8*unit.x, 3*unit.y);
      vertex(10*unit.x, 2*unit.y);
      vertex(10*unit.x, 8*unit.y);
      vertex(8*unit.x, 7*unit.y);
    endShape();

    //TRAPEZOID SEGMENTS - GRAY
    fill(0, 0, 175)
    beginShape();
      vertex( 8*unit.x,   4*unit.y);
      vertex(10*unit.x, 3.5*unit.y);
      vertex(10*unit.x, 6.5*unit.y);
      vertex( 8*unit.x,   6*unit.y);
    endShape();

    //TRAPEZOID SEGMENTS OUTLINE
    stroke(0, 0, 255);
      line(8*unit.x, 1.64*unit.y, 8*unit.x, 8.36*unit.y)

      line(8*unit.x, 3*unit.y, 10*unit.x,   2*unit.y);
      line(8*unit.x, 7*unit.y, 10*unit.x,   8*unit.y);

      line(8*unit.x, 4*unit.y, 10*unit.x, 3.5*unit.y);
      line(8*unit.x, 6*unit.y, 10*unit.x, 6.5*unit.y);
    noStroke();

    //VOICE CONE OULINE
    stroke(0, 0, 255);
      line(4.965*unit.x, 3.5*unit.y, 9*unit.x, 1*unit.y);
      line(4.965*unit.x, 6.5*unit.y, 9*unit.x, 9*unit.y);
    noStroke();

    //HORIZONTAL BANDS OUTLINE
    stroke(0, 0, 255);
      line(2.5*unit.x, 1*unit.y, 9*unit.x, 1*unit.y);
      line(2.5*unit.x, 9*unit.y, 9*unit.x, 9*unit.y);

      line(2.5*unit.x, 1*unit.y, 2.5*unit.x, 0*unit.y);
      line(2.5*unit.x, 9*unit.y, 2.5*unit.x, 10*unit.y);
    noStroke();

    //TEXT
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(0.8*unit.y);
    textFont(fontExt);
      text('Creative_Coding', 2.8*unit.x, 0.4*unit.y);
      text('PoliMi_18-19',    2.8*unit.x, 9.5*unit.y);


    //THIS BLOCK OF CODE CONTROLS THE LETTERS OF THE WORD "CODING"
    textFont(font);
    textSize(2*unit.y);
    fill(0, 0, 175);

    push();
    fill(0, 0, cColor);
    translate(0, -5*unit.y);
    scale(1, 1.5);
      text('c', 4.6*unit.x, 6.48*unit.y);
    pop()

    push()
    fill(0, 0, oColor);
    translate(0, -5*unit.y);
    scale(1, 2);
      text('o', 5.2*unit.x, 4.787*unit.y);
    pop()

    push()
    fill(0, 0, dColor);
    translate(0, -5*unit.y)
    scale(1, 2.5);
      text('d', 5.8*unit.x, 3.784*unit.y);
    pop()

    push();
    fill(0, 0, iColor);
    translate(0, -5*unit.y)
    scale(1, 3);
      text('i', 6.4*unit.x, 3.142*unit.y);
    pop();

    push();
    fill(0, 0, nColor);
    translate(0, -5*unit.y);
    scale(1, 3.3);
      text('n', 6.7*unit.x, 2.84*unit.y);
    pop();

    push();
    fill(0, 0, gColor);
    translate(0, -5*unit.y);
    scale(1, 3.7);
      text('g', 7.3*unit.x, 2.5*unit.y);
    pop();
}
