var Powerup = function(x, y, type) {
    Phaser.Sprite.call(this, game, x, y, 'atlas', 'powerups/' + type);
    this.anchor.setTo(0.5);
    this.type = type;
    this.vsp = 4;
    game.groups.collectibles.add(this);

    this.tween = game.add.tween(this.scale).to({x: 0.9, y: 0.9}, 500, 'Linear', true, 0, -1, true);
}

Powerup.prototype = Object.create(Phaser.Sprite.prototype);
Powerup.prototype.constructor = Powerup;

Powerup.prototype.update = function() {
    if (this.toKill) return this.destroy();

    this.y += this.vsp;
    if (this.y > game.world.height + this.height) {
        this.tween.stop();
        this.destroy();
    }
}