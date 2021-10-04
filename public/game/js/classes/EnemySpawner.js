var EnemySpawner = function() {
    this.level = levelData[game.currentLevel].slice();
    this.spawn();
}

EnemySpawner.prototype.spawn = function() {
    if (!game.playerShip.alive || game.pause == true) return;
    
    if (this.level.length === 0) {
        if(game.playerShip.score <  game.playerShip.validateScore){
            //game.audio.playSound('sndExplosion');
            game.playerShip.die();
            //game.playerShip.alpha = 0;
            //game.playerShip.weapon.destroy();
            //new Explosion(game.playerShip.x, game.playerShip.y);
            //return new GameOver();
            return;
        }else{
            return new LevelComplete();
        }
        
    }
    var enemyData = this.level.shift();

    if (enemyData.enemy === 'asteroid') {
        new Asteroid(irandom_range(50, game.world.width - 50), -50);
    } else if (enemyData.enemy === 'asteroid 2') {
        for (var i = 0; i < 2; i++) {
            new Asteroid(irandom_range(50, game.world.width - 50), irandom_range(-50, -200));
        }
    } else if (enemyData.enemy === 'asteroid 3') {
        for (var i = 0; i < 3; i++) {
            new Asteroid(irandom_range(50, game.world.width - 50), irandom_range(-50, -200));
        }
    } else if (enemyData.enemy === 'asteroid 4') {
        for (var i = 0; i < 4; i++) {
            new Asteroid(irandom_range(50, game.world.width - 50), irandom_range(-50, -200));
        }
    } else if (enemyData.enemy === 'asteroid 5') {
        for (var i = 0; i < 5; i++) {
            new Asteroid(irandom_range(50, game.world.width - 50), irandom_range(-50, -200));
        }
    } else if(enemyData.enemy === 'scout') {
        new Scout(irandom_range(50, game.world.width - 50, -50));
    } else if(enemyData.enemy === 'scout 3') {
        var xx = irandom_range(150, game.world.width - 150);
        new Scout(xx, -50);
        new Scout(xx - 80, - 120);
        new Scout(xx + 80, - 120);
    } else if (enemyData.enemy === 'marine') {
        new Marine(choose(-50, game.world.width + 50), irandom_range(50, 300));
    } else if (enemyData.enemy === 'marine 3') {
        var yy = irandom_range(50, 200);
        var side = choose([-50, game.world.width + 50], [game.world.width + 50, -50]);
        new Marine(side[0], yy);
        game.time.events.add(500, function(){
            new Marine(side[1], yy + 60);
        }, this, side)
        game.time.events.add(1000, function(){
            new Marine(side[0], yy + 120);
        }, this, side)
    } else if (enemyData.enemy === 'squid') {
        new Squid(irandom_range(100, game.world.width - 100), -100);
    } else if (enemyData.enemy === 'squid 2') {
        var xx = irandom_range(150, game.world.width - 300)
        new Squid(xx, -100);
        new Squid(xx + 150, -100);
    } else if (enemyData.enemy === 'slider') {
        new Slider(irandom_range(150, game.world.width - 150), -50);
    } else if (enemyData.enemy === 'slider 3') {
        var xx = irandom_range(150, game.world.width - 150);
        for (var i = 0; i < 3; i++) {
            new Slider(xx, i * -100 - 50);
        }
    } else if (enemyData.enemy === 'slider 5') {
        var xx = irandom_range(150, game.world.width - 150);
        for (var i = 0; i < 5; i++) {
            new Slider(xx, i * -100 - 50);
        }        
    } else if (enemyData.enemy === 'spider') {
        var xx = choose(75, game.world.width - 75);
        new Spider(xx, game.world.height + 50);
    } else if (enemyData.enemy === 'spider 2') {
        new Spider(75, game.world.height + 50);
        new Spider(game.world.width - 75, game.world.height + 50);
    } else if (enemyData.enemy === 'assault') {
        new Assault(irandom_range(50, game.world.width - 50), -50);
    } else if (enemyData.enemy === 'octopus') {
        new Octopus(game.world.centerX, -100);
    } else if (enemyData.enemy === 'brain') {
        new Brain(game.world.centerX, -100);
    } else if (enemyData.enemy === 'lurr') {
        new Lurr(game.world.centerX, -100);
    }

    game.time.events.add(enemyData.timeout * 1000, this.spawn, this);
}