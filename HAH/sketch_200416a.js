let snowflakes = []; // array to hold snowflake objects

function setup() {
  createCanvas(440, 360);
  fill(240);
  noStroke();
}

function draw() {
  background(0);
  line(140,255,140,300)
  line(305,255,305,300)
   line(140,292,305,292)
  line(140,286,305,286)
  line(140,281,305,281)
  
  
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(1, 2);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.1);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  }
  
  {textStyle(BOLD);
    fill(0)
     stroke(200)
    textSize(25)
text("HAPPY BIRTHDAY",120,100);
   

textSize(8);
text("20",20,125);
  text("20",20,135);
   text("20",20,145);
  text("20",20,155);
   text("20",25,155);
  text("20",35,155);
   //i
   text("20",50,125);
  text("20",50,135);
   text("20",50,145);
  text("20",50,155);
   
   
   text("20",65,125);
  text("20",65,135);
   text("20",65,145);
  text("20",65,155)
   
  textSize(7) 
   text("20",73,125);
  text("20",78,135);
   text("20",82,145);
  text("20",86,155)
      
   textSize (8)
        
   text("20",90,125);
  text("20",90,135);
   text("20",90,145);
  text("20",90,155);
   
   //A
    text("20",105,126);
  text("20",105,135);
   text("20",105,145);
  text("20",105,155);
   //-
     text("20",115,125);
   text("20",115,140);
  
   text("20",125,126);
  text("20",125,135);
   text("20",125,145);
  text("20",125,155);
   //m
   
   text("20",155,125);
  text("20",155,135);
   text("20",155,145);
  text("20",155,155);
   
    text("20",160,127);
    text("20",178,127);
   text("20",175,135);
    text("20",170,143);
   text("20",165,135);
   
   
   
   text("20",185,125);
  text("20",185,135);
   text("20",185,145);
  text("20",185,155);
   //
    text("20",200,126);
  text("20",200,135);
   text("20",200,145);
  text("20",200,155);
   //-
     text("20",210,125);
   text("20",210,140);
  
   text("20",220,126);
  text("20",220,135);
   text("20",220,145);
  text("20",220,155);
   
   //U
   
    text("20",235,125);
  text("20",235,135);
   text("20",235,145);
  text("20",245,154);
   text("20",235,155);
    text("20",255,125);
  text("20",255,135);
   text("20",255,145);
  text("20",255,154);
    text("20",255,155);
   
   //R
    text("20",270,125);
  text("20",270,135);
   text("20",270,145);
    text("20",270,155);
   
    text("20",290,125);
   text("20",280,125);
  text("20",290,135);
   text("20",280,145);
    text("20",290,155);
   //I
    text("20",305,125);
  text("20",305,135);
   text("20",305,145);
    text("20",305,155);
   
   
   //s
   
   
   
   
     text("20",320,125);
  text("20",320,135);
   
    text("20",320,155);
   
   
    text("20",340,125);
   text("20",330,125);
   
  
   text("20",340,145);
   text("20",330,140);
    
   text("20",340,155);
   text("20",330,155);
   //
  
   text("20",355,125);
  text("20",355,135);
   
    text("20",355,155);
   
   
    text("20",365,125);
   text("20",375,125);
   
  
   text("20",375,145);
   text("20",365,140);
    
   text("20",365,155);
   text("20",375,155);
   //A
   
   
     text("20",390,125);
  text("20",390,135);
   text("20",400,125);
   text("20",390,145);
    text("20",390,155);
   text("20",410,125);
  text("20",410,135);
   text("20",410,145);
   text("20",400,140);
    text("20",410,155);
   text("_____________________________________",140,300)
   text("________",141,252)
   text("_________",185,252)
   text("_____________",230,252)
   text("______",275,252)
   
   
   
   textSize(50)
  

   textSize(50)
   text("|",265,263)
    text("|",220,263)
   text("|",173,263)
   
   textSize(15)
   text("^",268,230)
   text("^",223,230)
   text("^",176,230)
   
   textSize(20)
   text("By:",300,340)
   textSize(17)
   text("Tams",335,342)
   
   
  }
};
