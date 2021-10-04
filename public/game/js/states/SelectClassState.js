var backgroundScreen;
var SelectClassState = {
    create: async function() {

        game.stage.backgroundColor = '#140c32';
        var backgroundScreenHome = game.add.tileSprite(0, 0,game._width, game._height, "backgroundgame");
        backgroundScreenHome.anchor.setTo(0, 0);
        backgroundScreenHome.scale.set(1.5, 1.6);
        backgroundScreenHome.fixedToCamera = true;
        

        backgroundScreen = game.add.tileSprite(0, 0,game._width, game._height, "skys");
        

        for (var i = 0; i < 10; i++) {
            var piece = game.add.image(irandom(game.world.width), irandom(game.world.height), 'atlas', 'parallax/'+choose('far_0','far_1','far_2', 'far_3', 'far_4'));
            piece.alpha = 0.5;
        }

        /*

        this.backgrounds = [];
        for (let i = 0; i < 5; i += 1) {
          const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
          this.backgrounds.push(bg);
        }
        */

        var CreateObjectID = "Object"+Math.floor(Math.random() * 9999999999999);
        $("body").append('<div id="LoaddingGame"><div class="preloader"><span class="spinner spinner-round"></span></div></div>');

        $('body').append('<div class="modal fade" id="'+CreateObjectID+'" data-backdrop="static"  data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
                '<div class="modal-dialog modal-lg modal-dialog-centered">'+
                    '<div class="modal-content" style="background-color:transparent;border:0px;">'+
      
                    '<div class="modal-body">'+
                    '<div class="row"></div>'+
                '</div>'+
      
                '</div>'+
            '</div>'+
        '</div>');
        let batllat = await game.web3.getBalt();
        //await game.web3.mint(3);
        var html = '';
        for (var i = 0; i < batllat.length; i++) {
            
          var tokenId =  batllat[i].tokenId;
          var lever =  batllat[i].Lever;
          var img = batllat[i].Class;
          var vip = batllat[i].Groups;
          html += '<div class="col-sm-6 col-12 mb-4">';

          html += '          <div class="card card-class" style="background-color:transparent;border:0px;">';
          html += '            <div class="card-body playItems" data-tokenid="'+tokenId+'" data-level="'+lever+'">';
          html += '             <div class="row g-0"><div class="col-md-4">';
          html += '              <img src="/nfts/'+img+'.png" style="width:100%; height:120px;">';
          if(vip > 0){
            html += '             <div class="card-vip"><img src="/assets/vip/vip'+vip+'.png" style="width:100%;height:100%;"></div>';
          }
          html += '             </div><div class="col-md-8">';
          
          html += '              Token ID : '+tokenId+'<br>';
          
          html += '              <b>'+batllat[i].name+'</b><br>';
          html += '              Lever : '+batllat[i].Lever+'<br>';
          html += '              Bullet : '+batllat[i].Bullet+'<br>';
          html += '              Speed : '+batllat[i].Speed+' | Damge : 0.5';
          html += '             </div>';
          //html += '             <div class="col-md-12" stype="padding-top:10px;"><button class="btn btn-sm btn-primary">Claim</button> <button class="btn btn-sm btn-primary sellSystem">Sell Market</button> <button class="btn btn-sm btn-primary sellSystem">Sell System</button></div>';
          html += '             </div>';
          html += '            </div>';
          html += '          </div>';
          html += '</div>';
        
                

            //PlayerImage.alpha = 0.5;
        }
        $("#"+CreateObjectID+" .modal-body .row").html(html);

        //$('#BulletModal').attr("data-tokenid",game.playerShip.tokenId);
        $("#"+CreateObjectID).modal('show');

        $('.playItems').on("click", function(){
            var tokenPlay = $(this).data("tokenid");
            var currentLevel = $(this).data("level");
            game.tokenId = tokenPlay;
            game.currentLevel = Number(currentLevel);
           // console.log(game.currentLevel);
           // game.currentLevel = 
           $("#"+CreateObjectID).modal('hide');
            game.state.start('GameState');
        });

        $("body #LoaddingGame").remove();
        //game.state.start('GameState');
    },
    update : () => {
        //console.log(backgroundScreen);
        backgroundScreen.tilePosition.y +=2;
    }
}

