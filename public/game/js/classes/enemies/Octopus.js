var Octopus = function(x, y) {
    Enemy.call(this, x, y, 'en_octopus');
    this.hp = 100;
    this.vsp = 3;

    this.state = 'down';
}

Octopus.prototype = Object.create(Enemy.prototype);
Octopus.prototype.constructor = Octopus;

Octopus.prototype.move = function() {
    if (this.state === 'down') {
        this.y += this.vsp;
        if (this.y >= 150) {
            this.state = 'hunting';
            game.time.events.add(1000, this.spawnSquid, this);
        }
    }

    if (this.state === 'down' && this.y > game.world.height + this.height) this.remove();
}

Octopus.prototype.spawnSquid = function() {
    if (this.hp <= 0) return;
    new Squid(irandom_range(this.x - 100, this.x + 100), this.y);
    game.time.events.add(2000, this.spawnSquid, this);
}