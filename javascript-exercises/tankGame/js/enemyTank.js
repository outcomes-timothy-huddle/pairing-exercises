EnemyTank.prototype = new Tank();
EnemyTank.prototype.constructor = EnemyTank;

function EnemyTank(index, tankGame, bullets) {
    this.tankGame = tankGame;

    var x = tankGame.game.world.randomX;
    var y = tankGame.game.world.randomY;

    this.game = game;
    this.health = 3;
    this.bullets = bullets;
    this.alive = true;
    this.maximumSightDistance = 300;
    this.bulletSpeed = 500;

    this.shadow = tankGame.game.add.sprite(x, y, 'enemy', 'shadow');
    this.tank = tankGame.game.add.sprite(x, y, 'enemy', 'tank1');
    this.turret = tankGame.game.add.sprite(x, y, 'enemy', 'turret');

    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.name = index.toString();

    tankGame.game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = tankGame.game.rnd.angle();

    tankGame.game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);
}

EnemyTank.prototype.update = function() {
    Tank.prototype.update.call(this);
    
    if(this.alive) {
        this.turret.rotation = this.angleBetween(this.tankGame.game, this.tankGame.mainTank);
        this.fireIfAble();
    }
};

EnemyTank.prototype.fireIfAble = function() {
    if (this.distanceBetween(this.tankGame.game, this.tankGame.mainTank) < this.maximumSightDistance) {
        if (this.hasFireTimerExpired(this.tankGame) && this.bullets.countDead() > 0) {
            this.nextFire = this.tankGame.game.time.now + this.fireRate;

            // get the first available bullet and fire it toward the player
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.turret.x, this.turret.y);
            bullet.rotation = this.tankGame.game.physics.arcade.moveToObject(bullet, this.tankGame.mainTank.tank, this.bulletSpeed);
        }
    }
};