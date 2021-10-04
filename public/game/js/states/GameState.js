var backgroundScreen;
var backgroundScreenHome;
var GameState = {
    create: async function () {
        game.stage.backgroundColor = '#333';

        game.groups = {};
        backgroundScreenHome = game.add.tileSprite(0, 0,game._width, game._height, "backgroundgame");
        backgroundScreenHome.anchor.setTo(0, 0);
        backgroundScreenHome.scale.set(1.5, 1.6);
        backgroundScreenHome.fixedToCamera = false;

        backgroundScreen = game.add.tileSprite(0, 0,game._width, game._height, "skys");
        var groups = ['bg', 'enemies', 'player', 'collectibles', 'shots', 'vfx', 'gui',"shop"];
        groups.forEach(function(item) {
            game.groups[item] = game.add.group();
        });
        initLevelData();
        var canvas = document.querySelector('canvas');
        
        if(canvas.getContext) {
            var ctx = canvas.getContext('2d', {
            alpha: false,
            });
            game.gameWidth = canvas.width;
            game.gameHeight = canvas.height;
            /*
            game.backgrounds = new Backgroun3d({
                width   : canvas.width,
                height  : canvas.height,
                ctx     : ctx
            });
            game.backgrounds.initStars();
            */
        }

        game.hash = game.web3.keccak256("https://starsbattle.co");
        game.socket = SmartApps.Blockchain.Socket();
        game.pause = false;
        game.ready = false;
        game.player = {};
        game.install = false;
        game.playerShip = {};
        game.parallax = new Parallax();
        game.hud = {};
        game.bulletBar = new BulletBars();
        game.spawner = {};

        game.wallet = await SmartApps.Blockchain.getLoginWallet();
        await game.socket.emit("sync", {tokenId : game.tokenId, score : 0},function(data){
            
            game.install = true;
            game.player = data;
            
        });

        

        game.socket.on("disconnect", function(){
            console.log("Disconnect Client");
            SmartApps.Blockchain.notify("Server connect error");
            alert("Account login other device");
            game.state.start('SelectClassState');
        });
        
        
        /*
        window.addEventListener("beforeunload", function (e) {
            var SubmitData = {
                tokenId:game.playerShip.tokenId,
                score : game.playerShip.score, 
                bullet : game.playerShip.bullet, 
                lever : game.currentLevel,
                record : 0,
                hash : game.hash};
            
            game.socket.emit("update",SubmitData);
          var confirmationMessage = "\o/";

          (e || window.event).returnValue = confirmationMessage; //Gecko + IE
          return confirmationMessage;                            //Webkit, Safari, Chrome
        });
        */
        
        new OptionsBar();
        /*
        new AudioSwitch({
            type: 'sound',
            group: game.groups.gui,
            x: 200,
            y: 37,
            atlas: 'atlas',
            spriteOff: 'gui/icon_sound_off',
            spriteOn: 'gui/icon_sound_on'
        });
        new AudioSwitch({
            type: 'music',
            group: game.groups.gui,
            x: 255,
            y: 37,
            atlas: 'atlas',
            spriteOff: 'gui/icon_music_off',
            spriteOn: 'gui/icon_music_on'
        });      
        */
        /*
        if (!game.device.desktop) {
            var left = game.add.image(0, game.world.height - 128, 'atlas', 'gui/touch_left');
            left.alpha = 0.2;
            var right = game.add.image(game.world.width - 128, game.world.height - 128, 'atlas', 'gui/touch_right');
            right.alpha = 0.2;
        }
        */

        
        //console.log(game.socket);
        $("body #header").remove();
    },
    
    update : () => {
        if(game.install == false) return;
        getLayer();
        backgroundScreen.tilePosition.y -=2;
        backgroundScreenHome.tilePosition.y +=0.5;

        if(game.playerShip != undefined && game.playerShip.tokenId > 0){
            if(Number(game.playerShip.bullet) < 4){
                game.pause = true;
            }
            game.socket.emit('sign',{tokenId : game.playerShip.tokenId, bullet : game.playerShip.bullet, lever : game.currentLevel, score : game.playerShip.score});
        }
        //backgroundScreenHome.tilePosition.x +=1;
    }

};

function getLayer  (){
        if(game.ready == false){
            
            game.playerShip = new PlayerShip();
            
            game.hud = new HUD();
            //game.bulletBar = new BulletBars();
            game.spawner = new EnemySpawner();
            game.ready = true;
        }
    }
function initLevelData() {
    storage = new Storage(game.settings.storagePrefix);
    var levels = [];
    for (var i = 0; i < 30; i++) {
        var level = {unlocked: i < game.currentLevel ? true : false, highscore: 0};
        levels.push(level);
    }
    levels[0].unlocked = true;

    storage.setItem('levels', JSON.stringify(levels));
}