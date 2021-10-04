var Asteroid = function(x, y) {
    var sprite = 'en_asteroid_' + irandom(3);
    Enemy.call(this, x, y, sprite);

    this.hp = 3;
    this.vsp = 4;
    this.rotationDirection = choose(-1, 1);
}

Asteroid.prototype = Object.create(Enemy.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.move = function() {
    this.angle += this.rotationDirection;
    this.y += this.vsp;
    if (this.y > game.world.height + this.height) this.remove();
}