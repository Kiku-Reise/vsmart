var GameOptions = function() {
    Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY + 1000, 'atlas', 'gui/game_over_bg');
    game.groups.gui.add(this);
    this.anchor.setTo(0.5);
    game.add.tween(this).to({y: '-1000'}, 500, 'Bounce', true).onComplete.add(this.showButtons, this);
}

GameOptions.prototype = Object.create(Phaser.Sprite.prototype);
GameOptions.prototype.constructor = GameOver;

GameOptions.prototype.showButtons = function() {

    var levels = game.add.button(game.world.centerX - 80, game.world.centerY + 30, 'atlas', function() {
        
        game.state.start('SelectClassState');
    }, this, 'gui/icon_levels_on', 'gui/icon_levels_off', 'gui/icon_levels_off');
    levels.anchor.setTo(0.5);

    var home = game.add.button(game.world.centerX, game.world.centerY + 30, 'atlas', function() {
        game.state.start('MainMenuState');
    }, this, 'gui/icon_home_on', 'gui/icon_home_off', 'gui/icon_home_off');
    home.anchor.setTo(0.5);    

    var replay = game.add.button(game.world.centerX + 80, game.world.centerY + 30, 'atlas', function() {
        game.state.start('GameState');
    }, this, 'gui/icon_replay_on', 'gui/icon_replay_off', 'gui/icon_replay_off');
    replay.anchor.setTo(0.5);      
}