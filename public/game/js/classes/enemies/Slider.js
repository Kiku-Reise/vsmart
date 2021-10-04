var Slider = function(x, y) {
    Enemy.call(this, x, y, 'en_slider');
    this.moveX = this.x;
    this.hp = 5;
    this.vsp = 2;

    this.weapon = new SmallLaser(this);
    game.time.events.add(irandom_range(1000, 3000), function(){
        this.weapon.fire(true);
    }, this);
}

Slider.prototype = Object.create(Enemy.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.move = function() {
    var seed = this.y / 50;
    this.x = this.moveX + Math.cos(seed) * 70;
    this.y += this.vsp;
    if (this.y > game.world.height + this.height) this.remove();
}
