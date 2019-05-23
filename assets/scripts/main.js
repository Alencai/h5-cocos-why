// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Node,
        content: cc.Node,
    },

    onLoad() {
        this.item.opacity = 0;
        cc.log(require("test1"));
    },

    update(dt) {
        if (!this._isInit) {
            this._isInit = true;
            this.addItem('s1_life', '生命周期');
            this.addItem('s2_MotionStreak', '拖尾效果');
            this.addItem('s3_timescale', '时间缩放');
        }
    },

    addItem(scene, title) {
        var btn = cc.instantiate(this.item);
        var color = btn.color;
        btn.opacity = 255;
        btn.parent = this.content;
        btn.children[0].getComponent(cc.Label).string = title;
        btn.on(cc.Node.EventType.TOUCH_START,    function (evt) { btn.color = cc.Color.GRAY; });
        btn.on(cc.Node.EventType.TOUCH_MOVE,     function (evt) { btn.color = cc.Color.GRAY; });
        btn.on(cc.Node.EventType.TOUCH_CANCEL,   function (evt) { btn.color = color; });
        btn.on(cc.Node.EventType.TOUCH_END,      function (evt) { btn.color = color; cc.director.loadScene(scene); });
    },

    evtBack() {
        cc.director.loadScene('main');
    },
});
