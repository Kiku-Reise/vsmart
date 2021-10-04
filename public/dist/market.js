SmartApps=function(o,l,s){"use strict";var i,c,d=o.Blockchain,n=o.tokenSmart;let k=3e5;var p=d.address();o.Market={},o.Market.loadContracts=async()=>{i=await d.loadContractNFTMarket(),c=await d.getLoginWallet()},o.Market.action=async()=>{l(".sellitem").on("click",async function(){})},o.Market.addSupportedNft=async a=>{await i.addSupportedNft(a).send({gas:k}).then(a=>{console.log(a)})},o.Market.removeSupportedNft=async a=>{await i.removeSupportedNft(a).send({gas:k}).then(a=>{console.log(a)})},o.Market.addSupportedCurrency=async a=>{await i.addSupportedCurrency(a).send({gas:k}).then(a=>{console.log(a)})},o.Market.removeSupportedCurrency=async a=>{await i.removeSupportedCurrency(a).send({gas:k}).then(a=>{console.log(a)})},o.Market.removeSupportedCurrency=async a=>{await i.removeSupportedCurrency(a).send({gas:k}).then(a=>{console.log(a)})},o.Market.setFeeReceiver=async a=>{await i.setFeeReceiver(a).send({gas:k}).then(a=>{console.log(a)})},o.Market.setFeeRate=async a=>{await i.setFeeRate(a).send({gas:k}).then(a=>{console.log(a)})},o.Market.AllowTrade=async()=>{await i.enableSales(!0).send({gas:k}).then(a=>{console.log(a),s.location.reload()})},o.Market.sell=async(e,r,n,o)=>{var a=d.toWei(r.toString(),"ether");await i.sell(e,a,o,p.AddressContractSmartToken).send({gas:5e5}).then(async a=>{var t;a.transactionHash&&(t=await d.getNftTokenID(a.transactionHash),await axios.post("/market/sell/"+c,{tokenid:e,sell_id:t,price:r,hash:a.transactionHash,description:n,money_contract:p.AddressContractSmartToken,nft_contract:o}).then(a=>{d.notify(a.data)})),s.location.reload()})},o.Market.getMySell=async()=>{},o.Market.getMarketList=async()=>{},o.Market.transfer=async(a,t)=>{(await d.loadContractSmartnft()).transferFrom(c,a,t).send({gas:k}).then(async a=>{l("#transferWallet").modal("hide"),d.notify("Your transfer complete"),s.location.reload()})},o.Market.transferExp=async(a,t)=>{(await d.loadContractNFTItem()).transferFrom(c,a,t).send({gas:k}).then(async a=>{l("#transferWallet").modal("hide"),d.notify("Your transfer complete"),s.location.reload()})},o.Market.AccessMintNFT=async()=>{return await(await d.loadContractNFTFactory()).isStaticUser(c).call()},o.Market.cancelsell=async(t,a)=>{await i.cancelSell(t,a).send({gas:k}).then(async a=>{a.transactionHash&&await axios.post("/market/cancelsell/"+c,{tokenid:t}).then(a=>{d.notify(a.data)}),s.location.reload()})},o.Market.buy=async(t,e,a)=>{await n.loadContracts();var r=d.toWei(e.toString(),"ether");await n.allowance(p.AddressContractNFTMarket)<r?await n.approve(p.AddressContractNFTMarket,r).then(async()=>{await i.buy(t,a,p.AddressContractSmartToken).send({gas:k}).then(async a=>{d.notify("Your buy NFT complete"),""!=s.TelegramServer&&null!=s.TelegramServer&&(await axios.post(s.TelegramServer,{text:`NFT Market sell complete\nTokenID : ${t}\nPrice : ${e} CAR\nHash : ${a.transactionHash}`}),s.location.href="/market/account")})}):await i.buy(t,a,p.AddressContractSmartToken).send({gas:k}).then(async a=>{d.notify("Your buy NFT complete"),""!=s.TelegramServer&&null!=s.TelegramServer&&(await axios.post(s.TelegramServer,{text:`NFT Market sell complete\nTokenID : ${t}\nPrice : ${e} CAR\nHash : ${a.transactionHash}`}),s.location.href="/market/account")})},o.Market.isSeller=async()=>{return await(await d.loadContractSmartnft()).isApprovedForAll(c,p.AddressContractNFTMarket).call()},o.Market.enableSellCar=async()=>{var a=await d.loadContractSmartnft();if(0!=await a.isApprovedForAll(c,p.AddressContractNFTMarket).call())return!0;await a.setApprovalForAll(p.AddressContractNFTMarket,!0).send({gas:k}).then(a=>{console.log(a),s.location.reload()})},o.Market.UpCarsLever=async(t,e)=>{var r=await d.loadContractSmartnft(),a=await d.loadContractNFTItem();0==await a.isApprovedForAll(c,p.AddressContractSmartNFT).call()?await a.setApprovalForAll(p.AddressContractSmartNFT,!0).send({gas:k}).then(async a=>{await r.upLeverCar(t,e).send({gas:5e5}).then(a=>{console.log(a)}),s.location.reload()}):(await r.upLeverCar(t,e).send({gas:5e5}).then(a=>{console.log(a)}),s.location.reload())},o.Market.UpItemLever=async(a,t)=>{await(await d.loadContractNFTItem()).upLever(a,t).send({gas:4e5}).then(a=>{console.log(a),s.location.reload()})},o.Market.isEnableSellExp=async()=>{return await(await d.loadContractNFTItem()).isApprovedForAll(c,p.AddressContractNFTMarket).call()},o.Market.enableSellExp=async()=>{var a=await d.loadContractNFTItem();if(0!=await a.isApprovedForAll(c,p.AddressContractNFTMarket).call())return!0;await a.setApprovalForAll(p.AddressContractNFTMarket,!0).send({gas:k}).then(a=>{console.log(a),s.location.reload()})};return o.Market.init=async function(){await d.init(),await n.loadContracts(),await o.Market.loadContracts(),await o.Market.getMarketList(),await n.allowance(p.AddressContractNFTMarket);var a,t=await o.Market.isSeller();l("div[data-account-item]").hasAttr("data-auto-load")&&(a=(a=l("div[data-account-item]").data("account-item")).replace(/{wallet}/g,c),console.log(a),a=a,l("div[data-account-item]").html('<div class="preloader"><span class="spinner spinner-round"></span></div>'),await axios.post(a,{wallet:c}).then(a=>{l("div[data-account-item]").html(a.data),l("[data-market-sell]").on("click",async function(){var a=l(this).data("tokenid"),t=l(this).data("contract"),e=l(this).parent().parent().find("input.price").val();t==p.AddressContractNFTItem&&await o.Market.enableSellExp(),t==p.AddressContractSmartNFT&&await o.Market.enableSellCar();var r=l(this).parent().parent().find("textarea.description").val(),n=!1;0==a&&(d.notify("Error Token ID, Plz Try again"),n=!0),0==e&&(d.notify("Error Price, Plz Try again"),n=!0),0==n&&o.Market.sell(a,e,r,t)}),l("[data-nft-transfer]").on("click",function(){var a=l(this).data("tokenid"),t=l("#TransferNftWallet").val();return t.length<40?(d.notify("Error Wallet"),!1):a<1?(d.notify("Error Token ID"),!1):void o.Market.transfer(t,a)}),l("[data-exp-transfer]").on("click",function(){var a=l(this).data("tokenid"),t=l("#TransferNftWallet").val();return t.length<40?(d.notify("Error Wallet"),!1):a<1?(d.notify("Error Token ID"),!1):void o.Market.transferExp(t,a)}),l("[data-carslever]").on("click",async function(){var a=parseInt(l("#exptoken3 > img").data("tokenid")),t=parseInt(l("#carslibs2 > img").data("tokenid"));if(""==a||null==a||""==t||null==t||isNaN(a)||isNaN(t))return d.notify("Error Token ID EXP"),!1;o.Market.UpCarsLever(t,a)}),l("[data-upexp]").on("click",async function(){var a=parseInt(l("#exptoken1 > img").data("tokenid")),t=parseInt(l("#exptoken2 > img").data("tokenid"));if(a==t||""==a||null==a||""==t||null==t||isNaN(a)||isNaN(t))return d.notify("Error Token ID EXP"),!1;o.Market.UpItemLever(a,t)}),l("[data-cancelsell]").on("click",async function(){var a=l(this).data("tokenid"),t=l(this).data("contract");o.Market.cancelsell(a,t)})})),0<l("[data-mint-nft]").length&&(l("[data-mint-nft]").attr("href","/farm"),l("[data-mint-nft]").html("Join S3 Game")),1==t?(l(".enablesell").attr("href","#"),l(".enablesell").text("Controller"),l(".enablesell").on("click",async()=>{await loadMyController()})):l(".enablesell").on("click",function(){o.Market.enableSell()});var e;0<l("[data-mainmarket]").length&&(console.log("Load Main Market"),e=1,l("[data-mainmarket]").html('<div class="preloader"><span class="spinner spinner-round"><h7 class="text-center">Loadding...</h7></span></div>'),await axios.get("/market/main/"+e+"?c="+getURL("c")).then(a=>{l("[data-mainmarket]").html(a.data)})),await(0<l("[data-myitem]").length&&await loadMyItem()),l(".loaditem").on("click",async function(){l("input.walletAddress").val();await loadMyItem()}),l("[data-market-buy]").on("click",function(){var a=l(this).data("tokenid"),t=l(this).data("amount"),e=l(this).data("contract");o.Market.buy(a,t,e)})},o.components.docReady.push(o.Market.init),o}(SmartApps,jQuery,window);