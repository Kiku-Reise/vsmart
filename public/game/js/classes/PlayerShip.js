var PlayerShip =   function() {

    
    
        Phaser.Sprite.call(this, game, game.world.centerX, game.world.height - 100, 'nftplayer', 'player_'+game.player.Class);
        this.anchor.setTo(0.5);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        this.shield = game.add.sprite(this.x, this.y, 'nftplayer', 'shield');
        this.shield.alpha = 0;
        this.shield.anchor.setTo(0.5);
        this.weapon = new Machinegun(this);
        this.weapon.fire(true);
        this.alive = true;
        this.score = 0;
        this.type = 'player';
        this.hp = 10;
        this.hpMax = this.hp;
        this.invincible = false;
        this.bullet = game.player.Bullet;
        this.moveSpeed = game.player.Speed > 2 ? game.player.Speed : 7;
        this.tokenId = game.player.tokenId;
        this.validateScore = game.player.NextLeverScore;
        game.currentLevel = game.player.Lever;
        this.touchLeft = false;
        this.touchRight = false;
        this.showShop == false;
        
        if(game.currentLevel > 4){
            alert("Wait open next time");
            game.state.start('SelectClassState');
            return;
        }
        if (!game.device.desktop) {
                this.activePointer = game.input.activePointer;
            }
        
        game.input.onDown.add(this.onBeginTouch, this);
        game.input.onUp.add(this.onEndTouch, this)
        

        //game.socket.emit('join',{wallet : game.wallet, tokenId : game.playerShip.tokenId, bullet : game.playerShip.bullet, lever : game.currentLevel, score : game.playerShip.score});
       // game.socket.emit("join",{tokenid : this.tokenId));
        game.groups.player.add(this);
        
        //console.log(pointer);
        
    
}

PlayerShip.prototype = Object.create(Phaser.Sprite.prototype);
PlayerShip.prototype.constructor = PlayerShip;


PlayerShip.prototype.onBeginTouch = function(pointer) {
    

    if (!this.touchLeft && pointer.x < gameWidth / 2) {
        this.touchLeft = pointer;
    } else if (!this.touchRight && pointer.x >= gameWidth / 2) {
        this.touchRight = pointer;
    }

}

PlayerShip.prototype.onEndTouch = function(pointer) {
    //console.log(pointer);
    if (pointer === this.touchLeft) {
        this.touchLeft = false;
    } else if (pointer === this.touchRight) {
        this.touchRight = false;
    }
    
    //game.backgrounds.drawBackground(this);// Set 3d
}



PlayerShip.prototype.update = function() {

    
    if(!this.alive) return;
    if(Number(this.bullet) < 1) {
        
        //if(this.showShop == false) {
            new ShopBullet();
        //}
        this.showShop == true;
        return;
    }


    // movement
    var left = this.leftKey.isDown ? -1 : 0;
    var right = this.rightKey.isDown? 1 : 0;
    var up = this.upKey.isDown ? -1 : 0;
    var down = this.downKey.isDown? 1 : 0;
    
    
    
   
    
    //console.log(pointer.isDown);
    
    var hsp = (left + right) * this.moveSpeed;
    var hsp2 = (up + down) * this.moveSpeed;


    

    if (!game.device.desktop) {
        var left = this.touchLeft ? -1 : 0;
        var right = this.touchRight.isDown? 1 : 0;
        var up = this.upKey.isDown ? -1 : 0;
        var down = this.downKey.isDown? 1 : 0;
        if (this.activePointer.isDown) {
            left = this.activePointer.isDown && this.activePointer.x < this.x ? -1 : 0;
            right = this.activePointer.isDown && this.activePointer.x > this.x ? 1 : 0;
            up = this.activePointer.isDown && this.activePointer.y < this.y ? -1 : 0;
            down = this.activePointer.isDown && this.activePointer.y > this.y? 1 : 0;
            
        }

        var hsp = (left + right) * this.moveSpeed;
        var hsp2 = (up + down) * this.moveSpeed;
    }

    this.x += hsp;
    this.x = Phaser.Math.clamp(this.x, this.width/2, game.world.width - this.width/2);
    this.y += hsp2;
    this.y = Phaser.Math.clamp(this.y, this.height/2, game.world.height - this.height/2);

    this.shield.x = this.x;
    this.shield.y = this.y;

    // check for collision vs enemies
    if(!this.invincible) {
        for (var i = 0; i < game.groups.enemies.children.length; i++) {
            var enemy = game.groups.enemies.children[i];
            if (checkOverlap(this, enemy)) {
                this.getHit(1);
                break;
            }
        }
    }

    // check for collision vs collectibles
    for (var i = 0; i < game.groups.collectibles.children.length; i++) {
        var item = game.groups.collectibles.children[i];
        if (!item.toKill && checkOverlap(this, item)) {
            if (item instanceof Powerup) {
                item.toKill = true;
                game.audio.playSound('sndPowerup');
                if (item.type === 'weapon') {
                    this.weapon.upgrade();
                } else if (item.type === 'health') {
                    this.addHealth(5);
                } else if (item.type === 'shield') {
                    if (this.shield.alpha === 0) {
                        this.addShield();
                    }
                }
            }
        }
    };
}

PlayerShip.prototype.getHit = function(damage) {
    if(!this.alive) return;

    this.hp -= damage;
    this.hp = Math.max(this.hp, 0);

    game.hud.update();

    if (this.hp > 0) {
        this.invincible = true;
        this.alpha = 0;
        game.add.tween(this).to({alpha: 1}, 200, 'Linear', true, 0, 6, true).onComplete.add(this.resetInvincible, this);
    }
    game.audio.playSound('sndHit');
    if (this.hp <= 0) return this.die();
}

PlayerShip.prototype.resetInvincible = function() {
    this.alpha = 1;
    if (this.shield.alpha === 0) this.invincible = false;
}

PlayerShip.prototype.die = function() {
    game.audio.playSound('sndExplosion');
    this.alive = false;
    this.alpha = 0;
    this.weapon.destroy();
    new Explosion(this.x, this.y);
    new GameOver();
}

PlayerShip.prototype.addHealth = function(value) {
    this.hp += value;
    this.hp = Math.min(this.hpMax, this.hp);
    game.hud.update();
}

PlayerShip.prototype.addShield = function() {
    this.invincible = true;
    this.shield.alpha = 1;
    game.time.events.add(10000, this.removeShield, this);
}

PlayerShip.prototype.removeShield = function() {
    this.invincible = false;
    this.shield.alpha = 0;
}

PlayerShip.prototype.addScore = function(value) {
    this.score += value;
    game.hud.updateScore();
}
PlayerShip.prototype.addBullet = function(value) {
    if(this.bullet < 4) {
        this.bullet = 0;
        return;
    }
    this.bullet -= Number(value);
    game.bulletBar.updateBullet();
}