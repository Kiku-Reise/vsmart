var Parallax = function() {
    this.height = game.world.height + 100;
    this.endY = game.world.height + 50;

    // object
    var object = game.add.sprite(this.setX(), irandom(game.world.height/2), 'atlas', 'parallax/object_' + irandom(3));
    object.anchor.setTo(0.5);
    object.alpha = 0.2;

    game.groups.bg.add(object);

    // far pieces
    for (var i = 0; i < 20; i++) {
        var piece = game.add.image(this.setX(), irandom(game.world.height), 'atlas', this.setTexture('far'));
        piece.angle = irandom(360);
        piece.type = 'far';
        piece.anchor.setTo(0.5);
        piece.alpha = random_range(0.1, 0.2);
        piece.scale.setTo(random_range(1.3, 1.4));
        var time = 8000 * (1 - (piece.y / this.height)) * random_range(0.9, 1.1);
        game.add.tween(piece).to({y: this.endY}, time, 'Linear', true).onComplete.add(this.respawnPiece, this, piece);

        game.groups.bg.add(piece);
    }

    // middle pieces
    for (var i = 0; i < 10; i++) {
        var piece = game.add.image(this.setX(), irandom(game.world.height), 'atlas', this.setTexture('middle'));
        piece.angle = irandom(360);
        piece.type = 'middle';
        piece.anchor.setTo(0.5);
        piece.alpha = random_range(0.3, 0.5);
        piece.scale.setTo(random_range(1.0, 1.1));
        var time = 4000 * (1 - (piece.y / this.height)) * random_range(0.9, 1.1);
        game.add.tween(piece).to({y: this.endY}, time, 'Linear', true).onComplete.add(this.respawnPiece, this, piece);

        game.groups.bg.add(piece);
    }

    // middle pieces
    for (var i = 0; i < 15; i++) {
        var piece = game.add.image(this.setX(), irandom(game.world.height), 'atlas', this.setTexture('near'));
        piece.angle = irandom(360);
        piece.type = 'close';
        piece.anchor.setTo(0.5);
        piece.alpha = random_range(0.3, 0.4);
        piece.scale.setTo(random_range(0.6, 0.8));
        var time = 500 * (1 - (piece.y / this.height)) * random_range(0.9, 1.1);
        game.add.tween(piece).to({y: this.endY}, time, 'Linear', true).onComplete.add(this.respawnPiece, this, piece);

        game.groups.bg.add(piece);
    }    
}

Parallax.prototype.respawnPiece = function(piece) {
    var time;
    if (piece.type === 'far') time = 8000;
    if (piece.type === 'middle') time = 4000;
    if (piece.type === 'close') time = 500;

    time *= random_range(0.9, 1.1);

    piece.x = this.setX();
    piece.y = -50;
    game.add.tween(piece).to({y: this.endY}, time, 'Linear', true).onComplete.add(this.respawnPiece, this, piece);
}

Parallax.prototype.setX = function() {
    return irandom(game.world.width);
}

Parallax.prototype.setTexture = function(type) {
    if (type === 'far') return 'parallax/far_' + irandom(4);
    if (type === 'middle') return 'parallax/middle_' + irandom(3);
    if (type === 'near') return 'parallax/near_' + irandom(2);
}