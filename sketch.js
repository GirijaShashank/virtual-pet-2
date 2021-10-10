//Create variables here
var dog,dogImg,happyDog,milkImg,foodS,foodStock;
var database;
var feed,addFoods,fedTime,lastFed,foodObj;

function preload()
{
	dogImg = loadImage("images/dogimg.png");
  happyDog = loadImage("images/dogimg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(800, 500);

  foodObj = new Food();


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(600,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2

  feed = createButton("Feed the dog")
  feed.position(850,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(950,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})
fill(255);
textSize(15);
if(lastFed>=12){
  text("Last Feed : " + lastFed%12 + "PM",150,60);

}
else if(lastFed==0){
  text("Last Feed : 12AM ",150,60);

}
else {
  text("Last Feed : " + lastFed + "AM",150,60);

}

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    Feedtime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


