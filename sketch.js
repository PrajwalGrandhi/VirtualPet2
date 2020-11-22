//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogI,happyD;
var gar;

var fedTime;
var feed,add;
var lastFed;
var foodObj;
var input1,button; 
function preload()
{
  //load images here
  dogI = loadImage("images/dog.png");
  happyD = loadImage("images/dogHappy.png"); 
  gar = loadImage("images/garden.jpg");
}

function setup() {
  createCanvas(800,500);
  
  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(600,350,50,50);
  dog.addImage(dogI);
  dog.scale=0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed = data.val();
  })
  feed = createButton("FEED DOG")
  feed.position(500,15)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)
}


function draw() {  
   background(gar);

   foodObj.display();

       
if(lastFed>=12)
{
  text("LastFed: "+lastFed%12+"PM",350,30)
}
else if(lastFed == 0)
{
  text("LastFed: 12AM",350,30)
}
else{
  text("LastFed: "+lastFed+"AM",350,30)
}


        //input1 = createInput("your Dog's name");
        //input1.position(250,160);

       // button = createButton("continue")
        //button.position(250,180);

       // button.mousePressed(function()
      //  {
           // input1.hide();
            //button.hide();

            //database.ref('dog').set({
           //     dogN:input1.value()
           // })
       // })
  drawSprites();
 
}

function readStock(data)
{
  position= data.val();
  foodObj.updateFoodStock(position)
}

function writeStock(x)
{
  if(x<=0)
  {
       x = 0;
  }else{
      x = x-1;
  }
database.ref('/').update({
  Food:x
})
}


function AddFood()
{
  position++
  database.ref('/').update({
  Food:position
})

}

function FeedDog()
{
  dog.addImage(happyD);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour ()
 })
}
