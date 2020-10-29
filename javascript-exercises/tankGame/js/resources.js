function Resources() {
    this.explosionSound = null;
    this.clickSound = null;
    this.introLogo = null;
    this.land = null;

    this.loadedSoundsSubscribers = [];
}

Resources.prototype.preload = function(tankGame) {
    this.tankGame = tankGame;

    this.tankGame.game.load.atlas('tank', 'assets/tanks.png', 'assets/tanks.json');
    this.tankGame.game.load.atlas('enemy', 'assets/enemy-tanks.png', 'assets/tanks.json');
    this.tankGame.game.load.image('introLogo', 'assets/introLogo.png');
    this.tankGame.game.load.image('bullet', 'assets/bullet.png');
    this.tankGame.game.load.image('earth', 'assets/scorched_earth.png');
    this.tankGame.game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
    this.tankGame.game.load.audio('explosion', 'assets/audio/explosion.mp3');
    this.tankGame.game.load.audio('click', 'assets/audio/click.mp3');
};

Resources.prototype.load = function() {

    //  Our tiled scrolling background
    this.land = this.tankGame.game.add.tileSprite(0, 0, 800, 600, 'earth');
    this.land.fixedToCamera = true;

    this.introLogo = this.tankGame.game.add.sprite(0, 200, 'introLogo');
    this.introLogo.fixedToCamera = true;
    
    // load audio
    this.explosionSound = this.tankGame.game.add.audio('explosion');
    this.clickSound = this.tankGame.game.add.audio('click');

    // additional sounds should be added to this decoding callback
    //
    // NOTE:
    //  Being mp3 files these take time to decode, so we can't play them instantly
    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
    //  The audio files could decode in ANY order, we can never be sure which it'll be.
    this.tankGame.game.sound.setDecodedCallback([ this.explosionSound, this.clickSound], this.onLoadedSounds, this);
};

Resources.prototype.update = function() {
    this.land.tilePosition.x = -this.tankGame.game.camera.x;
    this.land.tilePosition.y = -this.tankGame.game.camera.y;
};

Resources.prototype.subscribeToLoadedSounds = function(subscriber) {
    this.loadedSoundsSubscribers.push(subscriber);
};

Resources.prototype.onLoadedSounds = function() {
    this.loadedSoundsSubscribers.forEach(function(subscriber) {
        subscriber.onLoadedSounds();
    });
};

Resources.prototype.removeIntroLogo = function() {
    this.introLogo.kill();
};