PlayerTank.prototype = new Tank();
PlayerTank.prototype.constructor = PlayerTank;

function PlayerTank(tankGame) {
    this.tankGame = tankGame;
    this.bullets = null;
    this.fireRate = 100;
    this.currentSpeed = 0;

    //  The base of our tank
    this.tank = this.tankGame.game.add.sprite(0, 0, 'tank', 'tank1');
    this.tank.anchor.setTo(0.5, 0.5);
    this.tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

    //  This will force it to decelerate and limit its speed
    this.tankGame.game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.drag.set(0.2);
    this.tank.body.maxVelocity.setTo(400, 400);
    this.tank.body.collideWorldBounds = true;

    //  Finally the turret that we place on-top of the tank body
    this.turret = this.tankGame.game.add.sprite(0, 0, 'tank', 'turret');
    this.turret.anchor.setTo(0.3, 0.5);

    //  A shadow below our tank
    this.shadow = this.tankGame.game.add.sprite(0, 0, 'tank', 'shadow');
    this.shadow.anchor.setTo(0.5, 0.5);

    //  Our bullet group
    this.bullets = this.tankGame.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
}

PlayerTank.prototype.update = function() {
    if (this.currentSpeed > 0) {
        this.tankGame.game.physics.arcade.velocityFromRotation(this.tank.rotation, this.currentSpeed, this.tank.body.velocity);
    }

    Tank.prototype.update.call(this);

    this.turret.rotation = this.tankGame.game.physics.arcade.angleToPointer(this.turret);
};

PlayerTank.prototype.fire = function() {
    if (this.tankGame.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        this.nextFire = this.tankGame.game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstExists(false);

        bullet.reset(this.turret.x, this.turret.y);

        bullet.rotation = this.tankGame.game.physics.arcade.moveToPointer(bullet, 1000, this.tankGame.game.input.activePointer, 500);

        this.tankGame.resources.explosionSound.play();
    } else {
        this.tankGame.resources.clickSound.play();
    }
};

PlayerTank.prototype.turnLeft = function() {
    this.tank.angle -= 4;
};

PlayerTank.prototype.turnRight = function() {
    this.tank.angle += 4;
};

PlayerTank.prototype.accelerate = function() {
    this.currentSpeed = 300;
};

PlayerTank.prototype.drag = function() {
    if (this.currentSpeed > 0) {
        this.currentSpeed -= 4;
    }
};