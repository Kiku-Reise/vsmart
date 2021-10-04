var Lurr = function(x, y) {
    Enemy.call(this, x, y, 'en_lurr');
    this.hp = 200;
    this.vsp = 3;
    this.hsp = 3;

    this.state = 'down';
    this.weapon = new BeamerBig(this);
}

Lurr.prototype = Object.create(Enemy.prototype);
Lurr.prototype.constructor = Lurr;

Lurr.prototype.move = function() {
    if (this.state === 'down') {
        this.y += this.vsp;
        if (this.y > 150) {
            this.weapon.fire(true);
            this.startMotion();
        }
    } else {
        this.x += this.hsp;
        this.y += this.vsp;
    }

    if (this.state === 'motion1' && this.x < 100) {
        this.state = 'motion2';
        this.hsp = 0;
        this.vsp = 3;
    } else if (this.state === 'motion2' && this.y > 400) {
        this.state = 'motion3';
        this.hsp = 3;
        this.vsp = 0;
    } else if (this.state === 'motion3' && this.x > game.world.width - 100) {
        this.state = 'motion4';
        this.hsp = 0;
        this.vsp = -3;
    } else if (this.state === 'motion4' && this.y < 150) {
        this.startMotion();
    }

    if (this.state === 'down' && this.y > game.world.height + this.height) this.remove();
}

Lurr.prototype.startMotion = function() {
    this.state = 'motion1';
    this.hsp = -3;
    this.vsp = 0;
}
