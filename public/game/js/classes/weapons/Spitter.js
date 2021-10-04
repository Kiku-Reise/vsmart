var Spitter = function(parent) {
    this.parent = parent;
    this.reloading = false;
    this.reloadTime = 1.5;
    this.shot = Spit;
    this.damage = 1;

    this.active = true;
}

Spitter.prototype.fire = function(repeat) {
    if (!this.active) return;
    if (this.reloading) return;
    this.reloading = true;
    var shot = new this.shot(this.parent.x, this.parent.y, this.parent.type, this.damage, game.playerShip || null);

    game.audio.playSound('sndGeneric');
    game.time.events.add(this.reloadTime * 1000, this.reload, this, repeat);
}

Spitter.prototype.reload = function(repeat) {
    this.reloading = false;
    if (repeat) this.fire(true);
}

Spitter.prototype.destroy = function() {
    this.active = false;
}