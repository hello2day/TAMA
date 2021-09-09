// vehicles is an array to hold the points (guess)
var vehicles = [];
var font;

function preload() {
  font = loadFont('Data/AtlasGrotesk-Regular.otf');
}
function setup() {
  // canvas is only the area in which we do our drawing
  let canvasDefinition = createCanvas(500, 680);

  // textToPoints has 'text', x location in canvas, y location, and font size
  // creates all of the points from the text passcode
  var points = font.textToPoints('A.HASTAMA.P',75,400, 70);

  //  for each point in the text, create a random start position and a vector to where it needs to end up
  for (var i=0; i < points.length; i++){
    var pt = points[i];
    var vehicle = new Vehicle(pt.x,pt.y);
    vehicles.push(vehicle);
  }

}


function draw() {
 background(0);
  text('HELLO WORLD', 75,180);
  textSize(40);
  stroke(random(90,255));
  fill(random(0, 153));

  for (var i=0; i < vehicles.length; i++){
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }

  console.log(vehicles[3].opa);
}



function Vehicle(x,y){
  this.pos = createVector(random(width),random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 4;
  this.maxspeed = 4;
  this.maxforce = .5;
  this.h = 360;
  this.sat = 70;
  this.light = 100;
  this.opa = 1;

  this.behaviors = function(){
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  this.applyForce = function(f){
    this.acc.add(f);
  }

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.h = floor(map(this.vel.x,.1,this.maxspeed-1,220,360));
    this.sat = floor(map(this.vel.x,.1,this.maxspeed-1,60,80));
    this.light = floor(map(this.vel.x,.001,.1,100,50));

    if (this.h < 0){
      this.h = 0;
    }
    if (this.sat < 70){
      this.sat = 70;
    }
    if (this.light < 50){
      this.light = 50;
    }
    if (this.opa < 0){
      this.opa = 0;
    }
    this.acc.mult(0);

  }

  this.show = function(){
    push();
    // this.h++;
    var c = color('hsla('+this.h+','+this.sat+'%,'+this.light+'%,'+this.opa+')');
    stroke(c);
    strokeWeight(this.r);
    point(this.pos.x,this.pos.y);
    pop();
  }

  this.arrive = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if ( d < 100){
      speed = map(d, 0, 100,0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.flee = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50){
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0,0);
    }
  }

}
