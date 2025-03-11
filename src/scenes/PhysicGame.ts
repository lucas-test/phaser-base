import { Scene } from 'phaser';


export class PhysicGame extends Scene {
    ball1: Phaser.Physics.Arcade.Sprite;
    ball2: Phaser.Physics.Arcade.Sprite;
    boundaries: Phaser.GameObjects.Group;

    constructor() {
        super( {
            key: 'PhysicGame',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 100 },
                    debug: false
                }
            }
        });
    }

    create() {
        // Create game boundaries
        this.createBoundaries();

        // Create balls
        this.ball1 = this.physics.add.sprite(200, 300, 'beach_ball');
        this.ball1.setScale(0.4);
        this.ball2 = this.physics.add.sprite(400, 300, 'beach_ball');
        this.ball2.setScale(0.4);

        // Set ball properties
        this.setupBall(this.ball1);
        this.setupBall(this.ball2);

        // Start initial movement
        this.startMovement(this.ball1, 200, Math.PI / 4); // 45 degrees
        this.startMovement(this.ball2, -200, -Math.PI / 4); // Opposite direction

        // Enable collisions
        this.physics.collide(this.ball1, this.ball2);
        this.physics.collide(this.ball1, this.boundaries);
        this.physics.collide(this.ball2, this.boundaries);

        // Handle click events
        this.input.on('pointerdown', this.handleClick, this);
    }

    setupBall(ball: Phaser.Physics.Arcade.Sprite) {
        ball.setCollideWorldBounds(true);
        ball.setDebug(true, true, 0x012345);
        ball.setCircle(120);
        ball.setBounce(0.6); // Perfect elastic collision
        ball.setImmovable(false);
        ball.setFriction(0.5); // No friction
    }

    startMovement(ball: Phaser.Physics.Arcade.Sprite, speed: number, angle: number) {
        ball.setVelocityX(Math.cos(angle) * speed);
        ball.setVelocityY(Math.sin(angle) * speed);
    }

    handleClick(pointer: Phaser.Input.Pointer) {
        const dist1 = Phaser.Math.Distance.BetweenPoints(pointer, this.ball1);
        const dist2 = Phaser.Math.Distance.BetweenPoints(pointer, this.ball2);

        const energy = 500;
        if (dist1 < 200) {
            const angle = Math.atan2(pointer.y - this.ball1.y, pointer.x - this.ball1.x);
            const velocity = energy * (1 - dist1 / 200);
            this.ball1.setVelocityX(Math.cos(angle) * velocity);
            this.ball1.setVelocityY(Math.sin(angle) * velocity);
        }
        if (dist2 < 200) {
            const angle = Math.atan2(pointer.y - this.ball2.y, pointer.x - this.ball2.x);
            const velocity = energy * (1 - dist2 / 200);
            this.ball2.setVelocityX(Math.cos(angle) * velocity);
            this.ball2.setVelocityY(Math.sin(angle) * velocity);
        }
    }

    createBoundaries() {
        // Create invisible walls around the game area
        this.physics.world.setBounds(50, 50, 700, 550);
        
        // Create visible boundary sprites
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff);
        graphics.strokeRect(50, 50, 700, 550);

        // Store reference to boundaries
        this.boundaries = this.add.group();
    }

    update() {
        this.physics.collide(this.ball1, this.ball2);
    }
}