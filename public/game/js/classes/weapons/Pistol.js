var Pistol = function(parent) {
    this.parent = parent;
    this.reloading = false;
    this.reloadTime = 0.9;
    this.shot = Bullet;
    this.damage = 1;

    this.active = true;
}

Pistol.prototype.fire = function(repeat) {
    if (!this.active) return;
    if (this.reloading) return;
    this.reloading = true;
    var shot = new this.shot(this.parent.x, this.parent.y + 20, this.parent.type, this.damage);

    game.audio.playSound('sndPistol');
    game.time.events.add(this.reloadTime * 1000, this.reload, this, repeat);
}

Pistol.prototype.reload = function(repeat) {
    this.reloading = false;
    if (repeat) this.fire(true);
}

Pistol.prototype.destroy = function() {
    this.active = false;
}