var Brain = function(x, y) {
    Enemy.call(this, x, y, 'en_brain');
    this.hp = 500;
    this.vsp = 3;

    this.state = 'down';
    this.weapon = new BeamerSmall(this);
}

Brain.prototype = Object.create(Enemy.prototype);
Brain.prototype.constructor = Brain;

Brain.prototype.move = function() {
    if (this.state === 'down') {
        this.y += this.vsp;
        if (this.y >= 150) {
            this.state = 'hunting';
            this.vsp = 0;
            this.moveX = this.x;
            this.moveY = this.y;
            this.radius = 0;
            this.radiusIncrement = 1;
            this.weapon.fire(true);
        } 
    } else if (this.state === 'hunting') {
        var seed = new Date().getTime() / 500;
        this.x = this.moveX + Math.cos(seed) * this.radius;
        this.y = this.moveY + Math.sin(seed) * this.radius;
        
        this.radius += this.radiusIncrement;
        if (this.radiusIncrement > 0 && this.radius > 150) {
            this.radiusIncrement = -1;
        } else if (this.radiusIncrement < 0 && this.radius < 1) {
            this.radiusIncrement = 1;
        }
    }

    if (this.state === 'down' && this.y > game.world.height + this.height) this.remove();
}
