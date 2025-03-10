import { Scene } from 'phaser';

// Mettre toutes les constantes en haut
const SPEED = 5;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Phaser.GameObjects.Sprite;
    keyUp: Phaser.Input.Keyboard.Key | undefined;
    keyLeft: Phaser.Input.Keyboard.Key | undefined;
    keyRight: Phaser.Input.Keyboard.Key | undefined;
    keyDown: Phaser.Input.Keyboard.Key | undefined;
    coin: Phaser.GameObjects.Sprite;
    isCoinedDestroyed: boolean = false;

    constructor ()
    {
        super('Game');
    }

    create ()
    {

        this.keyRight = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyLeft = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyUp = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyDown = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);

        // this.background = this.add.image(512, 384, 'background');
        // this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 384, 'Q et D pour se déplacer\n Récupères la pièce !', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

       
        // Player
        this.player = this.add.sprite(200,200, 'player')
        this.player.setScale(4)

        // this.camera.startFollow(this.player, true, 0.1, 0.1, -200, 120);

        this.anims.create({
            key: 'left',                    // Nom de l'animation
            frames: this.anims.generateFrameNumbers('player', { frames: [ 3,4,5 ] }),
            frameRate: 10,                  // Vitesse en frames par seconde
            repeat: -1                      // -1 pour répéter en boucle
        });
        this.anims.create({
            key: 'right',                  
            frames: this.anims.generateFrameNumbers('player', { frames: [ 6,7,8 ] }),
            frameRate: 10,                  
            repeat: -1                     
        });
        this.anims.create({
            key: 'idle',                    
            frames: this.anims.generateFrameNumbers('player', { frames: [ 1 ] }),
            frameRate: 10,                  
            repeat: -1                      
        });

         // Coin
         this.coin = this.add.sprite(500, 200, 'coin');
         this.anims.create({
             key: 'coin',                   
             frames: this.anims.generateFrameNumbers('coin', { frames: [ 0,1,2,3,4,5,6,7,6,5,4,3,2,1,0 ] }),
             frameRate: 10,                
             repeat: -1                  
         });
         this.coin.anims.play('coin');
 
        

        // this.input.once('pointerdown', () => {
        //     this.scene.start('GameOver');
        // });
    }

    update() {
        if (this.msg_text.x < 800){
            this.msg_text.x += 1;
        }

        if (typeof this.keyLeft != "undefined" && this.keyLeft.isDown){
            this.player.x -= SPEED;
            this.player.anims.play('left', true);
        } else if (typeof this.keyRight != "undefined" && this.keyRight.isDown){
            this.player.x += SPEED;
            this.player.anims.play('right',true);
        } else {
            this.player.anims.play('idle', true);
        }

        if (this.isCoinedDestroyed == false && Phaser.Math.Distance.BetweenPoints(this.player, this.coin) < 50){
            this.destroyCoin();
        }


    }



    destroyCoin() {
        this.isCoinedDestroyed = true;

        // Créer une animation de disparition
        this.tweens.add({
            targets: this.coin,
            scale: 0,
            y: this.coin.y - 100, // Monter légèrement
            x: this.coin.x + 50, 
            duration: 500,
            onStart: () => {
                // Jouer le son au début de l'animation
                console.log("yo")
                this.sound.play('blaster');
            },
            onComplete: () => {
                this.coin.destroy(); // Détruire la pièce après l'animation
            }
        });
    }
}
