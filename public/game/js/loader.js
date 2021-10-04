var loadScriptsSync = function (scripts) {
    if (scripts.length === 0) return game.state.start('BootState'); ;
    var path = scripts.shift();
    var js = document.createElement('script');
    js.async = true;
    js.onload = function(){
        loadScriptsSync(scripts);
    }
    js.src = path;
    document.head.appendChild(js);
}
var scripts = [
    'game/js/util.js',
    'game/js/background.js',
    'game/js/states/BootState.js',
    'game/js/states/PreloadState.js',
    'game/js/states/MainMenuState.js',
    'game/js/states/SelectLevelState.js',
    'game/js/states/SelectClassState.js',
    'game/js/states/GameState.js',
    'game/js/main.js',

    'game/js/classes/util/Orientation.js',
    'game/js/classes/util/Storage.js',
    'game/js/classes/util/AudioController.js',
    'game/js/components/AudioSwitch.js',

    'game/js/classes/vfx/Parallax.js',
    'game/js/classes/vfx/Explosion.js',
    'game/js/classes/shots/Shot.js',
    'game/js/classes/shots/Bullet.js',
    'game/js/classes/shots/BulletBig.js',
    'game/js/classes/shots/Spit.js',
    'game/js/classes/shots/Laser.js',
    'game/js/classes/shots/Wave.js',
    'game/js/classes/shots/Plasma.js',
    'game/js/classes/shots/BeamSmall.js',
    'game/js/classes/shots/BeamBig.js',
    'game/js/classes/shots/SS.js',
    'game/js/classes/weapons/Machinegun.js',
    'game/js/classes/weapons/Pistol.js',
    'game/js/classes/weapons/Spitter.js',
    'game/js/classes/weapons/SmallLaser.js',
    'game/js/classes/weapons/Sonic.js',
    'game/js/classes/weapons/PlasmaGun.js',
    'game/js/classes/weapons/BeamerSmall.js',
    'game/js/classes/weapons/BeamerBig.js',
    'game/js/classes/PlayerShip.js',
    'game/js/classes/enemies/Enemy.js',
    'game/js/classes/enemies/Marine.js',
    'game/js/classes/enemies/Scout.js',
    'game/js/classes/enemies/Asteroid.js',
    'game/js/classes/enemies/Squid.js',
    'game/js/classes/enemies/Slider.js',
    'game/js/classes/enemies/Spider.js',
    'game/js/classes/enemies/Assault.js',
    'game/js/classes/enemies/Octopus.js',
    'game/js/classes/enemies/Brain.js',
    'game/js/classes/enemies/Lurr.js',
    'game/js/classes/Powerup.js',
    'game/js/classes/EnemySpawner.js',

    'game/js/classes/gui/HUD.js',
    'game/js/classes/gui/ButlletBar.js',
    'game/js/classes/gui/HealthBar.js',
    'game/js/classes/gui/LevelComplete.js',
    'game/js/classes/gui/GameOver.js',

    'game/js/levels.js',
];

loadScriptsSync(scripts);