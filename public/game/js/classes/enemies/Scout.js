var Scout = function(x, y) {
    Enemy.call(this, x, y, 'en_scout');
    this.hp = 3;
    this.vsp = 4;

    this.weapon = new Machinegun(this);
    game.time.events.add(irandom_range(500, 1000), this.fireSequence, this);
}

Scout.prototype = Object.create(Enemy.prototype);
Scout.prototype.constructor = Scout;

Scout.prototype.move = function() {
    this.y += this.vsp;
    if (this.y > game.world.height + this.height) this.remove();
}

Scout.prototype.fireSequence = function() {
    this.weapon.fire();
    if (this.hp > 0) game.time.events.add(irandom_range(1000, 2000), this.fireSequence, this);
}