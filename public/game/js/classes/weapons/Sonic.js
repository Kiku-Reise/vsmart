var Sonic = function(parent) {
    this.parent = parent;
    this.reloading = false;
    this.reloadTime = 1.8;
    this.shot = Wave;
    this.damage = 1;

    this.active = true;
}

Sonic.prototype.fire = function(repeat) {
    if (!this.active) return;
    if (this.reloading) return;
    this.reloading = true;
    var shot = new this.shot(this.parent.x, this.parent.y + 30, this.parent.type, this.damage);

    game.audio.playSound('sndGeneric');
    game.time.events.add(this.reloadTime * 1000, this.reload, this, repeat);
}

Sonic.prototype.reload = function(repeat) {
    this.reloading = false;
    if (repeat) this.fire(true);
}

Sonic.prototype.destroy = function() {
    this.active = false;
}