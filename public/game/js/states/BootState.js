var BootState = {
    init: function() {
        // Responsive scaling
        //this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        
        // Center the game
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh()
        
    },
    
    preload: function() {
        game.load.atlasJSONHash(
            'preload',
            '/dist/game/starsbattle/images/preload_atlas.png',
            '/dist/game/starsbattle/images/preload_atlas.json'           
        );
    },
    
    create: function () {
        game.stage.backgroundColor = '#fff';
        
        // add orientation controller
        if (game.settings.lockOrientation) {
            game.orientation = new Orientation(game.settings.displayOrientation);   
            game.orientation.checkOrientation();
        }        
        initLevelData();
        // add storage controller
        game.storage = new Storage(game.settings.storagePrefix);
        
        // add audio controller
        game.audio = new AudioController();
        
        

        // start preload state
        game.state.start('PreloadState')
    }
};

function initLevelData() {
    
    var levels = [];
    for (var i = 0; i < 30; i++) {
        var level = {unlocked: false, highscore: 0};
        levels.push(level);
    }
    levels[0].unlocked = true;

    game.storage.setItem('levels', JSON.stringify(levels));
}