var BeamSmall = function(x, y, type, damage) {
    Shot.call(this, x, y, type, damage, 'shots/beam_small');

    this.vsp = 20;
}

BeamSmall.prototype = Object.create(Shot.prototype);
BeamSmall.prototype.constructor = BeamSmall;    
