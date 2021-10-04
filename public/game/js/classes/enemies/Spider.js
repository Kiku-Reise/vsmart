var Spider = function(x, y) {
    Enemy.call(this, x, y, 'en_spider');
    this.moveX = this.x;
    this.hp = 10;
    this.hsp = this.x === 75 ? 1 : -1;
    this.vsp = 5;

    this.state = 'up';
    this.weapon = new Sonic(this);
}

Spider.prototype = Object.create(Enemy.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.move = function() {
    if (this.state === 'up') {
        this.y -= this.vsp;
        if (this.y < 75) {
            this.state = 'slide';
            this.weapon.fire(true);
        }
    } else if (this.state === 'down') {
        this.y += this.vsp;
    } else if (this.state === 'slide') {
        this.x += this.hsp;
        if (Math.abs(this.x - this.moveX) >= this.game.world.width - 150) {
            this.weapon.destroy();
            this.state = 'down';
        }
    }

    if (this.state === 'down' && this.y > game.world.height + this.height) this.remove();
}
