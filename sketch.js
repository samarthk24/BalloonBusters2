var bow , arrow,  background;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, bonus_balloonAnimation, backgroundImage;
var balloons, bBalloons, arrows;
var score, gameState, arrowCount, timer;
function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0-1.png.png");
  bowImage = loadImage("bow0-1.png.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  bonus_balloonAnimation = loadAnimation("bonus_balloon0.png", "bonus_balloon1.png", "bonus_balloon2.png", "bonus_balloon3.png", "bonus_balloon4.png", "bonus_balloon5.png", "bonus_balloon6.png", "bonus_balloon7.png")
}

function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2;
  
  // creating bow to shoot arrow
  bow = createSprite(200,250,20,50);
  bow.addImage(bowImage);
  bow.rotation = 180; 
  bow.scale = 1;
  
  //creating group for all the balloons
  balloons = createGroup();
  bBalloons = createGroup();
  arrows = createGroup();

  //creating gamestate variable.
  gameState = "start";

  //creating score variable
  score = 0;

  //creating arrow count
  arrowCount = 0;

  //creating timer
  timer = 30;
}

function draw() {
 background(0);
  
  drawSprites();

  if(gameState=="start"){
    fill("blue");
    textSize(20);
    text("Welcome to Balloon Busters II!", 70, 200);
    textSize(15);
    text("Shoot balloons to score points. Shoot the flashing balloon to score 10 points. Mouse to aim and space to shoot. Press space to start.", 60, 230, 300, 400);
    
    if(keyDown("space")){
      gameState = "play";
    }
  }

  if(gameState=="play"){
    

    arrowCount -= 1;

    bow.pointTo(mouseX, mouseY);
    
    // release arrow when space key is pressed
    if (keyWentDown("space") && arrowCount<=0) {
      createArrow();
      arrowCount = 10;
    }

    //Check if balloon is popped
    if(balloons.isTouching(arrows)){
      balloons.destroyEach();
      score+=10;
    }

    if(bBalloons.isTouching(arrows)){
      bBalloons.destroyEach();
      score+= 100;
    }

    //Start timer
    if(frameCount%30==0){
      timer -= 1;
    }

    if(timer==0){
      gameState = "end";
    }
    
    textSize(15);
    fill("darkBlue");
    text("Score: " + score, 10, 20);
    text("Timer: " + timer, 10, 40);

    //creating continous balloons
    spawnBalloon()

  }

  if(gameState=="end"){
    textSize(20);
    fill("darkBlue");
    text("Game Over!", 150, 180);
    text("You scored " + score, 130, 210);
  }
  
  
}


// Creating  arrows for bow
 function createArrow() {
  arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = bow.x;
  arrow.y=bow.y;
  arrow.pointTo(mouseX, mouseY);
  console.log(arrow.rotation);
  
  if(arrow.rotation>=-45 && arrow.rotation<0){
    arrow.setVelocity(30, -10);
  }
  else if(arrow.rotation>=-90 && arrow.rotation<-45){
    arrow.setVelocity(10, -20);
  }
  else if(arrow.rotation>=-180 && arrow.rotation<-135){
    arrow.setVelocity(-30, -10);
  }
  else if(arrow.rotation>=-135 && arrow.rotation<-90){
    arrow.setVelocity(-10, -20);
  }
  else if(arrow.rotation>=0 && arrow.rotation<45){
    arrow.setVelocity(30, 10);
  }
  else if(arrow.rotation>=45 && arrow.rotation<90){
    arrow.setVelocity(10, 20);
  }
  else if(arrow.rotation>=90 && arrow.rotation<135){
    arrow.setVelocity(-10, 0);
  }
  else if(arrow.rotation>=135 && arrow.rotation<=180){
    arrow.setVelocity(-30, 10);
  }

  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrows.add(arrow);
}

function spawnBalloon() {

  if(frameCount%10===0){
    var balloon = createSprite(Math.round(random(20, 370)), Math.round(random(20, 370)), 10, 10);

    rand = Math.round(random(1, 5));
    switch(rand){
      case 1:
        balloon.addImage(red_balloonImage);
        balloon.scale = 0.075;
        balloons.add(balloon);
        break;

      case 2:
        balloon.addImage(green_balloonImage);
        balloon.scale = 0.075;
        balloons.add(balloon);
        break;

      case 3:
        balloon.addImage(pink_balloonImage);
        balloons.add(balloon);
        break;

      case 4:
        balloon.addImage(blue_balloonImage);
        balloon.scale = 0.075;
        balloons.add(balloon);
        break;

      case 5:
        balloon.addAnimation("animation", bonus_balloonAnimation);
        balloon.scale = 0.075;
        bBalloons.add(balloon);

        break;

      default: break;
    }
    
    balloon.lifetime = 200;

    
  }
}
