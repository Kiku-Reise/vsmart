'use strict';
var browserify = require('browserify');
var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
const babelify = require("babelify");
const glslify = require("glslify");
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var fs = require('fs');

let loadDataJSON = (file) => {
    var jsonAddress = fs.readFileSync(__dirname + '/apps/abi/'+file+'.json');
    jsonAddress = jsonAddress.toString().trim().replace(/(?:\r\n|\r|\n|\t)/g, '');
    jsonAddress = JSON.stringify(jsonAddress);
    return jsonAddress;
}
var jsonAddress = loadDataJSON('address');
var jsonSmartToken = loadDataJSON('smarttoken');
var jsonAirdrop = loadDataJSON('airdrop');
var jsonPresell = loadDataJSON('presell');
var jsonIDO = loadDataJSON('ido');
var jsonFarm = loadDataJSON('farm');
var jsonNFTFac = loadDataJSON('nftfactory');
var jsonSmartNFT = loadDataJSON('smartnft');
var jsonNFTMarket = loadDataJSON('nftmarket');
var jsonNFTItem = loadDataJSON('nftitem');
var jsonStaking = loadDataJSON('staking');
var jsonGame1 = loadDataJSON('game1');

gulp.task('blockchain', function() {
    return gulp.src('dev/blockchain.js')
        .pipe(replace(/{jsondata}/g, jsonAddress))
        .pipe(replace(/{smarttoken}/g, jsonSmartToken))
        .pipe(replace(/{airdrop}/g, jsonAirdrop))
        .pipe(replace(/{presell}/g, jsonPresell))
        .pipe(replace(/{ido}/g, jsonIDO))
        .pipe(replace(/{nftfac}/g, jsonNFTFac))
        .pipe(replace(/{smartnft}/g, jsonSmartNFT))
        .pipe(replace(/{nftmarket}/g, jsonNFTMarket))
        .pipe(replace(/{nftitem}/g, jsonNFTItem))
        .pipe(replace(/{stacking}/g, jsonStaking))
        .pipe(replace(/{farm}/g, jsonFarm))
        .pipe(replace(/{game1}/g, jsonGame1))
        .pipe(concat('blockchain_dev.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("dev"))
        .pipe(browserSync.stream());
});

gulp.task('bootstrap', function() {
    gulp.src(["dev/theme.scss"])
        .pipe(sass())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());

    gulp.src(["dev/bootstrap.scss"])
        .pipe(sass())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    return gulp.src(["dev/bootstrap.scss","dev/admin.scss"])
        .pipe(sass())
        .pipe(gulp.dest("server/public/dist"))
        .pipe(browserSync.stream());
});


gulp.task('game', function() {
    
    return gulp.src([
            
            'dev/game_1.js'
        ])
        .pipe(concat('game_1.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});


gulp.task('web3', function() {
    
    return gulp.src([
            'node_modules/web3/dist/web3.min.js',
            'node_modules/socket.io/client-dist/socket.io.js',
            'node_modules/web3modal/dist/index.js',
            'node_modules/moment/dist/moment.js',
            'node_modules/axios/dist/axios.js',
            'dev/blockchain_dev.js',
            'dev/token.js',
            //'dev/airdrop.js',
            //'dev/presell.js',
            //'dev/ido.js',
            //'dev/farm.js',
            //'dev/client.js'
        ])
        .pipe(concat('apps.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});

gulp.task('airdrop', function() {
    
    return gulp.src([
            'dev/airdrop.js',
            //'dev/ido.js',
        ])
        .pipe(concat('airdrop.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});

gulp.task('presell', function() {
    
    return gulp.src([
            'dev/presell.js',
            //'dev/ido.js',
        ])
        .pipe(concat('presell.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});

gulp.task('ido', function() {
    
    return gulp.src([
            'dev/ido.js',
        ])
        .pipe(concat('ido.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});

gulp.task('farm', function() {
    
    return gulp.src([
            'dev/farm.js',
        ])
        .pipe(concat('farm.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});



gulp.task('market', function() {
    
    return gulp.src([
            'dev/market.js',
        ])
        .pipe(concat('market.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});


gulp.task('game1', function() {
    
    return gulp.src([
            'dev/game1.js',
        ])
        .pipe(concat('game1.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(browserSync.stream());
    
});

gulp.task('web3admin', function() {
    
    
    gulp.src([
            'node_modules/jquery/dist/jquery.js', 
            'node_modules/popper.js/dist/umd/popper.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/axios/dist/axios.js'
            
        ])
        .pipe(concat('jquery.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("server/public/dist"))
        .pipe(browserSync.stream());

    
    
    return gulp.src([
            'node_modules/web3/dist/web3.min.js',
            'node_modules/web3modal/dist/index.js',
            'dev/blockchain_dev.js',
            'dev/token.js',
            //'dev/airdrop.js',
            //'dev/presell.js',
            //'dev/ido.js',
            //'dev/farm.js',
            //'dev/admin/game1.js',
            'dev/admin.js'
        ])
        .pipe(concat('web3admin.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("server/public/dist"))
        .pipe(browserSync.stream());
    
});

gulp.task('game1js', function() {
    return gulp.src([
            'public/game/js/phaser.min.js',
            'public/game/js/util.js',
            'public/game/js/states/BootState.js',
            'public/game/js/states/PreloadState.js',
            'public/game/js/background.js',
            'public/game/js/states/MainMenuState.js',
            'public/game/js/states/SelectLevelState.js',
            'public/game/js/states/SelectClassState.js',
            'public/game/js/states/GameState.js',
            'public/game/js/main.js',
            'public/game/js/classes/util/Orientation.js',
            'public/game/js/classes/util/Storage.js',
            'public/game/js/classes/util/AudioController.js',
            'public/game/js/components/AudioSwitch.js',
            'public/game/js/classes/vfx/Parallax.js',
            'public/game/js/classes/vfx/Explosion.js',
            'public/game/js/classes/shots/Shot.js',
            'public/game/js/classes/shots/Bullet.js',
            'public/game/js/classes/shots/BulletBig.js',
            'public/game/js/classes/shots/Spit.js',
            'public/game/js/classes/shots/Laser.js',
            'public/game/js/classes/shots/Wave.js',
            'public/game/js/classes/shots/SS.js',
            'public/game/js/classes/shots/Plasma.js',
            'public/game/js/classes/shots/BeamSmall.js',
            'public/game/js/classes/shots/BeamBig.js',
            'public/game/js/classes/weapons/Machinegun.js',
            'public/game/js/classes/weapons/Pistol.js',
            'public/game/js/classes/weapons/Spitter.js',
            'public/game/js/classes/weapons/SmallLaser.js',
            'public/game/js/classes/weapons/Sonic.js',
            'public/game/js/classes/weapons/PlasmaGun.js',
            'public/game/js/classes/weapons/BeamerSmall.js',
            'public/game/js/classes/weapons/BeamerBig.js',
            'public/game/js/classes/PlayerShip.js',
            'public/game/js/classes/enemies/Enemy.js',
            'public/game/js/classes/enemies/Marine.js',
            'public/game/js/classes/enemies/Scout.js',
            'public/game/js/classes/enemies/Asteroid.js',
            'public/game/js/classes/enemies/Squid.js',
            'public/game/js/classes/enemies/Slider.js',
            'public/game/js/classes/enemies/Spider.js',
            'public/game/js/classes/enemies/Assault.js',
            'public/game/js/classes/enemies/Octopus.js',
            'public/game/js/classes/enemies/Brain.js',
            'public/game/js/classes/enemies/Lurr.js',
            'public/game/js/classes/Powerup.js',
            'public/game/js/classes/EnemySpawner.js',
            'public/game/js/classes/gui/HUD.js',
            'public/game/js/classes/gui/ButlletBar.js',
            'public/game/js/classes/gui/HealthBar.js',
            'public/game/js/classes/gui/LevelComplete.js',
            'public/game/js/classes/gui/GameOver.js',
            'public/game/js/classes/gui/OptionsBar.js',
            'public/game/js/classes/gui/GameOptions.js',
            'public/game/js/classes/gui/ShopBullet.js',
            'public/game/js/levels.js'
        ])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public/dist/game/starsbattle"))
        .pipe(browserSync.stream());
});
//gulp.task('clean', () => del(['data/dev/assent/js/*.js', 'data/dev/assent/css/*.css']));

gulp.task('default', gulp.series(['blockchain','web3','web3admin','bootstrap','game1','game','airdrop','ido','presell','farm','market'],function(done) { 
    // default task code here
    done();
}));