var HealthBar = function(x, y) {
    Phaser.Sprite.call(this, game, x + 60, y, 'atlas', 'gui/health_bar_bg');

    this.fill = game.add.image(90, 27, 'atlas', 'gui/health_bar_fill');

    game.groups.gui.add(this);

    game.add.image(30, 18, 'control', 'gui/avatar');

    lever = game.add.text(x+25, y+33, game.currentLevel);
    lever.anchor.setTo(0.5, 1);
    lever.align = 'right';
    lever.fill = '#fff';
    lever.stroke = '#000';
    lever.strokeThickness = 4;
    lever.font = 'square';
    lever.fontSize = 20;
}

HealthBar.prototype = Object.create(Phaser.Sprite.prototype);
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.updateHealth = function() {
    var scale = game.playerShip.hp / game.playerShip.hpMax;
    game.add.tween(this.fill.scale).to({x: scale}, 250, 'Linear', true);
}