var MainMenuState = {
    create: function () {
        game.stage.backgroundColor = '#000';

        for (var i = 0; i < 10; i++) {
            var piece = game.add.image(irandom(game.world.width), irandom(game.world.height), 'atlas', 'parallax/' + choose('far_2', 'far_3', 'far_4'));
            piece.alpha = 0.5;
        }

        this.title = game.add.text(game.world.centerX, 100, 'Stars Battle');
        this.title.font = 'square';
        this.title.anchor.setTo(0.5);
        this.title.align = 'center';
        this.title.fontSize = 80;
        this.title.stroke = '#000';
        this.title.strokeThickness = 12;

        var grd = this.title.context.createLinearGradient(0, 0, 0, this.title.height);
        grd.addColorStop(0, '#ffd885');
        grd.addColorStop(1, '#e47d4a');   
        this.title.fill = grd;

        this.lurr = game.add.image(game.world.centerX, 300, 'atlas', 'en_lurr');
        this.lurr.anchor.setTo(0.5);

        this.hero = game.add.image(game.world.centerX, 650, 'atlas', 'player_ship');
        this.hero.anchor.setTo(0.5);

        this.planet = game.add.image(game.world.centerX, game.world.height + 180, 'atlas', 'main_menu_planet');
        this.planet.anchor.setTo(0.5);

        this.tap = game.add.text(game.world.centerX, game.world.centerY + 25, 'TAP TO START');
        this.tap.align = 'center';
        this.tap.anchor.setTo(0.5);
        this.tap.font = 'square';
        this.tap.fill = '#fff';
        this.tap.fontSize = 40;
        this.tap.stroke = '#000';
        this.tap.strokeThickness = 4;

        game.add.tween(this.tap).to({alpha: 0}, 500, 'Linear', true, 0, -1, true);

        
        game.input.onDown.addOnce(function(){
            game.state.start('SelectClassState');
        }, this);

        game.state.start('SelectClassState');
        
    },

    update: function() {
        this.planet.angle += 0.03;
    }
};