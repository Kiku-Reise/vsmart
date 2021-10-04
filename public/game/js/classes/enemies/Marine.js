var Marine = function(x, y) {
    Enemy.call(this, x, y, 'en_marine');

    this.direction = this.x < 0 ? 1 : -1;
    this.endX = this.x + (this.direction * (game.world.width + 100));
    this.hsp = 2.5;
    this.hp = 2;

    this.weapon = new Pistol(this);
    this.weapon.fire(true);
}

Marine.prototype = Object.create(Enemy.prototype);
Marine.prototype.constructor = Marine;

Marine.prototype.move = function() {
    this.x += this.hsp * this.direction;
    if (Math.abs(this.x - this.endX) < this.hsp * 2) this.remove();
}