var Assault = function(x, y) {
    Enemy.call(this, x, y, 'en_assault');
    this.hp = 10;
    this.hsp = 1;
    this.vsp = 3;

    this.state = 'down';
    this.weapon = new PlasmaGun(this);
}

Assault.prototype = Object.create(Enemy.prototype);
Assault.prototype.constructor = Assault;

Assault.prototype.move = function() {
    if (this.state === 'down') {
        this.y += this.vsp;
        if (this.y >= 100) {
            this.state = 'hunting';
            this.weapon.fire(true);
            this.vsp = 0;
        }
    } else if (this.state === 'hunting') {
        if (!game.playerShip) return;
        var direction = this.x <= game.playerShip.x ? 1 : -1;
        this.x += direction * this.hsp;
    }

    if (this.state === 'down' && this.y > game.world.height + this.height) this.remove();
}
