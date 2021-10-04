SmartApps = (function (SmartApps, $, window) {
        "use strict";
        
    
    var Game1;
    var GameFatory;
   
    var login_wallet;
    let GAS = 300000; 
    let blockchain = SmartApps.Blockchain;
    var ContractAddress = blockchain.address();
    var login_wallet;

    SmartApps.tokenGame1 = {};
   
    SmartApps.tokenGame1.getBalt = async () => {
        var objData = [];
        await Game1.getTokenOwner(login_wallet).call().then(async (value) => {
            for(var i=0;i<value.length;i++){
                await Game1.getOptions(value[i]).call().then((info) => {
                   
                    var obj = {
                        tokenId : value[i],
                        ClassName : info.ClassName,
                        Class : info.Class,
                        Lever: info.Lever,
                        Bullet: info.Bullet,
                        BulletClass: info.BulletClass,
                        Speed: info.Speed,
                        Score: info.Score,
                    }

                    objData.push(obj);
                });
            }
        });
        return objData;
    };
    SmartApps.tokenGame1.getPlayer = async (tokenId) => {
        var obj = {};
        await Game1.getOptions(tokenId).call().then((info) => {
            obj = {
                tokenId : tokenId,
                ClassName : info.ClassName,
                Class : info.Class,
                Lever: info.Lever,
                Bullet: info.Bullet,
                BulletClass: info.BulletClass,
                Speed: info.Speed,
                Score: info.Score,
            }
        });
        return obj;
    };
    
    SmartApps.tokenGame1.upLever = async (tokenId, _score) => {
        await Game1.upLeverStart(tokenId,_score,login_wallet).send({gas:130000, data: login_wallet}).then((value) => {
            console.log(value);
        });
    };

    SmartApps.tokenGame1.setMarketStars = async (tokenId,_name,_price, _lever, _class, _bullet, _bulletclass, _speed) => {
        _price = blockchain.toWei(_price);
        await GameFatory.setMarketStars(tokenId,_name,_price, _lever, _class, _bullet, _bulletclass, _speed).send({gas:180000}).then((value) => {
            blockchain.notify("Update ok");
        });
    };

    
    SmartApps.tokenGame1.setEnableReward = async (address) => {
        //var _reward = blockchain.toWei(reward);
        
        await Game1.setEnableReward(address).send({gas:180000}).then((info) => {
            console.log(info);
        });
    }
    SmartApps.tokenGame1.setRewardLever = async (lever, reward) => {
        //var _reward = blockchain.toWei(reward);
        
        await Game1.setRewardLever(lever,lever,reward).send({gas:180000}).then((info) => {
            console.log(info);
        });
    }

    SmartApps.tokenGame1.getRewardLever = async () => {
        var obj = [];

        var getData = await Game1.LeverRewardOf(5).call();
        obj.push(getData);

        var getData = await Game1.LeverRewardOf(10).call();
        if(getData.Lever == 0) getData.Lever = 10;
        obj.push(getData);


        var getData = await Game1.LeverRewardOf(15).call();
        if(getData.Lever == 0) getData.Lever = 15;
        obj.push(getData);

        var getData = await Game1.LeverRewardOf(20).call();
        if(getData.Lever == 0) getData.Lever = 20;
        obj.push(getData);
        var getData = await Game1.LeverRewardOf(25).call();
        if(getData.Lever == 0) getData.Lever = 25;
        obj.push(getData);

        return obj;
    };



    SmartApps.tokenGame1.addAdmin = async (address) => {

        await GameFatory.addAdmin(address).send({gas:150000}).then((value) => {
            blockchain.notify("Update ok");
        });
    };

    SmartApps.tokenGame1.connectFactory = async () => {

        await Game1.setFactory(ContractAddress.AddressContractNFTFactory).send({gas:150000}).then((value) => {
            blockchain.notify("Update ok");
        });
    };

     SmartApps.tokenGame1.setCurentcy = async () => {

        await GameFatory.setCurentcy(ContractAddress.AddressContractSmartToken).send({gas:150000}).then((value) => {
            blockchain.notify("Update ok");
        });
    };

     SmartApps.tokenGame1.setNft = async () => {

        await GameFatory.setNft(ContractAddress.AddressContractGame1).send({gas:150000}).then((value) => {
            blockchain.notify("Update ok");
        });
    };
    
    

    SmartApps.tokenGame1.getMarketPlate = async (number) => {
        //await Game1.setFactory('0xd6d488258cdb2a4b583575467bfcc8abe2afd965').send({gas:30000});
        var obj = [];
        await GameFatory.getMarketStars(number).call().then((value) => {
            
            for(var i=0;i<value.length;i++){
                var dataObj = {
                     name : value[i].name != "" ? value[i].name : "Stars CX 1",
                     price : value[i].price > 0 ? blockchain.fromWei(value[i].price) : 1000,
                     lever : value[i].lever > 0 ? value[i].lever : 1,
                     class : value[i].class > 0 ? value[i].class : 1,
                     bullet : value[i].bullet > 0 ? value[i].bullet : 1000,
                     bulletclass : value[i].bulletclass > 0 ? value[i].bulletclass : 1,
                     speed : value[i].speed > 0 ? value[i].speed : 7
                };
                
                obj.push(dataObj);
            }
            
        });
       
        return obj;
    };

    SmartApps.tokenGame1.buyMarketPlate = async (itemID) => {
        let allow = blockchain.toWei(500);
        let appoveAmount = await SmartApps.tokenSmart.allowance('0xd6d488258cdb2a4b583575467bfcc8abe2afd965');
         
        if(appoveAmount < allow) await SmartApps.tokenSmart.approve('0xd6d488258cdb2a4b583575467bfcc8abe2afd965',allow);
        await GameFatory.MarketPlaceItemOf(itemID).call().then((value) => {
            console.log(value);
        });

        await GameFatory.buyStars(itemID).send({gas:1000000}).then((value) => {
            console.log(value);
        });
    };


    SmartApps.tokenGame1.getBulletMarket = async (number) => {
        //await Game1.setFactory('0xd6d488258cdb2a4b583575467bfcc8abe2afd965').send({gas:30000});
        var obj = [];
        await GameFatory.getBulletMarket(number).call().then((value) => {

            for(var i=0;i<value.length;i++){
                var dataObj = {
                    id : i,
                     name : value[i].name,
                     price : blockchain.fromWei(value[i].price),
                     bullet : value[i].bullet
                };
                
                obj.push(dataObj);
            }
            
        });
        console.log(obj);
        return obj;
    };


    SmartApps.tokenGame1.buyBullet = async (_tokenId, itemID) => {
        let allow = blockchain.toWei(500);
        let appoveAmount = await SmartApps.tokenSmart.allowance('0xd6d488258cdb2a4b583575467bfcc8abe2afd965');
         console.log(appoveAmount);
        if(appoveAmount < allow) await SmartApps.tokenSmart.approve('0xd6d488258cdb2a4b583575467bfcc8abe2afd965',allow);
        await GameFatory.MarketPlaceBulletOf(itemID).call().then((value) => {
            console.log(value);
        });

        await GameFatory.buyBullet(_tokenId, itemID).send({gas:300000}).then((value) => {
            console.log(value);
        });
    };

    SmartApps.tokenGame1.setMarketBullet = async (tokenId,_name,_price, _buletnumber) => {
        _price = blockchain.toWei(_price);
        await GameFatory.setMarketBullet(tokenId,_name,_price, _buletnumber).send({gas:180000}).then((value) => {
            blockchain.notify("Update ok");
        });
    };


    SmartApps.tokenGame1.setLeverBuilder = async (_lever,_score,_bullet, _bulletclass, _speed) => {
       
        await Game1.setLeverData(_lever,_score,_bullet, _bulletclass, _speed).send({gas:180000}).then((value) => {
            blockchain.notify("Update ok");
        });
    };
    
    SmartApps.tokenGame1.getLeverBulder = async (number) => {
        //await Game1.setFactory('0xd6d488258cdb2a4b583575467bfcc8abe2afd965').send({gas:30000});
        var obj = [];
        await Game1.getLeverData(number).call().then((value) => {

            for(var i=0;i<value.length;i++){
                var dataObj = {
                    id : i,
                     Score : value[i].Score,
                     Bullet : value[i].Bullet,
                     BulletClass : value[i].BulletClass,
                     Speed : value[i].Speed
                };
                
                obj.push(dataObj);
            }
            
        });
        
        return obj;
    };
    
    

    SmartApps.tokenGame1.Init = async () =>{
        await blockchain.init();
        Game1 = await blockchain.loadContractGame1();
        GameFatory = await blockchain.loadContractNFTFactory();
        login_wallet = await blockchain.getLoginWallet();
        
      
    }

    SmartApps.components.docReady.push(SmartApps.tokenGame1.Init);
    return SmartApps;
})(SmartApps, jQuery, window);