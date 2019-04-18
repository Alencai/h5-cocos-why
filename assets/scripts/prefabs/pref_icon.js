var icon_idx = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        icon: { default:null, type: cc.Sprite },
        frames: { default:[], type: [cc.SpriteFrame]},
    },

    onLoad() {
        if (this.frames.length > 0) {
            ++icon_idx;
            if (icon_idx >= this.frames.length) {
                icon_idx = 0;
            }
            this.icon.spriteFrame = this.frames[icon_idx];
            this.icon.width = 90;
            this.icon.height = 90;
        }
    },
    
    evtClick(evt) {
        cc.log('icon 点击事件');
    },
});


