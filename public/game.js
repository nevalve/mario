kaboom({
    global: true,
    fullscreen: true,
    scale: 1.3,
    debug: true,
    background: [0, 0, 0]
})

let player_speed = 200;
let score = 0;
let num = 0;
let hard_mode = false;
let arr = [false, null];
let theme = "smb3";
let touch_device = (width() < 900) && isTouch();
loadSprite("mario1", "mario1.svg");
loadSprite("bullet", "bullet.svg");
loadSprite("mario2", "mario2.svg");
loadSprite("bg", "bg.svg");

loadSprite("stars", "stars.jpg");
loadSprite("play1", "play21.png");
loadSprite("play2", "play22.jpg");
loadSound("game_over", "go.wav");
loadSound("theme", "theme.mp3");
loadSound("start", "start.mp3");
loadSprite("cloud", "cloud.png");
loadSprite("stage", "stage.png")

scene("end", () => {
  let music = play("game_over");
  if (!touch_device){
  add([
    sprite("stage"),
    scale(4.5),
    z(1),
    pos(0, 0)
  ])
  add([
    text("The End", {
      size: 40
    }),
    pos(500, 100),
    z(2)
  ])
  add([
    text(`Your score was: ${score}`, {
      size: 40
    }),
    pos(400, 200),
    z(2)
  ])
  add([
    text("Press Space to play again", {
      size: 40
    }),
    pos(300, 300),
    z(2)
  ])
  } else {
    add([
    sprite("stage"),
    scale(2.25),
    z(1),
    pos(0, 0)
  ])
  add([
    text("The End", {
      size: 20
    }),
    pos(250, 50),
    z(2)
  ])
  add([
    text(`Your score was: ${score}`, {
      size: 20
    }),
    pos(200, 100),
    z(2)
  ])
  add([
    text("Touch the screen to play again", {
      size: 20
    }),
    pos(150, 150),
    z(2)
  ])
  }
  onKeyDown("space", () => {
    score = 0;
    music.pause();
    go("start")
  })
  onTouchStart(() => {
    score = 0;
      music.pause();
    go("start")
  })
})





scene("start", () => {
  let char1;
  let char2;
  let bg1;
  let grav;
  if (theme == "smb3"){
    char1 = "mario1";
    char2 = "mario2";
    bg1 = "bg";
    grav = 1;
  } else if (theme == "sml2") {
    char1 = "mario1";
    char2 = "mario2";
    bg1 = "stars"
    grav = 1 / 1.8;
  }
  let score_keeper;
  let player;
  let music;
  
  if (!touch_device){
    music = play("theme", {
    loop: true,
    speed: 1.0,
  });
    score_keeper = add([
    text(`Score: ${score}`),
    pos(0, 0),
    z(4),
    fixed()
  ])
  player = add([
    sprite(char1),
    body({
      weight: grav
    }),
    pos(1000, 0),
    area(),
    solid(),
    scale(1.2),
    "player",
    z(2),
  ])
  let bg = add([
    sprite(bg1),
    scale(2.8),
    pos(0, 0),
    z(0),
  
  ])
    bg.width = width();
  for(let x = 0; x < 10; x++){
    add([
    sprite("bullet"),
    scale(0.9),
    pos(randi(0, width()), randi(0, height())),
    area(),
    "enemy",
      z(2)
  ])
  }
  } else {
    onTouchStart(() => {
    if (num == 0){
    music = play("theme", {
    loop: true,
    speed: 1.0,
  });
    }
    num++;
  })
    score_keeper = add([
    text(`Score: ${score}`, {
      size: 20,
    }),
    pos(0, 0),
    z(4),
    fixed()
  ])
  player = add([
    sprite(char1),
    body({
      jumpForce: 450
    }),
    pos(500, 0),
    area(),
    solid(),
    scale(0.6),
    "player",
    z(2)
  ])
  add([
    sprite(bg1),
    scale(2),
    pos(0, 0),
    z(0)
  ])
  for(let x = 0; x < 10; x++){
    add([
    sprite("bullet"),
    scale(0.45),
    pos(randi(0, width()), randi(0, height())),
    area(),
    "enemy",
      z(2)
  ])
  }
  }
  
  onCollide("player", "enemy", (player, enemy) => 
    {
    /*if (player.pos.y < enemy.pos.y){*/
    player.jump()
    //}
    //destroy(enemy)
  })
  onKeyDown("left", () => {
    player.move(-player_speed, 0)
    player.use(sprite(char2))
  })
  onKeyDown("right", () => {
    player.move(player_speed, 0)
    player.use(sprite(char1))
  })
  onKeyDown("a", () => {
    player.move(-player_speed, 0);
    player.use(sprite(char2));
  })
  onKeyDown("d", () => {
    player.move(player_speed, 0);
    player.use(sprite(char1))
  })
  onTouchStart((mouse, coords) => {
    if (coords.x > width() / 2){
      arr = [true, "right"];
    } else {
      arr = [true, "left"]
    }
  })
  onTouchEnd(() => {
    arr = [false, null]
  })
  onUpdate("enemy", (enemy) => {
    if (!touch_device){
      enemy.move(-(player_speed - 70), 0)
    } else {
      enemy.move(-(player_speed - 120), 0)
    }
    if (arr[0]){
      if (arr[1] == "right"){
        player.move(player_speed - 187, 0)
    player.use(sprite(char1))
      } else {
        player.move(-(player_speed - 187), 0)
    player.use(sprite(char2))
      }
    }
  })
  
  loop(0.8, () => {
    if (!touch_device){
    add([
    sprite("bullet"),
    scale(0.9),
    pos(width(), randi(0, height())),
    area(),
    "enemy",
    z(2)
  ])
    } else {
    add([
    sprite("bullet"),
    scale(0.45),
    pos(width(), randi(0, height())),
    area(),
    "enemy",
    z(2)
  ])
    }
  })
  
  loop(4, () => {
    if (!touch_device){
    add([
      sprite("cloud"),
      scale(0.5),
      pos(randi(0, width()), -10),
      z(1),
      area(),
      "cloud"
    ])
    }
    else {
      add([
      sprite("cloud"),
      scale(0.25),
      pos(randi(0, width()), -10),
      z(1),
      area(),
      "cloud"
    ])
    }
  })
  loop(0.5, () => {
    score++;
    if (score > 50){
      music.speed = 2.0;
    }
    score_keeper.text = `Score: ${score}`;
  })
  onUpdate("cloud", (cloud) => {
    cloud.move((player_speed - 70), (player_speed - 70))
  })
  
  onUpdate("player", (player) => {
    if (player.pos.y > Math.floor(height())){
      if (music){
      music.pause();
      }
      num = 0;
      
      go("end");
    }
  })
})





scene("before_start" ,() =>{
  let music;
  onMouseDown(() => {
    if (num == 0){
    music = play("start", {
    loop: true
  })
      num++;
    }
  })
  if (!touch_device){
  add([
    text("Welcome to Mario Jump!\n\nUse the left and right\narrows to move and jump\non the bullet bills", {
      size: 40
    }),
    pos(width() / 3.5, 0),
  ])
  } else {
    add([
    text("Welcome to Mario Jump!\n\nTap the left and right\nsides of the screen to move and jump\non the bullet bills", {
      size: 20
    }),
    pos(width() / 3.5, 0),
  ])
  }
  let start = add([
    sprite("play1"),
    origin("center"),
    pos(width()/ 2, height() / 2 + 50),
    scale(0.5),
    area({cursor: "pointer"})
  ])/*
  let t = add([
    text("SML2"),
    color(WHITE),
    origin("left"),
    pos(0, height() / 2 + 50),
    area({cursor: "pointer"}),
    "t"
  ])*/
  onUpdate(() => {
    if (start.isHovering()){
      start.use(sprite("play2"))
      
    } else {
      start.use(sprite("play1"))
      cursor("default")
    }
    /*if (t.isHovering()) {
      t.color = GREEN;
    } else {
      t.color = WHITE;
      cursor("default")
    }*/
  })
/*
  onMousePress(() => {
    if (t.isHovering()){
      theme = "sml2";
    alert("Ok, experimental")
    }
  })
  */
  start.onClick(() => {
    start.use(sprite("play2"));
    if (music){
      music.pause();
    }
    go("start")
    
    
  })
  onTouchStart(() => {
    start.use(sprite("play2"));
    if (music){
      music.pause();
    }
    go("start")
  })
})




scene("error", () => {
  add([
    text("Please open this in \ https://Super-Real-Mario.netfour.repl.co", {
      size: 20
    })
  ])
})
if (window.location.href == 'https://Super-Real-Mario.netfour.repl.co' || window.location.href == "https://Super-Real-Mario.netfour.repl.co"){
go("before_start")
} else {
  go("error")
}
