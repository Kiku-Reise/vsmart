var OptionsBar = function() {
	//Phaser.Sprite.call(this, game, 120, 37, 'control', 'gui/health_bar_bg');
	var options = game.add.button(190, 18, 'control', function(button){
		new GameOptions();
	},this,'options','options');
    game.add.image(190, 18, 'control', 'options');

    var options = game.add.button(231, 18, 'control', function(button){
    	

		new ShopBullet();
	},this,'shopbullet','shopbullet');
    game.add.image(231, 18, 'control', 'shopbullet');

}
OptionsBar.prototype = Object.create(Phaser.Sprite.prototype);
OptionsBar.prototype.constructor = OptionsBar;
OptionsBar.prototype.update = function(data){
	console.log(data);
}