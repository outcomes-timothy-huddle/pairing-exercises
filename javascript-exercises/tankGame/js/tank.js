function Tank() {
    this.shadow = null;
    this.tank = null;
    this.turret = null;
    this.nextFire = 0;
    this.fireRate = 1000;
}

Tank.prototype.damage = function() {
    this.health -= 1;

    if (this.health <= 0) {
        this.alive = false;

        if(this.shadow) {
            this.shadow.kill();
        }
        if(this.tank) {
            this.tank.kill();
        }
        if(this.turret) {
            this.turret.kill();
        }

        return true;
    }

    return false;

};

Tank.prototype.distanceBetween = function(game, otherTank) {
    return game.physics.arcade.distanceBetween(this.tank, otherTank.tank)
};

Tank.prototype.angleBetween = function(game, otherTank) {
    return game.physics.arcade.angleBetween(this.tank, otherTank.tank);
};

Tank.prototype.hasFireTimerExpired = function(tankGame) {
    return tankGame.game.time.now > this.nextFire;
};

Tank.prototype.update = function() {

    //  Position all the parts and align shadow with tank
    this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;

    this.turret.x = this.tank.x;
    this.turret.y = this.tank.y;
};