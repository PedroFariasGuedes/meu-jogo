var bg, bgImg
var bottomGround
var topGround
var nave, naveImg

var foguete
var meteoro1
var meteoro2
var satelite 

var grupodeobstaculos

var PLAY = 1
var END = 0
var GameState = PLAY
var fimDeJogo, fimDeJogoImg
var reset, resetImg

var score = 0

var dieSound
var jumpSound

var edges

function preload(){
  bgImg = loadImage("assets/chãolua.png")
  naveImg = loadImage("assets/nave.png")
  foguete = loadImage("assets/foguete.png")
  meteoro1 = loadImage("assets/meteoro1.png")
  meteoro2 = loadImage("assets/meteoro2.png")
  satelite = loadImage("assets/satelite.webp")
  fimDeJogoImg = loadImage("assets/fimdejogo.png")
  resetImg = loadImage("assets/restart.png")
  dieSound = loadSound("assets/die.mp3")
  jumpSound = loadSound("assets/jump.mp3")

}

function setup(){
  createCanvas(600, 400)
  //imagem de plano de fundo
  bg = createSprite(300,200,1,1);
  bg.addImage(bgImg);
  bg.scale = 1.3

  //criando canto superior e inferior
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = false;

  topGround = createSprite(200,10,800,20);
  topGround.visible = false;
        
  //criando o balão     
  nave = createSprite(100,200,20,50);
  nave.addImage("nave.png", naveImg)
  nave.scale = 0.2;

  //nave.debug = true
  //nave.setCollider("rectangle",0,0,100,100)

  fimDeJogo = createSprite(300,180, 100, 50)
  fimDeJogo.addImage("fimdejogo", fimDeJogoImg)
  fimDeJogo.scale = 2

  reset = createSprite(300, 250, 100, 50)
  reset.addImage("restart", resetImg)
  reset.scale = 0.6

  grupodeobstaculos = new Group();


  edges = createEdgeSprites();
}

function draw() {
  
  background("black");

  if(GameState === PLAY){
    //fazendo o balão de ar quente pular
      if(keyDown("space")) {
        nave.velocityY = -6 ;   
        //jumpSound.play();   
      }

    //adicionando gravidade
      nave.velocityY = nave.velocityY + 2;

      score = score + Math.round(getFrameRate()/60);

      criandoObstaculos();
      criandoObstaculos2();

      fimDeJogo.visible = false
      reset.visible = false

//|| nave.isTouching(topEdge) || nave.isTouching(downEdge)

      if(grupodeobstaculos.isTouching(nave) || nave.y < 50 || nave.y > 350){
        GameState = END
        dieSound.play();
        nave.velocityY = 0
      }
      } else if(GameState === END){
        nave.velocityY = 0
        grupodeobstaculos.setVelocityXEach(0);

        

        fimDeJogo.visible = true
        reset.visible = true

        if(mousePressedOver(reset)){
          restart();
        }

      }

    drawSprites();

    textSize(16)
    fill("white")
    text("Pontuação:"+ score, 10, 20)
}

function restart() {
  GameState = PLAY
  grupodeobstaculos.destroyEach();
  nave.y = 200

}

function criandoObstaculos () {
  if(frameCount%110 === 0){
    var obstaculo = createSprite(600, 350, 40, 40)
    obstaculo.velocityX = -3
    var aleatorio = Math.round(random(1, 2))
    switch(aleatorio){
      case 1: obstaculo.addImage(foguete);
      obstaculo.scale = 0.25
      break;
      case 2: obstaculo.addImage(satelite);
      obstaculo.scale = 0.12
      break;

      default: break
    }
    obstaculo.lifeTime = 250
    grupodeobstaculos.add(obstaculo);

    //obstaculo.debug = true
    obstaculo.setCollider("rectangle",0,0,400,750)
    obstaculo.depth = nave.depth
    nave.depth = nave.depth + 1
  }
}

function criandoObstaculos2 () {
  if(frameCount%90 === 0){
    var obstaculo2 = createSprite(600, 50, 40, 40)
    obstaculo2.y = Math.round(random(10,100))
    obstaculo2.velocityX = -4
    var aleatorio = Math.round(random(1, 2))
    switch(aleatorio){
      case 1: obstaculo2.addImage(meteoro1);
      obstaculo2.scale = 0.5
      break;
      case 2: obstaculo2.addImage(meteoro2);
      obstaculo2.scale = 0.5
      break;

      default: break
    }
    obstaculo2.lifeTime = 250
    grupodeobstaculos.add(obstaculo2);

    //obstaculo2.debug = true
    obstaculo2.setCollider("rectangle",0,0,200,30)
    obstaculo2.depth = nave.depth
    nave.depth = nave.depth + 1
  }
}
