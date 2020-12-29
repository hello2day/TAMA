class Particle {

  constructor(pos, col) {
    this.xrange = 100;
    this.yrange = 100;
    this.drag = random(0.0004, 0.006);
    this.threshold = 0.5;
    this.acc_mult = random(1, 5);

    this.init_pos = pos;
    this.curr_pos = createVector(random(- this.xrange * width, this.xrange * width), random(- this.yrange * height, this.yrange * height));
    this.delta_pos = createVector(this.curr_pos.x - this.init_pos.x, this.curr_pos.y - this.init_pos.y);

    this.col = col;
    
    this.vel = p5.Vector.random2D(); //createVector(this.curr_pos.x - this.init_pos.x, this.curr_pos.y - this.init_pos.y);

    this.acc = createVector(0, 0);
  }

  update() {
    // stop if we got to a point where, ye know, we initially started at
    if (Math.abs(this.delta_pos.x) <= this.threshold && Math.abs(this.delta_pos.y) <= this.threshold) {
      return;
    }

    // acc will be the delta * some drag + some random stuff to make it, YES, MORE RANDOM!
    this.acc = this.delta_pos;
    this.acc.mult(-this.drag);
    this.acc.add(p5.Vector.random2D().mult(this.acc_mult));

    this.vel.add(this.acc);
    this.vel.mult(0.85);

    this.curr_pos.add(this.vel);

    this.delta_pos = createVector(this.curr_pos.x - this.init_pos.x, this.curr_pos.y - this.init_pos.y);
    
    this.acc_mult *= 0.9925;
  }

  show() {
    stroke(this.col);
    point(this.curr_pos.x, this.curr_pos.y);
  }

}

class ParticleSystem {

  constructor() {
    this.particles = [];  
  }

  addParticle(pos, col) {
    this.particles.push(new Particle(pos, col));
  }
  
  update() {
    for (let p of this.particles) {
      p.update();
     }    
  }
  
  render() {
    for (let p of this.particles) {
     p.show();
    }
  }
  
}

let default_str = "Happy New Year";
let default_col;

let psystem;

function getX(len, i) {
  i = floor(i / 4);
  return i % width;
}

function getY(len, i) {
  i = floor(i / 4);
  return floor(i / width);
}

function getPos(len, i) {
  return createVector(getX(len, i), getY(len, i));
}

function init(str) {
  psystem = new ParticleSystem();

  background(0);

  textAlign(CENTER, CENTER);
  textSize(30);
  fill(255);
  text(str, width / 2, height / 2);

  default_col = color(0);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let cur_pos = getPos(pixels.length, i);
    let cur_col = get(cur_pos.x, cur_pos.y);
    if (default_col.levels.toString() !== cur_col.toString()) {
      psystem.addParticle(cur_pos, cur_col);
    }
  }
  updatePixels();
}
let eventDate = new Date(2021, 0,1 , 0, 0);
let sldCurrentDate;
let birthdayDate = new Date(2021, 0,1 , 0, 0);

function setup() {
  createCanvas(400, 400);

sldCurrentDate = createSlider(0, 365, 0);
  init(default_str);
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
  
  if (nowD == bdayD && nowM == bdayM) {
    background(0);
    psystem.update();
  psystem.render();
  
  } else {
    let ms = eventDate - now;

    // Figure out how many seconds, minutes, hours, days
    // until the event date. 
    let s = int(ms / 1000);
    ms = ms % 1000;
    let m = int(s / 60);
    s = s % 60;
    let h = int(m / 60);
    m = m % 60;
    let d = int(h / 24);
    h = h % 24;

    // Draw the number of days, minutes, hours and seconds
    // between now and the event to the canvas.
    textSize(20)
   text(d + " hari " + h + " jam " + m + " menit " + s + " detik ",width/2, height/2);
    stroke(random(90,255));
  fill(255);
    
  
  }
  
  //Draw the current date to the screen.
  text(nowD + " / " + nowM + " / " + nowY, width/2, height - 80);
}
