var tower,towerImg;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroup;
var ghostImg,ghost;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}
function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  invisibleBlockGroup = new Group();
  
  
}
function draw(){
  background(0);
  if(gameState === "play"){
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right")){ 
    ghost.x = ghost.x +3;
  }
  if(keyDown("space")){
   ghost.velocityY = - 5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gameState = "end";
  }
  
  
  spawnDoors();
  drawSprites();
  }
  if(gameState==="end") {
  textSize(30);
    text("game over",230,250);
  }
  
  
}
function spawnDoors(){
  if(frameCount%200===0){
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    door.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth += 1;
    ghost.depth = climber.depth;
    ghost.depth += 1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
     }

}