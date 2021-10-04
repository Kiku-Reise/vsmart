var Plasma = function(x, y, type, damage) {
    Shot.call(this, x, y, type, damage, 'shots/plasma');

    this.vsp = 25;
}

Plasma.prototype = Object.create(Shot.prototype);
Plasma.prototype.constructor = Plasma;    
