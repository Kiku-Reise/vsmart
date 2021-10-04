var Spit = function(x, y, type, damage, target) {
    Shot.call(this, x, y, type, damage, 'shots/spit');

    if (target) {
        var tx = target.x - x;
        var ty = target.y - y;
        var dist = Math.sqrt(tx * tx + ty * ty);

        this.hsp = tx / dist * 10;
        this.vsp = ty / dist * 10;
    } else {
        this.vsp = 15;
    }
}

Spit.prototype = Object.create(Shot.prototype);
Spit.prototype.constructor = Spit;    
