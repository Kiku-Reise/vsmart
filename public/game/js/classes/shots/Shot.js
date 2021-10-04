var Shot = function(x, y, type, damage, sprite) {
    Phaser.Sprite.call(this, game, x, y, 'atlas', sprite);
    this.anchor.setTo(0.5);
    game.groups.shots.add(this);

    this.type = type;
    this.damage = damage;
    this.vsGroup = this.type === 'player' ? game.groups.enemies : game.groups.player;

    this.direction = this.type === 'player' ? -1 : 1;
    this.angle = this.type === 'player' ? 0 : 180;
}

Shot.prototype = Object.create(Phaser.Sprite.prototype);
Shot.prototype.constructor = Shot;

Shot.prototype.update = function() {
    this.y += this.vsp * this.direction;
    
    if (this.hsp) this.x += this.hsp;
    
    // outside world bounds
    if (this.y < -50 || this.y > game.world.height + 50) return this.destroy();

    // collision w/enemies or player
    for (var i = 0; i < this.vsGroup.children.length; i++) {
        var object = this.vsGroup.children[i];
        if (!object.invincible && checkOverlap(this, object)) {
            object.getHit(this.damage);
            this.die();
            break;
        }
    }
}

Shot.prototype.die = function() {
    this.destroy();
}