var Enemy = function(x, y, sprite) {
    Phaser.Sprite.call(this, game, x, y, 'atlas', sprite);
    this.anchor.setTo(0.5);
    game.groups.enemies.add(this);

    this.type = 'enemy';
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    this.move();
}

Enemy.prototype.die = function() {
    new Explosion(this.x, this.y, this.hsp, this.vsp);
    if (this.weapon) this.weapon.destroy();
    this.destroy();

    // spawn something
    switch(irandom(30)) {
        case 0:
            new Powerup(this.x, this.y, 'weapon');  
            break;
        case 1:
            new Powerup(this.x, this.y, 'health');  
            break;
        case 2:
            new Powerup(this.x, this.y, 'shield');  
            break;
    }

    // set score
    var score;
    if (this instanceof Asteroid) {
        score = 5;
    } else if (this instanceof Marine) {
        score = 10
    } else if (this instanceof Scout) {
        score = 20
    } else if (this instanceof Slider) {
        score = 35
    } else if (this instanceof Squid) {
        score = 40
    } else if (this instanceof Assault) {
        score = 70
    } else if (this instanceof Spider) {
        score = 100
    } else if (this instanceof Brain) {
        score = 250
    } else if (this instanceof Octopus) {
        score = 400
    } else if (this instanceof Lurr) {
        score = 1000
    }

    game.playerShip.addScore(score);
    game.audio.playSound('sndExplosion');
}


Enemy.prototype.remove = function() {
    if (this.weapon) this.weapon.destroy();
    this.destroy();
}

Enemy.prototype.getHit = function(damage) {
    this.hp -= damage;
    if (this.hp <= 0) return this.die();

    this.tint = 0xff0000;
    game.time.events.add(100, function(){
        this.tint = 16777215;
    }, this);

    game.audio.playSound('sndHit');
}