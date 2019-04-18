
cc.Class({
    extends: cc.Component,

    properties: {
        item1: cc.Node,
        item2: cc.Node,
    },

    onLoad() {
        this.reset();
    },

    reset() {
        this.item1.x = -200;
        this.item1.y = 50;

        this.item2.x = -200;
        this.item2.y = -50;
        this.item2.stopAllActions();
        this.item2.runAction(cc.moveBy(5, 600, 0));
    },

    start() {
    },

    update(dt) {
        this.item1.x += dt * 120;
    },

    evtClick(evt) {
        this.timeScale = this.timeScale == 1 ? 0.2 : 1;
        cc.director.getScheduler().setTimeScale(this.timeScale);
        this.reset();
    },
});


