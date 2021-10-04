var BulletBars = function() {
    //this.bulletBar = new BulletBars(20, 20);
    var bottom = game.world.height;
    this.bulletCount = game.add.text(80, bottom, game.playerShip.bullet);
    this.bulletCount.anchor.setTo(0.5, 1);
    this.bulletCount.align = 'right';
    this.bulletCount.fill = '#fff';
    this.bulletCount.stroke = '#000';
    this.bulletCount.strokeThickness = 4;
    this.bulletCount.font = 'square';
    this.bulletCount.fontSize = 20;
}

BulletBars.prototype.update = function() {
    this.bulletCount.text = game.playerShip.bullet;
}

BulletBars.prototype.updateBullet = function() {
    this.bulletCount.text = "Bullet : "+ Number(game.playerShip.bullet);
}