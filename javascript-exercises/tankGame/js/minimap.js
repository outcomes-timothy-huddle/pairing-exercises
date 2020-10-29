function MiniMap() {
    this.tankGame = null;
    this.graphics = null;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.enemyDrawRadius = 20;
    this.hidden = true;
}

MiniMap.prototype.init = function(tankGame, x, y, w, h) {
    this.tankGame = tankGame;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.graphics = this.tankGame.game.add.graphics(x, y);
    this.graphics.fixedToCamera = true;

    
};

MiniMap.prototype.render = function() {
    if(!this.hidden) {
        var self = this;


        this.graphics.moveTo(0, 0);
        this.graphics.beginFill(0x000000);
        this.graphics.lineStyle(5, 0x00ffa9, 1);

        this.graphics.lineTo(this.w, 0);
        this.graphics.lineTo(this.w, this.h);
        this.graphics.lineTo(0, this.h);
        this.graphics.endFill();
        this.graphics.moveTo(0, 0);

        this.tankGame.enemies.forEach(function(enemy) {
            var percentX = (enemy.tank.x + 2000) / 4000;
            var percentY = (enemy.tank.y + 2000) / 4000;


            self.graphics.moveTo(0, 0);
            self.graphics.beginFill(0xFFFF0B, 0.5);
            self.graphics.lineStyle(0);
            self.graphics.drawCircle(percentX * self.w, percentY * self.h, self.enemyDrawRadius);
            self.graphics.endFill();
        });
    }
};