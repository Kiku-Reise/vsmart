var ShopBullet = function() {
    //Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY + 1000, 'control', 'gui/shop_bg');
    //game.groups.shop.add(this);
    //this.anchor.setTo(0.5);
    this.show = false;
    this.showButtons();
    this.childGroup = game.add.group();
}

ShopBullet.prototype = Object.create(Phaser.Sprite.prototype);
ShopBullet.prototype.constructor = GameOver;

ShopBullet.prototype.showButtons = async function() {
    game.pause = true;
     var CreateObjectID = "BulletClassItems";
    if($("body #"+CreateObjectID).length > 0) {
        $('#'+CreateObjectID).modal('show');
        return;
    }
    await game.socket.emit("update",{
                tokenId:game.playerShip.tokenId,
                score : game.playerShip.score, 
                bullet : game.playerShip.bullet, 
                lever : game.currentLevel,
                record : 0,
                hash : game.hash});

    var dataBullet = await game.web3.getBulletMarket(6);
   

    if($("body #"+CreateObjectID).length == 0){

        $('body').append('<div class="modal fade" id="'+CreateObjectID+'" data-backdrop="static"  data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
                '<div class="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">'+
                    '<div class="modal-content">'+
                    '<div class="modal-header">'+
                    '    <h5 class="modal-title" id="exampleModalLabel">Sellect Bullet</h5>'+
                    '    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>'+
                    '</div>'+
                    '<div class="modal-body">'+
                    '<div class="row"></div>'+
                '</div>'+
      
                '</div>'+
            '</div>'+
        '</div>');

    }

    var html = '';
    for(var i =0;i<dataBullet.length;i++){
        var id = Number(dataBullet[i].id);
        html += '<div class="col-4 btnBuyBulletExe" data-itemid="'+id+'"><img src="/nfts/bullet/'+id+'.gif" style="width:100%"><b>'+dataBullet[i].name+'</b><br>'+dataBullet[i].price+' STARTS<br>Bullet : '+dataBullet[i].bullet+'</div>';
    }
    $("#"+CreateObjectID+" .modal-body .row").html(html);

    $('#'+CreateObjectID).attr("data-tokenid",game.playerShip.tokenId);
    $('#'+CreateObjectID).modal('show');

    $(".btnBuyBulletExe").on("click", async function(){
        $("body").append('<div id="LoaddingGame"><div class="preloader"><span class="spinner spinner-round"></span></div></div>');
        var tokenid = $('#'+CreateObjectID).data("tokenid");
        var itemid = $(this).data("itemid");
        
        await game.web3.buyBullet(tokenid,itemid,game.playerShip.bullet, true).then(async (value) => {
            if(value == 1){
                await game.socket.emit("buybulet",{tokenId:game.playerShip.tokenId}, function(data){
                    //console.log(data.Bullet);
                    game.playerShip.bullet = Number(data.Bullet);
                    //game.currentLevel = data.Lever;
                    //game.playerShip.start();
                     game.pause = false;
                    game.playerShip.weapon.fire(true);
                    game.spawner.spawn();
                    this.show = false;

                });
                
                
                $('#'+CreateObjectID).modal('hide');
                $("body #LoaddingGame").remove();
            }
        });
    });

    $("#"+CreateObjectID).on("hidden.bs.modal", function () {
        if(Number(game.playerShip.bullet) > 0){
            game.pause = false;
            game.playerShip.weapon.fire(true);
            game.spawner.spawn();
        }
        this.show = false;
    });

    this.show = true;
    
    
}
ShopBullet.prototype.update = function() {
    //console.log(this.x);
    //this.destroy();
}
ShopBullet.prototype.remove = function() {
    //console.log(this.x);
    this.destroy();
    this.childGroup.destroy();
}