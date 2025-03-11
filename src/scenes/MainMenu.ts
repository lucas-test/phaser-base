import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    gameButtons: Array<GameObjects.Rectangle>;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {

        // this.scene.start('Game');


        // this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');

       
        // Liste des modèles disponibles
        const games = [
            { text: 'Physics Game', scene: 'PhysicGame' },
            { text: 'Arcade Mode', scene: 'Game' },
        ];




        const buttonContainer = this.add.container(512, 500);

        // Create buttons
        for ( let i = 0; i < games.length; i ++){
            const game = games[i];
            
            const rect = this.add.rectangle(
                0, 
                i * 100, 
                400, 
                80, 
                0x4444ff
            )
            .setOrigin(0.5)
            .setInteractive({ cursor: 'pointer' });

            const text = this.add.text(
                0, 
                i*100, 
                game.text, 
                {
                    fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
                }
            )
            .setOrigin(0.5);

            // Add hover effects
            rect.on('pointerover', () => {
                this.tweens.add({
                    targets: rect,
                    scale: 1.05,
                    duration: 200,
                    ease: 'Power1'
                });
            });

            rect.on('pointerout', () => {
                this.tweens.add({
                    targets: rect,
                    scale: 1,
                    duration: 200,
                    ease: 'Power1'
                });
            });

            // Add click handler
            rect.on('pointerdown', () => {
                this.scene.start(game.scene);
            });

            // Create button group
            const buttonGroup = this.add.container(0, 0, [rect, text]);
            
            // Add to container
            buttonContainer.add(buttonGroup);
        }





    }
}
