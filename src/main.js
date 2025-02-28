console.log("yo")

import Phaser from 'phaser'


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let upKey;

function preload(){
    this.load.spritesheet('player', 'images/lol.png',
        {  frameWidth: 48,  frameHeight: 48 }   );
}

function create(){
    player = this.physics.add.sprite(100,100, 'player');
    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: 'walk',           
        frames: this.anims.generateFrameNumbers('player', { 
            start: 0,           
            end: 7          
        }),
        frameRate: 20,        
        repeat: -1            
    });

    
}




function update(){

    this.player.anims()
    

}