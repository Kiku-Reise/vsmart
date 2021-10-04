var Squid = function(x, y) {
    Enemy.call(this, x, y, 'en_squid');
    this.hp = 5;
    this.vsp = 0.76;
    this.moveX = this.x;
    this.moveY = this.y;

    this.weapon = new Spitter(this);
    game.time.events.add(irandom_range(1000, 3000), function(autoshot) {
        this.weapon.fire(autoshot);
    }, this, true);
    //this.weapon.fire(true);
}

Squid.prototype = Object.create(Enemy.prototype);
Squid.prototype.constructor = Squid;

Squid.prototype.move = function() {
    this.moveY += this.vsp;

    var time = new Date().getTime() / 1000;
    this.x = this.moveX + Math.cos(time) * 100;
    this.y = this.moveY + Math.sin(time) * 100;

    if (this.y > game.world.height + this.height) this.remove();    
}

