import { Scene } from 'phaser';

const SPEED = 5;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Phaser.GameObjects.Sprite;
    keyUp: Phaser.Input.Keyboard.Key | undefined;
    keyDown: Phaser.Input.Keyboard.Key | undefined;

    constructor ()
    {
        super('Game');
    }

    create ()
    {

   

        this.keyUp = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyDown = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);

        // this.background = this.add.image(512, 384, 'background');
        // this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 384, 'Mon jeu est trop bien', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

        this.player = this.add.sprite(200,200, 'lol')

        this.camera.startFollow(this.player, true, 0.1, 0.1, -200, 120);


        this.anims.create({
            key: 'walk',                    // Nom de l'animation
            frames: this.anims.generateFrameNumbers('lol', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0 ] }),
            frameRate: 20,                  // Vitesse en frames par seconde
            repeat: -1                      // -1 pour répéter en boucle
        });
        
        // Démarrer l'animation
        this.player.anims.play('walk');

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }

    update() {
        if (this.msg_text.x < 800){
            this.msg_text.x += 1;
        }

        if (typeof this.keyUp != "undefined" && this.keyUp.isDown){
            this.player.y -= SPEED;
        }
        if (typeof this.keyDown != "undefined" && this.keyDown.isDown){
            this.player.y += SPEED;
        }



    }
}
