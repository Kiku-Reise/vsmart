var BulletBig = function(x, y, type, damage) {
    Shot.call(this, x, y, type, damage, 'shots/bullet_big');

    this.vsp = 20;
}

BulletBig.prototype = Object.create(Shot.prototype);
BulletBig.prototype.constructor = BulletBig;    
