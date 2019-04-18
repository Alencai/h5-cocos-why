
cc.Class({
    extends: cc.Component,

    properties: {
        effect: cc.Node, // 绑定空间 MotionStreak
    },

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.evtTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.evtTouch, this);
    },

    evtTouch(evt) {
        var loc = evt.getLocation();
        this.effect.x = loc.x - this.node.width / 2;
        this.effect.y = loc.y - this.node.height / 2;
    },
});
