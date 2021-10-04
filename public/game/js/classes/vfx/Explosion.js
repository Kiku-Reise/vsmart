var Explosion = function(x, y, hsp, vsp) {
    Phaser.Sprite.call(this, game, x, y, 'atlas', '');
    this.anchor.setTo(0.5);

    this.hsp = hsp;
    this.vsp = vsp;

    this.animations.add('effect', Phaser.Animation.generateFrameNames('vfx/explosion_', 0, 7));
    this.animations.play('effect', 15, false, true);

    game.groups.vfx.add(this);
}

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function() {
    //if (this.hsp) this.x += this.hsp;
    //if (this.vsp) this.y += this.vsp;
}