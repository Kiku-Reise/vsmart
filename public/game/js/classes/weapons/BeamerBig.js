var BeamerBig = function(parent) {
    this.parent = parent;
    this.reloading = false;
    this.reloadTime = 2;
    this.shot = BeamBig;
    this.damage = 1;

    this.active = true;
}

BeamerBig.prototype.fire = function(repeat) {
    if (!this.active) return;
    if (this.reloading) return;
    this.reloading = true;
    new this.shot(this.parent.x, this.parent.y + 80, this.parent.type, this.damage);
    new Wave(this.parent.x - 60, this.parent.y + 70, this.parent.type, this.damage);
    new Wave(this.parent.x + 60, this.parent.y + 70, this.parent.type, this.damage);

    game.audio.playSound('sndGeneric');
    game.time.events.add(this.reloadTime * 1000, this.reload, this, repeat);
}

BeamerBig.prototype.reload = function(repeat) {
    this.reloading = false;
    if (repeat) this.fire(true);
}

BeamerBig.prototype.destroy = function() {
    this.active = false;
}