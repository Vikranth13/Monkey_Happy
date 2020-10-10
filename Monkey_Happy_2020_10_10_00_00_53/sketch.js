var jb, jbImg;
var monkey, money_running, monkeyImg

var rockGroup, rockImg;
var bananaGroup, bananaImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY

var score;
function preload(){
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkeyImg = loadImage("Monkey_01.png");
  jbImg = loadImage("jungle.jpg");
  
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);
  jb = createSprite(200,200,20,20);
  jb.x = jb.width/2;
  jb.addImage("jb", jbImg);
  
  monkey = createSprite(50,355,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop", monkeyImg);
  monkey.scale = 0.05;
  
  rockGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  drawSprites();
  textSize(24);
  fill("red");
  text("Survival Time: " + score, 150,50);
  
  
    
  edges = createEdgeSprites();
  monkey.collide(edges[3]);
  
  
  
  
  monkey.velocityY += 0.8; 
  
  if(gameState === PLAY)
  {
    jb.velocityX = -(6 + 3 * score/500);
    if(jb.x < 0)
    {
      jb.x = jb.width/2;
    }
    
    if(monkey.y>=350 && keyDown("space"))
    {
      monkey.velocityY = -18;
    }
    score = score + Math.round(getFrameRate()/60);
    
    spawnRock();
    spawnBanana();
    
    if(bananaGroup.isTouching(monkey))
    {
      bananaGroup.destroyEach();
      monkey.scale += 0.005
    }
    if(rockGroup.isTouching(monkey))
    {
      gameState = END;
    }
  }
    
  else if (gameState === END)
    {
      jb.velocityX = 0;
      rockGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      rockGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      monkey.scale = 0.05;
      monkey.changeAnimation("stop",monkeyImg);
      textSize(24);
      fill("red");
      text("Press R to restart", 100,200)
      if (keyDown("r"))
      { 
        reset();
      }
    }
}

function spawnRock()
{
  if (World.frameCount % 60 === 0)
  {
    var rock = createSprite(400,365,20,20);
    rock.addImage("rock", rockImg);
    rock.scale = 0.2;
    rock.velocityX = -(6 + 3 * score/100);
    rock.lifetime = 80;
    rock.setCollider("circle",0,0,200);
    rockGroup.add(rock);
    rock.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function spawnBanana()
{
  if(World.frameCount % 70 === 0)
  {
    var banana = createSprite(400,random(240,260),20,20);
    banana.addImage("banana", bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -(6 + 3 * score/100);
    banana.lifetime = 80;
    bananaGroup.add(banana);
  }
}

function reset()
{
  gameState = PLAY;
  score = 0;
  rockGroup.setLifetimeEach(0);
  bananaGroup.setLifetimeEach(0);
  monkey.changeAnimation("running", monkey_running);
}

