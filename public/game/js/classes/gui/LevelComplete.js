var LevelComplete = function() {
    Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY + 1000, 'atlas', 'gui/level_complete_bg');
    game.groups.gui.add(this);
    this.anchor.setTo(0.5);
    this.checkIfComplete();
}

LevelComplete.prototype = Object.create(Phaser.Sprite.prototype);
LevelComplete.prototype.constructor = LevelComplete;

LevelComplete.prototype.checkIfComplete = function() {
    if (!game.playerShip.alive) return this.destroy();
    if (game.groups.enemies.children.length === 0) {
        this.showMenu();
    } else {
        game.time.events.add(1000, this.checkIfComplete, this);
    }
}

LevelComplete.prototype.showMenu = function() {
    this.levelData = JSON.parse(game.storage.getItem('levels', 'string'));
    if (game.currentLevel < 29) this.levelData[game.currentLevel + 1].unlocked = true;
    this.levelData[game.currentLevel].highscore = Math.max(this.levelData[game.currentLevel].highscore, game.playerShip.score);
    game.storage.setItem('levels', JSON.stringify(this.levelData));

    game.playerShip.alpha = 0;
    game.playerShip.shield.alpha = 0;
    game.playerShip.weapon.destroy();
    game.add.tween(this).to({y: '-1000'}, 500, 'Bounce', true).onComplete.add(this.showScore, this);
}

LevelComplete.prototype.showScore = function() {
    var hs = game.add.text(game.world.centerX + 72, game.world.centerY, this.levelData[game.currentLevel].highscore);
    hs.align = 'center';
    hs.anchor.setTo(0.5);
    hs.font = 'square';
    hs.fill = '#fff';
    hs.stroke = '#000';
    hs.strokeThickness = 4;
    hs.fontSize = 36;

    var score = game.add.text(game.world.centerX - 76, game.world.centerY, game.playerShip.score);
    score.align = 'center';
    score.anchor.setTo(0.5);
    score.font = 'square';
    score.fill = '#fff';
    score.stroke = '#000';
    score.strokeThickness = 4;
    score.fontSize = 36;

    this.showButtons(this.levelData[game.currentLevel].highscore);
}

LevelComplete.prototype.showButtons =  function(highscore) {
    
    game.socket.emit("update",{
                tokenId:game.playerShip.tokenId,
                score : game.playerShip.score, 
                bullet : game.playerShip.bullet, 
                lever : game.currentLevel,
                record : highscore,
                hash : game.hash});
    
    if (game.currentLevel < 29 && game.playerShip.score >= game.playerShip.validateScore) {
        var next = game.add.button(game.world.centerX + 80, game.world.centerY + 90, 'atlas', async function() {
           
            $("body").append('<div id="LoaddingGame"><div class="preloader"><span class="spinner spinner-round"></span></div></div>');


            await game.socket.emit("gethash",{tokenId : game.playerShip.tokenId, score : game.playerShip.score, lever : game.currentLevel, wallet: game.wallet}, async function(value){
                if(value.reply == true){
                    game.state.start('SelectClassState');
                }else{
                    let validate = await game.web3.upLever(value.hash);
                    if(validate == true){
                        game.socket.emit("updatelever",{
                                tokenId:game.playerShip.tokenId,
                                hash : value.hash,
                                hscore : highscore
                            }, function(data){
                                
                                game.currentLevel = data.Lever;
                                game.validateScore = data.NextLeverScore;
                                game.state.start('GameState');
                        });
                    }else{
                        SmartApps.Blockchain.notify("Up lv error");
                        game.state.start('SelectClassState');
                    }
                }
                
            });
            $("body #LoaddingGame").remove();
            
        }, this, 'gui/icon_next_on', 'gui/icon_next_off', 'gui/icon_next_off');
        next.anchor.setTo(0.5);
    }

    var home = game.add.button(game.world.centerX, game.world.centerY + 90, 'atlas', function() {
        game.state.start('MainMenuState');
    }, this, 'gui/icon_home_on', 'gui/icon_home_off', 'gui/icon_home_off');
    home.anchor.setTo(0.5);    

    var replay = game.add.button(game.world.centerX - 80, game.world.centerY + 90, 'atlas', function() {
        
        game.state.start('GameState');
    }, this, 'gui/icon_replay_on', 'gui/icon_replay_off', 'gui/icon_replay_off');
    replay.anchor.setTo(0.5);      
}