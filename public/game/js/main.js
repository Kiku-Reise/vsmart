var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
var Phaser = Phaser || {};
var gameWidth = width;
var gameHeight = height;



var game = new Phaser.Game({width : gameWidth, height : gameHeight, renderer : Phaser.CANVAS,parent : 'game',scaleMode: Phaser.ScaleManager.EXACT_FIT});
game.settings = {
    'lockOrientation': false, // should we prevent a player from playing using incorrect orientation?
    'displayOrientation': 'portrait', // portrait, landscape
    'storagePrefix': 'o10_' // prefix for local storage items
}
game.gameWidth = gameWidth;
game.gameHeight = gameHeight;

game.state.add('BootState', BootState);
game.state.add('PreloadState', PreloadState);
game.state.add('MainMenuState', MainMenuState);
game.state.add('SelectLevelState', SelectLevelState);
game.state.add('SelectClassState', SelectClassState);
game.state.add('GameState', GameState);


game.state.start('BootState');

//game.state.add('GameStateWeb3', Web3);