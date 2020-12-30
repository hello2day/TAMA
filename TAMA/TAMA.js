
let eventDate = new Date(2021, 0,1 , 0, 0);
let birthdayDate = new Date(2021, 0,1 , 0, 0);
let sldCurrentDate;
var fireworks = []; 
var gravity;
var greeting;




function setup() {
  createCanvas(innerWidth, innerHeight);
  gravity = createVector(0,0.2); //Vector that points down to give the sense of gravity.
	stroke(255);
	strokeWeight(4);
	background(0);
	
sldCurrentDate = createSlider(0, 365, 0);

}

function draw() {
  background(0);
  
  let eventDay = eventDate.getDay();
  let eventHours = eventDate.getHours();
  let eventMinutes = eventDate.getMinutes();
  let eventSeconds = eventDate.getSeconds();

  let now = new Date();
  now.setDate(now.getDate() + sldCurrentDate.value());

  let nowD = now.getDate();
  let nowM = now.getMonth() + 1;
  let nowY = now.getFullYear();

  // Check whether it is my birthday.
  let bdayD = birthdayDate.getDate();
  let bdayM = birthdayDate.getMonth() + 1;

  console.log("d: ", bdayD, "m: ", bdayM, "nD: ", nowD, "nM: ", nowM);
   
  
  

    textSize(30)
  let ms = eventDate - now;

    
    let s = int(ms / 1000);
    ms = ms % 1000;
    let m = int(s / 60);
    s = s % 60;
    let h = int(m / 60);
    m = m % 60;
    let d = int(h / 24);
    h = h % 24;
 
    
    

  text(d + " hari " + h + " jam " + m + " menit " + s + " detik ",width/3.2, height/2);
  stroke(0);
  fill(random(200,255)); 
  if (nowD == bdayD && nowM == bdayM) {
    
  }
    
if (nowD == bdayD && nowM == bdayM) {
    background(0);
   textSize(40)
    stroke(random(0,40));
  fill(random(200,255));
    text("HAPPY NEW YEAR",width/3.2, height/2);
    stroke(random(0,30));
  fill(random(0,40));
   
   	if (random(1) < 0.1) { //Each frame there is a 10% chance of making a new Firework.
	fireworks.push(new Firework()); //Puts new firework object in the array
	}
	for (var i = 0; i < fireworks.length; i++) {
	fireworks[i].update();
	fireworks[i].show();
	}
}


function Particle(x, y, hu, firework) { //Defines a single Particle

	this.pos = createVector(x, y); //Position of the particle on the Canvas
	this.firework = firework;
	this.lifespan = 255;
	this.hu = hu;
	
	if (this.firework) {
	this.vel = createVector(0, random(-20, -8)); //Velocity of the particle / Sets the range for the height the particle can reach.
	} else {
		this.vel = p5.Vector.random2D();
	this.vel.mult(random(2,10));
	}
	this.acc = createVector(0, 0); //Acceleration of the particle

	this.applyForce = function(force) { //Where the accceleration is withdrawn from
		this.acc.add(force); //Add force to the acceleration (Based on F=ma)
	}

	this.update = function() {
		if (!this.firework) {
		this.vel.mult(0.9);
			this.lifespan -= 4;
		}
	  this.vel.add(this.acc); //Adds the acceleration to the velocity
		this.pos.add(this.vel); //Adds the velocity to the position
		this.acc.mult(0); //Mutiple acceleration by 0 after each frame is updated.
	}
	
	//Defines if the particle is done - This allows the program to run smooothly and prevents lag
	this.done = function() {
		if (this.lifespan < 0) {
			return true;
		} else {
			return false;
	 }
	}

	this.show = function() {
		colorMode(HSB);


		if (!this.firework) {
			strokeWeight(2);
		stroke(hu, 255, 255, this.lifespan);
		} else {
			strokeWeight(4);
			stroke (hu, 255, 255);
	}
		point(this.pos.x, this.pos.y);
	}
}

  
  
  
  


function Firework() { //Defines a single particle as well as the array of particles that will explode.
	
  this.hu = random(255); //System gets a hu
	this.firework = new Particle(random(width), height, this.hu, true); //Create firework particle
	this.exploded = false;
	this.particles = [];
	
	this.update = function() {
		if (!this.exploded) {
			this.firework.applyForce(gravity); 
          
			this.firework.update();
			if (this.firework.vel.y >= 0) { 
				this.exploded = true;
				this.explode();
			}
		}
		for (var i = this.particles.length-1; i >=0 ;i--) {
			this.particles[i].applyForce(gravity);
			this.particles[i].update();
			if (this.particles[i].done()) {
				this.particles.splice(i, 1); 
			}
		}
	}

	this.explode = function() {
		for (var i = 0; i < 100; i++) {
			var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
			this.particles.push(p);
		}
	}


	this.show = function() {
		if (!this.exploded) {
			this.firework.show();
		}
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].show();
		}
	}


}
     
  
  
  //Draw the current date to the screen.
 stroke(random(0,40));
  fill(255);
  
 text(nowD + " / " + nowM + " / " + nowY, width/2.4, height - height/4);
  
}
