var BeamBig = function(x, y, type, damage) {
    Shot.call(this, x, y, type, damage, 'shots/beam_big');

    this.vsp = 20;
}

BeamBig.prototype = Object.create(Shot.prototype);
BeamBig.prototype.constructor = BeamBig;    
