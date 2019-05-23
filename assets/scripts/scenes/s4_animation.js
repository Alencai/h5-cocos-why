
cc.Class({
    extends: cc.Component,

    properties: {
        anim_name: cc.Label,
        animation: cc.Animation,
    },

    onLoad() {
        this._clips = this.animation.getClips();
        this._index = 0;
        this.evtPlay();
    },

    start() {
    },

    update(dt) {
    },

    playNextAnimation() {
        ++ this._index;
        if (this._index >= this._clips.length) {
            this._index = 0;
        }
        var clip = this._clips[this._index];
        if (clip) {
            this.anim_name.string = clip.name;
            this.animation.play(clip.name, 0);
            this.animation.once('stop', this.onAnimStop, this);
        }
    },

    onAnimStop(evt) {
        cc.log('onAnimStop', evt);
    },

    evtPlay(evt) {
        this.playNextAnimation();
    },
});


