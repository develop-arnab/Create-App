// // Angry Birds
// // Daniel Shiffman
// // https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// // https://youtu.be/TDQzoe9nslY

// const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

// let ground;
// const boxes = [];
// let bird;
// let world, engine;
// let mConstraint;
// let slingshot;

// let dotImg;
// let boxImg;
// let bkgImg;

// // $("#login-button").click(function(event){
// //   event.preventDefault();

// // $('form').fadeOut(500);
// // $('.wrapper').addClass('form-success');
// // });

// const registerForm = document.getElementById('registerForm')

// registerForm.addEventListener('submit', function (e)  {
//   e.preventDefault();
//   console.log("REGISTER ME");

//   var username = document.getElementById('username');
//   var password = document.getElementById('password');

//   console.log("USER NAME AND PASSWORD", username.value, password.value)

//   fetch('http://localhost:5000/people', {
//     method: 'POST',
//     body: JSON.stringify({
//       name : username.value,
//       password : password.value
//     }),
//     headers: {
//       "Content-type" : "application/json; charset=UTF-8"
//     }
//   })
//   .then(function(response) {
//     return response.json
//   }).then(function(data) {
//     console.log("DATA", data)
//   })
// });

// function preload() {
//   dotImg = loadImage('../assets/img/dot.png');
//   boxImg = loadImage('../assets/img/equals.png');
//   bkgImg = loadImage('../assets/img/skyBackground.png');
// }

// function setup() {
//   const canvas = createCanvas(1920,700);
//   engine = Engine.create();
//   world = engine.world;
//   ground = new Ground(width / 2, height - 10, width, 20);
//   for (let i = 0; i < 3; i++) {
//     boxes[i] = new Box(450, 300 - i * 75, 84, 100);
//   }
//   bird = new Bird(150, 300, 25);

//   slingshot = new SlingShot(150, 300, bird.body);

//   const mouse = Mouse.create(canvas.elt);
//   const options = {
//     mouse: mouse
//   };

//   // A fix for HiDPI displays
//   mouse.pixelRatio = pixelDensity();
//   mConstraint = MouseConstraint.create(engine, options);
//   World.add(world, mConstraint);
// }

// function keyPressed() {
//   if (key == ' ') {
//     World.remove(world, bird.body);
//     bird = new Bird(150, 300, 25);
//     slingshot.attach(bird.body);
//   }
// }

// function mouseReleased() {
//   setTimeout(() => {
//     slingshot.fly();
//   }, 100);
// }

// function draw() {
//   background(bkgImg);
//   Matter.Engine.update(engine);
//   ground.show();
//   for (let box of boxes) {
//     box.show();
//   }
//   slingshot.show();
//   bird.show();
// }
