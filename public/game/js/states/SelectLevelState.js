var SelectLevelState = {
    create: function() {
        game.stage.backgroundColor = '#077ccd';

        for (var i = 0; i < 10; i++) {
            var piece = game.add.image(irandom(game.world.width), irandom(game.world.height), 'atlas', 'parallax/' + choose('far_2', 'far_3', 'far_4'));
            piece.alpha = 0.5;
        }

        this.title = game.add.text(game.world.centerX, 100, 'Select Level');
        this.title.font = 'square';
        this.title.anchor.setTo(0.5);
        this.title.align = 'center';
        this.title.fill = '#fff';
        this.title.fontSize = 60;
        this.title.stroke = '#000';
        this.title.strokeThickness = 8;

        var levels = JSON.parse(game.storage.getItem('levels', 'string'));

        for (var i = 0; i < 30; i++) {
            if (levels[i].unlocked) {
                var button = game.add.button(50 + i % 5 * 90, 180 + Math.floor(i / 5) * 90, 'atlas', function(button){
                    game.currentLevel = button.level;
                    game.state.start('GameState');
                }, this, 'gui/level_bg', 'gui/level_bg');
                button.level = i;

                var txt = game.add.text(button.x + 41, button.y + 36, i+1);
                txt.font = 'square';
                txt.anchor.setTo(0.5);
                txt.align = 'center';
                txt.fontSize = 36;
                txt.fill = '#fff';
                txt.stroke = '#000';
                txt.strokeThickness = 4;
            } else {
                game.add.image(50 + i % 5 * 90, 180 + Math.floor(i / 5) * 90, 'atlas', 'gui/level_bg');
                game.add.image(50 + i % 5 * 90, 180 + Math.floor(i / 5) * 90, 'atlas', 'gui/lock');
            }
        }

        //game.state.start('GameState');
    }
}