var PreloadState = {
    preload: function() {
        // show logo and progress bar
        game.preloadLogo = game.add.image(game.world.width/2, game.world.height/2-100, 'preload', 'logo');
        game.preloadLogo.anchor.setTo(0.5);
        
        game.preloadBar = game.add.sprite(game.world.width/2, game.world.height/2+100, 'preload', 'progress');
        game.preloadBar.x -= game.preloadBar.width/2;
        game.load.setPreloadSprite(game.preloadBar);
        game.web3 = SmartApps.tokenGame1;
        
        // load assets 
        game.load.atlasJSONHash('atlas', '/dist/game/starsbattle/images/atlas.png', '/dist/game/starsbattle/images/atlas.json');
        game.load.atlasJSONHash('nftplayer', '/dist/game/starsbattle/images/player.png', '/dist/game/starsbattle/images/player.json');
        game.load.atlasJSONHash('npc', '/dist/game/starsbattle/images/npc.png', '/dist/game/starsbattle/images/npc.json');
        game.load.atlasJSONHash('scene', '/dist/game/starsbattle/images/scene.png', '/dist/game/starsbattle/images/scene.json');
        game.load.atlasJSONHash('control', '/dist/game/starsbattle/images/control.png', '/dist/game/starsbattle/images/control.json');
        game.load.atlasJSONHash('bgroup', '/dist/game/starsbattle/images/background.png', '/dist/game/starsbattle/images/background.json');
       

        // audio
        game.load.audio('sndPew', '/dist/game/starsbattle/audio/pew.mp3', '/dist/game/starsbattle/audio/pew.ogg');
        game.load.audio('sndPistol', '/dist/game/starsbattle/audio/pistol.mp3', '/dist/game/starsbattle/audio/pistol.ogg');
        game.load.audio('sndGeneric', '/dist/game/starsbattle/audio/generic.mp3', '/dist/game/starsbattle/audio/generic.ogg');
        game.load.audio('sndPowerup', '/dist/game/starsbattle/audio/powerup.mp3', '/dist/game/starsbattle/audio/powerup.ogg');
        game.load.audio('sndExplosion', '/dist/game/starsbattle/audio/explosion.mp3', '/dist/game/starsbattle/audio/explosion.ogg');
        game.load.audio('sndHit', '/dist/game/starsbattle/audio/hit.mp3', '/dist/game/starsbattle/audio/hit.ogg');
        game.load.audio('musicOst', '/dist/game/starsbattle/audio/ost.mp3', '/dist/game/starsbattle/audio/ost.ogg');
        game.load.image('backgroundgame','/dist/game/starsbattle/images/'+choose("bg4.png","bg5.png"));
        game.load.image('skys','/dist/game/starsbattle/images/sky.png');
        
    },
    
    create: function() {
        game.audio.addSound('sndPew', true);
        game.audio.addSound('sndPistol', true);
        game.audio.addSound('sndGeneric', true);
        game.audio.addSound('sndPowerup', true);
        game.audio.addSound('sndExplosion', true);
        game.audio.addSound('sndHit', true);

        game.audio.addMusic('musicOst');
        game.audio.playMusic('musicOst');
        // start game
        game.state.start('MainMenuState');
    }
};