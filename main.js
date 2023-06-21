//variáveis globais
var trex, trex_img
var chao,chao_img
var bordas
var nuvem_img
var cacto_img1,cacto_img2,cacto_img3,cacto_img4,cacto_img5,cacto_img6
var pulo
var grupoNuvem
var grupoCacto
var pontos = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex_morto
var restarte 
var restarte_img
var gameOver
var gameOver_img
var morte
var checkpoint



//carregar os arquivos
function preload(){
    trex_img = loadAnimation("trex1.png","trex3.png","trex4.png");
    chao_img = loadImage("ground2.png");
    nuvem_img = loadImage("cloud.png")
    cacto_img1 = loadImage("obstacle1.png")
    cacto_img2 = loadImage("obstacle2.png")
    cacto_img3 = loadImage("obstacle3.png")
    cacto_img4 = loadImage("obstacle4.png")
    cacto_img5 = loadImage("obstacle5.png")
    cacto_img6 = loadImage("obstacle6.png")





    checkpoint = loadSound("checkpoint.mp3")
    morte = loadSound("die.mp3")
    pulo = loadSound("jump.mp3")
    trex_morto = loadAnimation("trex_collided.png")
    restarte_img = loadImage("restart.png")
    gameOver_img = loadImage("gameOver.png")

}
    



//criando sprites e suas propriedades
function setup(){
    createCanvas(windowWidth,windowHeight)

    chao = createSprite(width/2,height-20,width,40); 
    chao.addImage(chao_img)
    
    trex = createSprite(50,height-30,20,40);
    trex.addAnimation("correndo",trex_img);
    trex.addAnimation("morrendo",trex_morto)
    trex.scale = 0.5;

    //trex.debug = true
    //trex.setCollider("rectangle",0,0,200,200)


    restarte = createSprite(width/2,height-75)
    restarte.addImage(restarte_img)
    restarte.scale = 0.5
    
    gameOver = createSprite(width/2,height-125)
    gameOver.addImage(gameOver_img)
    gameOver.scale = 0.7
    

    bordas = createEdgeSprites();

    grupoNuvem = new Group();
    grupoCacto = new Group();

    
}

function draw(){
    background("white");
    

    if(gameState === PLAY){ 

        chao.velocityX = - 6


        restarte.visible = false
        gameOver.visible = false
    pontos += Math.round(getFrameRate()/60)
    gerarNuvens()
    gerarCactos() 

//pulo

if(touches.length>0||keyDown("space") && trex.y > height-30  ){

    trex.velocityY = -10;
    touches = []
if(!pulo.isPlaying()){
    pulo.play()
}
}


// som checkpoint

if(pontos > 0 && pontos % 100 === 0){
if(!checkpoint.isPlaying()){
        checkpoint.play()
}
}


if(trex.isTouching(grupoCacto)){
    gameState = END 
    //if(!morte.isPlaying()){
        morte.play()   
//}
} 
    }else if(gameState === END){

chao.velocityX = 0;
grupoCacto.setVelocityXEach(0);
grupoNuvem.setVelocityXEach(0);
grupoCacto.setLifetimeEach(-1);
grupoNuvem.setLifetimeEach(-1);
trex.changeAnimation("morrendo"); 
restarte.visible = true;
gameOver.visible = true;
 
if(mousePressedOver(restarte)){

    reset();

    
}       

        

    }

//gravidade
trex.velocityY += 0.5


   


trex.collide(bordas)

//fundo infinito
if(chao.x < 800){
    chao.x = width/2*3      

}

    

    drawSprites();
    

   // text(mouseX +"," + mouseY, mouseX, mouseY);


   


textFont("arial black")
textSize(15)
text("PONTOS:"+ pontos,width-150,height-170)



}//fim do draw


function gerarNuvens(){

if(frameCount % 120 === 0){
    var y = random(height-180,height-100);
    var nuvem = createSprite(600,y)
    nuvem.addImage(nuvem_img);
    nuvem.velocityX = -2
    nuvem.scale = random(0.3,1.4)







    nuvem.depth = trex.depth;
    trex.depth +=1

    // largura do canvas divido pela velocidade

    nuvem.lifetime = width/nuvem.velocityX

    grupoNuvem.add(nuvem);

}





}

function gerarCactos(){      




if(frameCount %120 === 0){ 
    var cacto = createSprite(width,height-40)
    cacto.addImage(cacto_img1);
    cacto.scale = 0.7;
    cacto.velocityX = -6;
    var num = Math.round(random(1,6));

    switch(num){
        case 1:
            cacto.addImage(cacto_img1);
        break
        case 2:
            cacto.addImage(cacto_img2);
        break
        case 3:
            cacto.addImage(cacto_img3);
        break
        case 4:
            cacto.addImage(cacto_img4);
        break
        case 5:
            cacto.addImage(cacto_img5);
        break
        case 6:
            cacto.addImage(cacto_img6);
            cacto.scale = 0.6     
        break
        default: break 
         




    }

    //cacto.debug
    //cacto.setCollider("rectangle",0,0, cacto.width,cacto.height)


    cacto.depth = trex.depth;
    trex.depth +=1


    // largura do canvas divido pela velocidade

    cacto.lifetime = width/cacto.velocityX

    grupoCacto.add(cacto);

}
  
}



function reset(){

   gameState = PLAY 
   grupoCacto.destroyEach();
   grupoNuvem.destroyEach(); 
   trex.changeAnimation("correndo")       
    pontos = 0;


}






