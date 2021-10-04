var BeamerSmall = function(parent) {
    this.parent = parent;
    this.reloading = false;
    this.reloadTime = 2;
    this.shot = BeamSmall;
    this.damage = 1;

    this.active = true;
}

BeamerSmall.prototype.fire = function(repeat) {
    if (!this.active) return;
    if (this.reloading) return;
    this.reloading = true;
    var shot = new this.shot(this.parent.x - 50, this.parent.y + 40, this.parent.type, this.damage);
    var shot = new this.shot(this.parent.x + 50, this.parent.y + 40, this.parent.type, this.damage);

    game.audio.playSound('sndGeneric');
    game.time.events.add(this.reloadTime * 1000, this.reload, this, repeat);
}

BeamerSmall.prototype.reload = function(repeat) {
    this.reloading = false;
    if (repeat) this.fire(true);
}

BeamerSmall.prototype.destroy = function() {
    this.active = false;
}