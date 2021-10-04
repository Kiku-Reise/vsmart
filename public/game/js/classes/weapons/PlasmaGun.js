var PlasmaGun = function(parent) {
    this.parent = parent;
    this.reloading = false;
    this.reloadTime = 1;
    this.shot = Plasma;
    this.damage = 1;

    this.active = true;
}

PlasmaGun.prototype.fire = function(repeat) {
    if (!this.active) return;
    if (this.reloading) return;
    this.reloading = true;
    var shot = new this.shot(this.parent.x - 20, this.parent.y + 20, this.parent.type, this.damage);
    var shot = new this.shot(this.parent.x + 20, this.parent.y + 20, this.parent.type, this.damage);
    
    game.audio.playSound('sndGeneric');
    game.time.events.add(this.reloadTime * 1000, this.reload, this, repeat);
}

PlasmaGun.prototype.reload = function(repeat) {
    this.reloading = false;
    if (repeat) this.fire(true);
}

PlasmaGun.prototype.destroy = function() {
    this.active = false;
}