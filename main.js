'use strict'

const Game = new Phaser.Game(800, 800, Phaser.AUTO, 'game-canvas', { preload, create, update })

function preload() {
    Game.load.spritesheet("player", "Graphics/sprite/trex_player_sprite.png", 88, 94);
    Game.load.image("ground", "Graphics/images/ground.png");
    Game.load.image("cactus1", "Graphics/images/cactus1.png");
    Game.load.image("cactus2", "Graphics/images/cactus2.png");
    Game.load.image("cactus3", "Graphics/images/cactus3.png");
    Game.load.image("background", "Graphics/images/white_background.png");
    Game.load.image("EndScreen", "Graphics/images/game_over.png");
}

let player;
let cactus = [], temp;
let ground;

let Space;
let score = 0;
let gameO = false;


function create() {
    Game.add.image(0, 0, "background");
    player = Game.add.sprite(50, 300, "player");
    player.animations.add("stop", [0]);
    player.animations.add("move", [2, 3]);
    Game.physics.enable(player);
    player.body.gravity.y = 1500;

    ground = Game.add.sprite(0, 500, "ground");
    Game.physics.enable(ground);
    ground.body.immovable = true;

    temp = Game.add.sprite(-200, 420, "cactus1");
    Game.physics.enable(temp);
    cactus.push(temp);
    cactus[0].scale.setTo(0.6);
    temp = Game.add.sprite(-200, 420, "cactus2");
    Game.physics.enable(temp);
    cactus.push(temp);
    temp = Game.add.sprite(-200, 420, "cactus3");
    Game.physics.enable(temp);
    cactus.push(temp);

    for(let i=0;i<3;i++)
    {
        Game.physics.enable(cactus[i]);
        cactus[i].immovable = true;
    }
        
    Space = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    console.log(ground);
}

let cactus_pos = 0;

function update() {
    if(!gameO)
    {
        score++;
        console.log(score);

        player.animations.play("move", 10, true, false);

        jump();
        move();
        gameover();

        Game.physics.arcade.collide(player, ground);
        Game.physics.arcade.collide(player, cactus);
    }
    else
    {
        Game.add.sprite(0, 0, "background");
        temp = Game.add.sprite(0, 0, "EndScreen");
        temp.anchor.setTo(0.5);
        temp.position.x = 400;
        temp.position.y = 400;
    }

    if(ground.position.x == -800)
    {
        ground.position.x = 0;
    }

    if(cactus_pos <= 0)
    {
        cactus[Math.floor(Math.random() * 3)].position.x = 900;
        cactus_pos = Math.floor((Math.random() * 500)) + 900;
    }
    cactus_pos-=10;
}

function jump()
{
    if(Space.isDown && Game.physics.arcade.collide(player, ground))
    {
        player.body.velocity.y = -650;
        player.animations.play("stop", 10, true, false);
    }
}

function move()
{
    ground.position.x-=10;
    for(let i=0;i<3;i++)
    {
        cactus[i].position.x-=10;
    }
}

function gameover()
{
    if(Game.physics.arcade.collide(player, cactus))
    {
        console.log("Game Over");
        gameO = true;
    }
}