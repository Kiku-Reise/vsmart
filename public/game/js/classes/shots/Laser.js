var Laser = function(x, y, type, damage) {
    Shot.call(this, x, y, type, damage, 'shots/laser');

    this.vsp = 30;
}

Laser.prototype = Object.create(Shot.prototype);
Laser.prototype.constructor = Laser;    
