function TankGame() {
    this.game = null;
    this.resources = new Resources();

    // game objects
    this.explosions = [];
    this.cursors = [];

    // player tank
    this.mainTank = null;

    // mini map
    this.miniMap = null;

    // enemy properties
    this.enemiesTotal = 0;
    this.enemiesAlive = 0;
    this.enemies = [];
    this.enemyBullets = []; //  The enemies' bullet group
}

TankGame.prototype.init = function(preload, create, update, render) {
    var self = this;

    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
        preload: function() { self.preload(); (preload ? preload() : null); },
        create:  function() { self.create(); (create ? create() : null); },
        update:  function() { self.update(); (update ? update() : null); },
        render:  function() { self.render(); (render ? render() : null); }
    });

    return this.game;
};

TankGame.prototype.preload = function() {
    this.resources.preload(this);
};

TankGame.prototype.create = function() {
    var self = this;

    //  Resize our game world to be a 2000 x 2000 square
    this.game.world.setBounds(-1000, -1000, 2000, 2000);
    this.resources.load();

    this.mainTank = new PlayerTank(this);
    this.initializeEnemyTanks();

    this.miniMap = new MiniMap();
    this.miniMap.init(this, 620, 420, 150, 150);

    //  Explosion pool
    this.explosions = this.game.add.group();

    for (var i = 0; i < 10; i++) {
        var explosionAnimation = this.explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }

    // layer intro logo over tank, which is layered over everything else
    this.mainTank.tank.bringToTop();
    this.mainTank.turret.bringToTop();
    this.resources.introLogo.bringToTop();

    // hide the introLogo when the user clicks
    this.game.input.onDown.add(function() {
        self.resources.removeIntroLogo();
        self.miniMap.hidden = false;
    }, this.game);

    this.game.camera.follow(this.mainTank.tank);
    this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    this.game.camera.focusOnXY(0, 0);

    this.cursors = this.game.input.keyboard.createCursorKeys();
};

TankGame.prototype.initializeEnemyTanks = function() {
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(100, 'bullet');

    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);

    this.enemies = [];
    this.enemiesTotal = 20;
    this.enemiesAlive = 20;

    for (var i = 0; i < this.enemiesTotal; i++) {
        this.enemies.push(new EnemyTank(i, this, this.enemyBullets));
    }
};

TankGame.prototype.update = function() {
    var self = this;

    this.game.physics.arcade.overlap(this.enemyBullets, this.mainTank.tank, function(tank, bullet) {
        self.bulletHitPlayer(self.mainTank.tank, bullet);
    }, null, this);

    this.enemiesAlive = 0;

    this.enemies.forEach(function(enemy) {
        if (enemy.alive) {
            self.enemiesAlive++;
            self.game.physics.arcade.collide(self.mainTank.tank, enemy.tank);
            self.game.physics.arcade.overlap(self.mainTank.bullets, enemy.tank, function(tank, bullet) {
                self.bulletHitEnemy(tank, bullet);
            }, null, this);
            enemy.update();
        }
    });

    this.handleTankMovementInput();
    this.resources.update();
    this.mainTank.update();

    if (this.game.input.activePointer.isDown) {
        this.mainTank.fire();
    }
};

TankGame.prototype.handleTankMovementInput = function() {
    if (this.cursors.left.isDown) {
        this.mainTank.turnLeft();
    }
    else if (this.cursors.right.isDown) {
        this.mainTank.turnRight();
    }

    if (this.cursors.up.isDown) {
        //  The speed we'll travel at
        this.mainTank.accelerate();
    } else {
        this.mainTank.drag();
    }
};

TankGame.prototype.bulletHitPlayer = function(tank, bullet) {
    bullet.kill();

    this.mainTank.tank.damage();
};

TankGame.prototype.bulletHitEnemy = function(tank, bullet) {
    bullet.kill();

    var destroyed = this.enemies[tank.name].damage();

    if (destroyed) {
        var explosionAnimation = this.explosions.getFirstExists(false);
        explosionAnimation.reset(tank.x, tank.y);
        explosionAnimation.play('kaboom', 30, false, true);
    }
};

// custom render loop definitions
TankGame.prototype.render = function() {
    //this.miniMap.render();

    // this.game.debug.text('Active Bullets: ' + this.bullets.countLiving() + ' / ' + this.bullets.length, 32, 32);
    this.game.debug.text('Enemies: ' + this.enemiesAlive + ' / ' + this.enemiesTotal, 32, 32);
};

